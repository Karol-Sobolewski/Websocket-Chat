{
    const loginForm = document.querySelector(`#welcome-form`);
    const messagesSection = document.querySelector(`#messages-section`);
    const messagesList = document.querySelector(`#messages-list`);
    const addMessageForm = document.querySelector(`#add-messages-form`);
    const userNameInput = document.getElementById('username');
    const messageContentInput = addMessageForm.querySelector(`#message-content`);
    
    let userName;

    const socket = io();

    socket.on('message', ({ user, content }) => addMessage(user, content))
    socket.on('newUser', ({ user, content }) => addMessage(user, content))
    socket.on('removeUser', ({user, content}) => addMessage(user, content));

    function login(e) {
        e.preventDefault();
        if (userNameInput.value.length == 0) {
            alert(`Please input your name`);
        }
        else {
            userName = userNameInput.value;
            console.log(userName);
            socket.emit('login', { user: userName, id: socket.id});
            loginForm.classList.remove('show');
            messagesSection.classList.add('show');
        }
    }

    function sendMessage(e) {
         e.preventDefault();
        let messageContent = messageContentInput.value;
        if (!messageContent.length) {
             alert('You have to type something!');
        }
        else {
            addMessage(userName, messageContent);
            socket.emit('message', { user: userName, content: messageContent })
            messageContentInput.value = '';
        };
    };

    function addMessage(user, content) {
        const message = document.createElement('LI');
        if (user === userName) {
            message.classList.add('message', 'message--received', 'message--self');
        }
        else if (user === `ChatBot`){
            message.classList.add('message','message--received', 'message--bot');
        }
        else {
            message.classList.add('message', 'message--received');
        }
        message.innerHTML = `<h3 class="message__author">${user === userName ? 'You' : user}</h3><div class="message__content">${content}</div>`;
        messagesList.appendChild(message);
    }

    addMessageForm.addEventListener(`submit`, function (e) {
        sendMessage(e);
    });

    loginForm.addEventListener(`submit`, function (e) {
        login(e)
    })
};