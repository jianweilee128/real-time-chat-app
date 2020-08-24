# Real-Time-Chat-App

This project is a chat application built to allow users to be able to chat with each other which is made able through the use of socket.io

## Technologies

Project is created with:

- Socket.io - enables realtime, bi-directional communication between the users
- React - framework for frontend
- Redux - handle state in frontend (also used redux-thunk to handle async requests from server and redux-persist to persist client data)
- Express - setup backend server
- MongoDB - connected to the backend to store data
- Mongoose - handle modelling of data

## Setup

To run the development version of this project, install it locally using npm:

Clone this repository to your desktop. In a terminal (mac/linux) or windows terminal, run the following command in the base directory of this project

```
$ git clone https://github.com/jianweilee128/clothing-shop.git
```

1. Set up mongoose server by creating a .env file using the .env.test given and filling in the environment variable.

2. Install dependencies for backend by running the following command in terminal

```
$ npm install
```

3. Install dependencies for frontend by running the following command in terminal

```
$ cd client
$ npm install
```

4. After installing the dependencies for frontend, go back to the base directory and start the development version of project using the following command

```
$ npm run dev
```
