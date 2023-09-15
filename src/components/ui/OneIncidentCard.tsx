import React from "react";
import { IncidentType } from "../../types/incidentTypes";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { changeReadStatus, selectIncident } from "../../redux/incidentSlice";

type OneIncidentCardPropsType = {
  oneIncident: IncidentType;
};

export default function OneIncidentCard({
  oneIncident,
}: OneIncidentCardPropsType): JSX.Element {
  const selectedIncident = useAppSelector(
    (store) => store.incidents.selectedIncident
  );
  const dispatch = useAppDispatch();

  let importanceColor;

  switch (oneIncident.importance) {
    case "низкая":
      importanceColor = "text-green-500";
      break;
    case "средняя":
      importanceColor = "text-yellow-600";
      break;
    case "высокая":
      importanceColor = "text-red-500";
      break;
    case "критическая":
      importanceColor = "text-red-700";
      break;
    default:
      importanceColor = "";
  }
  const cardColor = oneIncident.isRead ? "bg-white" : "bg-red-50";
  const cardBorder =
    selectedIncident && oneIncident.id === selectedIncident.id
      ? "border-3"
      : "border-1";

  return (
    <div
      className={`flex flex-row flex-wrap text-xs border-gray-300 p-1 align-items-center ${cardColor} ${cardBorder}`}
      tabIndex={oneIncident.id}
      onKeyDown={(e) => {
        if (e.key === " ") dispatch(changeReadStatus(oneIncident.id));
      }}
      onClick={(e) => {
        if (!selectedIncident || oneIncident.id !== selectedIncident.id)
          dispatch(selectIncident(oneIncident));
        else dispatch(selectIncident(null));
      }}
    >
      <div className="flex flex-column p-1">
        <div className="flex flex-row">
          <div className="w-6rem">Дата</div>
          <div className="w-7rem">{oneIncident.createdAt}</div>
        </div>
        <div className="flex flex-row">
          <div className="w-6rem">Важность</div>
          <div className={`w-7rem ${importanceColor}`}>
            {oneIncident.importance}
          </div>
        </div>
        <div className="flex flex-row">
          <div className="w-6rem">Оборудование</div>
          <div className="w-7rem">{oneIncident.equipment}</div>
        </div>
        <div className="flex flex-row">
          <div className="w-6rem">Сообщение</div>
          <div className="w-7rem">{oneIncident.message}</div>
        </div>
      </div>
      <div className="flex flex-column w-6rem align-items-center">
        <div className="bg-yellow-100 w-3rem h-3rem border-circle" />
        <div>{oneIncident.assignee}</div>
      </div>
    </div>
  );
}
