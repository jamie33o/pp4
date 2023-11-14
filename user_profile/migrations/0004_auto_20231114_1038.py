# Generated by Django 3.2.21 on 2023-11-14 10:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_profile', '0003_remove_userprofile_image_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='github',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='linkedin',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='website',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
