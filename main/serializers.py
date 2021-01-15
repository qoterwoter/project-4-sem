from rest_framework import serializers
from .models import Students, Projects

class StudentsSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField(max_length=120)
    surname = serializers.CharField(max_length=120)
    status = serializers.CharField(max_length=120)
    course = serializers.CharField(max_length=120)
    
    def create(self, validated_data):
        return Students.objects.create(**validated_data)
class ProjectsSerializer(serializers.Serializer):
    id = serializers.CharField()
    name = serializers.CharField(max_length=120)
    description = serializers.CharField(max_length=120)
    isDone = serializers.BooleanField()
    
    def create(self, validated_data):
        return Projects.objects.create(**validated_data)