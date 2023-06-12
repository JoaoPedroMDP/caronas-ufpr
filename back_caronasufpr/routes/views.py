from rest_framework import viewsets
from back_caronasufpr.routes.models import Endpoint, Route

from back_caronasufpr.routes.serializers import EndpointSerializer, RouteSerializer

class RouteViewSet(viewsets.ModelViewSet):
    serializer_class = RouteSerializer
    queryset = Route.objects.all()

class EndpointViewSet(viewsets.ModelViewSet):
    serializer_class = EndpointSerializer
    queryset = Endpoint.objects.all()
    
