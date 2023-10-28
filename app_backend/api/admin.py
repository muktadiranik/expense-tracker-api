from django.contrib import admin

from .models import ToDoList, ExpenseTracker

admin.site.register(ToDoList)
admin.site.register(ExpenseTracker)
