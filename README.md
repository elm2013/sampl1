# Project Name

sample project

## Description

This is a small practice project where the user creates a connection with an existing API and then sends data over that connection.

A microservice writes the sent data to Kafka.

Another microservice reads the data sent from Kafka and stores it in the Influx database.

Technologies used in the project:

Express

Mango DB

Kafka

Influx DB

## How to Run

To run this project, follow the steps below:

1. Install Node.js v20.14.0
2. Run the following command to install project dependencies:
   ```
   npm i
   ```
3. Install Docker and Docker Compose
4. Run the following command to start the Docker containers:
   ```
   docker-compose up -d
   ```
5. Start the server by running the following command:
   ```
   npm run start server.js
   ```
6. Run the testloader script by executing the following command:
   ```
   node ./testloader.js
   ```

## Additional Notes

after run docker generate influxdb token and set this environment variable
