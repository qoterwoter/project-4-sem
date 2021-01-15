from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render
from .models import  Students, Projects, StudentsPhoto, StudentsProjects
from .serializers import StudentsSerializer, ProjectsSerializer

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

def students(request):
    return render(request,'/students')

def projects(request):
    return render(request,'/projects')

class StudentsView(APIView):
    def get(self, request):
        StudentsApi = Students.objects.all()
        serializer = StudentsSerializer(StudentsApi, many=True)
        return Response({"Students": serializer.data})

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
        return Response({"Projects": serializer.data})

    def post(self, request):
        ProjectsApi = request.data.get('Projects')
        serializer = ProjectsSerializer(data=ProjectsApi)
        if serializer.is_valid(raise_exception=True):
            employee_saved = serializer.save()
        return Response({"success": "Employee '{}' created successfully".format(employee_saved.name)})