"""
    Este módulo contém os modelos do aplicativo routes.
"""
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator

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
    photo = models.ImageField(upload_to='users', validators=[FileExtensionValidator(['jpg', 'jpeg', 'png'])], null=True, blank=True)

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
    arrive_time = models.TimeField()
    from_place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='from_routes')
    to_place = models.ForeignKey(Place, on_delete=models.CASCADE, related_name='to_routes')
    route_hash = models.CharField(max_length=200)

    class Meta:
        ordering = ['name']


class Partnership(TimestampedModel):
    """
        Um modelo que representa uma parceria entre dois usuários sobre uma rota
    """
    route = models.ForeignKey(Route, on_delete=models.CASCADE, related_name='partnerships')
    requestant = models.ForeignKey(User, on_delete=models.CASCADE, related_name='partnerships_requestant')
    requested = models.ForeignKey(User, on_delete=models.CASCADE, related_name='partnerships_requested')
    status = models.CharField(max_length=150)

    class Meta:
        ordering = ['route']


class PasswordResetToken(TimestampedModel):
    """
        Um modelo que representa um token de redefinição de senha.
    """
    token = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='password_reset_tokens')
    
    class Meta:
        ordering = ['token']
