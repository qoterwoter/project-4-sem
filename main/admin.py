from django.contrib import admin
from .models import Students, StudentsPhoto, Projects, StudentsProjects
from django.db.models.functions import Lower
from django.urls import reverse
from django.utils.http import urlencode


@admin.register(Students)
class StudentsAdmin(admin.ModelAdmin):
    list_display = ("id","name","surname")
    pass
    def get_ordering(self, request):
        return [Lower('id')]


@admin.register(StudentsPhoto)
class StudentsPhotoAdmin(admin.ModelAdmin):
    list_display = ('student_id',"photo_id","url")
    pass
    def get_ordering(self, request):
        return [Lower('photo_id')]


@admin.register(Projects)
class ProjectsAdmin(admin.ModelAdmin):
    list_display = ("project_id","name","description")
    search_fields = ['name','description']
    pass
    def get_ordering(self, request):
        return [Lower('project_id')]


@admin.register(StudentsProjects)
class StudentsProjectsAdmin(admin.ModelAdmin):
    list_display = ("project_id","student_id")
    pass
