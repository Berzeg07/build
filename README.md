<h2> Инструкция по работе</h2>

<li>Скачиваем и устанавливаем <b>node js</b> <a href="https://nodejs.org/en/" target="_blank">по ссылке</a> </li>
<li> Устанавливаем <b>gulp</b> глобально - <b>npm install -g gulp</b>, проверка версии: <b>gulp -v1</b></li>
<li>Устанавливаем <b>gulp</b> локально, в папке с проектом: <b>npm install gulp --save-dev</b>, или короткая команда <b>npm i</b> - появится папка <b>node_modules</b>. Установка может занять в среднем 5 минут.</b>
<li>Если требуется инициализируем <b>node js</b> в папке с проектом, <b>npm init</b> - название любое, далее поля не заполняются, жмем enter. Должен появиться файл <b>package.json</b>. Если такой файл имеется, команда не требуется</li>
<li>Начало работы, команда в консоли - <b>gulp</b>, откроется окно с проектом в браузере, галп начинает следить за всеми файлами, при любом сохранении срабатывает автообновление браузера.</li>
<li>Сборка проекта - <b>gulp build</b>.</li>

<h2>Структура сборки</h2>
	
<li>Работа ведется в папке <b>dev</b></li>
<li>Папка <b>pug/layout/main.pug</b> - основной шаблон для всех страниц, подключается <b>extends ../layout/main</b><br>
Папка <b>pug/modules/</b> основные блоки, которые повторяются на всех страницах.<br>
Подключение - <b>include ../modules/menu</b></li>
<li>Папка <b>pages</b> - тут создаем все рабочие страницы с расширением <b>pug</b>.</li>
<li>Папка <b>Fonts</b> - подключение шрифтов</li>
<li>Папка <b>img/content</b> - контентные изображения на страницах.</li>
<li>Папка <b>img/general</b> - общие изображения, повторяющиеся на разных страницах, например логотип, так же отдельные директории для спрайтов и <b>svg</b></li>
<li>Папка <b>js</b> - файл с <b>jquery</b>, <b>libs.min.js</b> - минифицированные файлы библиотек,  свой код пишем в <b>main.js</b></li>
<li>Папка <b>libs</b> - подключенные библиотеки</li>
<li>Папка <b>styles/modules/</b> сюда выносим стили для повторяющихся блоков (футер, хедер, меню). </li>
<li>Папка <b>Page/</b> стили для главной страницы.</li>
<li>Файл <b>common_styl/</b> сюда включаем стили для общих элементов (кнопки, заголовки). </li>
<li>Файл <b>libs.styl/</b> подключаем стили библиотек. Далее файлы с миксинами, переменными и медиа запросами.</li>
<li>Файл <b>main.styl</b> - тут предустановки стилей, работу ведем в этом файле.</li>
      





