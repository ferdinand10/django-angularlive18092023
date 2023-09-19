from rest_framework import serializers
from .models import Task

class TaskTitleDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['titre','description']

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'
