# Bundy.lol

Bundy.lol is a full-stack JavaScript application allowing users to create and join groups to which they can post common tasks for completion by group members.

Technologies used include

* React.js + Flux architecture
* Express.js
* MongoDB + Mongoose
* JWT session managment
* Bcrypt password hashing
* Gulp + Webpack
* Stylus

### Running Bundy.lol

Bundy.lol requires Node.js and a local MongoDB server instance to run.

Start the MongoDB server instance

```sh
mongod
```

In a new shell, install the dependencies and start the server.

```sh
cd bundylol
npm install
npm run dev
```

In a web browser, navigate to

```
http://localhost:3000
```

and create an account.