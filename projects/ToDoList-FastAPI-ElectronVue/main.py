import os

from typing import Optional, List
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from tortoise.contrib.fastapi import HTTPNotFoundError, register_tortoise

from models.models import Todo, todo_pydantic, todo_in_pydantic


app = FastAPI()


class Status(BaseModel):
    message: str


@app.get("/")
async def read_root():
    return {"hello": "world"}


@app.get("/todos", response_model=List[todo_pydantic])
async def get_todos():
    return await todo_pydantic.from_queryset(Todo.all())


@app.get("/todos/{todo_id}", response_model=todo_pydantic, responses={404: {"model": HTTPNotFoundError}})
async def get_todo_by_id(todo_id: int):
    return await todo_pydantic.from_queryset_single(Todo.get(id=todo_id))


@app.post("/todos", response_model=todo_pydantic)
async def create_todo(todo: todo_in_pydantic):
    todo_object = await Todo.create(**todo.dict(exclude_unset=True))
    return await todo_pydantic.from_tortoise_orm(todo_object)


@app.put("/todos/{todo_id}", response_model=todo_pydantic, responses={404: {"model": HTTPNotFoundError}})
async def update_todo(todo_id: int, todo: todo_pydantic):
    await Todo.filter(id=todo_id).update(**todo.dict(exclude={"id"}, exclude_unset=True))
    return await todo_pydantic.from_queryset_single(Todo.get(id=todo_id))


@app.delete("/todos/{todo_id}", response_model=Status, responses={404: {"model": HTTPNotFoundError}})
async def delete_todo(todo_id: int, todo: todo_pydantic):
    delete_count = await Todo.filter(id=todo_id).delete()
    if not delete_count:
        raise HTTPException(status_code=404, details=f"Todo {todo_id} not found")
    return Status(message=f"Deleted todo {todo_id}")


register_tortoise(
    app,
    db_url=f"postgres://{os.environ.get('USERNAME')}:{os.environ.get('PASS')}@localhost:54321/todoapp",
    modules={"models": ["models.models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)
