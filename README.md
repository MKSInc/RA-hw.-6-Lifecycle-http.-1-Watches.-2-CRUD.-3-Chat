<a name="top"></a>

# 6. Домашнее задание к лекции «Жизненный цикл и работа с HTTP»

**Перейти к:**  
***[6.2 CRUD](#6.2)  
[6.3 Чат*](#6.3)***

## 6.1 Мировые часы

Наверняка вы видели в офисах многих компаний, установленные часы, показывающие время в разных столицах мира:
* New York
* Moscow
* London
* Tokyo 

И т.д.

![Watches](./assets/watches.png)

Общая механика:

1. Вы заполняете поля название и временная зона (указываете смещение в часах относительно Гринвича) и нажимаете кнопку "Добавить"
1. Часы автоматически добавляются и (что самое важное) часы начинают "тикать", т.е. отсчитываются секунды, минуты и часы
1. При нажатии на крестик рядом с часами часы автоматически удаляются, при этом все подписки (`setTimeout`, `setInterval` и другие) должны вычищаться в соответствующем методе жизненного цикла

Упрощения: если вам сложно реализовать механику со стрелками (через css - см. `transform` и `rotate()`), то вы можете сделать цифровые часы, где отображаются только цифры в формате: ЧЧ:ММ:СС

Подсказки:
1. Посмотреть текущий TimezoneOffset вы можете используя объект `Date`
1. Можете использовать библиотеку momentjs.


## <a name="6.2">6.2 CRUD</a>
***[(наверх)](#top)***

Вам необходимо реализовать базовый CRUD (без обновления) при работе с HTTP.

Backend вы можете либо написать сами, либо взять готовый (из каталога `backend`).

![CRUD](./assets/crud.png)

### Общая механика

Первоначальная загрузка: делается http-запрос GET на адрес http://localhost:7777/notes, полученные данные отображаются в виде карточек с возможностью удаления

Добавление:
1. Вы заполняете форму и нажимаете кнопку "Добавить"
1. Выполняется http-запрос POST на адрес http://localhost:7777/notes, в теле запроса передаётся следующий JSON:
```json
{
    "id": 0,
    "content": "То, что было введно в поле ввода"
}
```
3. После чего делается запрос на получение всех записей и происходит обновление списка (GET http://localhost:7777/notes).

Удаление:
1. Вы нажимаете на крестик на одной из карточек
1. Выполняется http-запрос DELETE на адрес http://localhost:7777/notes/{id} (где id - это идентификатор заметки)
1. После чего делается запрос на получение всех записей и происходит обновление списка (GET http://localhost:7777/notes).

Обновление:
1. Вы нажимаете на кнопку обновить (две зелёные стрелочки)
1. После чего делается запрос на получение всех записей и происходит обновление списка (GET http://localhost:7777/notes).


## <a name="6.3">6.3 Чат*</a>
***[(наверх)](#top)***

Вам необходимо реализовать абсолютно анонимный чат (такого, конечн,о не бывает ☺), в который сможет отправлять сообщения любой желающий.

Но есть важное требование: если вы даже открыли другую вкладку в браузере (написание всё равно должно идти с вашего аккаунта).

Backend вы можете взять готовый (из каталога `backend`).

![Chat](./assets/chat.png)

### Общая механика

При создании компонента создаётся интервал или таймаут и делается периодический опрос сервера (временной интервал предложите сами) в виде http-запроса GET на адрес http://localhost:7777/messages?from={id}, где id - идентификатор последнего полученного сообщения (при первоначальной загрузке - 0).

Формат присылаемых данных:
```json
[
    {
        "id": 1,
        "userId": "5f2d9da0-f624-4309-a598-8ba35d6c4bb6",
        "content": "Какая сейчас погода за окном?"
    },
    {
        "id": 2,
        "userId": "5f2d9da0-f624-4309-a598-8ba35d6c4bb6",
        "content": "К сожалению, я не знаю ответа на этот вопрос"
    },
]
```
Где userId - уникальный идентификатор анонимного пользователя. Подумайте, как его сгенерировать и где хранить (если не придумали - прочитайте спойлеры).

Полученные данные отображаются в виде блоков с возможностью различным выравниванием:
* ваши - справа
* не ваши - слева

Ваши или не ваши вы определяете путём сравнения своего userId и того, что в сообщении.

Добавление:
1. Вы заполняете форму и нажимаете кнопку "Добавить"
1. Выполняется http-запрос POST на адрес http://localhost:7777/messages, в теле запроса передаётся следующий JSON:
```json
{
    "id": 0,
    "userId": "5f2d9da0-f624-4309-a598-8ba35d6c4bb6",
    "content": "То, что было введно в поле ввода"
}
```
3. После чего ждёте, пока не произойдёт получение данных по интервалу. Подумайте, как сделать ожидание комфортным для пользователя, и как решают эту проблему существующие чаты.

<details>
  <summary>Спойлеры</summary>
  
  Добиться уникальности "анонимов" можно просто записав в local/sessionStorage случайно сгенерированный id (nanoid, uuid). И использовать его для отправки и получения данных.

  Подумайте, какие уязвимости в безопасности создаёт подобная схема, и возможна ли отправка сообщений от лица другого пользователя?

  Подумайте над тем, как это можно предотвратить?
</details>

### Advanced

1. Попробуйте раскрашивать сообщения от разных пользователей в разные цвета.
1. Попробуйте реализовать авто-скроллинг до последнего сообщения.
