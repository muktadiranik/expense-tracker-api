from rest_framework.serializers import ModelSerializer
from .models import ToDoList, ExpenseTracker


class ToDoListSerializer(ModelSerializer):
    class Meta:
        model = ToDoList
        fields = "__all__"


class ExpenseTrackerSerializer(ModelSerializer):
    class Meta:
        model = ExpenseTracker
        fields = "__all__"
