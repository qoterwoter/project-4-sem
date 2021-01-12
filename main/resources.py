from import_export import resources
from .models import Students, Projects, Teachers

class StudentsResource(resources.ModelResource):
    class Meta:
        model = Students
    
class ProjectsResource(resources.ModelResource):
    class Meta:
        model = Projects
    
class TeachersResource(resources.ModelResource):
    class Meta:
        model = Teachers

