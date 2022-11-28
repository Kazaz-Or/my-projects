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

![flower1](https://user-images.githubusercontent.com/83350680/204249591-2d8ce559-2b3a-4fd8-b9a0-d940f78eb882.png)


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

![flower2](https://user-images.githubusercontent.com/83350680/204249627-598e6ce2-5422-4c31-b4ad-af99cf6c6192.png)


<h3>Flow</h3>

an HTTP POST request hits ``/create``. 
Within the route handler, a message is added to the broker, and the Celery worker process grabs it from the queue and processes the task. Meanwhile, the web application continues to execute and function properly, sending a response back to the client with a task ID. The client can then hit the ``/status/<TASK_ID>`` endpoint with an HTTP GET request to check the status of the task.

![falcon-celery-flow](https://user-images.githubusercontent.com/83350680/204249890-38e5cbf7-98e9-42b3-b66f-f1f8a26884fa.png)


<h4>Stack</h4>

- Python
- Celery (asynchronous task queue)
- Falcon (minimal web framework)
- Flower (real-time, web-based monitoring tool for Celery)
- Redis (very minimal use for messages broking)
- Docker
