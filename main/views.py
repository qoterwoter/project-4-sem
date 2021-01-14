from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import render
from .models import  Students, Projects, StudentsPhoto, StudentsProjects
from .serializers import StudentsSerializer

def index(request):
    students = Students.objects.all()
    studentsPhoto = StudentsPhoto.objects.all()
    return render(request, 'main/index.html', {'students':students,'photos': studentsPhoto})

def about(request):
    return render(request, 'about/about.html')

def landing(request):
    return render(request, 'landing/landing.html')

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