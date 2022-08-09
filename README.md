# React Sortable Gallery

This react drag and drop gallery is built using React, Python, FastAPI, PostgreSQL and Docker.
I enjoy building it 😁

# Application Architecture
![Alt text](img/app_architecture.png?raw=true "Application Architecture")

# Technologies used
- React
- Python
- FastAPI
- PostgreSQL
- Docker

## Installation
You can run this project using **Docker**.

In the project directory, you can run: 

**Using docker**

``` bash
docker-compose up --build --remove-orphans
```
`Info: Above command will build the docker image and start the application.`

If you don't want to clone the project but still want to run it then you can simply download the
**docker-compose.yaml** file from this repository and run the following command.

**Using docker image**
``` bash
docker-compose up
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

You can also view the **Open API Spec** for this app [here](http://127.0.0.1:8000/docs)

## API Design

### UPDATED DATA FORMAT:
``` bash
{
    id: number,
    title: string,
    type: string,
    position: number,
    src: string
}
```

For delete API we need a unique value like **ID** in the data with which we can identify the record we want to delete.

`/api/entries` endpoint to fetch the all the data from PostgreSQL DB sorted by position.

`/api/create` will be the endpoint which will add the new data and in the request we will send the new data we want to add to DB.

`/api/update` will be the endpoint which will update the existing data in DB and in the request we will send the data we want to update.

`/api/delete/{id}` will be the endpoint which will delete the record using **ID** and in the request we will send the **ID** of the record we want to delete.
