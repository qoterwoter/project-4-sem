# Generated by Django 3.1.5 on 2021-05-16 14:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0014_auto_20210516_1718'),
    ]

    operations = [
        migrations.RenameField(
            model_name='news',
            old_name='author',
            new_name='user',
        ),
    ]