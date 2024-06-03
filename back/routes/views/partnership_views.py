from typing import List
from rest_framework import generics, permissions
from rest_framework.request import Request
from rest_framework.response import Response
from django.db import models

from config import ACCEPTED, PENDING
from routes.models import Partnership, Route
from routes.serializers import PartnershipReadSerializer, PartnershipWriteSerializer


class PartnershipListCreateView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return PartnershipWriteSerializer
        return PartnershipReadSerializer

    def get_queryset(self) -> List[Partnership]:
        # Retorno todas as parcerias onde o usuário está presente, seja como requested ou requestant
        parts: list = list(self.request.user.partnerships_requestant.filter(status=ACCEPTED).all())
        parts.extend(
            list(self.request.user.partnerships_requested.filter(status=ACCEPTED).all())
        )
        return parts

    def perform_create(self, serializer: PartnershipWriteSerializer):
        route: Route = serializer.validated_data['route']
        # TODO: NÃO SEI SE FUNCIONA DE FATO, PRECISA SER TESTADO POSTERIORMENTE
        # Se já existe uma parceria para o mesmo trajeto com a mesma pessoa, não permitir criar outra
        if Partnership.objects.filter(
            models.Q(requestant=serializer.validated_data['requestant']) | models.Q(requested=serializer.validated_data['requestant']),
            route__route_hash=route.route_hash
        ).exists():
            return Response({'error': 'Já existe uma parceria em andamento com este usuário'}, status=400)
            
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
