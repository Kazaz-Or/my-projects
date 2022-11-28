# Asynchronous Tasks with Falcon, Celery & Flower

<h4>
This small project was done with the goal of learning on how to handle Async tasks with Celery.
It's nothing functional but more of a demo for learning purposes.
</h4>

<h3>Task</h3>
<p>in tasks.py I defined a new Celery task called fib that calculates the fibonacci sequence from a given number.</p>


<h3>How to use</h3>

Spin up the containers:

```sh
$ docker-compose up -d
```

Open your browser to http://localhost:8000/ping to view the app or to http://localhost:5555 to view the Flower dashboard.

Trigger a new task:

```sh
$ curl -X POST http://localhost:8000/create \
    -d '{"number":"3"}' \
    -H "Content-Type: application/json"
```

Check the status:

```sh
$ curl http://localhost:8000/status/<ADD_TASK_ID>
```

To trigger the tests:
```sh
docker-compose run web python test.py
```


Trigger a few more tasks:




<h4>Stack</h4>

- Python
- Celery (asynchronous task queue)
- Falcon (minimal web framework)
- Flower (real-time, web-based monitoring tool for Celery)
- Redis (very minimal use for messages broking)
- Docker
