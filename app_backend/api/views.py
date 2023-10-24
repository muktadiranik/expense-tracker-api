from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from .models import ToDoList, ExpenseTracker
from .serializer import ToDoListSerializer, ExpenseTrackerSerializer


class ToDoListViewSet(ModelViewSet):
    serializer_class = ToDoListSerializer
    queryset = ToDoList.objects.all()


class ExpenseTrackerViewSet(ModelViewSet):
    serializer_class = ExpenseTrackerSerializer
    queryset = ExpenseTracker.objects.all()


class IncomeExpenseAPIView(APIView):
    def get(self, request):
        expense = 0
        for i in ExpenseTracker.objects.filter(amount_type="Expense"):
            expense = expense + i.amount
        income = 0
        for i in ExpenseTracker.objects.filter(amount_type="Income"):
            income = income + i.amount

        return Response(data={
            "expense": expense,
            "income": income
        }, status=status.HTTP_200_OK)
