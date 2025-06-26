# BlogApplication

## Description

Blog app with frontend in Next.js + React An API in Spring Boot using Java for learning purposes. Can be used for creating simple blog with basic functionality such as login/signup using JWT authentication, create new users and posts, comment on posts. Performs Create, Retrieve, Update, Delete operations on posts and comments. Blog is using file based Spring H2 database for backend.

---

## Build Instructions -

Install node to run react app (frontend) and maven to run spring boot app (backend).

```bash
In /blognextweb directory, run the application
cd blognextweb
npm i
npm run dev

In /blogapiserv, run spring boot application using maven
cd blogapiserv
mvn install
mvn spring-boot:run

Open your browser and browse to http://localhost:3000



