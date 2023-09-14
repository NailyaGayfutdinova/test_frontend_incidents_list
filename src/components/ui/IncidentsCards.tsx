import React from "react";
import { IncidentType } from "../../types/incidentTypes";
import OneIncidentCard from "./OneIncidentCard";

type IncidentsCardsPropsType = {
  incidentsList: IncidentType[];
};

export default function IncidentsCards({
  incidentsList,
}: IncidentsCardsPropsType): JSX.Element {
  return (
    <div className="card-container flex flex-wrap gap-2 justify-content-around">
      {incidentsList.map((oneIncident) => (
        <OneIncidentCard key={oneIncident.id} oneIncident={oneIncident} />
      ))}
    </div>
  );
}
