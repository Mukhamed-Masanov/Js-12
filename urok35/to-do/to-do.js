$(() => {
    //Задача :создать список дел с возможностью добавления \ удаления пунктов
    let $list = $('#list')
    let $newItemForm = $('#newItemForm')
    let $newItemButton = $('#newItemButton')
    let $itemDescription = $('#itemDescription')
    let $li = $('li');
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
    })
    //Добавление нового элемента
    $newItemForm.on('submit', function (e) {
        e.preventDefault()
        const text = $itemDescription.val().trim(); //берем значения атрибута value //trim - убирает пробелы ,
        // табуляцию , переносы на новую строку в начале и в конце строки
        if (text.length !== 0) {
            $list.prepend(`<li>${text}</li>`)
            $itemDescription.val('');
            updateCounter();
        }
    })

    //удаление элементов , при первом нажатии на элемент мы делаем егокрасным цветом и помещаем  в конец списка . При повторном нажатии мы удаляем элемент
    $list.on('click', 'li', function () {
        let $elem = $(this); //кэшируем элемент . т.е сохранит его нажатым его в нажатом состоянии
        let $complete = $elem.hasClass('complete') //проверяем есть ли у элемента класс complete. Return boolean
        if ($complete) {
            $elem.animate({opacity: 0 , paddingLeft: '+=180px' , fonSize : '-=40px'}, 5000, 'swing', () => {
                $elem.remove()
                updateCounter()
            })
        } else {
            itemText = $elem.text() //беру текст из нажатого элемента списка
            $elem.remove()
            //Добавление в конце списка с классом complete
            $list.append(`<li class="complete">${itemText}</li>`).hide().fadeIn(500)
        }
    })
})