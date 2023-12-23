// server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// ... (your existing code)

app.get('/wordSearchGrid', (req, res) => {
  // Send the generated word search grid as JSON
  res.json(wordSearchGrid);
});

// ... (your existing code)

app.listen(PORT, () => {
  console.log(Server is running on port ${PORT});
});