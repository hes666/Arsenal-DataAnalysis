# Generated by Django 2.1.7 on 2019-04-01 15:59

from django.db import migrations, models
from progress.bar import Bar


# from student's t_score get their's deng_di
def get_deng_di(apps, schema_editor):
    SubExam = apps.get_model('exams', 'SubExam')
    bar = Bar('Processing', max=SubExam.objects.all().count())
    for sub_exam in SubExam.objects.all():
        i = 1
        bar.next()
        student_exam_records = sub_exam.studentexamrecord_set.all().order_by('-t_score')
        sub_bar = Bar('Processing student exam record', max=student_exam_records.count())
        for student_exam_record in student_exam_records:
            sub_bar.next()
            student_exam_record.deng_di = i / sub_exam.attend_num
            student_exam_record.save()
            i += 1
        sub_bar.finish()
    bar.finish()


class Migration(migrations.Migration):
    dependencies = [
        ('exams', '0005_20190403_ZT_score'),
    ]

    operations = [
        migrations.AddField(
            model_name='StudentExamRecord',
            name='deng_di',
            field=models.FloatField(default=0.0),
        ),

        migrations.RunPython(get_deng_di, reverse_code=migrations.RunPython.noop),
    ]
