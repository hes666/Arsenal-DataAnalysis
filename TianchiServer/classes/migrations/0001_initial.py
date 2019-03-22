# Generated by Django 2.1.7 on 2019-03-22 14:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Class',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('class_name', models.CharField(max_length=255)),
                ('grade_name', models.IntegerField(choices=[(1, '高一'), (2, '高二'), (3, '高三')])),
            ],
        ),
    ]
