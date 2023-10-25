from django.db import models

# Create your models here.

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    due_date = models.DateTimeField(null=True, blank=True)
    priority = models.TextField()
    completed = models.BooleanField(default=False)

    def __str__(self):
        return self.title