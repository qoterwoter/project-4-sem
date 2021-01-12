from django.contrib import admin
from .models import Students, StudentsPhoto, Projects, StudentsProjects, Lessons, StudentsLessons, Clients, EngineerProjects, Teachers, TeachersPhotos
from django.db.models.functions import Lower
from import_export.admin import ImportExportModelAdmin
from import_export.formats import base_formats
@admin.register(Students)
class StudentsAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ("id","name","surname","status",'course')
    search_fields = ['name','surname']
    actions=['restore','make_published','make_second_course','make_thirdly_course']
    pass
    def get_ordering(self, request):
        return [Lower('id')]
    def make_published(self, request, queryset):
        queryset.update(status='n')
    def make_second_course(self, request, queryset):
        queryset.update(course=2)
    def make_thirdly_course(self, request, queryset):
        queryset.update(course=3)
    def restore(self,request, queryset):
        queryset.update(status='y')
    def get_import_formats(self):
            formats = (
                  base_formats.XLS,
                  base_formats.XLSX,
            )
            return [f for f in formats if f().can_import()]
    def get_export_formats(self):
            formats = (
                  base_formats.XLS,
                  base_formats.XLSX,
            )
            return [f for f in formats if f().can_export()]
    make_published.short_description='Отчислить выбранных студентов'
    restore.short_description='Восстановить выбранных студентов'
    make_second_course.short_description='Перевести на второй курс'
    make_thirdly_course.short_description='Перевести на третий курс'
    

@admin.register(StudentsPhoto)
class StudentsPhotoAdmin(admin.ModelAdmin):
    list_display = ('student_id',"photo_id","url")
    search_fields = ['student_id']
    pass
    def get_ordering(self, request):
        return [Lower('photo_id')]


@admin.register(Projects)
class ProjectsAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ("name","description")
    search_fields = ['name','description']
    pass
    def get_ordering(self, request):
        return [Lower('name')]
    def get_import_formats(self):
            formats = (
                  base_formats.XLS,
                  base_formats.XLSX,
            )
            return [f for f in formats if f().can_import()]
    def get_export_formats(self):
            formats = (
                  base_formats.XLS,
                  base_formats.XLSX,
            )
            return [f for f in formats if f().can_export()]

@admin.register(StudentsProjects)
class StudentsProjectsAdmin(admin.ModelAdmin):
    list_display = ("id","project_id","student_id")
    list_filter = ['student_id', "project_id"]
    pass
    def get_ordering(self, request):
        return [Lower('id')]


@admin.register(Lessons)
class LessonsAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "description")
    pass
    def get_ordering(self, request):
        return [Lower('id')]

@admin.register(StudentsLessons)
class StudentsLessonsAdmin(admin.ModelAdmin):
    list_display = ("lesson" ,"student")
    search_fields = ['student__name','lesson__name']
    list_filter = ['lesson',"student"]
    ordering = ['lesson__name']
    pass



@admin.register(Clients)
class ClientsAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "surname")
    pass
    def get_ordering(self, request):
        return [Lower('id')]

@admin.register(EngineerProjects)
class EngineerProjectsAdmin(admin.ModelAdmin):
    list_display = ("name", "description", "client", "student")
    search_fields = ['student__name','student__surname']
    list_filter = ["student","client__name","client__surname","name"]
    pass
    def get_ordering(self, request):
        return [Lower('name')]

@admin.register(Teachers)
class TeachersAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display= ("id",'name','surname','experience')
    search_fields = ['name',"surname"]
    pass
    def get_ordering(self, request):
        return [Lower('id')]
    def get_import_formats(self):
            formats = (
                  base_formats.XLS,
                  base_formats.XLSX,
            )
            return [f for f in formats if f().can_import()]
    def get_export_formats(self):
            formats = (
                  base_formats.XLS,
                  base_formats.XLSX,
            )
            return [f for f in formats if f().can_export()]

@admin.register(TeachersPhotos)
class TeachersPhotos(admin.ModelAdmin):
    list_display = ("id","teacher",'url')
    search_fields = ['teacher__name','teacher__surname']
    pass
    def get_ordering(self, request):
        return [Lower('id')]