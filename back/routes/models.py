"""
    Este módulo contém os modelos do aplicativo routes.
"""
from django.db import models
from django.contrib.auth.models import AbstractUser


class TimestampedModel(models.Model):
    """
        Um modelo abstrato que fornece campos de data de criação e atualização automáticos.
    """
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class User(AbstractUser, TimestampedModel):
    name = models.CharField(max_length=250)
    contact = models.CharField(max_length=250)
    bio = models.CharField(max_length=600, null=True, blank=True)
    photo = models.ImageField(upload_to='users', null=True, blank=True)

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


class Route(TimestampedModel):
    """
        Um modelo que representa uma rota.
    """
    name = models.CharField(max_length=150)
    intentions = models.JSONField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='routes')

    class Meta:
        ordering = ['name']


class Endpoint(TimestampedModel):
    """
        Um modelo que representa um endpoint de uma rota.
    """
    arrive_time = models.DateTimeField(null=True, blank=True)
    type = models.CharField(max_length=50)
    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name='endpoints')
    place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='endpoints')

    class Meta:
        ordering = ['arrive_time']
