# Generated by Django 3.2.21 on 2023-10-15 01:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_postcomments'),
    ]

    operations = [
        migrations.RenameField(
            model_name='postcomments',
            old_name='comment',
            new_name='post',
        ),
    ]