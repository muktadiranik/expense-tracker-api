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

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def get_serializer_context(self):
        return {'user': self.request.user}


class IncomeExpenseAPIView(APIView):
    def get(self, request):
        expense = 0
        for i in ExpenseTracker.objects.filter(amount_type="Expense", user=request.user):
            expense = expense + i.amount
        income = 0
        for i in ExpenseTracker.objects.filter(amount_type="Income", user=request.user):
            income = income + i.amount

        return Response(data={
            "expense": expense,
            "income": income
        }, status=status.HTTP_200_OK)
