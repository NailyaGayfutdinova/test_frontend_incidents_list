import type { IncidentType } from "../types/incidentTypes";
import { format } from "date-fns";
import { assignee, incidents } from "./incidentsConstants";

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
