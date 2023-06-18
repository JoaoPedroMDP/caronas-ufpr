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



class User(TimestampedModel):
    name = models.CharField(max_length=250)
    firebase_id = models.CharField(max_length=250)

    class Meta:
        ordering = ['name']


class Route(TimestampedModel):
    """
        Um modelo que representa uma rota.
    """
    name = models.CharField(max_length=150)
    intentions = models.JSONField(max_length=150)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ['name']


class Place(TimestampedModel):
    """
        Um modelo que representa um lugar disponivel para ser um endpoint.
    """
    name = models.CharField(max_length=150)
    type = models.CharField(max_length=150)
    
    class Meta:
        ordering = ['name']


class Endpoint(TimestampedModel):
    """
        Um modelo que representa um endpoint de uma rota.
    """
    arrive_time = models.DateTimeField(null=True, blank=True)
    type = models.CharField(max_length=20)
    route = models.ForeignKey(Route, on_delete=models.CASCADE)
    place = models.ForeignKey(Place, on_delete=models.CASCADE)

