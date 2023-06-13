from rest_framework import viewsets
from routes.models import Endpoint, Route

from routes.serializers import EndpointSerializer, RouteSerializer

class RouteViewSet(viewsets.ModelViewSet):
    serializer_class = RouteSerializer
    queryset = Route.objects.all()

class EndpointViewSet(viewsets.ModelViewSet):
    serializer_class = EndpointSerializer
    queryset = Endpoint.objects.all()
    
