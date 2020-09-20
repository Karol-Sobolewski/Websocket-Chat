'run strict';

let userName = ``;

{
    const loginForm = document.querySelector(`#welcome-form`);
    const messagesSection = document.querySelector(`#messages-section`);
    const messagesList = document.querySelector(`#messages-list`);
    const addMessageForm = document.querySelector(`#add-messages-form`);
    const userNameInput = loginForm.querySelector(`#username`);
    const messageContentInput = addMessageForm.querySelector(`#message-content`);

    function login() {
        if (userNameInput.value.length == 0) {
            //  alert(`Please input your name`);
        }
        else {
            userName = userNameInput.value;
            loginForm.classList.remove(`show`);
            messagesSection.classList.add(`show`);
        }
    }
    loginForm.addEventListener(`click`, function (e) {
        e.preventDefault();
        login()

    })

    /*function addMessage(author, content) {
        const message = document.createElement(`LI`);
        message.classList.add(`message`, `message--received`);
        if (author === userName) {
            message.classList.add(`message--self`);
            const heading = document.createElement(`H3`);
            const mes = document.createElement(`DIV`);
            heading.classList.add(`message__author`)
            mes.classList.add(`message__content`)
            heading.innerHTML = author;
            mes.innerHTML = content;
        }
        message.innerHTML = content;
        messagesList.appendChild(message);
    }*/

    function addMessage(author, content) {
        const message = document.createElement('li');
        message.classList.add('message');
        message.classList.add('message--received');
        if(author === userName) message.classList.add('message--self');
        message.innerHTML = `
          <h3 class="message__author">${userName === author ? 'You' : author }</h3>
          <div class="message__content">
            ${content}
          </div>
        `;
        messagesList.appendChild(message);
      }

    addMessageForm.addEventListener(`click`, function (e) {
        e.preventDefault();
        function sendMessage() {
            if (!messageContentInput.value) {
                // alert(`Please input your message`);
            }
            else {
                addMessage(userName, messageContentInput.value)
                console.log(messageContentInput.value);
                messageContentInput.value = '';
            }
        }
        sendMessage();
    })
}

