const { startServer } = require('./startServer');

(async function index() {
    await startServer();
}()).catch((error) => {
    console.error(`An error has ocurred, server is down ${error.message}`);
});
