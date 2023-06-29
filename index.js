const app = require('./app');

//Inicia el servidor web express
app.listen(3333, () => {
    console.log("Server running on port", 3333);
});

