# Ecomm App

Sample ecommerce application

## Requirements to run the App

This App was created with NextJS, a React framework and json-server to create a simple API.

### Running the App with Docker:

To run the App with docker you must have install these packages:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

Once you have installed docker and docker compose you only have to run two commands:

```
docker compose build
docker compose up
```

### Running the App without Docker:

To run the App without Docker you must open two terminals, one for the next app and another for the json-server API.

#### NextJS App

To run the next app you must go to the next-app folder:

```
cd next-app
```

Once in the folder you must install the dependencies:

```
npm install
```

Then you need to run the app with one last command:

```
npm run dev
```

#### json-server API

To run the json-server API you must go to the json-server folder:

```
cd json-server
```

Once in the folder you have to run this command:

```
npx json-server data.js --port 3004
```

If you got an error running this command probably you will need to install the `json-server` package globally:

```
npm install -g json-server
```

Then you should be able to run the previous command to run the API.
