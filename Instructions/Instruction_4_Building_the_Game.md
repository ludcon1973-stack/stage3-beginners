## Пункт 11. Создание секции с игрой "Пятнашки"

Чтобы наш сайт был не просто красивым, но и интерактивным, хорошей идеей будет добавить небольшую игру!  
Игра "Пятнашки" – это отличный способ заставить пользователя задержаться и получить удовольствие. А там, смотришь, быть может, он захочет еще с чем-нибудь на сайте ознакомится. Это довольно практичный прием.

Эта секция будет включать саму игру и небольшую информацию о ней. Вставь в `index.html` после галереи:
```html
<section class="section">
  <h2 class="section-title">Космические пятнашки</h2>
  <div class="game-grid">
    <div class="game-panel">
      <div id="puzzle" class="puzzle-board" aria-label="Игра пятнашки"></div>
      <div class="hint">Нажимай на плитку рядом с пустой клеткой, чтобы собрать космическую картинку.</div>
    </div>


    <div class="game-info">
      <p>
        В этой версии классической игры тебя ждет <strong>космическая мозаика</strong>.
        Собери изображение, переставляя фрагменты по одному, и открой праздничное сообщение.
      </p>
      <p>
        Игра начинается с перемешанной, но решаемой комбинации. Для большего настроения здесь много сияния,
        движения и легкой атмосферы ретро-футуризма.
      </p>


      <div class="controls">
        <button id="shuffleBtn">Перемешать</button>
        <button id="solveBtn" class="secondary">Помочь собрать</button>
      </div>


      <div class="stats">
        <div class="stat"><span>Ходы</span><strong id="moves">0</strong></div>
        <div class="stat"><span>Побед</span><strong id="wins">0</strong></div>
      </div>


      <div class="preview" aria-hidden="true"></div>
    </div>
  </div>
</section>
```
Так как это игра, там нужны будут кнопки для каких-либо действий.  
В `HTML` кнопки можно добавить с помощью тега `button`.  
Вообще, есть множество тегов для взаимодействия с пользователем (т.н. элементы управления), например, `input` (поле ввода текста), но конкретно тут они использоваться не будут.

## Пункт 12. Добавление стилей для игры

Добавь в `styles.css`:
```css
.game-grid {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 24px;
  align-items: start;
}

.game-panel,
.game-info {
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

.game-info p {
  margin: 0 0 14px;
  line-height: 1.7;
  font-size: 17px;
  color: rgba(255, 245, 214, 0.94);
}

.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 18px 0;
}

button {
  appearance: none;
  border: 0;
  cursor: pointer;
  padding: 12px 18px;
  border-radius: 14px;
  font-weight: 800;
  letter-spacing: 0.03em;
  color: #210a0a;
  background: linear-gradient(180deg, var(--gold), var(--gold-soft));
  box-shadow: 0 10px 20px rgba(247, 215, 116, 0.2);
  transition: transform 0.16s ease, box-shadow 0.16s ease, filter 0.2s ease;
}

button:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 24px rgba(247, 215, 116, 0.28);
  filter: brightness(1.03);
}

button.secondary {
  color: var(--cream);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.06));
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: none;
}

.stats {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 10px;
}

.stat {
  min-width: 120px;
  padding: 12px 14px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat span {
  display: block;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  opacity: 0.7;
  margin-bottom: 6px;
}

.stat strong {
  font-size: 24px;
  color: var(--gold);
}
```
Мы привыкли, что кнопки выглядят "активно", словно готовы к нажатию, нужно как-то перенести это в сайт.  
Подобно тому, как на приборных панелях в самолетах и космических аппаратах, кнопки, тумблеры и прочие элементы делаются максимально похожими на те, которые были раньше, крайне неактивно заменяя их не сенсорные экраны. И дело не только в безопасности или эргономике, а, в том числе, в т.н. "user experience" (`UX`), "пользовательском опыте", то есть проектирование взаимодействия с будущим пользователем со стороны его привычек и опыта.  
Это можно сделать классическим изменением курсора со стрелки на указывающую ладонь, изменив значение атрибута `cursor`.

Также была добавлена тень с использованием атрибута `box-shadow`. Это делалось и раньше, но в сугубо декоративных целях, а теперь этому есть логическая причина.

## Пункт 13. Добавление стилей для игрового поля

Добавь в `styles.css`:
```css
.puzzle-board {
  --size: min(76vw, 520px);
  width: var(--size);
  height: var(--size);
  max-width: 100%;
  aspect-ratio: 1;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 8px;
  padding: 10px;
  background: rgba(5, 12, 24, 0.8);
  border-radius: 22px;
  border: 1px solid rgba(247, 215, 116, 0.25);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.03), 0 14px 35px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.puzzle-board::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.07), transparent 30%);
  pointer-events: none;
}

.tile {
  position: relative;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  background-image: url('../shared/pictures/space-puzzle.jpeg');
  background-size: 300% 300%;
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.24);
  transition: transform 0.18s ease, box-shadow 0.18s ease, opacity 0.25s ease;
  cursor: pointer;
  isolation: isolate;
}

.tile:hover {
  transform: scale(1.02);
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.34);
}

.tile::after {
  content: attr(data-num);
  position: absolute;
  left: 8px;
  top: 8px;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(7, 16, 32, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.16);
  color: var(--cream);
  font-weight: 800;
  font-size: 13px;
  z-index: 1;
  backdrop-filter: blur(4px);
}

.tile.empty {
  background: rgba(255, 255, 255, 0.04);
  border-style: dashed;
  cursor: default;
  box-shadow: inset 0 0 18px rgba(0, 0, 0, 0.18);
}

.tile.empty::after {
  content: "✦";
  background: transparent;
  border: 0;
  color: rgba(247, 215, 116, 0.55);
  font-size: 22px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: auto;
  height: auto;
}

.hint {
  margin-top: 14px;
  font-size: 14px;
  opacity: 0.8;
  text-align: center;
}

.preview {
  margin-top: 18px;
  width: min(240px, 100%);
  aspect-ratio: 1;
  border-radius: 20px;
  border: 1px solid rgba(247, 215, 116, 0.25);
  background-image: url('../shared/pictures/space-puzzle.jpeg');
  background-size: cover;
  background-position: center;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.28);
  overflow: hidden;
  position: relative;
}

.preview::after {
  content: "Образец";
  position: absolute;
  left: 12px;
  bottom: 12px;
  padding: 8px 10px;
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  background: rgba(7, 16, 32, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
```
В этой части особую роль играет атрибут `isolation`. Он помогает нам избежать "смешивания" элементов, когда они имеют одинаковое расположение по глубине (`z-index`). Это как управлять слоями в графическом редакторе, чтобы каждый элемент оставался на своем месте.

## Пункт 14. Создание модального окна для победы

Когда игрок пройдет все испытания и победит, ему нужно об этом красиво сообщить! Для этого мы создадим модальное окно – небольшое окошко, которое появляется поверх основного сайта, чтобы вручить поздравление. Это и практично, и удобно: не нужно менять существующую разметку, ведь окно будет появляться поверх всего сайта.

### Шаг 1: Создание разметки для модального окна победы

Вставь в `index.html` перед закрывающим тегом `body`:
```html
<div class="success" id="successModal" role="dialog" aria-modal="true" aria-labelledby="successTitle">
  <div class="success-card">
    <h3 id="successTitle">Поехали!</h3>
    <p>
      Космическая картинка собрана! Пусть каждый твой день будет похож на удачный старт:
      яркий, вдохновляющий и устремленный к новым высотам.
    </p>
    <button id="closeModal">Продолжить праздник</button>
  </div>
</div>
```

Здесь мы активно используем id – это уникальный идентификатор для каждого элемента. Представь, что это как личный номер для каждого объекта на сайте. Важно помнить, что все id должны быть разными! Как и было сказано ранее, такое есть смысл сделать, если, например, много однотипных тегов должны иметь разные стили.

### Шаг 2: Добавление стилей для модального окна

Добавь в styles.css:
```css
.success {
  position: fixed;
  inset: 0;
  display: none;
  place-items: center;
  background: rgba(3, 8, 22, 0.72);
  backdrop-filter: blur(8px);
  z-index: 10;
  padding: 20px;
}

.success.show {
  display: grid;
  animation: fadeIn 0.35s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.success-card {
  width: min(92vw, 560px);
  border-radius: 28px;
  padding: 30px;
  text-align: center;
  border: 1px solid rgba(247, 215, 116, 0.32);
  background: linear-gradient(156deg, #00d900 0%, #861be3af 81%);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
  position: relative;
  overflow: hidden;
}

.success-card::before,
.success-card::after {
  content: "★";
  position: absolute;
  font-size: 28px;
  color: rgba(247, 215, 116, 0.85);
  animation: burst 1.8s ease-in-out infinite;
}

.success-card::before {
  top: 18px;
  left: 18px;
}
.success-card::after {
  bottom: 18px;
  right: 22px;
  animation-delay: 0.6s;
}

@keyframes burst {
  0%, 100% { transform: scale(1) rotate(0); opacity: 0.7; }
  50% { transform: scale(1.3) rotate(18deg); opacity: 1; }
}

.success-card h3 {
  margin: 0 0 12px;
  font-size: clamp(28px, 5vw, 44px);
  color: var(--gold);
  text-transform: uppercase;
}

.success-card p {
  margin: 0 0 22px;
  line-height: 1.7;
  font-size: 18px;
  color: rgba(255, 245, 214, 0.96);
}
```
Хочется избежать повторений в коде? Не проблема! Как ты мог заметить, возможно применять одни и те же стили к разным элементам, просто перечисляя их классы или теги через запятую перед фигурными скобками.

> Переходи к выполнению инструкции в файле [`Instruction_5_Final_Styling.md`](/Instructions/Instruction_5_Final_Styling.md).