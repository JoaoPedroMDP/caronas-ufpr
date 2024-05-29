from typing import List
from rest_framework import generics, permissions
from rest_framework.request import Request
from rest_framework.response import Response

from routes.models import Route, Partnership
from routes.serializers import PartnershipSerializer


class PartnershipListCreateView(generics.ListCreateAPIView):
    queryset = Partnership.objects.all()
    serializer_class = PartnershipSerializer
    permission_classes = [permissions.AllowAny]


class PartnershipDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Partnership.objects.all()
    serializer_class = PartnershipSerializer
    permission_classes = [permissions.IsAuthenticated]