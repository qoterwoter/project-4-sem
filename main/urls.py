from django.urls import path
from . import views
from .views import StudentsView, ProjectsView


urlpatterns = [
    path('', views.index, name='main'),
    path('about', views.about, name='about'),
    path('landing', views.landing, name='landing'),
    path('admin', views.admin, name='admin'),
    path('students/', views.StudentsView.as_view(), name='students'),
    path('projects/', views.ProjectsView.as_view(), name='projects'),
]
