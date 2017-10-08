document.getElementById('sendButton').addEventListener('click', postChat);
document.getElementById('typeArea').value = '';   
document.getElementById('nameArea').value = '';

function postChat() {
    var typed = document.getElementById('typeArea').value;
    var chat  = document.getElementById('chatDiv');
    var name  = document.getElementById('nameArea').value.split(' ');
    var proceed = false;
    
    proceed = checkNameValidity(name[0],typed,proceed);
    
    if (proceed == true) {
        if (typed === '') {
            ;
        } else {
            var yourMessage = name[0] + ': ' + typed; 
            renderChatArea(yourMessage); 
        } 
        setTimeout(renderChatArea, 1000, 'BABJI: ' + getAnswer(typed));
    }
    document.getElementById('typeArea').value = '';       
}

function renderChatArea(chat) {
    var para = document.createElement('p');
    var node = document.createTextNode(chat);
    para.appendChild(node);
    var element = document.getElementById('chatArea');
    element.appendChild(para);  
}

function getAnswer(typed) {
    var arr = typed.split(' ');
    
    if (typed === '')
    {
        return 'Type in something.';
    }
    for (i=0; i<arr.length; i++){
        
        if (localStorage.getItem(arr[i]) === null) {
            localStorage.setItem(arr[i],typed);
        } else {
            return localStorage.getItem(arr[i]);
            break;
        }
    }
    
    return 'Sorry I cannot answer to this question right now, but next time for sure :)';
}

function checkNameValidity(name,typed,proceed) {
    var text;
    if (name === '') {
        text = 'Your name cannot be emtpy! You do have a name, dont you?'
        setTimeout(renderChatArea, 1000, 'BABJI: ' + text);
        proceed = false;
        return proceed;
    }
    if (name.length > 5) {
        text = 'Your name is too long. Please make it short.'
        setTimeout(renderChatArea, 1000, 'BABJI: ' + text);
        document.getElementById('nameArea').value = '';
        proceed = false;
        return proceed;
    } else {
        if (document.getElementById('nameArea').readOnly === false) {
            renderChatArea('BABJI: ' + 'Hi ' + name); 
        }
        document.getElementById('nameArea').readOnly = true;
        proceed = true;
        return proceed;
    }
}
    
function askName() {
    
    var yourMessage = 'Please type in your name. Use no more than 5 characters. I dont like long names.';
    setTimeout(renderChatArea, 1000, 'BABJI: ' + yourMessage);    
}
