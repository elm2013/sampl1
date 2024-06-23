const axios = require("axios");
async function createConnections() {
  for (let index = 0; index < 10; index++) {
    const data = {
      name: `connection_${index}`,
      parameters: [],
    };

    try {
      await axios.post(
        "http://localhost:3000/connections/v1/createConnections",
        data
      );
      console.log(`Connection ${data.name} created successfully`);
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.log(`Connection ${data.name} already exists`);
      } else {
        console.error(
          `Error creating connection ${data.name}: ${error.message}`
        );
      }
    }
  }
}

async function sendDataOnConnection() {
  for (let i = 0; i < 10; i++) {
    const connectionName = `connection_${i}`;
    setTimeout(() => {
      for (let index = 1; index < 10; index++) {
        let randomString = generateRandomString(10);
        let randomValue = Math.random();
        let data = {
          time: new Date().getTime(),
          name: randomString,
          value: randomValue,
          connectionsName: connectionName,
        };

        try {
          axios.post(
            `http://localhost:3000/connections/v1/${connectionName}`,
            data
          );
          console.log(
            `send data on Connection ${connectionName}  successfully`
          );
        } catch (error) {
          console.error("Error send data:", error);
        }
      }
    }, 1000);
  }
}

function generateRandomString(length) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}

async function TestLoadApiConnections() {
  await createConnections();
  await sendDataOnConnection();
}

TestLoadApiConnections();
