import { io } from "./app";

interface User {
    id: string;
    name: string;
}

interface Message {
    name: string;
    text: string;
}

const users: User[] = [];
const messages: Message[] = [];

io.on('connection', (socket) => {
    socket.on('username', (data) => {        
        users.push({
            id: socket.id,
            name: data.userName
        });      
        // console.log(users); 
    });

    socket.on('message', (data) => {
        const message: Message = {
            name: data.name,
            text: data.message
        }
        messages.push(message);
        //console.log(messages);          
        io.emit('message', message)
    });
})


