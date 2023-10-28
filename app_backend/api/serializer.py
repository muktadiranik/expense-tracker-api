from rest_framework.serializers import ModelSerializer
from .models import ToDoList, ExpenseTracker


class ToDoListSerializer(ModelSerializer):
    class Meta:
        model = ToDoList
        fields = "__all__"


class ExpenseTrackerSerializer(ModelSerializer):
    class Meta:
        model = ExpenseTracker
        fields = ["id", "amount", "amount_type", "created", "updated"]

    def create(self, validated_data):
        validated_data["user"] = self.context["user"]
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data["user"] = self.context["user"]
        return super().update(instance, validated_data)
