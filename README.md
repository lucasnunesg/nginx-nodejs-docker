# README

Project developed as a task for Full Cycle 3.0 course to practice Docker using docker-compose.

Setup consists of a MySQL database with name records that are shown in a NodeJS app served through Nginx server as a reverse proxy.

# How to run

Simply run:

```bash
docker-compose up -d
```

Server will be running on `localhost:8080`

# How it works

Nginx is being used as a reverse proxy, that redirects to the Nodejs application. The application is responsible to add a random name to the database (MySQL running on another container) and return all records as a list to the homepage, below the heading title.

All containers have access to the same network and therefore can communicate with each other seamlessly
