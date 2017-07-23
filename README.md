This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

To run the project first you need to install [json-server](https://github.com/typicode/json-server) (install it globally).

Then download or clone the project directory.

Install npm packages:

`npm install`

Then start the json-server, serving file `/db/people/json`

To do this, go to the `/db` directory, and run:

`json-server people.json`

The server will serve the json file on `localhost:3000`.

(You can change the port by launching server with `json-server -p 4000 people.json`)

Next open a new Terminal window and go to the project directory and run:

`npm start`

The project will run on `localhost:3001` (you can change its port in package.json file)

Open your favorite browser and go to `localhost:3001`.