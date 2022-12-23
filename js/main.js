
let wallpaper = {   
    'image': [
            "img/fon/fon1.jpg",
            "img/fon/fon2.png",
            "img/fon/fon3.jpg",
            "img/fon/fon4.png",
            "img/fon/fon5.jpg", 
            "img/fon/fon6.png",
            "img/fon/fon7.jpg",
            "img/fon/fon8.jpg",
            "img/fon/fon9.jpg",
            "img/fon/fon10.png",
            "img/fon/fon11.jpg",
            "img/fon/fon12.jpg",
            "img/fon/fon13.jpeg",
            "img/fon/fon14.jpeg",          
        ],
    'color': [
            "red",
            "blue",
            "black",
            "gray",
        ]
    }


//берём никнейм и фон из LS
let userName = window.localStorage.getItem('username');
let backgroundLS = window.localStorage.getItem('background');
//если никнейма нет,то функция установки никнейма
if(userName == null || userName == '' || userName == undefined || userName == 'null' || userName.trim() == ''){
    setUsername();
} 
if(backgroundLS == null || backgroundLS == '' || backgroundLS == undefined || backgroundLS == 'null'){
    window.localStorage.setItem('background', "img/fon/fon10.png");
    backgroundLS = window.localStorage.getItem('background');
}
console.log("При загрузке username:  " + userName);
console.log("background:  " + backgroundLS);

//отрисовка вспомогательного меню
renderWallpapers();
document.getElementById('name-menu').innerHTML = userName;

document.getElementById('message').style.backgroundImage = "url('" + backgroundLS + "')";

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
    }


window.addEventListener("keydown", (event) => { //Вешаем эаент листенер
    if (event.keyCode === 13){ //если нажимается энтер
        addPost();  //выполняется addpost
    }
})

//отрисовываем картинки для выбора фона 
function renderWallpapers(){

    //находим контейнер для обоев  
        let wallpapersContainer = document.getElementById('bg-wallpapers');
        //находим шаблон для обоев
        wallpapersContainer.innerHTML = '';
        let templateWallpapers = document.getElementById('tmpl-wallpapers').innerHTML;

        //выводим картинки
        for (let i = 0; i<wallpaper['image'].length; i++){

               wallpapersContainer.innerHTML += templateWallpapers .replace('${image}', wallpaper['image'][i])
                                                                    .replace('${image}', wallpaper['image'][i]);
                                                                                
        }
}

//показываем/скрываем меню 
function toggleSideMenu(){
    //показать блок с обоями
    document.getElementById('menu-window').classList.toggle('side-menu-activ');

}
//показываем/скрываем обои 
function toggleWallpapers(){
    //показать блок с обоями
  document.getElementById('bg-wallpapers').classList.toggle('d-none');
}

//меняем обои
function changeBackgroung(){
    //получаем ссылку на фон
    let background = event.target.getAttribute('attr-image');
    //обновляем фон в LS
    window.localStorage.setItem('background', background);

    //перерисовываем фон
    let container = document.getElementById('message');
    container.style.backgroundImage = "url('" + background + "')";
}
//изменение никнейма
function changeUserName(){
    let tempUserName = prompt("Введите новый никнейм:");
    if (tempUserName !== null){
        if(tempUserName == '' || tempUserName == undefined || tempUserName == 'null' || tempUserName.trim() == ''){
            alert("Выберите другое имя, никнейм не может быть '" + tempUserName + "'");
        }else {
            window.localStorage.setItem('username', tempUserName);
            userName = tempUserName;
            document.getElementById('name-menu').innerHTML = userName;
        }
    }
}