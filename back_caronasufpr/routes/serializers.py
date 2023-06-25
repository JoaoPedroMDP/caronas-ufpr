"""
    Este módulo contém os serializadores para os modelos Route e Endpoint.
"""
from rest_framework import serializers
from routes.models import Route, Endpoint, Place, User
from drf_extra_fields.fields import Base64ImageField

class PlaceSerializer(serializers.ModelSerializer):
    """
        Um serializador para o modelo Place.
    """
    class Meta:
        model = Place
        fields = ['id', 'name', 'type', 'created_at', 'updated_at']


class EndpointSerializer(serializers.ModelSerializer):
    """
        Um serializador para o modelo Endpoint.
    """
    
    class Meta:
        model = Endpoint
        fields = ['id', 'arrive_time', 'route', 'place', 'type', 'created_at', 'updated_at']


class RouteSerializer(serializers.ModelSerializer):
    """
        Um serializador para o modelo Route.
    """
    endpoints = EndpointSerializer(many=True, read_only=True)

    class Meta:
        model = Route
        fields = ['id', 'name', 'intentions', 'created_at', 'updated_at', 'user', 'endpoints']


class UserSerializer(serializers.ModelSerializer):
    """
        Um serializador para o modelo User.
    """
    photo = Base64ImageField(required=False)

    class Meta:
        model = User
        fields = ['id', 'name', 'contact', 'bio', 'firebase_id', 'photo']
