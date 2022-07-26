# React Sortable Gallery

This react drag and drop gallery is built using React and MSW(Mock service worker).
I enjoy building it 😁

# Packages used
- React Sortable HOC
- MSW (Mock service worker) for mocking REST APIs

## Installation
You can run this project using **Docker / NPM & YARN**.

In the project directory, you can run: 

**Using docker**

``` bash
docker compose up
```

**Using NPM / YARN**
1. Install dependencies from package.json:

    NPM - 
    ``` bash
    npm install
    ```
    Yarn - 
    ``` bash 
    yarn
    ```
Above command will install all the dependencies required by the project to run.

2. Setup the MSW (Mock Service Worker):

    NPM - 
    ``` bash
    npx msw init public/ --save
    ```
    Yarn - 
    ``` bash 
    yarn msw init public/ --save
    ```

3. To run the app:

    NPM - 
    ``` bash
    npm start
    ```
    Yarn - 
    ``` bash
    yarn start 
    ```


Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.



## API Design

`/getData` endpoint to fetch the data and set it in local storage.

`/setData` to update the data in local storage.

For adding Adding, Updating and Deleting the data we can create the APIs.

For update and delete API we need a unique value like **ID** in the data with which we can identify the record we want to update / delete.

### UPDATED DATA FORMAT:
``` bash
{
    id: number,
    type: string,
    position: number,
    title: string,
    src: string
}
```

`/updateData` will be the endpoint which will update the existing data using the **ID** and in the request we will send the **ID** of the record we want to update and the updated data.

`/deleteData` will be the endpoint which will delete the record using **ID** and in the request we will send the **ID** of the record we want to delete.
