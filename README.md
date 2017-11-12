# Snack Store api

Little api to manage a snacks inventory

## How to run

[docker](https://docs.docker.com/engine/installation/) and [docker-compose](https://docs.docker.com/compose/install/) are needed to get the enviroment up and running

To start the application just run the following command in a terminal within the project directory

```bash
$ docker-compose up
``` 
And the api will be available at [http://localhost:3000](http://localhost:3000)

## Access database commandline

Enter to the database container

```bash
$ docker-compose exec postgres sh
``` 

Once inside just use psql

```bash
$ psql -U applaudo -d snacks -W
``` 