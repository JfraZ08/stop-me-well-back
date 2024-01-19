import express from "express";
import { authRoutes } from './router/auth';
import { userRoutes } from './router/users';
import { gamesRoutes }from './router/games';
import { Sequelize } from "sequelize";
import  bodyParser  from "body-parser";
import cors = require("cors");
import { Server, createServer } from "http";

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/database.sqlite'
  });


sequelize.sync();
// sequelize.sync({ force: true});

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(cors());
app.use(bodyParser.json());

const apiRouter = express.Router();
apiRouter.use('/auth', authRoutes);
apiRouter.use('games', gamesRoutes );
apiRouter.use('/users', userRoutes);

server.use("/", apiRouter);

server.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}!`)
  });




