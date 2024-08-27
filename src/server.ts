import { httpServer } from "./app";
import { env } from "./env/schema";
import "./websocket";

httpServer.listen(env.PORT, () => {
    console.log('Server is Running')
});