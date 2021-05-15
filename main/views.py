from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
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
# class StudentsView(APIView):
#     def get(self, request):
#         StudentsApi = Students.objects.all()
#         serializer = StudentsSerializer(StudentsApi, many=True)
#         authentication_classes = [TokenAuthentication, ]
#         permission_classes = [IsAuthenticated, ]
#         return JsonResponse({"data": serializer.data})

#     def post(self, request):
#         StudentsApi = request.data.get('Students')
#         serializer = StudentsSerializer(data=StudentsApi)
#         if serializer.is_valid(raise_exception=True):
#             employee_saved = serializer.save()
#         return Response({"success": "Employee '{}' created successfully".format(employee_saved.name)})
@api_view(['GET','POST'])
def students_list(request):
    if request.method == 'GET':
        students = Students.objects.all()
        serializer = StudentsSerializer(students, many=True)
        authentication_classes = [TokenAuthentication, ]
        permission_classes = [IsAuthenticated, ]
        return JsonResponse({"data": serializer.data})

    elif request.method == 'POST':
        serializer = StudentsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET','PUT','DELETE'])
def students_detail(request,id):
    try:
        student = Students.objects.get(id=id)
    except Students.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = StudentsSerializer(student)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = StudentsSerializer(student, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        student.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


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
