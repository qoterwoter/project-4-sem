from django.urls import path
from . import views
from .views import StudentsView


urlpatterns = [
    path('', views.index, name='main'),
    path('about', views.about, name='about'),
    path('landing', views.landing, name='landing'),
    path('students/', views.StudentsView.as_view()),
]
