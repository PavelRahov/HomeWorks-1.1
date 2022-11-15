// 1. Создать обработчик события полной загрузки страницы
window.onload = function () {

    //2. В поле "Full Name" запретите вводить цифры.
    let fullName = document.getElementById('nameInput');
    // fullName.onkeypress = function (event) {
    //     if (!isNaN(parseInt(event.key))) {
    //         event.preventDefault();
    //     }
    // };


    // 3. В поле "Your username" запретите вводить точки и запятые.
    let userName = document.getElementsByTagName('input')[1];
    // userName.onkeypress = function (event) {
    //     if (event.key === '.') {
    //         event.preventDefault();
    //     } else if (event.key === ',') {
    //         event.preventDefault();
    //     }
    // };


    // 4. При изменении значения чекбокса выводите в консоль соответствующее сообщение: “Согласен” или “Не согласен”.
    let checkBox = document.getElementById('check');
    checkBox.onchange = function (event) {
        if (event.target.checked) {
            console.log('Согласен');
        } else {
            console.log('Не согласен');
        }
    };


    // 5. При нажатии на кнопку “Sign Up”:

    // • Проверьте на существование значения в каждом текстовом поле.
    let password = document.getElementsByTagName('input')[3];
    let passwordRepeat = document.getElementsByTagName('input')[4];
    let btnSignUp = document.getElementsByClassName('btn')[0];
    let mail = document.getElementsByTagName('input')[2]

    let modal = document.getElementById('modal__1');
    let closeButton = modal.getElementsByClassName('modal__close-button')[0];

    let infoClient = {};
    let cartArray = [];
    let clients;

    btnSignUp.onclick = function (e) {
        $('.error').hide();
        $('.part-order_action input').css('border-color', '#C6C6C4');
        let hasError = false
        if (!fullName.value.match(/^[A-ZА-ЯЁa-zа-яё\s]*$/g)) {
            fullName.style.borderBottomColor = 'red';
            $('.error').eq(0).show();
            hasError = true;
        }
        if (!userName.value.match(/^[a-zа-яё0-9\_\-]+\s*$/gi)) {
            userName.style.borderBottomColor = 'red';
            $('.error').eq(1).show();
            hasError = true;
        }
        if (!mail.value.match(/^\w+@[a-zA-Z]+?\.[a-zA-Z]{2,3}$/g)) {
            mail.style.borderBottomColor = 'red';
            $('.error').eq(2).show();
            hasError = true;
        }
        if (!password.value.match(/(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9]){8,}/g)) {
            password.style.borderBottomColor = 'red';
            $('.error').eq(3).show();
            hasError = true;
        }

        // • Проверить совпадают ли пароли из двух текстовых полей
        if (password.value !== passwordRepeat.value) {
            passwordRepeat.style.borderBottomColor = 'red';
            $('.error').eq(4).show();
            hasError = true;
        }
        // • Проверить выбран ли чекбокс.
        if (!checkBox.checked) {
            alert('Ошибка чекбокса');
            return;
        }

        if (!hasError) {
            // • Модальное окно.
            modal.classList.add('modal_active');

            infoClient.name = fullName.value;
            infoClient.nickName = userName.value;
            infoClient.email = mail.value;
            infoClient.password = password.value;

            clients = localStorage.getItem('clients'); // Достаем из хранилища все что есть (СТРОКУ) по ключу - clients
            console.log(clients);

            if (clients) {
                cartArray = JSON.parse(clients);// Преобразование строки из clients в объект или массив JS
            }
            cartArray.push(infoClient);
            localStorage.setItem('clients', JSON.stringify(cartArray)); //Преобразование массива обратно в строку и сохранение в хранилище - clients
            console.log(localStorage);
        }


    };


    // 6. При нажатии на ссылку «Already have an account?» или кнопку «ОК»...реализовать имитацию перехода на страницу логина.
    let goToPersonalAccount = document.getElementsByClassName('account')[0];

    goToPersonalAccount.onclick = entryLK;
    closeButton.onclick = entryLK;


    function entryLK(e) {
        modal.classList.remove('modal_active');

        // • Текст "Get your free account" заменить на "Log in to the system".
        document.getElementsByTagName('h1')[0].innerText = "Log in to the system";


        // • Блоки с полями "Full Name", "E-mail", "Repeat Password" удалить.
        let fullName = document.getElementsByClassName('part-order_action')[0];
        let mail = document.getElementsByClassName('part-order_action')[2];
        let repeatPass = document.getElementsByClassName('part-order_action')[4];
        fullName.remove();
        mail.remove();
        repeatPass.remove();


        // • Блок с чекбоксом также удалить.
        document.getElementsByTagName('label')[0].remove();


        // • Текст в кнопке заменить на «Sign In».
        btnSignUp.innerText = "Sign In";


        // • Замена текст на "Registration" и заменить слушателя события страница должна просто перезагружаться.
        goToPersonalAccount.innerText = "Registration";
        goToPersonalAccount.onclick = function (e) {
            location.reload();
        }

        // • Заменить слушатель события для кнопки «Sign In»
        btnSignUp.onclick = function (e) {
            $('.error').hide();
            $('.part-order_action input').css('border-color', '#C6C6C4');
            let hasError = false;

            if (!userName.value) {
                userName.style.borderBottomColor = 'red';
                $('.error').eq(0).text('Заполните поле Your username');
                $('.error').eq(0).show();
                hasError = true;

            }
            if (!password.value) {
                password.style.borderBottomColor = 'red';
                $('.error').eq(1).text('Заполните поле password');
                $('.error').eq(1).show();
                hasError = true;
            }

            if (!hasError) {
                let userNameCheck = userName.value;
                let passwordCheck = password.value;
                let user;

                clients = localStorage.getItem('clients');

                if (clients) {
                    cartArray = JSON.parse(clients);
                }

                if (cartArray.find(infoClient => infoClient.nickName === userNameCheck)) {
                    user = cartArray.find(infoClient => infoClient.nickName === userNameCheck);
                    console.log(user);
                } else {
                    userName.style.borderBottomColor = 'red';
                    $('.error').eq(0).text("Такой пользователь не зарегестрирован").show();
                }

                if (user.password === passwordCheck) {
                    let fieldUserName = document.querySelectorAll('.part-order_action')[0];
                    let fieldPassword = document.querySelectorAll('.part-order_action')[1];
                    document.querySelectorAll('.part-order_text')[0].remove();
                    fieldUserName.remove();
                    fieldPassword.remove();
                    goToPersonalAccount.remove();
                    btnSignUp.innerText = "Exit";
                    document.getElementsByTagName('h1')[0].innerText = "Welcome, " + user.name;

                    btnSignUp.onclick = (function (e) {
                        location.reload();

                    })

                } else {
                    password.style.borderBottomColor = 'red';
                    $('.error').eq(1).text("Неверный пароль").show();
                }

            }

        };


    };

    // function entryLK(e) {
    //     modal.classList.remove('modal_active');
    //
    //     // • Текст "Get your free account" заменить на "Log in to the system".
    //     document.getElementsByTagName('h1')[0].innerText = "Log in to the system";
    //
    //
    //     // • Блоки с полями "Full Name", "E-mail", "Repeat Password" удалить.
    //     let fullName = document.getElementsByClassName('part-order_action')[0];
    //     let mail = document.getElementsByClassName('part-order_action')[2];
    //     let repeatPass = document.getElementsByClassName('part-order_action')[4];
    //     fullName.remove();
    //     mail.remove();
    //     repeatPass.remove();
    //
    //
    //     // • Блок с чекбоксом также удалить.
    //     document.getElementsByTagName('label')[0].remove();
    //
    //
    //     // • Текст в кнопке заменить на «Sign In».
    //     btnSignUp.innerText = "Sign In";
    //
    //
    //     // • Ссылку "Already have an account?" удалить.
    //     goToPersonalAccount.remove();
    //
    //     // • Заменить слушатель события для кнопки «Sign In»
    //     btnSignUp.onclick = function (e) {
    //         if (!userName.value) {
    //             alert('Заполните поле Your username');
    //             return;
    //         }
    //         if (!password.value) {
    //             alert('Заполните поле Password');
    //             return;
    //         }
    //         alert('Добро пожаловать ' + userName.value);
    //     };
    //
    //
    // };

};












