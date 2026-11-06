from django.urls import path
from .views import personal_dashboard_view, personal_transactions_view, personal_goals_view, personal_budget_view, personal_reports_view, delete_transaction_view

urlpatterns = [
    path("dashboard/", personal_dashboard_view, name="personal_dashboard"),
    path("transactions/", personal_transactions_view, name="personal_transactions"),
    path("goals/", personal_goals_view, name="personal_goals"),
    path("budget/", personal_budget_view, name="personal_budget"),
    path("reports/", personal_reports_view, name="personal_reports"),
    path('personal/delete/transaction/<int:pk>/', delete_transaction_view, name='delete_transaction'),
]
