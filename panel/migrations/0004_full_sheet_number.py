# Generated by Django 3.1 on 2021-03-03 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('panel', '0003_auto_20210303_1219'),
    ]

    operations = [
        migrations.AddField(
            model_name='full_sheet',
            name='number',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
