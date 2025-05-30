from django.db import models
from projects.models import Project

# Create your models here.

STATUS_CHOICES = [
    ("Active", "Active"),
    ("Inactive", "Inactive")
]

class Task(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=25, choices=STATUS_CHOICES, default='Active')

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)

    def generate_id(self):
        pass