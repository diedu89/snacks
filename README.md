# Snack Store api

Little api to manage a snacks inventory

## How to run

[docker](https://docs.docker.com/engine/installation/) and [docker-compose](https://docs.docker.com/compose/install/) are needed to get the enviroment up and running

To start the application just run the following command in a terminal within the project directory

```bash
$ docker-compose up
``` 
Sequelize will create the corresponding tables to match models and the api will be available at [http://localhost:3000](http://localhost:3000)

#Seed data

In a second terminal enter app container and run command to seed

```bash
docker-compose exec --user node web sh
``` 

```bash
$ ./node_modules/.bin/sequelize db:seed:all
``` 

## Access database commandline

In a different terminal enter to database container

```bash
$ docker-compose exec postgres sh
``` 

Once inside just use psql

```bash
$ PGPASSWORD=secretsnacks psql -U applaudo -d snacks
``` 

## Databse schema

![Alt text](er.jpg?raw=true "Optional Title")