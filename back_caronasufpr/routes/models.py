"""
    Este módulo contém os modelos do aplicativo routes.
"""
from django.db import models


class TimestampedModel(models.Model):
    """
        Um modelo abstrato que fornece campos de data de criação e atualização automáticos.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Endpoint(TimestampedModel):
    """
        Um modelo que representa um endpoint de uma rota.
    """
    name = models.CharField(max_length=150)
    type = models.CharField(max_length=150)
    arrive_time = models.DateTimeField(null=True, blank=True)
    route = models.ForeignKey("Route", on_delete=models.CASCADE)
    class Meta:
        ordering = ['name']

class Route(TimestampedModel):
    """
        Um modelo que representa uma rota.
    """
    name = models.CharField(max_length=150)

    class Meta:
        ordering = ['name']
