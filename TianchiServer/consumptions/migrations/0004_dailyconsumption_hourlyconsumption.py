# Generated by Django 2.1.7 on 2019-04-09 14:05

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0003_auto_20190323_1108'),
        ('consumptions', '0003_auto_20190323_1116'),
    ]

    operations = [
        migrations.CreateModel(
            name='DailyConsumption',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=datetime.datetime.now)),
                ('total_cost', models.FloatField(default=0.0)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='students.Student')),
            ],
        ),
        migrations.CreateModel(
            name='HourlyConsumption',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=datetime.datetime.now)),
                ('hour', models.IntegerField(default=0)),
                ('total_cost', models.FloatField(default=0.0)),
                ('student', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='students.Student')),
            ],
        ),
    ]