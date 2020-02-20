# Training Plan Application
The purpose of this application will be to allow a user to define training plans and weekly workouts and to log activities against those plans. The structure of this application is loosely based on plans I have developed by following a methodology specific for mountaineering and alpine climbing. That is where ideas like Zone 1 workouts and breaking up plans into specific periods come from.

# Running Application
This application is built using React for the client, Express for the data api and Golang for the authentication api. For ease of local development, the application has been containerized with Docker and uses Docker Compose for container orchestration. To run the application locally you will need to clone this repository and then run `$ docker-compose up` in the root of the project. This will build 4 containers (server, app, auth and db). As of now, the db setup needs to be done manually but hopefully that will be automated in the near future. Details of db setup are explained below.

# Database Setup
Once the application has started, you can login to the Postgres container to setup the database for the application. In the root directory of the project run the following command to login to the database container for the first time:
```
$ docker-compose exec db psql -U postgres
```
This will open the postgres shell and should look like this.
```
psql (9.6.5)
Type "help" for help.

postgres=#
```

From here you can create a new database user and the database that will be used by application. The following user and db names are the ones currently setup in the application configuration but they can be whatever you want as long as you update the postgres configuration accordingly in the server.

## Steps to setup application database and user. These should all be run in the Postgres shell that was launched in the instructions above.
1. Create database
```
postgres=# create database training;
```
2. Create a new user/role
```
postgres=# CREATE USER tadmin WITH PASSWORD 'password';
```
3. Grant all priviliges on newly created database to newly created user/role
```
postgres=# GRANT ALL PRIVILEGES ON DATABASE training to tadmin;
```

Once the database and user have been successfully created, you will need to login to the newly created database using the new user credentials. (note to exit postgres shell run `\q`)

To login to the new database run the following command in the root directory of the project:
```
$ docker-compose exec db psql -U tadmin training
```
This will log you in to the training database as tadmin. Once you are logged in to the training database, you can setup the necessary tables using the SQL scripts that can be found in the `/server/db/schema.sql` file.

After the db tables have been setup, you will need to insert a test user so you can login to the application. In the postgres shell, you can run the following insert to add your user.
```
training=> insert into training_user(first_name, last_name, username, email) values ('James', 'Stiehl', 'Gymbeaux', 'gymbeaux@swole.com’);
```