## Пункт 5. Создание основного контейнера страницы

Было бы неудобно прикреплять приборы внутри космолета прямо на его корпус, поэтому добавляют как минимум обшивку, а часто и вовсе внутреннюю отделку создают. Аналогично, чтобы удобно размещать все элементы сайта, есть смысл создать один общий, и уже на него помещать все прочие блоки тегов, т.е. создать некий контейнер, в котором будут содержаться все основные элементы сайта. Таким образом, у нас будет возможность конфигурировать настройки этого контейнера так, как нам будет нужно. 

### Шаг 1: Создание разметки для контейнера

Создадим контейнер `wrapper`, который будет центрировать все содержимое и задавать ему максимальную ширину. Вставь в `index.html` после спутника:
```html
<main class="wrapper">
  
</main>
```
Хочется подметить важный момент. Тут использовался тег `main`. Чем же он отличается от стандартного `div`?  
Функционально — ничем. Но для чего он тогда нужен вообще?  
Тут главное не забывать, что сайт должен не только хорошо выглядеть и выполнять поставленные перед ним задачи, в современном интернете он также должен соблюдать семантику. То есть теги не просто должны создавать структуру, они должны это делать со смыслом. Касается не только самих блоков тегов, но и их содержимого, например, текста. Это нужно для того, чтобы стороннее ПО могло использовать твой сайт.  
Например, чтобы поисковая система по запросу пользователя могла понять, что именно он ему нужен. Ну или, например, чтобы программа чтения текста для людей с плохим зрением могла это делать с выражением и не путаться в последовательности и важности элементов страницы.

Да и вообще, представь, что приходит новый инженер на проект создания космолета, смотрит чертежи предыдущего инженера, и видит, что все детали обозначены одинаково, вот и как ему теперь понять, какая из них какой является? Вот чтобы такой же ситуации, но с сайтом, не случилось на реальном проекте, одинаковые по функции, но разные по смыслу элементы обозначаются разными тегами.

То есть, подытожив, можно обойтись и без этого, но это непрофессионально.

### Шаг 2: Добавление стилей для контейнера
Добавь в `styles.css`:
```css
.wrapper {
  position: relative;
  z-index: 1;
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 72px;
}
```
Тут использовался атрибут `padding`, по сути, это тот же `margin`, но отступы создаются не со внешней стороны, а со внутренней, иногда так удобнее.

Кроме того, использовалось очередное значение атрибута `position`, разберемся, какие вообще они бывают:
- `absolute` — абсолютное отображение, то есть от корня (всей страницы);
- `fixed` — как абсолютное, но закреплено не к странице, а к экрану (не меняет положение при прокрутке);
- `relative` — положение относительно блока предыдущего тега;
- `static` — как `relative`, но не меняет положения от отступов;
- `inherit` — как у родительского тега.

В реальной космической навигации расположение объектов задается крайне непросто. Но, хотя бы теперь ты знаешь, как располагать блоки тегов на странице.

## Пункт 6. Создание шапки страницы (hero-секция)

Если представить, что наш сайт – это космический корабль, то тогда "шапка" – это его элегантный нос, который высится сверх всех креплений и встречает зрителей. Здесь мы создадим первое впечатление, захватим внимание и подготовим пользователей к "полету" по контенту сайта!

### Шаг 1: Создание разметки для шапки страницы

Внутри нашего основного "корпуса" сайта (`wrapper`) мы создадим секцию `hero`. Это будет наша главная сцена, где разместятся:
- яркий заголовок: приветствие, которое сразу погрузит в атмосферу праздника;
- информативное описание: немного о том, почему этот день так важен;
- изображение ракеты: символ нашего полета к звездам.

Вставь в `index.html` внутрь `main`:
```html
<section class="hero">
  <div class="ribbon-section">
  <div class="ribbon-left">
    <span class="star">★</span> 12 апреля· праздник мечты, мужества и звезд
    <span class="star">★</span>
  </div>
  <div class="ribbon-right">
    <span class="star">★</span> Цифровой марафон 2026
    <span class="star">★</span>
  </div>
</div>
  <div class="hero-grid">
    <div>
      <h1 class="title">С <span class="gold">Днем</span><br>космонавтики!</h1>
      <p class="subtitle">
        Пусть сердце смело стремится вперед, идеи взлетают выше облаков, а каждый новый день открывает
        собственную орбиту вдохновения, открытий и побед.
      </p>
      <div class="hero-badges">
        <div class="badge">Время первых</div>
        <div class="badge">Мечтай масштабно</div>
        <div class="badge">Держи курс к звездам</div>
      </div>
    </div>


    <div class="poster-art" aria-hidden="true">
      <div class="sunburst"></div>
      <div class="rocket-wrap">
        <div class="rocket-trail"></div>
        <img src="shared/icons/rocket.svg" class="rocket-svg" alt="Ракета">
      </div>
    </div>
  </div>
</section>
```
Как можно было заметить, использовались новые теги, например:
- `section` — тег для задания секции текста;
- `h1` (`h2`-`h6`) — тег заголовков;
- `p` — тег параграфа.

Да, "строительные блоки", из которых мы собираем нашу разметку, в том числе могут быть текстовыми. Раз уж зашла речь о них, отдельно расскажем про `span`, так как это особенный тег, ведь он есть предназначен для размещения прямо внутри текста (в то время как другие теги обычно имеют форму прямоугольного блока и в текст "не помещаются"). По сути это `div` для текста.

### Шаг 2: Добавление стилей для шапки
Добавь в `styles.css` стили, которые оформят шапку страницы, ленточку с датой, заголовок и плашки:
```css
.hero {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(247, 215, 116, 0.26);
  border-radius: 28px;
  box-shadow: var(--shadow);
  background:
    radial-gradient(circle at 20% 20%, rgba(115, 199, 255, 0.15), transparent 30%),
    radial-gradient(circle at 80% 10%, rgba(247, 215, 116, 0.13), transparent 24%),
    radial-gradient(circle at 50% 80%, rgba(214, 40, 40, 0.18), transparent 34%),
    linear-gradient(138deg, #00d900b7 0%, #bf1be382 38%, var(--bg-deep) 100%);
  padding: 44px 28px 34px;
  isolation: isolate;
}

.hero::before {
  content: "";
  position: absolute;
  inset: -30% auto auto -10%;
  width: 360px;
  height: 360px;
  background: radial-gradient(circle, rgba(247, 215, 116, 0.18), transparent 70%);
  animation: glowMove 7s ease-in-out infinite;
  z-index: -1;
}

.hero::after {
  content: "";
  position: absolute;
  right: -90px;
  bottom: -90px;
  width: 380px;
  height: 380px;
  border-radius: 50%;
  border: 2px solid rgba(247, 215, 116, 0.16);
  box-shadow: inset 0 0 0 16px rgba(255, 255, 255, 0.02), inset 0 0 0 44px rgba(255, 255, 255, 0.015);
  animation: rotateSeal 14s linear infinite;
  z-index: -1;
}

@keyframes glowMove {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(28px, 18px) scale(1.08); }
}

@keyframes rotateSeal {
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
}

.ribbon-section {
  display: flex;
  justify-content: space-between;
}

.ribbon-left,
.ribbon-right {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid rgba(247, 215, 116, 0.32);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 18px;
  backdrop-filter: blur(6px);
  animation: ribbonBlink 3s ease-in-out infinite;
}

.ribbon-left {
  background: linear-gradient(
    90deg,
    rgba(247, 215, 116, 0.18),
    rgba(255, 255, 255, 0.08)
  );
}

.ribbon-right {
  background: linear-gradient(141deg, #349b43ad, #671f84);
}

@keyframes ribbonBlink {
  0%, 100% { box-shadow: 0 0 0 rgba(247, 215, 116, 0); }
  50% { box-shadow: 0 0 28px rgba(247, 215, 116, 0.22); }
}

.hero-grid {
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 28px;
  align-items: center;
}

.title {
  margin: 0;
  font-size: clamp(38px, 6vw, 78px);
  line-height: 0.96;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  text-shadow: 0 5px 20px rgba(0, 0, 0, 0.35);
}

.title .gold {
  color: var(--gold);
  display: inline-block;
  animation: titlePulse 4s ease-in-out infinite;
}

.subtitle {
  max-width: 720px;
  margin: 18px 0 0;
  font-size: clamp(18px, 2.2vw, 24px);
  line-height: 1.5;
  color: rgba(255, 245, 214, 0.94);
}

.hero-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 22px;
}

.badge {
  padding: 10px 14px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  font-weight: 700;
  backdrop-filter: blur(4px);
  animation: badgeLift 6s ease-in-out infinite;
}

.badge:nth-child(2) { animation-delay: 0.8s; }
.badge:nth-child(3) { animation-delay: 1.6s; }

@keyframes badgeLift {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes titlePulse {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px) scale(1.01); }
}
```
Вот мы "оживили" нашу шапку с помощью стилей. Мы активно использовали один очень важный атрибут – `display`. Он отвечает за то, как именно отображаются элементы внутри блока тега и он сам. У него множество значений, познакомимся с основными:
- `block` — отображение тега в виде блока (даже `span`);
- `inline` — все теги внутри отображаются строго по линии, даже если обычно переносятся;
- `list-item` — тег отображается как пункт списка;
- `table` — тег отображается как блочная таблица;
- `grid` — тег отображается как блочная сетка;
- `none` — блок есть в разметке, но не отображается и никак на влияет на сайте;
- `flex` — относительно новое значение, которое позволяет совершать гибкую настройку блока тега, например, равномерно распределяя блоки в нем.

На всякий случай, с дисплеями, как, например, на борту космических кораблей, данный атрибут не имеет ничего общего. Он задает внешний вид элемента сайта.

## Пункт 7. Добавление стилей для блока с ракетой

Теперь наша ракета не будет просто стоять на месте! Мы добавим ей вращающийся солнечный круг и волшебный анимированный шлейф, который будет следовать за ней. Добавь в `styles.css`:
```css
.poster-art {
  position: relative;
  min-height: 420px;
  display: grid;
  place-items: center;
}

.sunburst {
  position: absolute;
  width: 330px;
  height: 330px;
  border-radius: 50%;
  background: conic-gradient(
    from 0deg,
    rgba(247, 215, 116, 0.95) 0deg 8deg, rgba(247, 215, 116, 0.12) 8deg 16deg,
    rgba(247, 215, 116, 0.95) 16deg 24deg, rgba(247, 215, 116, 0.12) 24deg 32deg,
    rgba(247, 215, 116, 0.95) 32deg 40deg, rgba(247, 215, 116, 0.12) 40deg 48deg,
    rgba(247, 215, 116, 0.95) 48deg 56deg, rgba(247, 215, 116, 0.12) 56deg 64deg,
    rgba(247, 215, 116, 0.95) 64deg 72deg, rgba(247, 215, 116, 0.12) 72deg 80deg,
    rgba(247, 215, 116, 0.95) 80deg 88deg, rgba(247, 215, 116, 0.12) 88deg 96deg,
    rgba(247, 215, 116, 0.95) 96deg 104deg, rgba(247, 215, 116, 0.12) 104deg 112deg,
    rgba(247, 215, 116, 0.95) 112deg 120deg, rgba(247, 215, 116, 0.12) 120deg 128deg,
    rgba(247, 215, 116, 0.95) 128deg 136deg, rgba(247, 215, 116, 0.12) 136deg 144deg,
    rgba(247, 215, 116, 0.95) 144deg 152deg, rgba(247, 215, 116, 0.12) 152deg 160deg,
    rgba(247, 215, 116, 0.95) 160deg 168deg, rgba(247, 215, 116, 0.12) 168deg 176deg,
    rgba(247, 215, 116, 0.95) 176deg 184deg, rgba(247, 215, 116, 0.12) 184deg 192deg,
    rgba(247, 215, 116, 0.95) 192deg 200deg, rgba(247, 215, 116, 0.12) 200deg 208deg,
    rgba(247, 215, 116, 0.95) 208deg 216deg, rgba(247, 215, 116, 0.12) 216deg 224deg,
    rgba(247, 215, 116, 0.95) 224deg 232deg, rgba(247, 215, 116, 0.12) 232deg 240deg,
    rgba(247, 215, 116, 0.95) 240deg 248deg, rgba(247, 215, 116, 0.12) 248deg 256deg,
    rgba(247, 215, 116, 0.95) 256deg 264deg, rgba(247, 215, 116, 0.12) 264deg 272deg,
    rgba(247, 215, 116, 0.95) 272deg 280deg, rgba(247, 215, 116, 0.12) 280deg 288deg,
    rgba(247, 215, 116, 0.95) 288deg 296deg, rgba(247, 215, 116, 0.12) 296deg 304deg,
    rgba(247, 215, 116, 0.95) 304deg 312deg, rgba(247, 215, 116, 0.12) 312deg 320deg,
    rgba(247, 215, 116, 0.95) 320deg 328deg, rgba(247, 215, 116, 0.12) 328deg 336deg,
    rgba(247, 215, 116, 0.95) 336deg 344deg, rgba(247, 215, 116, 0.12) 344deg 352deg,
    rgba(247, 215, 116, 0.95) 352deg 360deg
  );
  filter: blur(1px) drop-shadow(0 0 24px rgba(247, 215, 116, 0.25));
  animation: spin 28s linear infinite;
  opacity: 0.9;
}

.rocket-wrap {
  position: relative;
  width: 280px;
  height: 360px;
  display: grid;
  place-items: center;
  animation: rocketFloat 4s ease-in-out infinite;
}

@keyframes rocketFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
}

.rocket-trail {
  position: absolute;
  bottom: 6px;
  width: 46px;
  height: 120px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(247, 215, 116, 0.85), rgba(214, 40, 40, 0));
  filter: blur(10px);
  border-radius: 50% 50% 60% 60%;
  animation: flame 1s ease-in-out infinite alternate;
  transform-origin: top center;
}

@keyframes flame {
  from { transform: scaleY(0.9) scaleX(0.92); opacity: 0.85; }
  to { transform: scaleY(1.08) scaleX(1.06); opacity: 1; }
}

.rocket-svg {
  position: relative;
  width: 240px;
  filter: drop-shadow(0 24px 40px rgba(0, 0, 0, 0.4));
  transform: rotate(-18deg);
}
```
А знаешь, что еще очень важно в дизайне? Конечно же, цвет! В мире веб-разработки мы работаем с RGB-палитрой, но есть разные способы задать цвет:
- прямой код – можно просто написать `color: #FF33DA`; – это как дать точный "код краски".
- названия цветов – для некоторых цветов есть простые имена, вроде "red" или "blue". Но их не так много, поэтому этот способ не всегда удобен.
- специальные функции – это самый мощный и гибкий способ! Мы будем использовать:
	- `rgba` — задает значение цвета по RGB, а также задает прозрачность (4-е значение), что часто удобно;
	- `linear-gradient` — задает цветовой градиент (линейно);
	- `conic-gradient` — задает цветовой градиент (конусом);

## Пункт 8. Создание секции с поздравлением

Наш сайт – это не просто код, это еще и место, где мы можем поделиться праздничным настроением! Поэтому мы добавим секцию, где сможем искренне поздравить всех с Днем Космонавтики.

### Шаг 1: Создание разметки для секции с поздравлением

Эта секция будет наполнена праздничным текстом. И пусть он будет нешаблонным, а действительно искренним! Если тебе захочется вдохновения, можно обратиться к помощи умных ИИ-инструментов, например, **GigaChat** – ведь ты уже пробовал это делать! А ведь текст еще проще сгенерировать, чем картинку, тем более, что мы поможем "настроить модуль коммуникации" с этим "инопланетянином".

Промпт для картинки пазла:
```
Роль: 
Ты — профессиональный копирайтер с инженерным образованием, специализирующийся на написании нетривиальных и душевных поздравлений для любых праздников
Задача: 
Составь текст поздравления с Днем космонавтики (12 апреля)
Требования:
- Стиль поздравления: вдохновляющий и мотивирующий
- Кому адресовано: поздравление должно быть универсальнымв
- В тексте поздравления используй следующие элементы:
  - интересный исторический факт о полете Юрия Гагарина
  - пожелания с космическими метафорами
  - запоминающаяся завершающая фраза
Формат ответа:
Выведи только составленный текст поздравления. Разложи поздравление на два абзаца: 
- первый - короткий (до 100 символов) в формате емкой мотивирующей фразы 
- второй абзац - более детализированное поздравление (до 1000 символов) 
```
Вставь в `index.html` после закрывающего тега `section` шапки:
```html
<section class="section">
  <h2 class="section-title">Поздравление</h2>
  <div class="greeting">
    Дорогие покорители мечты, с <strong>Днем космонавтики</strong>!
    [текст поздравления].
  </div>
</section>
```
Как ты, наверное, уже понял, в этой части нужно заменить текст "[текст поздравления]" на сгенерированный тобой. Пример, как должно получится (но нужно создать свое):
```html
<section class="section">
  <h2 class="section-title">Поздравление</h2>
  <div class="greeting">
    Дорогие покорители мечты, с <strong>Днем космонавтики</strong>!
    Пусть в душе всегда живет смелость первооткрывателя, в мыслях — ясный горизонт,
    а впереди ждут яркие свершения. Пусть, как когда-то первый полет человека в космос,
    каждый ваш шаг напоминает: невозможное становится реальностью, когда есть вера,
    упорство и стремление вверх. Желаю вдохновения, внутренней силы, радости открытий
    и настоящего звездного настроения!
  </div>
</section>
```

### Шаг 2: Добавление стилей для секций и поздравления

Добавь в `styles.css` общие стили для всех секций и оформление текста поздравления:
```css
.section {
  margin-top: 26px;
  padding: 28px;
  border-radius: 28px;
  background: var(--panel);
  border: 1px solid var(--line);
  box-shadow: var(--shadow);
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;
}

.section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent, rgba(255, 255, 255, 0.03), transparent);
  transform: translateX(-100%);
  animation: sheen 7s linear infinite;
  pointer-events: none;
}

@keyframes sheen {
  0% { transform: translateX(-100%); }
  35%, 100% { transform: translateX(140%); }
}

.section-title {
  margin: 0 0 18px;
  font-size: clamp(28px, 4vw, 42px);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--gold);
}

.greeting {
  font-size: clamp(18px, 2.1vw, 24px);
  line-height: 1.8;
  max-width: 900px;
  color: rgba(255, 245, 214, 0.96);
}

.greeting strong {
  color: var(--gold);
}
```
Так как здесь у нас было много текста, давай посмотрим, какие "стильные штучки" мы ему (и тексту из предыдущих частей разметки) применяли:
- `font-family` — выбор шрифта текста;
- `font-size` — выбор размера текста;
- `font-weight` — жирность текста;
- `text-align` — выравнивание текста;
- `color` — задание цвета текста;
- `line-height` — высота строки.

## Пункт 9. Добавление бегущей строки

Чтобы наш сайт был еще более динамичным, давай добавим бегущую строку! Она будет мелькать праздничными лозунгами, создавая атмосферу движения и веселья.

### Шаг 1: Создание разметки для бегущей строки

Здесь мы просто подготовим место, где будет "бегать" наш текст. Вставь в `index.html` внутрь секции с поздравлением, после блока greeting:
```html
<div class="ticker" aria-label="Бегущая строка">
  <div class="ticker-track">
    <span>★ Поехали! ★</span>
    <span>Слава покорителям космоса ★</span>
    <span>Мечтай. Дерзай. Взлетай. ★</span>
    <span>12 апреля — День космонавтики ★</span>
    <span>Поехали! ★</span>
    <span>Слава покорителям космоса ★</span>
    <span>Мечтай. Дерзай. Взлетай. ★</span>
    <span>12 апреля — День космонавтики ★</span>
  </div>
</div>
```
Можно было в этой и предыдущих частях разметки увидеть, что атрибутам можно давать значение не только в стилях, но и сразу в теге, просто обычно это неудобно. Но иногда это все-таки практично (например, как в данном случае, поставить метку тегу). А иногда без этого не получится, например, чтобы задать класс или `id`.

### Шаг 2: Добавление стилей для бегущей строки

Добавь в `styles.css`:
```css
.ticker {
  margin-top: 22px;
  border: 1px solid rgba(247, 215, 116, 0.28);
  background: rgba(214, 40, 40, 0.16);
  border-radius: 999px;
  overflow: hidden;
  position: relative;
}

.ticker-track {
  display: flex;
  gap: 32px;
  white-space: nowrap;
  padding: 12px 0;
  min-width: max-content;
  animation: tickerMove 24s linear infinite;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--cream);
}

@keyframes tickerMove {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
```
А что помогает бегущей строке двигаться? Главный волшебник здесь – атрибут `overflow` со значением "hidden".  
Представь, что у нас есть большая лента с текстом, но мы показываем только ее часть.  
Атрибут `overflow: hidden`; говорит: "Все, что выходит за пределы видимой области, – скрываем!".  
Благодаря этому наша строка плавно перемещается, не "вылезая" за границы.

## Пункт 10. Создание галереи с фотографиями

Никакой праздник не обходится без воспоминаний! Давай создадим галерею, где разместим знаковые изображения – нашего первого космонавта Юрия Гагарина и, конечно же, легендарную ракету.

### Шаг 1: Создание разметки для галереи

Галерея будет состоять из двух карточек с изображениями Юрия Гагарина и ракеты. Вставь в `index.html` после секции с поздравлением:
```html
<section class="section">
  <h2 class="section-title">Лица эпохи и полет мечты</h2>
  <div class="gallery">
    <article class="photo-card">
      <img src="shared/pictures/gagarin.jpeg" alt="Юрий Гагарин">
      <div class="photo-label">
        <h3>Юрий Гагарин</h3>
        <p>Первый человек в космосе — символ отваги, улыбки и великого начала космической эры.</p>
      </div>
    </article>


    <article class="photo-card">
      <img src="shared/pictures/rocket-launch.jpeg" alt="Ракета на старте">
      <div class="photo-label">
        <h3>Ракета на старте</h3>
        <p>Мгновение, когда земля остается внизу, а впереди — только свет, высота и звездный путь.</p>
      </div>
    </article>
  </div>
</section>
```
Тут использовался новый полезный семантический тег `article`, он нужен для того, чтобы помечать текст, который является самостоятельным (отдельным от остальных). Представь, что это как отдельная статья в газете, которая не зависит от всего остального.

### Шаг 2: Добавление стилей для галереи

Добавь в `styles.css`:
```css
.gallery {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}

.photo-card {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid rgba(247, 215, 116, 0.28);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
  height: 480px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.photo-card:hover {
  transform: translateY(-6px) scale(1.01);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
}

.photo-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.02);
  transition: transform 0.7s ease;
  filter: saturate(0.95) contrast(1.05);
}

.photo-card:hover img {
  transform: scale(1.08);
}

.photo-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(7, 16, 32, 0.02), rgba(7, 16, 32, 0.05) 35%, rgba(7, 16, 32, 0.84) 100%);
  z-index: 1;
}

.photo-card::after {
  content: "";
  position: absolute;
  inset: 14px;
  border: 1px solid rgba(247, 215, 116, 0.32);
  border-radius: 18px;
  z-index: 1;
  pointer-events: none;
}

.photo-label {
  position: absolute;
  left: 22px;
  right: 22px;
  bottom: 18px;
  z-index: 2;
}

.photo-label h3 {
  margin: 0 0 8px;
  font-size: 28px;
  color: var(--gold);
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.4);
}

.photo-label p {
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  color: rgba(255, 245, 214, 0.94);
}
```
В стилевой части мы будем использовать такие "секретные приемы" как псевдоклассы и псевдоэлементы:
- псевдоклассы – они позволяют нам применить стили к элементу, когда он находится в каком-то особом состоянии (например, `hover`: когда мы наводим на него курсор мыши, в этот момент он может изменить цвет или увеличить размер, будто оживая);
- псевдоэлементы – это словно мы можем "заглянуть внутрь" элемента и стилизовать его части, которые сами по себе не являются отдельными элементами (например, `first-line`: чтобы задать особый стиль первой строке текста).
 
Чтобы использовать их, мы ставим двоеточие перед псевдоклассом и два двоеточия перед псевдоэлементом. А еще мы можем комбинировать их с тегами и классами, чтобы действовать только на определенные элементы. Например, `div:hover` – это стиль, который сработает только для `div`, над которым в данный момент курсор мыши пользователя.

> Переходи к выполнению инструкции в файле [`Instruction_4_Building_the_Game.md`](/Instructions/Instruction_4_Building_the_Game.md).