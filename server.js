const http = require("http");
const { createDeflate, createDeflateRaw } = require("zlib");

// Create an HTTP server
const server = http.createServer((req, res) => {
  const url = req.url;

  // Respond with "Home Page" for the root URL
  if (url === "/") {
    res.write("Home Page");
    res.end();
  }

  // Fetch data from an external API and create an HTML table to display the data
  if (url === "/list") {
    // Use dynamic import to load the node-fetch module
    import("node-fetch")
      .then((fetch) => {
        fetch("https://jsonplaceholder.typicode.com/users")
          .then((res) => res.json())
          .then((data) => {
            // Call the createData function to create the HTML table
            const tableData = createData(data);
            res.write(tableData);
            res.end();
          })
          .catch((err) => {
            console.error(err);
            res.statusCode = 500;
            res.end();
          });
      })
      .catch((err) => {
        console.error(err);
        res.statusCode = 500;
        res.end();
      });
  }

  // Respond with "Welcome To My Welcome Page" for the "/message" URL
  if (url === "/message") {
    res.write("Welcome To My Welcome Page");
    res.end();
  }
});

// Start listening on port 8090
server.listen(8090, () => console.log("Server listening on port 8090"));

// Function to create an HTML table from an array of data
function createData(data) {
  let tableData =
    "<table border='1'><tr><th>ID</th><th>Name</th><th>Username</th><th>Email</th><th>Address</th><th>Phone Number</th></tr>";
  data.forEach((element) => {
    tableData += `<tr><td>${element.id}</td><td>${element.name}</td><td>${element.username}</td><td>${element.email}</td><td>${element.address.street}</td><td>${element.phone}</td></tr>`;
  });
  tableData += "</table>";
  return tableData;
}
