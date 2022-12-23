//массив с ссылками на фон
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
//если  нет фона,то устанавливаем дефолтный фон и записываем его в LS
if(backgroundLS == null || backgroundLS == '' || backgroundLS == undefined || backgroundLS == 'null'){
    window.localStorage.setItem('background', "img/fon/fon10.png");
    backgroundLS = window.localStorage.getItem('background');
}
//теперь фон из lS устанавливаем для окна сообщений
document.getElementById('message').style.backgroundImage = "url('" + backgroundLS + "')";

console.log("При загрузке username:  " + userName);
console.log("background:  " + backgroundLS);

//отрисовка вспомогательного меню (фон и никнейм) 
//(по умолчанию мы его не видим, но в нём уже будет всё отрисовано)
renderWallpapers();
document.getElementById('name-menu').innerHTML = userName;


//Установим никнейм: показываем окно ввода никнейма, записываем в LS введённое значение
function setUsername(){
        userName = prompt("Введите Ваш никнейм:");
        //сохраняем в ls
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

//функция отправки сообщения
function addPost(){
    //берём текст сообщения
    let message = document.getElementById('usertext').value;
    //если текст пустой или содержит одни пробелы,
    if (message == "" || message.trim() == ""){
        // то выводим пользователю
        alert("Вы не можете отправить пустое сообщение");
        //и выходим из функции??? видимо)
        return;
    }
    //в другом случае будет продолжаться код
    //устанавливаем текущее ЛОКАЛЬНОЕ время пользователя без секунд
    //но вообще его можно убрать, тк мы его не используем
    let date = new Date().toLocaleTimeString().slice(0, -3);
    //проверяем никнейм, чтобы не был пустым, пробелами, null И тд
    if (userName == null || userName == '' || userName == undefined || userName == 'null' || userName.trim() == ''){
        //если пустой, то вызываем функцию установки никнейма
        setUsername();
    }else {
        //иначе
        //это полный адрес запроса для добавления сообщения на сервер    
        let url = 'https://ChinaTelegram.perfectpink.repl.co/?addpost&name=' + userName + '&message=' + message + '&date=' + date;
        //далее делаем запрос, как на уроке в 3 строки
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.send();
        //когда сообщение ушло, вызываем функцию отрисовки сообщений
        renderposts();
        //а инпут для ввода сообщения очищаем
        document.getElementById('usertext').value = "";
    }
}

//функция отрисовки собщений
function renderposts(){
     //это  адрес запроса для получения  сообщения с сервера
    let url = 'https://ChinaTelegram.perfectpink.repl.co/?getposts';
    //далее делаем запрос, как на уроке в 3 строки
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, false);
    xhr.send()
    //кладём полученный ответ (JSON) в переменную response
    let response = xhr.responseText;
    //раскодируем его в массив db
    let db = JSON.parse(response);
    //найдём контейнер, куда будем отрисовывать все сообщения
    let container = document.getElementById('message');
    //найдём шаблон сообщения
    let template = document.getElementById('text-message').innerHTML;
    //сначала очистим контейнер, чтобы сообщения не дублировались
    container.innerHTML = "";
    
    //приступаем к отрисовке каждого сообщения
    //бежим по элементам массива db (там никнейм, время и текст сообения)
    for(let i = 0; i < db.length; i++){
        //берём время из массива. 
        //Для этого создаём новую переменную типа Date(иначе время будет строкой) и запихиваем туда значение времени из массива
        let timeUser = new Date(db[i]['backtime']);

        //заполняем шаблон одним сообщением
        //если никнейм наш...
        if(window.localStorage.username == db[i]['name']){
            container.innerHTML += template.replace('${name}',db[i]['name'])
            .replace('${text}',db[i]['message'])
            //время изначально на сервере записывается в UTC , оно одинаково в любой точке мира
            //и уже при отрисовке мы его переводим в локальное, в то, которое у нас (toLocaleTimeString())
            .replace('${time}',timeUser.toLocaleTimeString().slice(0, -3))
            .replace('${}','right')
        
        //и если никнейм не наш...
        }else{
            container.innerHTML += template .replace('${name}',db[i]['name'])
            .replace('${text}',db[i]['message'])
            .replace('${time}',timeUser.toLocaleTimeString().slice(0, -3))
            .replace('${}','left')
        }
    }
    //а здесь мы указываем куда пролистнуть скролл (в конец)
    container.scrollTo(0, container.scrollHeight);
}

//отправка сообщений по Enter
window.addEventListener("keydown", (event) => { //Вешаем эаент листенер
    if (event.keyCode === 13){ //если нажимается энтер
        addPost();  //выполняется addpost
    }
})

//отрисовываем картинки для выбора фона 
function renderWallpapers(){

    //находим контейнер для обоев  
    let wallpapersContainer = document.getElementById('bg-wallpapers');
    //очищаем его, чтобы обои не дублировались
    wallpapersContainer.innerHTML = '';
    //находим шаблон для обоев
    let templateWallpapers = document.getElementById('tmpl-wallpapers').innerHTML;

    //выводим картинки
    for (let i = 0; i<wallpaper['image'].length; i++){

            wallpapersContainer.innerHTML += templateWallpapers .replace('${image}', wallpaper['image'][i])
                                                                .replace('${image}', wallpaper['image'][i]);
                                                                                
        }
}

//показываем/скрываем вспомогательное меню 
function toggleSideMenu(){
    //показать меню
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
    //если нажал Отмена (знач = null)
    //поэтому проверяем, что оно не null
    if (tempUserName !== null){
        //если не null, то проверяем дальше
        //если введа пустота, пробелы, null rкак строка..
        if(tempUserName == '' || tempUserName == undefined || tempUserName == 'null' || tempUserName.trim() == ''){
            //то выводим предупреждение и не сохраняем введённый никнейм
            alert("Выберите другое имя, никнейм не может быть '" + tempUserName + "'");
        }else {
            //если значение никнейма корректное, то сохраняем его в ls
            window.localStorage.setItem('username', tempUserName);
            //записываем в переменную userName, которая используется у нас везде для никнейма
            userName = tempUserName;
            //и отрисовываем в вспомогательном меню новый никнейм
            document.getElementById('name-menu').innerHTML = userName;
        }
    }
}