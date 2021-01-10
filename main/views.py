from django.shortcuts import render
from .models import  Students, Projects, StudentsPhoto, StudentsProjects

def index(request):
    students = Students.objects.all()
    studentsPhoto = StudentsPhoto.objects.all()
    projects = Projects.objects.all()
    studentsPhoto = StudentsPhoto.objects.all()
    return render(request, 'main/index.html', {'students':students,'photos': studentsPhoto})

def about(request):
    return render(request, 'about/about.html')