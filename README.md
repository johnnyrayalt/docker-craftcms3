# docker-craftcms3
Boiler plate code for Craft CMS using LEMP services in a docker container


## requirements
+ at least Docker version 18.09.2
+ at least docker-compose version 1.23.2
+ dump.sql file in the `./data` directory

under development
#### KNOWN BUGS
+ Cannot download a DB backup from craft instance, must be done via command line
    + in project root on host => docker exec mysql /usr/bin/mysqldump -u root -pcraft mysql-data > data/backup.sql
    + potential fix: migrate to mariadb

first time

```
$ git clone https://github.com/johnnyrayalt/docker-craftcms3.git \
  && cd docker-craftcms3
```

```
$ echo "#PHP CRAFT ENVIRONMENT
ENVIRONMENT=dev
DB_DRIVER=mysql
DB_SERVER=mysql
DB_USER=root
DB_PASSWORD=craft 
DB_DATABASE=mysql-data
DB_SCHEMA=public
DB_TABLE_PREFIX=craft_
SITE_URL=http://localhost
SECURITY_KEY=AAAAAAAAAAAAAAAAAAAAAAAAAAA

#MYSQL ENVIRONMENT
MYSQL_DATABASE=mysql-data
MYSQL_USER=root
MYSQL_PASSWORD=craft
MYSQL_ROOT_PASSWORD=craft
MYSQL_TZ=America/Los_Angeles
PATH_TO_SQL_DB=~/Sites/docker-craftcms3/data/dump.sql" >> .env
```

```
$ docker-compose build
```
```
$ docker-compose up
```
or to run daemon in background add `-d` flag

go to http://localhost/admin to view

shutting down

```
$ docker-compose down
```

if any changes happen to the Dockerfiles or associated services, you will need to shut down the containers and run `$ docker-compose build` again before the images will refect the new state

this is not true with mysql, as it's pulled from a static image and can be rebuilt on the fly with `$docker-compose up` if any changes are made to the docker-compose.yml config file