//берём никнейм из LS
let userName = window.localStorage.getItem('username');

//если никнейма нет,то функция установки никнейма
if(userName == null || userName == '' || userName == undefined || userName == 'null' || userName.trim() == ''){
    setUsername();
} 
console.log("При загрузке username:  " + userName);
  
//Установим никнейм: показываем окно ввода никнейма, записываем в LS введённое значение
function setUsername(){
        userName = prompt("Введите Ваш никнейм:");
        window.localStorage.setItem('username', userName);
        console.log("setUsername: " + userName);
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
    
    for(let i = 0; i < db.length; i++){
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

     container.scrollTo(0, container.scrollHeight);
}
    function userClear(){
        window.localStorage.setItem('username', '');
        console.log( window.localStorage.getItem('username'));
    }


// Скопировал из таскбоарда Лены картинки что бы не заморачиваться ))) но не получается добавить окно с обоями в index.html. может кто-то попробует, я хз )

let wallpaper = {   
    "image": [
            "https://klevtsovaelena.github.io/wallpaper/img/BlackWhite1.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/BlackWhite2.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/BlackWhite3.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/BlackWhite4.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/BlackWhite5.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/BlackWhite6.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/BlackWhite7.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/BlackWhite8.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/BlackWhite9.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/BlackWhite10.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/BlackWhite11.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/BlackWhite12.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/1.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/2.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/3.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/4.png",
            "https://klevtsovaelena.github.io/wallpaper/img/5.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/6.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/7.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/8.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/9.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/10.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/11.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/12.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Shine1.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Shine2.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Shine3.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Shine4.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Shine5.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Shine6.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Shine7.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Shine8.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Shine9.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Shine10.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Shine11.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Shine12.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Winter1.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Winter2.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Winter3.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Winter4.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Winter5.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Winter6.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Winter7.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Winter8.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Winter9.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Winter10.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Winter11.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Winter12.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Fire1.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Fire2.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Fire3.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Fire4.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Fire5.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Fire6.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Fire7.jpeg",
            "https://klevtsovaelena.github.io/wallpaper/img/Fire8.png",
            "https://klevtsovaelena.github.io/wallpaper/img/Fire9.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Fire10.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Fire11.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Fire12.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Flower1.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Flower2.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Flower3.jpeg",
            "https://klevtsovaelena.github.io/wallpaper/img/Flower4.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Flower5.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Flower6.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Flower7.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Flower8.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Flower9.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Flower10.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Flower11.jpg",
            "https://klevtsovaelena.github.io/wallpaper/img/Flower12.jpg",
        ],
        "color": [
            "red",
            "blue",
            "black",
            "gray",
        ]
    }

