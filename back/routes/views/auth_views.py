import logging
from traceback import format_exc

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken

from routes.serializers import UserSerializer


lgr = logging.getLogger(__name__)


class LogoutView(APIView):
    def post(self, request):
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
    def get(self, request):
        lgr.debug(request.headers)
        try:
            user = request.user
            return Response(
                data=UserSerializer(user).data,
                status=status.HTTP_200_OK
            )
        except Exception as e:
            lgr.debug(format_exc())
            return Response(status=status.HTTP_400_BAD_REQUEST)
        