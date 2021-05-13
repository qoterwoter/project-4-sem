from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.shortcuts import render
from django.http import JsonResponse
from .models import  Students, Projects, StudentsPhoto, StudentsProjects
from .serializers import *
from rest_framework.authentication import TokenAuthentication,SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import viewsets;

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

def index(request):
    students = Students.objects.all()
    studentsPhoto = StudentsPhoto.objects.all()
    return render(request, 'main/index.html', {'students':students,'photos': studentsPhoto})

def about(request):
    return render(request, 'about/about.html')

def landing(request):
    return render(request, 'landing/landing.html')

def admin(request):
    return render(request, "/admin")

def projects(request):
    return render(request,'/projects')

class UserView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication,TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, forman=None):
        content = {
            'user' : str(request.user),
            'auth' : str(request.auth),
        }
        return Response(content)
class StudentsView(APIView):
    def get(self, request):
        StudentsApi = Students.objects.all()
        serializer = StudentsSerializer(StudentsApi, many=True)
        authentication_classes = [TokenAuthentication, ]
        permission_classes = [IsAuthenticated, ]
        return JsonResponse({"data": serializer.data})

    def post(self, request):
        StudentsApi = request.data.get('Students')
        serializer = StudentsSerializer(data=StudentsApi)
        if serializer.is_valid(raise_exception=True):
            employee_saved = serializer.save()
        return Response({"success": "Employee '{}' created successfully".format(employee_saved.name)})

class ProjectsView(APIView):
    def get(self, request):
        ProjectsApi = Projects.objects.all()
        serializer = ProjectsSerializer(ProjectsApi, many=True)
        return JsonResponse({"Projects": serializer.data})

    def post(self, request):
        ProjectsApi = request.data.get('Projects')
        serializer = ProjectsSerializer(data=ProjectsApi)
        if serializer.is_valid(raise_exception=True):
            employee_saved = serializer.save()
        return Response({"success": "Employee '{}' created successfully".format(employee_saved.name)})
