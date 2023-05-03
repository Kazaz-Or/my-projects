from tortoise import fields, models
from tortoise.contrib.pydantic import pydantic_model_creator


class Todo(models.Model):
    id = fields.IntField(pk=True)
    title = fields.CharField(max_length=255)
    completed = fields.BooleanField()


todo_pydantic = pydantic_model_creator(Todo, name="ToDo Application")
todo_in_pydantic = pydantic_model_creator(Todo, name="ToDo In", exclude_readonly=True)
