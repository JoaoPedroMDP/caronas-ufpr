from typing import List
from rest_framework import generics, permissions
from rest_framework.request import Request
from rest_framework.response import Response

from routes.models import Route, User
from routes.serializers import UserSerializer


class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        # Chama o método save do serializador para criar o usuário
        serializer.save()


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GetUsersByRouteView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request: Request, route_id: int):
        route: Route = Route.objects.get(id=route_id)
        origin = route.from_place
        destiny = route.to_place

        print(origin, destiny, route.arrive_time)

        similarRoutes: List[Route] = list(
            Route.objects.filter(
                from_place=origin,
                to_place=destiny,
                arrive_time__lte=route.arrive_time
            ).exclude(
                id=route.id
            ).distinct()
        )
        
        users: List[User] = [
            {
                "user": UserSerializer(route.user).data,
                "intentions": route.intentions,
            }
            for route in similarRoutes
        ]

        return Response(users, status=200)
