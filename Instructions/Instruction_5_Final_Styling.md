## Пункт 15. Создание футера

Футер – это как "нижний колонтитул" в книге, расположенный в самом конце страницы. Его обычно используют для того, чтобы помещать какую-нибудь важную информацию, например, контактную. Мы же его используем для того, чтобы в последний раз поздравить пользователей нашего сайта с праздником.

### Шаг 1: Добавление разметки для футера

Вставь в `index.html` перед закрывающим тегом `main`:
```html
<div class="footer">★ С праздником, земляне! Пусть путь к звездам начинается с мечты ★</div>
```

### Шаг 2: Добавление стилей для футера

Добавь в `styles.css`:
```css
.footer {
  margin-top: 26px;
  text-align: center;
  opacity: 0.82;
  font-size: 14px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}
```
Здесь мы используем `letter-spacing` для регулировки расстояния между буквами, делая текст более читаемым и элегантным. А text-transform поможет нам сделать все буквы заглавными, что придаст тексту особый вид.

## Пункт 16. Добавление адаптивных стилей для мобильных устройств

Важно помнить, что наш сайт увидят не только на больших мониторах, но и на маленьких экранах смартфонов. Поэтому нужно сделать так, чтобы он хорошо выглядел везде!

Добавь в конец файла `styles.css`:
```css
@media (max-width: 980px) {
  .hero-grid,
  .gallery,
  .game-grid {
    grid-template-columns: 1fr;
  }

  .poster-art {
    min-height: 360px;
  }

  .photo-card {
    min-height: 360px;
  }
}

@media (max-width: 850px) {
  .ribbon-section {
    flex-direction: column;
  }

.ribbon-left, .ribbon-right {
    justify-content: center;
    text-align: center;
  }
}

@media (max-width: 640px) {
  .wrapper {
    width: min(100% - 18px, 1180px);
  }
  .hero,
  .section {
    padding: 20px;
    border-radius: 22px;
  }
  .title {
    line-height: 1.02;
  }
  .rocket-wrap {
    width: 240px;
    height: 300px;
  }
  .sunburst {
    width: 260px;
    height: 260px;
  }
  .puzzle-board {
    gap: 6px;
    padding: 8px;
  }
  .tile {
    border-radius: 12px;
  }
  .photo-label h3 {
    font-size: 24px;
  }
}
@media (max-width: 430px) {
  .controls {
    flex-direction: column;
    width: 100%;
  }

  .shuffleBtn,
  .solveBtn,
  .stat {
    width: 100%;
    text-align: center;
  }

  .stats {
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
}
```
Тут мы используем магическое правило `@media`. Оно позволяет применять стили только при выполнении определенных условий. В нашем случае – если ширина экрана меньше определенного значения, что типично для мобильных устройств.

> Переходи к выполнению инструкции в файле [`Instruction_6_Game_Logic.md`](/Instructions/Instruction_6_Game_Logic.md).