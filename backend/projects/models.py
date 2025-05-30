from django.db import models
from users.models import CustomUser

# Create your models here.

CATEGORY_CHOICES = [
    ("3P", "Thirdy Party"),
    ("FP", "New Construction"),
    ("SI", "Service and Inspections")
]

PROJECT_STATUS_CHOICES = [
    ('Active', 'Active'),
    ('Not Started', 'Not Started'),
    ('Hold', 'Hold'),
    ('Completed', 'Completed'),
    ('Cancelled', 'Cancelled'),
    ('Review', 'Review'),
]

class Project(models.Model):
    id = models.CharField(max_length=255, primary_key=True)
    name = models.CharField(max_length=255)
    category = models.CharField(max_length=2, choices=CATEGORY_CHOICES)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=25, choices=PROJECT_STATUS_CHOICES, default='Active')
    consulting_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    manager = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    # poc (needs another model)
    # client (needs another model)

    # Folder location is the location of the project in the file system
    folder_location = models.CharField(max_length=255, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    def generate_id(self):
        pass

    def __str__(self):
        return self.name