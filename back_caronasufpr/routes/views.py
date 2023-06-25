"""
    Routes views
"""
from typing import List
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from routes.models import Place, Endpoint, Route, User
from routes.serializers import PlaceSerializer, EndpointSerializer, RouteSerializer, UserSerializer

class PlaceViewSet(viewsets.ModelViewSet):
    """
        Rotas de places
    """
    serializer_class = PlaceSerializer
    queryset = Place.objects.all()


class RouteViewSet(viewsets.ModelViewSet):
    """
        Rotas de Routes
    """
    serializer_class = RouteSerializer
    queryset = Route.objects.all()


    @action(detail=True, methods=["get"])
    def get_route_users(self, request, pk):
        try:
            route: Route = Route.objects.get(id=int(pk))
        except Route.DoesNotExist:
            return Response({"error": "Route not found"}, status=404)


        originEndpoint: Endpoint = list(Endpoint.objects.filter(type="origin", route=route))[0]
        destinyEndpoint: Endpoint = list(Endpoint.objects.filter(type="destiny", route=route))[0]
        similarRoutes: List[Route] = list(Route.objects.filter(
                endpoint__place=originEndpoint.place
            ).filter(
                endpoint__place=destinyEndpoint.place,
                endpoint__arrive_time__gte=destinyEndpoint.arrive_time
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

        return Response(users)

class EndpointViewSet(viewsets.ModelViewSet):
    """
        Rotas de endpoints
    """
    serializer_class = EndpointSerializer
    queryset = Endpoint.objects.all()


class UserViewSet(viewsets.ModelViewSet):
    """
        Rotas de users
    """
    serializer_class = UserSerializer
    queryset = User.objects.all()

    # Rota que recebe um firebase_id e retorna o usuário
    def get_user_by_firebase_id(self, request, firebase_id):
        try:
            user: User = User.objects.get(firebase_id=firebase_id)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=404)

        return Response(UserSerializer(user).data)
    
    def update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)