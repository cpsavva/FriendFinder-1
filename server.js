const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');


const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'app/public')));

//============================================
// routes
// ===========================================
const htmlRoutes = require('./app/routing/htmlRoutes')(app);
const apiRoutes = require('./app/routing/apiRoutes')(app);

// ---- ERROR ROUTES -------------------------
app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, "app/public/404.html"));
});

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).sendFile(path.join(__dirname, "app/public/500.html"));
});
//--------------------------------------------

app.listen(PORT, () => console.log(`Server Started: Listening on Port ${PORT}`));
