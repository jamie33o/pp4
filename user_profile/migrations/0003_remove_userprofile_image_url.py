# Generated by Django 3.2.21 on 2023-11-13 20:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0002_auto_20231113_1734'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userprofile',
            name='image_url',
        ),
    ]