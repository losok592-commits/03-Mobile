// ==UserScript==
// @name         03 Скрипт для адм Русь Mobile
// @namespace    https://forum.russia-game.ru/*
// @version      1.7
// @description  Работа с форумом
// @author       Andy Price
// @match        https://forum.russia-game.ru/*
// @include      https://forum.russia-game.ru/
// @grant        none
// @license 	 MIT
// @icon https://icons.iconarchive.com/icons/thesquid.ink/free-flat-sample/128/support-icon.png
// @downloadURL https://update.greasyfork.org/scripts/501078/%D0%9A%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D0%B0%20Rus%20Mobile.user.js
// @updateURL https://update.greasyfork.org/scripts/501078/%D0%9A%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D0%B0%20Rus%20Mobile.meta.js
// ==/UserScript==

(function () {
  'use strict';
const PIN_PREFIX = 2; // Prefix that will be set when thread pins
const RESHENO_PREFIX = 3;
const UNACCEPT_PREFIX = 4; // Prefix that will be set when thread closes
const ACCEPT_PREFIX = 5; // Prefix that will be set when thread solved
const COMMAND_PREFIX = 6; // Prefix that will be set when thread solved
const GA_PREFIX = 7;
const WATCHED_PREFIX = 9;
const buttons = [
    {
      title: '-----------------------------------------------------Раздел игроков-----------------------------------------------------'
    },
    {
		title: 'Приветствие',
	    dpstyle: 'oswald: 3px;     color: #fff; background: #50c878; box-shadow: 0 0 2px 0 rgba(0,0,0,0.14),0 2px 2px 0 rgba(0,0,0,0.12),0 1px 3px 0 rgba(0,0,0,0.2); border: none; border-color: #f53317',
		content:
	 '[COLOR=rgb(0, 255, 127)][FONT=times new roman][SIZE=4][I][CENTER]{{ greeting }}, уважаемый {{ user.name }}.[/CENTER][/I][/SIZE][/FONT][/COLOR]<br><br>' +
		'[CENTER]Здесь вставьте Ваш текст[/CENTER]',
	},
 {
            title: 'На рассмотрении',
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 255, 255, 0.5)',
            content:
            '[COLOR=rgb(0, 255, 127)][FONT=times new roman][SIZE=4][I][CENTER]{{ greeting }}, уважаемый {{ user.name }}.[/CENTER][/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][CENTER][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Ваша жалоба взята на рассмотрение, ожидайте ответа в данной теме.[/SIZE][/FONT][/COLOR][/CENTER][/I]<br>" +
            "[I][CENTER][COLOR=rgb(209, 213, 216)][FONT=times new roman][SIZE=4]Просьба не создавать дубликаты данной темы.[/SIZE][/FONT][/COLOR][/CENTER][/I]<br>" +
            "[I][CENTER][SIZE=8][COLOR=rgb(255, 255, 255)]Приятного время провождения на[/COLOR][COLOR=yellow][B] Русь Mobile! [/B][/COLOR]",
	  prefix: PIN_PREFIX,
    status: false,
    },
     {
            title: 'DM',
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 255, 255, 0.5)',
            content:
            '[COLOR=rgb(0, 255, 127)][FONT=times new roman][SIZE=4][I][CENTER]{{ greeting }}, уважаемый {{ user.name }}.[/CENTER][/I][/SIZE][/FONT][/COLOR]<br><br>' +
              '[I][CENTER][COLOR=rgb(209, 213, 216)][FONT=times new roman][FONT=times new roman][SIZE=4]Ваша жалоба получает статус: [COLOR=rgb(0, 255, 68)]Одобрено![/COLOR][/SIZE][/FONT][/COLOR][/CENTER][/I]<br>' +
              "[I][CENTER][COLOR=rgb(209, 213, 216)][FONT=times new roman][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту основных правил проекта:[/SIZE][/FONT][/COLOR][/CENTER][/I]<br><br>" +
              "[CENTER][COLOR=rgb(0, 255, 255)][FONT=book antiqua][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] [color=yellow]DeathMatch (DM) [/color]— убийство/нанесение урона, или попытка убийства/нанесения урона без основательной для этого IC причины.[/SIZE][/FONT][/COLOR][COLOR=red][FONT=book antiqua][SIZE=4] | Деморган до 60 минут.[/SIZE][/FONT][/COLOR][/CENTER]<br><br>" +
              "[QUOTE][LEFT][CENTER][FONT=book antiqua][COLOR=green][SIZE=4]Пример IC причины для DM:[/SIZE][/COLOR][COLOR=rgb(209, 213, 216)][SIZE=4]Вас оскорбили в RP процессе, на Вас напали на территории вашего семейного дома/титульной территории вашей ОПГ.[/SIZE][/COLOR][/FONT][/CENTER][/LEFT][/QUOTE]<br>" +
            "[I][CENTER][SIZE=8][COLOR=rgb(255, 255, 255)]Приятного время провождения на[/COLOR][COLOR=yellow][B] Русь Mobile! [/B][/COLOR]",
            prefix: ACCEPT_PREFIX,
            status: false,
          },
      {
	        title: 'Mass DM',
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 255, 255, 0.5)',
            content:
          '[COLOR=rgb(0, 255, 127)][FONT=times new roman][SIZE=4][I][CENTER]{{ greeting }}, уважаемый {{ user.name }}.[/CENTER][/I][/SIZE][/FONT][/COLOR]<br><br>' +
          '[I][CENTER][COLOR=rgb(209, 213, 216)][FONT=times new roman][FONT=times new roman][SIZE=4]Ваша жалоба получает статус: [COLOR=rgb(0, 255, 68)]Одобрено![/COLOR][/SIZE][/FONT][/COLOR][/CENTER][/I]<br>' +
          "[I][CENTER][COLOR=rgb(209, 213, 216)][FONT=times new roman][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту основных правил проекта:[/SIZE][/FONT][/COLOR][/CENTER][/I]<br><br>" +
          "[CENTER][COLOR=rgb(0, 255, 255)][FONT=book antiqua][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] [color=yellow]Massive DeathMatch (Mass DM) [/color]— Massive DeathMatch (сокращенно Mass DM) - массовые убийства/попытки убийства игроков без основательной IC причины.[/SIZE][/FONT][/COLOR][COLOR=red][FONT=book antiqua][SIZE=4] | Деморган до 120 минут / Предупреждение.[/SIZE][/FONT][/COLOR][/CENTER]<br>" +
          "[I][CENTER][SIZE=8][COLOR=rgb(255, 255, 255)]Приятного время провождения на[/COLOR][COLOR=yellow][B] Русь Mobile! [/B][/COLOR]",
            prefix: ACCEPT_PREFIX,
                      status: false,
          },
         {
            title: 'DB',
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 255, 255, 0.5)',
            content:
            '[COLOR=rgb(0, 255, 127)][FONT=times new roman][SIZE=4][I][CENTER]{{ greeting }}, уважаемый {{ user.name }}.[/CENTER][/I][/SIZE][/FONT][/COLOR]<br><br>' +
              "[I][CENTER][COLOR=rgb(209, 213, 216)][FONT=times new roman][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/CENTER][/I]<br><br>" +
              "[CENTER][COLOR=rgb(0, 255, 255)][FONT=book antiqua][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=rgb(209, 213, 216)][FONT=book antiqua][SIZE=4] DriveBy (DB) — убийство/попытка убийства за рулём Т/С, а также намеренный таран другого Т/С без основательной для этого IC причины.[/SIZE][/FONT][/COLOR][COLOR=red][FONT=book antiqua][SIZE=4] |Деморган до 60 минут.[/SIZE][/FONT][/COLOR][/CENTER]<br>" +
              "[QUOTE][LEFT][CENTER][FONT=book antiqua][COLOR=green][SIZE=4]Пример:[/SIZE][/COLOR][COLOR=rgb(209, 213, 216)][SIZE=4]Игрок задавил человека на мотоцикле/автомобиле, игрок протаранил патрульную машину МВД.[/SIZE][/COLOR][/FONT][/CENTER][/LEFT][/QUOTE]<br>" +
            "[I][CENTER][SIZE=8][COLOR=rgb(255, 255, 255)]Приятного время провождения на[/COLOR][COLOR=yellow][B] Русь Mobile! [/B][/COLOR]",
            prefix: ACCEPT_PREFIX,
            status: false,
          },
          {
            title: 'MG',
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 255, 255, 0.5)',
            content:
            '[COLOR=rgb(0, 255, 127)][FONT=times new roman][SIZE=4][I][CENTER]{{ greeting }}, уважаемый {{ user.name }}.[/CENTER][/I][/SIZE][/FONT][/COLOR]<br><br>' +
              "[I][CENTER][COLOR=rgb(209, 213, 216)][FONT=times new roman][FONT=times new roman][SIZE=4]Нарушитель буден наказан по следующему пункту общих правил серверов:[/SIZE][/FONT][/COLOR][/CENTER][/I]<br><br>" +
              "[CENTER][COLOR=yellow][FONT=book antiqua][SIZE=4][/SIZE][/FONT][/COLOR][COLOR=yellow][FONT=book antiqua][SIZE=4]  MetaGaming (MG) [/color] — использование OOC информации, которую ваш персонаж не знает (по RP) в диалоге/действии/ситуации и др.[/SIZE][/FONT][/COLOR][COLOR=red][FONT=book antiqua][SIZE=4] | Блокировка чата до 30 минут[/SIZE][/FONT][/COLOR][/CENTER]<br><br>" +
              "[QUOTE][LEFT][CENTER][FONT=book antiqua][COLOR=green][SIZE=4]Пример:[/SIZE][/COLOR][COLOR=rgb(209, 213, 216)][SIZE=4] «Ты оставил заявку на форуме? Админ одобрил?» [/SIZE][/COLOR][/FONT][/CENTER][/LEFT][/QUOTE]<br>" +
              "[I][CENTER][SIZE=8][COLOR=rgb(255, 255, 255)]Приятного время провождения на[/COLOR][COLOR=yellow][B] Русь Mobile! [/B][/COLOR]",
            prefix: ACCEPT_PREFIX,
            status: false,
        },
        {
            title: 'Недостаточно док-в',
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 255, 255, 0.5)',
            content:
            '[COLOR=rgb(0, 255, 127)][FONT=times new roman][SIZE=4][I][CENTER]{{ greeting }}, уважаемый {{ user.name }}.[/CENTER][/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][CENTER][COLOR=rgb(209, 213, 216)][FONT=times new roman][FONT=times new roman][SIZE=4]Недостаточно доказательств для корректного рассмотрения вашей жалобы.[/SIZE][/FONT][/COLOR][/CENTER][/I]<br>" +
            "[I][CENTER][COLOR=rgb(255, 0, 0)][FONT=times new roman][FONT=times new roman][SIZE=4]Отказано.[/SIZE][/FONT][/COLOR][/CENTER][/I]<br>" +
            "[I][CENTER][SIZE=8][COLOR=rgb(255, 255, 255)]Приятного время провождения на[/COLOR][COLOR=yellow][B] Русь Mobile! [/B][/COLOR]",
            prefix: UNACCEPT_PREFIX,
            status: false,
          },
              {
            title: 'Нарушений нет',
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 255, 255, 0.5)',
            content:
            '[COLOR=rgb(0, 255, 127)][FONT=times new roman][SIZE=4][I][CENTER]{{ greeting }}, уважаемый {{ user.name }}.[/CENTER][/I][/SIZE][/FONT][/COLOR]<br><br>' +
            "[I][CENTER][COLOR=rgb(209, 213, 216)][FONT=times new roman][FONT=times new roman][SIZE=4]В предоставленых доказательствах нарушений со стороны игрока не было замечено. [/SIZE][/FONT][/COLOR][/CENTER][/I]<br>" +
            "[I][CENTER][SIZE=8][COLOR=rgb(255, 255, 255)]Приятного время провождения на[/COLOR][COLOR=yellow][B] Русь Mobile! [/B][/COLOR]",
            prefix: UNACCEPT_PREFIX,
            status: false,
          },
     {
            title: 'Уже наказан',
            dpstyle: 'border-radius: 13px; margin-right: 5px; border: 2px solid; border-color: rgb(0, 255, 255, 0.5)',
            content:
            '[COLOR=rgb(0, 255, 127)][FONT=times new roman][SIZE=4][I][CENTER]{{ greeting }}, уважаемый {{ user.name }}.[/CENTER][/I][/SIZE][/FONT][/COLOR]<br><br>' +
              "[I][CENTER][COLOR=rgb(209, 213, 216)][FONT=times new roman][FONT=times new roman][SIZE=4]Данный нарушитель уже был наказан ранее.[/SIZE][/FONT][/COLOR][/CENTER][/I]<br>" +
            "[I][CENTER][SIZE=8][COLOR=rgb(255, 255, 255)]Приятного время провождения на[/COLOR][COLOR=yellow][B] Русь Mobile! [/B][/COLOR]",
            prefix: UNACCEPT_PREFIX,
            status: false,
          },


];

  $(document).ready(() => {
    // Загрузка скрипта для обработки шаблонов
    $('body').append('<script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>');

    // Добавление кнопок при загрузке страницы
    addButton('На рассмотрении', 'pin');
    addButton('Одобрено', 'accepted');
    addButton('Отказано', 'unaccept');
    addButton('Главному Администратору', 'Ga');
    addButton('Спец.адм', 'teamProject');
    addButton('Ответы', 'selectAnswer');

    // Поиск информации о теме
    const threadData = getThreadData();

    $('button#pin').click(() => editThreadData(PIN_PREFIX, false));
    $('button#accepted').click(() => editThreadData(ACCEPT_PREFIX, false));
    $('button#Ga').click(() => editThreadData(GA_PREFIX, false));
    $('button#teamProject').click(() => editThreadData(COMMAND_PREFIX, false));
    $('button#unaccept').click(() => editThreadData(UNACCEPT_PREFIX, false));
    $('button#Texy').click(() => editThreadData(TEX_PREFIX, false));
    $('button#Zakrito').click(() => editThreadData(CLOSE_PREFIX, false));

    $(`button#selectAnswer`).click(() => {
      XF.alert(buttonsMarkup(buttons), null, 'Выберите ответ:');
      buttons.forEach((btn, id) => {
        if (id > 0) {
          $(`button#answers-${id}`).click(() => pasteContent(id, threadData, false));
        }
        else {
          $(`button#answers-${id}`).click(() => pasteContent(id, threadData, false));
        }
      });
    });
  });

  function addButton(name, id) {
    $('.button--icon--reply').before(
      `<button type="button" class="button rippleButton" id="${id}" style="margin: 3px;">${name}</button>`,
    );
  }

  function buttonsMarkup(buttons) {
    return `<div class="select_answer">${buttons
  .map(
  (btn, i) =>
    `<button id="answers-${i}" class="button--primary button ` +
    `rippleButton" style="margin:5px"><span class="button-text">${btn.title}</span></button>`,
  )
  .join('')}</div>`;
  }

  function pasteContent(id, data = {}, send = false) {
    const template = Handlebars.compile(buttons[id].content);
    if ($('.fr-element.fr-view p').text() === '') $('.fr-element.fr-view p').empty();

    $('span.fr-placeholder').empty();
    $('div.fr-element.fr-view p').append(template(data));
    $('a.overlay-titleCloser').trigger('click');


  }

  function getThreadData() {
    const authorID = $('a.username')[0].attributes['data-user-id'].nodeValue;
    const authorName = $('a.username').html();
    const hours = new Date().getHours();
    return {
      user: {
        id: authorID,
        name: authorName,
        mention: `[USER=${authorID}]${authorName}[/USER]`,
      },
      greeting: () =>
        4 < hours && hours <= 11 ?
        'Доброе утро' :
        11 < hours && hours <= 15 ?
        'Добрый день' :
        15 < hours && hours <= 21 ?
        'Добрый вечер' :
        'Доброй ночи',
    };
  }

    function editThreadData(prefix, pin = false) {
// Получаем заголовок темы, так как он необходим при запросе
	const threadTitle = $('.p-title-value')[0].lastChild.textContent;

	if(pin == false){
		fetch(`${document.URL}edit`, {
		  method: 'POST',
		  body: getFormData({
			prefix_id: prefix,
			title: threadTitle,
			_xfToken: XF.config.csrf,
			_xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
			_xfWithData: 1,
			_xfResponseType: 'json',
		  }),
		}).then(() => location.reload());
	} else  {
		fetch(`${document.URL}edit`, {
		  method: 'POST',
		  body: getFormData({
			prefix_id: prefix,
			title: threadTitle,
			pin: 1,
			_xfToken: XF.config.csrf,
			_xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
			_xfWithData: 1,
			_xfResponseType: 'json',
		  }),
		}).then(() => location.reload());
	}




 if(pin == false){
		fetch(`${document.URL}edit`, {
		  method: 'POST',
		  body: getFormData({
			prefix_id: prefix,
			title: threadTitle,
			_xfToken: XF.config.csrf,
			_xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
			_xfWithData: 1,
			_xfResponseType: 'json',
		  }),
		}).then(() => location.reload());
	} else  {
		fetch(`${document.URL}edit`, {
		  method: 'POST',
		  body: getFormData({
			prefix_id: prefix,
			title: threadTitle,
			pin: 1,
			_xfToken: XF.config.csrf,
			_xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
			_xfWithData: 1,
			_xfResponseType: 'json',
		  }),
		}).then(() => location.reload());
		   }


function moveThread(prefix, type) {
// Получаем заголовок темы, так как он необходим при запросе
const threadTitle = $('.p-title-value')[0].lastChild.textContent;

fetch(`${document.URL}move`, {
  method: 'POST',
  body: getFormData({
	prefix_id: prefix,
	title: threadTitle,
	target_node_id: type,
	redirect_type: 'none',
	notify_watchers: 1,
	starter_alert: 1,
	starter_alert_reason: "",
	_xfToken: XF.config.csrf,
	_xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
	_xfWithData: 1,
	_xfResponseType: 'json',
  }),
}).then(() => location.reload());
}

function getFormData(data) {
	const formData = new FormData();
	Object.entries(data).forEach(i => formData.append(i[0], i[1]));
	return formData;
  }
    }
})();