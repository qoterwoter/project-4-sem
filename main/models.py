from django.db import models
from django.contrib.auth.models import User
STATUS_CHOICE = (
    ('y','Учится'),
    ('n',"Отчсилен"),
    ('q','Зачислен'),
    ('a','Решается')
)
class News(models.Model):
    
    id = models.AutoField(primary_key=True)
    title = models.TextField("Название новости")
    description = models.TextField('Описание')
    photo = models.TextField('Ссылка на фотографию')
    date = models.DateField(("Дата публикации"), auto_now=False, auto_now_add=False)
    # author = models.CharField('Автор публикации',max_length=55)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    class Meta:
        verbose_name = ("Новость")
        verbose_name_plural = ("Новости")

    def __str__(self):
        return str(self.title) 
class Students(models.Model):
    
    id = models.AutoField(primary_key=True)
    name = models.TextField("Имя студента")
    surname = models.TextField('Фамилия студента')
    status = models.CharField(max_length=1, choices=STATUS_CHOICE)
    course = models.IntegerField('Курс')
    class Meta:
        verbose_name = ("Студент")
        verbose_name_plural = ("Студенты")

    def __str__(self):
        return str(self.name + " " + self.surname) 


class StudentsPhoto(models.Model):
    
    student_id = models.ForeignKey(Students,related_name='photos', on_delete=models.CASCADE)
    photo_id = models.AutoField(primary_key=True)
    url = models.TextField('Ссылка на фото')

    class Meta:
        verbose_name = ("Фото студента")
        verbose_name_plural = ("Фото студентов")

    def __str__(self):
        return str("Фото "+ str(self.student_id.name)+"a "+ str(self.student_id.surname)+"a")

class Projects(models.Model):
    
    id = models.AutoField(primary_key=True)
    name = models.TextField('Название проекта')
    description = models.TextField('Описание проекта')
    isDone = models.BooleanField
    class Meta:
        verbose_name = ("Проект")
        verbose_name_plural = ("Проекты")

    def __str__(self):
        return self.name

class StudentsProjects(models.Model):

    id = models.AutoField(primary_key = True)
    student_id = models.ForeignKey(Students, on_delete=models.CASCADE)
    project_id = models.ForeignKey(Projects, on_delete=models.CASCADE)

    class Meta:
        verbose_name = ("Проект студента")
        verbose_name_plural = ("Проекты студентов")

    def __str__(self):
        return str(self.project_id.name + " " + self.student_id.name + 'а '+ self.student_id.surname + 'а')

class Lessons(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.TextField("Название предмета")
    description = models.TextField("Описание предмета")

    class Meta:
        verbose_name = ("Предмет")
        verbose_name_plural = ("Предметы")

    def __str__(self):
        return self.name

class StudentsLessons(models.Model):

    id = models.AutoField(primary_key=True)
    student = models.ForeignKey(Students, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lessons, on_delete=models.CASCADE)

    class Meta:
        verbose_name=("Предмет студента")
        verbose_name_plural=("Предметы студентов")

    def __str__(self):
        return (self.student.name + " " + self.student.surname + " - " + self.lesson.name)

class Clients(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.TextField("Имя заказчика")
    surname = models.TextField("Фамилия заказчика")

    class Meta:
        verbose_name = ("Заказчик")
        verbose_name_plural = ("Заказчики")

    def __str__(self):
        return (self.name + " " + self.surname)
        
class EngineerProjects(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.TextField('Название инженерного проекта')
    description = models.TextField('Описание')
    client = models.ForeignKey(Clients, on_delete=models.CASCADE)
    student = models.ForeignKey(Students, on_delete=models.CASCADE)

    class Meta:
        verbose_name = ("Инженерный проетк")
        verbose_name_plural = ("Инженерные проеткы")
    
    def __str__(self):
        return self.name

class Teachers(models.Model):

    id = models.AutoField(primary_key=True)
    name = models.TextField("Имя заказчика")
    surname = models.TextField("Фамилия заказчика")
    lesson = models.ForeignKey(Lessons, on_delete=models.CASCADE)
    experience = models.IntegerField("Опыт (лет)")
    class Meta:
        verbose_name = ('Преподаватель')
        verbose_name_plural = ('Преподаватели')

    def __str__(self):
        return (self.name + " " + self.surname)

class TeachersPhotos(models.Model):

    id = models.AutoField(primary_key=True)
    teacher = models.ForeignKey(Teachers, on_delete=models.CASCADE)
    url = models.TextField('Ссылка на фотографию')

    class Meta:
        verbose_name = ("Фото преподавателя")
        verbose_name_plural = ("Фото преподавателей")

    def __str__(self):
        return ("фото "+  self.teacher.name + " " + self.teacher.surname)
        