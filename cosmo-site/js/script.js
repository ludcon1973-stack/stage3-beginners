// Получение элементов сайта (разметки) по их id
const puzzle = document.getElementById("puzzle");			// поле
const movesEl = document.getElementById("moves");		// счетчик отображения кол-ва ходов
const winsEl = document.getElementById("wins");			// счетчик отображения кол-ва побед
const shuffleBtn = document.getElementById("shuffleBtn");		// кнопка "Перемешать"
const solveBtn = document.getElementById("solveBtn");		// кнопка "Помочь собрать"
const modal = document.getElementById("successModal");		// модальное окно победы
const closeModal = document.getElementById("closeModal");	// кнопка закрытия модального окна

// Объявления основных переменных
const size = 3;			// размер квадратного поля
const total = size * size;		// всего плиток
let tiles = [];				// массив для плиток (объектов)
let moves = 0;			// кол-во ходов
let wins = 0;				// кол-во побед
// Функция создания решенного состояния
function createSolvedState() {
  // возвращаем (результат работы функции) массив размера total, заполненный от одного до total, где последний элемент обнуляется (пустая клетка без плитки)
  return Array.from({ length: total }, (_, i) => i + 1).map((n) =>
    n === total ? 0 : n,
  );
}

// Функция инициализации игры
function init() {
  // Создаем плитки
  tiles = createSolvedState();
  // Обнуляем счетчик ходов
  moves = 0;
  // Обновляем ходы на сайте
  updateMoves();
  // Отрисовываем игру на сайте
  render();
  // Перемешиваем плитки случайно 160 раз
  shuffle(160);
}

// Функция перемешивания плиток определенное кол-во раз (120 по-умолчанию)
function shuffle(steps = 120) {
  // Создаем решенное состояние игры
  tiles = createSolvedState();
  // Находим, где пустая клетка (без плитки)
  let emptyIndex = tiles.indexOf(0);
  // Объявляем переменную для предыдущего индекса
  let prevIndex = -1;
  // Переданное в функцию кол-во раз выполняем…
  for (let i = 0; i < steps; i++) {
    // Получаем соседей пустой плитки (кандидаты на перемещение), если среди них есть та, которую передвинули в прошлый раз, удаляем ее
    const candidates = getNeighbors(emptyIndex).filter(
      (idx) => idx !== prevIndex,
    );
    // С помощью рандома выбираем случайную плитку из кандидатов
    const randomIndex =
      candidates[Math.floor(Math.random() * candidates.length)];
    // Меняем местами пустую плитку и выбранную
    [tiles[emptyIndex], tiles[randomIndex]] = [
      tiles[randomIndex],
      tiles[emptyIndex],
    ];
    // Меняем индекс предыдущей плитки на ту, которую только что "передвинули"
    prevIndex = emptyIndex;
    // Меняем индекс пустой клетки на ту, из которой только что "передвинули"
    emptyIndex = randomIndex;
  }
  // Проверяем на всякий случай не случилось ли случайно сразу решенное состояние игры, если вдруг да - повторяем перемешивание, но на 10 шагов больше
  if (isSolved()) shuffle(steps + 10);
  // Обнуляем кол-во шагов
  moves = 0;
  // Обновляем ходы на сайте
  updateMoves();
  // Отрисовываем игру на сайте
  render();
}

// Функция отрисовки игры на сайте
function render() {
  // Очищаем содержимое поля
  puzzle.innerHTML = "";
  // Для каждой плитки...
  tiles.forEach((value, index) => {
    // Создаем новую плитку (тип элемента - кнопка)
    const tile = document.createElement("button");
    // Задаем тип элемента страницы
    tile.type = "button";
    // Присваиваем класс (пустая клетка или обычная плитка)
    tile.className = "tile" + (value === 0 ? " empty" : "");
    // Если клетка не пустая (есть плитка)...
    if (value !== 0) {
      // Вычисляем номер ряда поля
      const row = Math.floor((value - 1) / size);
      // Вычисляем номер колонны поля
      const col = (value - 1) % size;
      // Задаем позицию элемента плитки на сайте (в рамках поля) по ее номерам ряда и колонны
      tile.style.backgroundPosition = `${col * 50}% ${row * 50}%`;
      // Записываем информацию о номере плитки в ее элемент на сайте 
      tile.dataset.num = value;
      // Подписываем ее
      tile.setAttribute("aria-label", `Плитка ${value}`);
      // Добавляем слушатель (по нажатию мышью) на обработку хода
      tile.addEventListener("click", () => handleMove(index));
    } else {    // Если это пустая клетка...
      // Записываем информацию о пустоте плитки в ее элемент на сайте 
      tile.dataset.num = "";
      // Подписываем ее
      tile.setAttribute("aria-label", "Пустая клетка");
      // Отключаем плитку (кнопку)
      tile.disabled = true;
    }
    // Добавляем текущую плитку
    puzzle.appendChild(tile);
  });
}
// Функция обновления ходов на сайте
function updateMoves() {
  // Обновляем на сайте кол-во ходов
  movesEl.textContent = String(moves);
  // Обновляем на сайте кол-во побед
  winsEl.textContent = String(wins);
}

// Функция получения соседей текущей клетки
function getNeighbors(index) {
  // Вычисление строки для указанной позиции на поле
  const row = Math.floor(index / size);
  // Вычисление столбца для указанной позиции на поле
  const col = index % size;
  // Объявляем список для соседей (будем его заполнять)
  const neighbors = [];
  // Если это не первая строка, добавляем в соседей плитку сверху от текущей
  if (row > 0) neighbors.push(index - size);
  // Если это не последняя строка, добавляем в соседей плитку снизу от текущей
  if (row < size - 1) neighbors.push(index + size);
  // Если это не первая колонна, добавляем в соседей плитку слева от текущей
  if (col > 0) neighbors.push(index - 1);
  // Если это не последняя колонная, добавляем в соседей плитку справа от текущей
  if (col < size - 1) neighbors.push(index + 1);
  // Возвращаем результат
  return neighbors;
}

// Функция для обработки хода (перемещение текущей плитки)
function handleMove(index) {
  // Получаем индекс пустой клетки
  const emptyIndex = tiles.indexOf(0);
  // Если среди соседей нет пустой клетки (некуда переместить плитку), завершаем функцию, ничего не делая
  if (!getNeighbors(index).includes(emptyIndex)) return;
  // Меняем местами текущую плитку и пустую
  [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
  // Увеличиваем кол-во ходов на 1
  moves += 1;
  // Обновляем ходы на сайте
  updateMoves();
  // Отрисовываем поле на сайте
  render();
  // Если игра решена...
  if (isSolved()) {
    // Увеличиваем кол-во побед
    wins += 1;
    // Обновляем ходы на сайте
    updateMoves();
    // Вызываем через 220 мс модальное окно с поздравлением с победой
    setTimeout(() => modal.classList.add("show"), 220);
  }
}

// Функция проверки на то, решенали игра
function isSolved() {
  // Создаем решенное состояние игры
  const solved = createSolvedState();
  // Проверяем, собрана ли головоломка
  return tiles.every((value, i) => value === solved[i]);
}
// Добавляем на кнопку перемешивания слушателя (по нажатию мыши), который скрывает модальное окно и перемешивает поле (180 ходов) 
shuffleBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  shuffle(180);
});

// Добавляем на кнопку решения слушателя (по нажатию мыши), который скрывает модальное окно, создает почти решенное состояние игры (остается сделать один ход), обнуляет ходы, обновляет ходы на сайте и отрисовывает игру
solveBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  tiles = [1, 2, 3, 4, 5, 6, 7, 0, 8];
  moves = 0;
  updateMoves();
  render();
});

// Добавляем на кнопку закрытия модального окна слушателя (по нажатию мыши), который скрывает модальное окно
closeModal.addEventListener("click", () => {
  modal.classList.remove("show");
});

// Добавляем на модальное окно слушателя (по нажатию мыши), который закрывает его по нажатию на него
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.remove("show");
});
// Добавляем на весь сайт слушателя (по нажатию любой клавиши мыши), который...
window.addEventListener("keydown", (e) => {
  // Если нажата не стрелка или ESC, то ничего не делаем и завершаем функцию
  if (
    !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Escape"].includes(
      e.key,
    )
  )
    return;
  // Если нажат ESC...
  if (e.key === "Escape") {
    // Закрываем модальное окно
    modal.classList.remove("show");
    // Завершаем функцию
    return;
  }

  // Получаем индекс пустой клетки
  const emptyIndex = tiles.indexOf(0);
  // Вычисляем ее ряд на поле
  const row = Math.floor(emptyIndex / size);
  // Вычисляем ее колонну на поле
  const col = emptyIndex % size;
  // Объявляем переменную целевой плитки
  let target = null;

  // Если нажата клавиша стрелки вверх и это не верхний ряд, целевой плиткой становится плитка сверху пустой
  if (e.key === "ArrowUp" && row < size - 1) target = emptyIndex + size;
  // Если нажата клавиша стрелки вниз и это не нижний ряд, целевой плиткой становится плитка снизу пустой
  if (e.key === "ArrowDown" && row > 0) target = emptyIndex - size;
  // Если нажата клавиша стрелки влево и это не последняя колонна, целевой плиткой становится плитка слева от пустой
  if (e.key === "ArrowLeft" && col < size - 1) target = emptyIndex + 1;
  // Если нажата клавиша стрелки вправо и это не первая колонна, целевой плиткой становится плитка справа от пустой
  if (e.key === "ArrowRight" && col > 0) target = emptyIndex - 1;

  // Если целевая плитка выбрана, делаем ход на нее
  if (target !== null) handleMove(target);
});

// Инициализируем игру
init();
