from django.db import models

class Students(models.Model):
    
    id = models.AutoField(primary_key=True)
    name = models.TextField("Имя студента")
    surname = models.TextField('Фамилия студента')

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
    
    project_id = models.AutoField(primary_key=True)
    name = models.TextField('Название проекта')
    description = models.TextField('Описание проекта')

    class Meta:
        verbose_name = ("Проект")
        verbose_name_plural = ("Проекты")

    def __str__(self):
        return (str(self.project_id) +": "+ self.name)




class StudentsProjects(models.Model):

    id = models.AutoField(primary_key = True)
    student_id = models.ForeignKey(Students,related_name='students', on_delete=models.CASCADE)
    project_id = models.ForeignKey(Projects,related_name='projcets', on_delete=models.CASCADE)

    class Meta:
        verbose_name = ("Проект студента")
        verbose_name_plural = ("Проекты студентов")

    def __str__(self):
        return str(self.project_id.name + " " + self.student_id.name + 'а '+ self.student_id.surname + 'а')