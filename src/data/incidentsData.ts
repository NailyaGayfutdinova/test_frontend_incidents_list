import { IncidentType } from "../types/incidentTypes";
import { format } from "date-fns";

// моковые данные по возможным инцидентам
const incidents = [
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
const assignee = [
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

/* 
* Функция, которая генерирует новые инциденты
* @param {number} num - общее количество уже имеющихся в массиве инцидентов (для определения порядкового номера)
* @return {IncidentType} newIncident - новый инцидент 
*/
export default function createNewIncident(num: number): IncidentType {
  const randomIndex = Math.round(Math.random() * (incidents.length - 1));
  const randomIncident = incidents[randomIndex];
  const person = assignee.find(
    (el) => el.equipment === randomIncident.equipment
  )?.assignee;
  const newIncident = {
    id: num + 1,
    createdAt: format(new Date(), "dd.MM.yyyy HH:mm:ss"),
    importance: randomIncident.importance,
    equipment: randomIncident.equipment,
    message: randomIncident.message,
    assignee: person ? person : "не назначен",
    isRead: false,
  };
  return newIncident;
}
