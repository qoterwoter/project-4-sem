from django.contrib import admin
from .models import Students, StudentsPhoto, Projects, StudentsProjects, Lessons, StudentsLessons, Clients, EngineerProjects, Teachers, TeachersPhotos
from django.db.models.functions import Lower


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
    def get_ordering(self, request):
        return [Lower('')]


@admin.register(Lessons)
class LessonsAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description")
    pass

@admin.register(StudentsLessons)
class StudentsLessonsAdmin(admin.ModelAdmin):
    list_display = ("id","lesson" ,"student")
    pass


@admin.register(Clients)
class ClientsAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "surname")
    pass

@admin.register(EngineerProjects)
class EngineerProjectsAdmin(admin.ModelAdmin):
    list_display = ("id","name", "description", "client", "student")
    pass

@admin.register(Teachers)
class TeachersAdmin(admin.ModelAdmin):
    pass

@admin.register(TeachersPhotos)
class TeachersPhotos(admin.ModelAdmin):
    pass

