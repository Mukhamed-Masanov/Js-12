$(() => {
    //Задача :создать список дел с возможностью добавления \ удаления пунктов
    let $list = $('#list')
    let $newItemForm = $('#newItemForm')
    let $newItemButton = $('#newItemButton')
    let $itemDescription = $('#itemDescription')
    let $li = $(' #list  > li');
    let itemText = ''; //будет хранить текст из текстового поля
    //Задача 1: Скрывваем начальный список и заетм плавно его выводим по элементна и с задержкой
    $li.hide().each(function (index) {
        //delay  = это задержка перед первоночальным появлением элмента
        //fadeIn = это плвное появление посредством изменения свойства opacity
        $(this).delay(450 * index).fadeIn(1000);
    })

//Показать кол-во дел
    function updateCounter() {
        $('#counter').text($('li').length)
    }

    updateCounter()

    //Подготовка к добавлению элементов
    $newItemForm.hide()
    $('#showForm').on('click', function (e) {
        e.preventDefault() //preventDefault - позволяет отменить стандартную функцональносьб элемента.Пример : если прописать
        //e.preventDefault() для ссылки , то отменит переход по ней по причине блокировки клика.НО в дальнейшем мы можем сделать свои действия по клику на объект
        //(допустим строки снизу)
        $newItemButton.hide()
        $newItemForm.show();
        $itemDescription.focus()
    })
    //Добавление нового элемента
    $newItemForm.submit(function (event) {
        event.preventDefault()
        const text = $itemDescription.val().trim();
        let $time = new Date();
        let $date = `${$time.getDate() > 10 ? $time.getDate() : `0${$time.getDate()}`}:${$time.getMonth() > 10 ? $time.getMonth() + 1 : `0${$time.getMonth() + 1}`}:${$time.getFullYear()}`
        let $exactTime = `${$time.getHours() > 10 ? $time.getHours() : `0${$time.getHours()}`}:${$time.getMinutes() > 10 ? $time.getMinutes() : `0${$time.getMinutes()}`}`
        let $appendLi = '';
        if (text.length !== 0) {
            $appendLi = $(`<li><i class="fas fa-trash"></i> <span> ${text} </span> <span>${$date}</span> <span>${$exactTime} </span> <i class="fas fa-pen-square"></i> </li>`).on('click', 'i.fa-trash', function () {
                $(this).closest('li').remove()
                $.cookie('liItem', $appendLi)
                updateCounter()
            })
            $list.prepend($appendLi)
            $itemDescription.val('');
            updateCounter();
        }
    })

    //удаление элементов , при первом нажатии на элемент мы делаем егокрасным цветом и помещаем  в конец списка . При повторном нажатии мы удаляем элемент
    $list.on('click', 'li  ', function () {

        let $elem = $(this); //кэшируем элемент . т.е сохранит его нажатым его в нажатом состоянии
        let $complete = $elem.hasClass('complete') //проверяем есть ли у элемента класс complete. Return boolean
        if ($complete) {
            $elem.animate({opacity: 0, paddingLeft: '+=180px', fonSize: '-=40px'}, 5000, 'swing', () => {
                $elem.remove()
                updateCounter()
            })
        } else {
            itemText = $elem.text() //беру текст из нажатого элемента списка
            $elem.remove()
            //Добавление в конце списка с классом complete
            $list.append(`<li class="complete"><span>${itemText}</span></li>`).hide().fadeIn(500)
        }

    })

    $('.fa-trash').on('click', function () {
        $(this).closest('li').remove()
        updateCounter()

    })
    let currentVal = '';
    $list.on('click', '.fa-pen-square', function (event) {
        event.stopPropagation()
        currentVal = $(this).closest('li').find('span').text()
        $(this).closest('li').find('span').eq(0).prop('contentEditable', 'true').focus();
    })
    $("li > span").on('keydown', function (e) {
        if (e.which === 13) {
            e.preventDefault()
            let $newItem = $(this).text().trim()
            $newItem.length === 0 ? $(this).text(`${currentVal}`) : ''
            $(this).blur()
        }

    })
})
