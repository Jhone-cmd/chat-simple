const socket = io();

const params = new URLSearchParams(window.location.search);
const userName = params.get('username');

function firstLetterCapitalized(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function userNameMessage() {
    const user = document.getElementById("msg-user");
    user.innerHTML = `${firstLetterCapitalized(userName)}, você está conectado ao chat.`
    socket.emit('username', {
        userName
    });
}

function sendMessage() {
    document.getElementById("messageInput")
        .addEventListener('keyup', (event) => {
            event.preventDefault();
            if (event.key === 'Enter') {
        
                const message = event.target.value;
                const data = {
                    message,
                    name: userName
                }
                socket.emit('message', data);
                event.target.value = '';
                event.focus();
            }       
        });  
        
    document.getElementById("send")
        .addEventListener('click', () => {   
            const message = document.getElementById("messageInput").value;  
            const data = {
                message,
                name: userName
            }    
            socket.emit('message', data);            
            document.getElementById("messageInput").value = '';
            document.getElementById("messageInput").focus();
    }); 
}

function messages() {
    socket.on('message', (data) => {
        //console.log(data);
        const ul = document.getElementById("chatList");
        ul.innerHTML += `<li><strong>${firstLetterCapitalized(data.name)}</strong>: ${data.text}</li>`
        ul.scrollTop = ul.scrollHeight
    });
}

userNameMessage();
sendMessage();
messages();  // call the function to start listening for messages
