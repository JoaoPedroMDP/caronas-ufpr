from typing import List
from rest_framework import generics, permissions
from rest_framework.request import Request
from rest_framework.response import Response

from config import ACCEPTED, PENDING
from routes.models import Partnership
from routes.serializers import PartnershipReadSerializer, PartnershipWriteSerializer


class PartnershipListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PartnershipWriteSerializer
        return PartnershipReadSerializer

    def get_queryset(self) -> List[Partnership]:
        return Partnership.objects.filter(
            requestant=self.request.user,
            status=ACCEPTED
            )

    def perform_create(self, serializer):
        serializer.save(status=PENDING)
        return super().perform_create(serializer)


class PartnershipDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Partnership.objects.all()
    permission_classes = [permissions.IsAuthenticated]
    
    def get_serializer_class(self):
        if self.request.method in ['PUT', 'PATCH']:
            return PartnershipWriteSerializer
        return PartnershipReadSerializer

    def patch(self, request: Request, *args, **kwargs) -> Response:
        instance: Partnership = self.get_object()

        if instance.requestant == request.user and instance.status == PENDING:
            return Response({'error': 'Você não pode alterar um pedido em andamento'}, status=400)

        return super().partial_update(request, *args, **kwargs)


class ListPartnershipRequestsView(generics.ListAPIView):
    queryset = Partnership.objects.all()
    serializer_class = PartnershipReadSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self) -> List[Partnership]:
        return Partnership.objects.filter(
            requested=self.request.user,
            status=PENDING
            )
