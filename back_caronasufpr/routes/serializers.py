from rest_framework import serializers
from routes.models import Route, Endpoint


class RouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Route
        fields = ['id', 'name', 'created_at', 'updated_at']


class EndpointSerializer(serializers.ModelSerializer):
    class Meta:
        model = Endpoint
        fields = ['id', 'name', 'type', 'arrive_time', 'route', 'created_at', 'updated_at']
