import React from "react";
import useIncidentHook from "../../hooks/useIncidentHook";
import IncidentsTable from "./IncidentsTable";
import { IncidentType } from "../../types/incidentTypes";
import IncidentsCards from "./IncidentsCards";
import { FilterMatchMode } from "primereact/api";
import { viewOptions } from "../../data/incidentsData";

type ContentContainerPropsType = {
  view: string;
  incidentsList: IncidentType[];
};

export default function ContentContainer({
  view,
  incidentsList,
}: ContentContainerPropsType): JSX.Element {

  const { searchText } = useIncidentHook();

  return (
    <div className="mt-3">
      {view === viewOptions[0] && (
        <IncidentsTable incidentsList={incidentsList} searchText={searchText} />
      )}
      {view === viewOptions[1] && <IncidentsCards incidentsList={incidentsList} />}
    </div>
  );
}
