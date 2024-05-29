from rest_framework import generics, permissions

from routes.models import Route
from routes.serializers import RouteSerializer


class RouteListCreateView(generics.ListCreateAPIView):
    serializer_class = RouteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        return Route.objects.filter(user=self.request.user)

class RouteDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Route.objects.all()
    serializer_class = RouteSerializer
    permission_classes = [permissions.IsAuthenticated]