const path = require('path');
const express = require('express');
const app = express();

const port = process.env.PORT || 3000;
// console.log('../public/');
app.use(express.static(path.join(__dirname, '..', 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`server running on http://localhost:3000`);
});
