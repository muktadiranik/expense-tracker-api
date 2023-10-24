from django.db import models


class ToDoList(models.Model):
    body = models.TextField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.body[0:50]

    class Meta:
        ordering = ["-id"]


AMOUNT_TYPE = (
    ("Income", "Income"),
    ("Expense", "Expense"),
)


class ExpenseTracker(models.Model):
    amount = models.DecimalField(
        decimal_places=2, max_digits=10, blank=True, null=True)
    amount_type = models.CharField(
        max_length=100, blank=True, null=True, choices=AMOUNT_TYPE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        return self.amount_type

    class Meta:
        ordering = ["-id"]
