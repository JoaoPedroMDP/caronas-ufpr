"""
    Este módulo contém os serializadores para os modelos Route e Endpoint.
"""
from rest_framework import serializers
from routes.models import User, Place, Route

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password', 'contact', 'bio', 'photo']
        extra_kwargs = {
            'name': {'required': True},
            'email': {'required': True},
            'contact': {'required': True}
        }

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este email já está em uso.")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['password'],
            name=validated_data['name'],
            contact=validated_data['contact'],
            bio=validated_data.get('bio', None),
            photo=validated_data.get('photo', None)
        )

        return user

class PlaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Place
        fields = ['id', 'name', 'type']


class RouteSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    from_place = PlaceSerializer()
    to_place = PlaceSerializer()

    def create(self, validated_data):
        from_place_data = validated_data.pop('from_place')
        to_place_data = validated_data.pop('to_place')
        from_place = Place.objects.get_or_create(**from_place_data)[0]
        to_place = Place.objects.get_or_create(**to_place_data)[0]
        route = Route.objects.create(from_place=from_place, to_place=to_place, **validated_data)
        return route

    class Meta:
        model = Route
        fields = ['id', 'name', 'intentions', 'user', 'arrive_time', 'from_place', 'to_place']
