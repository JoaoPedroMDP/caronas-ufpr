import copy
import logging
from traceback import format_exc

from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.crypto import get_random_string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.request import Request
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.exceptions import TokenError, InvalidToken

from config import GMAIL_APP_EMAIL
from routes.models import PasswordResetToken, User
from routes.serializers import UserSerializer


lgr = logging.getLogger(__name__)

class LoginView(TokenObtainPairView):

    def post(self, request: Request, *args, **kwargs) -> Response:
        data = copy.copy(request.data)
        data['username'] = data['username'].lower()
        serializer = self.get_serializer(data=data)

        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])
        except AuthenticationFailed as e:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            lgr.debug(format_exc())
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    def post(self, request: Request):
        lgr.debug(request.headers)
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            lgr.debug(format_exc())
            return Response(status=status.HTTP_400_BAD_REQUEST)


class LoggedUserView(APIView):
    def get(self, request: Request):
        try:
            user = request.user
            return Response(
                data=UserSerializer(user).data,
                status=status.HTTP_200_OK
            )
        except Exception as e:
            lgr.debug(format_exc())
            return Response(status=status.HTTP_400_BAD_REQUEST)


class RequestPasswordResetView(APIView):
    authentication_classes = []

    def get(self, request: Request):
        email = request.query_params.get('email')
        if not User.objects.filter(email=email).exists():
            return Response({'error': 'Não existe usuário com esse email'}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.get(email=email)
        token = default_token_generator.make_token(user)
        PasswordResetToken.objects.create(token=token, user=user)
        
        send_mail(
            subject='Redefinição de senha',
            message=f'Copie este código para redefinir sua senha: {token}',
            from_email=GMAIL_APP_EMAIL,
            recipient_list=[email],
            fail_silently=False,
        )
        
        return Response({'message': 'Um link para redefinir sua senha foi enviado.'}, status=status.HTTP_200_OK)


class ResetPasswordView(APIView):
    authentication_classes = []

    def post(self, request: Request):
        token_str = request.data.get('token')
        print(token_str)
        token = PasswordResetToken.objects.get(token=token_str)
        user = token.user

        if user and default_token_generator.check_token(user, token_str):
            new_password = request.data.get('password')
            user.set_password(new_password)
            user.save()
            return Response({'message': 'Senha redefinida!'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Token inválido/expirou'}, status=status.HTTP_400_BAD_REQUEST)
