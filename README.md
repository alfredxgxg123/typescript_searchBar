# Acme-search Bar

## clone instruction
- git clone https://github.com/alfredxgxg123/typescript_searchBar.git


## run application by docker
- make sure to install docker
- cd to the folder
- docker-compose build
- docker-compose up
- go to localhost 
- test with match terms

## run application locally with just npm and yarn
#### backend component
- cd backend
- rename .env.EXAMPLE to .env
- npm install
- npm run dev 
##### or run
- npm run build
- npm start
- go to localhost:8080
- test api for serach bar go to localhost:8080/api/search/acme

#### frontend component
- cd frontend
- yarn install
- yarn build

## additional features
- I've implemented Docker containerization and Nginx reverse proxy to provide an easier environment to run the application.
- I've implemented the Delete, Pin, and Tag Frontend features for the application.
- I decided to separate the backend and the frontend as two microservices. It would much better if I want to scale up the services with Kubernetes and Docker Containerization.
- I could auto-scale the two services with Kubernetes Ingress load balancing to handle a high volume of current user requests. Since the API request is only a get request, I could totally scale it individually with many worker Kubernetes pods each.


## Ideas about what I want to add as extra features
- In order to implement a better delete, pin, and tag feature, It would be great to add Redis and Redux for cache and state management.

A Fullstack workflow for this project would be Json/database to store the data, a get API to fetch the search results to the front-end, then, I can store the search keyword and results as an object to Redis cache. In that way, it would reduce the fetching time for the same keyword request. Then, I could store the current states of the tagged, deleted, and pined results from my front-end with Redux persist/ local storage to prevent lost during refresh page.
st to implement a user login feature with Redis, Redux and actual database to store the pined and tagged result to the database and backend. In that way, I could always get the pined and tagged ones as long as I've logged in.



