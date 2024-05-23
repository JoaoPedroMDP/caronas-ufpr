from rest_framework import generics, permissions

from routes.models import Endpoint
from routes.serializers import EndpointSerializer


class EndpointListCreateView(generics.ListCreateAPIView):
    queryset = Endpoint.objects.all()
    serializer_class = EndpointSerializer
    permission_classes = [permissions.IsAuthenticated]

class EndpointDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Endpoint.objects.all()
    serializer_class = EndpointSerializer
    permission_classes = [permissions.IsAuthenticated]