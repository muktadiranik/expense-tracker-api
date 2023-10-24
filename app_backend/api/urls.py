from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

router.register("list", views.ToDoListViewSet)
router.register("expense", views.ExpenseTrackerViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("income-expense/", views.IncomeExpenseAPIView.as_view()),
]
