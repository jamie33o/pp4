# Generated by Django 3.2.21 on 2023-11-02 23:03

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('group_chat', '0002_savedpost'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commentsmodel',
            name='images',
            field=models.TextField(blank=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]