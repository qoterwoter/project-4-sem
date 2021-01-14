from rest_framework import serializers
from .models import Students

class StudentsSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField(max_length=120)
    surname = serializers.CharField(max_length=120)
    status = serializers.CharField(max_length=120)
    course = serializers.CharField(max_length=120)
    
    def create(self, validated_data):
        return Students.objects.create(**validated_data)