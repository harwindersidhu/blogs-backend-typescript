# Blogs Backend

This is a backend for a blog project using Express and TypeScript.

This project was also made using Express and JavaScript which can be found here: <https://github.com/harwindersidhu/challenge-blogs-backend>

## Setup

- Install dependencies with `npm install`.
- Make .env file and taking help of .env.example, give database access values.

### `npm start`

Runs the server at `http://localhost:8080`

If the application crashes first time, try again with same command.

## APIs

- http://localhost:8080/api/blogs/1

  - This API will get the first six blogs from a sorted list of blogs such that the latest published blog will be on top.

- http://localhost:8080/api/blogs/2

  - This API will get the next six blogs from a sorted list of blogs such that the latest published blog will be on top.

- http://localhost:8080/api/blogs/

  - This API will get a count of the total blogs so that in the front end we can derive the number of pages (each page has a maximum of 6 blogs).

- http://localhost:8080/api/blogs/:slug
  - This API will get a blog with a given slug value.

# Dependencies

- NodeJS
- TypeScript
- Express
- Nodemon
- pg
