# Generated by Django 3.1 on 2021-04-08 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('panel', '0007_auto_20210316_1829'),
    ]

    operations = [
        migrations.CreateModel(
            name='Page_Handler',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('name_slug', models.CharField(blank=True, max_length=100, null=True)),
                ('meta_title', models.CharField(blank=True, max_length=200, null=True)),
                ('meta_description', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
