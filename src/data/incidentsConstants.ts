export const viewOptions = ["Таблица", "Карточки"];

// моковые данные по возможным инцидентам
export const incidents = [
  {
    equipment: "Вегас",
    message: "Сервер Вегас не доступен",
    importance: "высокая",
  },
  {
    equipment: "Коммутатор",
    message: "Потеряно сетевое соединение",
    importance: "средняя",
  },
  { equipment: "Люк", message: "Открыта крышка", importance: "низкая" },
  {
    equipment: "ИБП",
    message: "Низкий заряд батареи",
    importance: "критическая",
  },
  {
    equipment: "Трансформатор",
    message: "Недостаточное количество масла",
    importance: "высокая",
  },
  { equipment: "ЛВС", message: "Обрыв силового кабеля", importance: "средняя" },
  {
    equipment: "Роутер",
    message: "Проблемы с маршрутизацией",
    importance: "высокая",
  },
  {
    equipment: "Сервер",
    message: "Высокая загрузка CPU",
    importance: "средняя",
  },
  { equipment: "Свич", message: "Потеря пакетов", importance: "критическая" },
  {
    equipment: "Вегас",
    message: "Проблемы с жестким диском",
    importance: "высокая",
  },
  { equipment: "Роутер", message: "Сбой в работе", importance: "критическая" },
  {
    equipment: "Люк",
    message: "Повреждена металлическая крышка",
    importance: "высокая",
  },
  {
    equipment: "ИБП",
    message: "Аварийное отключение",
    importance: "критическая",
  },
];

// моковые данные по ответственным за определенное оборудование
export const assignee = [
  { equipment: "Вегас", assignee: "Смирнов В.А." },
  { equipment: "Коммутатор", assignee: "Иванов И.И." },
  { equipment: "Люк", assignee: "Петров П.П." },
  { equipment: "ИБП", assignee: "Сидоров С.С." },
  { equipment: "Трансформатор", assignee: "Козлов К.К." },
  { equipment: "ЛВС", assignee: "Алексеев А.А." },
  { equipment: "Роутер", assignee: "Михайлов М.М." },
  { equipment: "Сервер", assignee: "Павлов П.П." },
  { equipment: "Свич", assignee: "Федоров Ф.Ф." },
];
