const express = require('express');
const PORT = process.env.PORT || 5001;

const app = express();

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});