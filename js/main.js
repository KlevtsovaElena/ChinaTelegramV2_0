//берём никнейм из LS
let userName = window.localStorage.getItem('username');

//если никнейма нет,то функция установки никнейма
if(userName == null || userName == '' || userName == undefined || userName == 'null' || userName.trim() == ''){
    setUsername();
} 
console.log(userName);
  
//Установим никнейм: показываем окно ввода никнейма, записываем в LS введённое значение
function setUsername(){
        userName = prompt("Введите Ваш никнейм:");
        window.localStorage.setItem('username', userName);
    }


//раскомментить перед сдачей
/*
    setInterval(function(){
        renderposts();
    }, 3000);
*/
//удалить---------
renderposts();
//---------------------

//
function addPost(){
    let message = document.getElementById('usertext').value;
    if (message == ""){
        alert("Вы не можете отправить пустое сообщение");
        return;
    }
    let date = new Date().toLocaleTimeString().slice(0, -3);
    if (userName == null || userName == '' || userName == undefined || userName == 'null' || userName.trim() == ''){
        setUsername();
    }else {
    let url = 'https://ChinaTelegram.perfectpink.repl.co/?addpost&name=' + userName + '&message=' + message + '&date=' + date;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send();
    renderposts();
    document.getElementById('usertext').value = "";
    }
}

function renderposts(){
    let url = 'https://ChinaTelegram.perfectpink.repl.co/?getposts';
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send()
    let response = xhr.responseText;
    let db = JSON.parse(response);
    let container = document.getElementById('message');
    let template = document.getElementById('text-message').innerHTML;
    container.innerHTML = "";
    
    for(let i = db.length-1; i >= 0; i--){
        let timeUser = new Date(db[i]['backtime']);

        if(window.localStorage.username == db[i]['name']){
            container.innerHTML += template.replace('${name}',db[i]['name'])
            .replace('${text}',db[i]['message'])
            .replace('${time}',timeUser.toLocaleTimeString().slice(0, -3))
            .replace('${}','right')
        }else{
            container.innerHTML += template .replace('${name}',db[i]['name'])
            .replace('${text}',db[i]['message'])
            .replace('${time}',timeUser.toLocaleTimeString().slice(0, -3))
            .replace('${}','left')
        }
    }
}
    function userClear(){
        window.localStorage.setItem('username', '');
        console.log( window.localStorage.getItem('username'));
    }