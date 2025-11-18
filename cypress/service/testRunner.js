const express = require("express");
const { exec } = require("child_process");

const app = express();
const PORT = 3000; // your trigger API port

app.get("/run-tests/regression", (req, res) => {
  res.send("Test execution started...");

  exec("npm run regression", (error, stdout, stderr) => {
    if (error) {
      console.error(`ERROR: ${error.message}`);
      return;
    }
    console.log(`OUTPUT: ${stdout}`);
    console.log(`ERRORS: ${stderr}`);
  });
});

app.listen(PORT, () => {
  console.log(`Trigger API running on port ${PORT}`);
});
