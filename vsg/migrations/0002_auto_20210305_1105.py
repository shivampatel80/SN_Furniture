# Generated by Django 3.1 on 2021-03-05 05:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('vsg', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vsg',
            name='area_slug',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]
