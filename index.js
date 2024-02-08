const express = require(`express`);
const { initRoutes } = require(`./server/src/init-routes`);
const cors = require(`cors`);

const app = express();
app.use(express.json());
app.use(cors());

initRoutes(app);

const port = process.env.PORT || 3002;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
