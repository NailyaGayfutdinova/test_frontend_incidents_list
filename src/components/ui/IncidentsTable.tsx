import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IncidentType } from "../../types/incidentTypes";
import useIncidentHook from "../../hooks/useIncidentHook";
import { FilterMatchMode } from "primereact/api";

type IncidentsTablePropsType = {
  incidentsList: IncidentType[];
  searchText: string | null;
};

export default function IncidentsTable({
  incidentsList,
  searchText,
}: IncidentsTablePropsType): JSX.Element {
  const { filters } = useIncidentHook();
  console.log(filters.global.value);

  return (
    <DataTable
      value={incidentsList}
      sortMode="multiple"
      removableSort
      paginator
      rows={10}
    >
      <Column field="createdAt" header="Дата" sortable />
      <Column field="importance" header="Важность" sortable />
      <Column field="equipment" header="Оборудование" sortable />
      <Column field="message" header="Сообщение" sortable />
      <Column field="assignee" header="Ответственный" sortable />
    </DataTable>
  );
}
