from typing import List
from rest_framework import generics, permissions
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from django.db import models

from config import ACCEPTED
from routes.models import Partnership, Route, User
from routes.serializers import UserSerializer


class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = (MultiPartParser, FormParser)

    def perform_create(self, serializer):
        # Chama o método save do serializador para criar o usuário
        # Mas antes poe o email e o username em minusculo
        serializer.validated_data['email'] = serializer.validated_data['email'].lower()
        serializer.save()


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GetUsersByRouteView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request: Request, route_id: int):
        user: User = request.user
        route: Route = Route.objects.get(id=route_id)
        origin = route.from_place
        destiny = route.to_place


        similarRoutes = Route.objects.filter(
            from_place=origin,
            to_place=destiny,
            arrive_time__lte=route.arrive_time
        ).exclude(
            id=route.id
        ).distinct()

        user_partnerships = Partnership.objects.filter(
            models.Q(requestant=user) | models.Q(requested=user),
            route__route_hash=route.route_hash
        ).values_list('route_hash', flat=True)
        filtered_routes = similarRoutes.exclude(route__route_hash__in=user_partnerships).all()
        
        users: List[User] = [
            {
                "user": UserSerializer(route.user).data,
                "intentions": route.intentions,
            }
            for route in filtered_routes
        ]

        return Response(users, status=200)
