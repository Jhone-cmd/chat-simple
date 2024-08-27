import { Application } from "express";
import express from "express";
import http from "http";
import path from "node:path";
import ejs from "ejs";
import { Server } from "socket.io";
import cors from "cors";


const app: Application = express();
const httpServer = http.createServer(app);

const io = new Server(httpServer);

app.use(cors({
    origin: '*',
}));

app.use(express.static(path.join(__dirname, "..", "public")));
app.set('views', path.join(__dirname, "..", "public"));
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use('/', (_, res) => {
    res.render('index.html')
});

export { httpServer, io }