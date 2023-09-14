import React from "react";
import { IncidentType } from "../../types/incidentTypes";
import { Card } from "primereact/card";

type OneIncidentCardPropsType = {
  oneIncident: IncidentType;
};

export default function OneIncidentCard({
  oneIncident,
}: OneIncidentCardPropsType): JSX.Element {
  return (
    <div className="flex flex-row text-xs border-1 border-gray-300 p-1">
      <div className="flex flex-column p-1">
        <div className="flex flex-row">
            <div className="w-6rem">Дата</div>
            <div className="w-8rem">{oneIncident.createdAt}</div>
        </div>
        <div className="flex flex-row p-1">
            <div className="w-6rem">Важность</div>
            <div className="w-8rem">{oneIncident.importance}</div>
        </div>
        <div className="flex flex-row">
            <div className="w-6rem">Оборудование</div>
            <div className="w-8rem">{oneIncident.equipment}</div>
        </div>
        <div className="flex flex-row">
            <div className="w-6rem">Сообщение</div>
            <div className="w-8rem">{oneIncident.message}</div>
        </div>
      </div>
      <div className="flex flex-column w-8rem align-items-center">
        <div className="bg-yellow-100 w-4rem h-4rem border-circle" />
        <div>{oneIncident.assignee}</div>
      </div>
    </div>
  );
}
