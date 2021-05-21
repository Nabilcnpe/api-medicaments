const app = require('./src/http/server');
const config = require('./src/config/config');

//SERVER
app.listen(config.port, () => {
    console.log(`Server is Running on ${config.port} port`)
});
