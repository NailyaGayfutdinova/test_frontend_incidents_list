import React from "react";
import {
  DataTable,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { IncidentType } from "../../types/incidentTypes";
import { changeReadStatus, selectIncident } from "../../redux/incidentSlice";

export default function IncidentsTable(): JSX.Element {
  const incidentList = useAppSelector((store) => store.incidents.incidentList);
  const selectedIncident = useAppSelector(
    (store) => store.incidents.selectedIncident
  );
  const dispatch = useAppDispatch();

  const renderIsRead = (rowData: IncidentType) => {
    return <span>{rowData.isRead ? "прочитано" : "не прочитано"}</span>;
  };

  return (
    <DataTable
      value={incidentList}
      sortMode="multiple"
      removableSort
      paginator
      rows={10}
      rowsPerPageOptions={[3, 5, 10, 15, 20]}
      rowClassName={(rowData) => (rowData.isRead ? "bg-white" : "bg-red-50")}
      selectionMode="single"
      selection={selectedIncident}
      onSelectionChange={(
        e: DataTableSelectionSingleChangeEvent<IncidentType[]>
      ) => dispatch(selectIncident(e.value || null))}
      dataKey="id"
      metaKeySelection={false}
      onKeyDown={(e) => {
        if (e.key === " " && selectedIncident) {
          e.preventDefault();
          dispatch(changeReadStatus(selectedIncident.id));
        }
      }}
      style={{ color: "black" }}
    >
      <Column field="createdAt" header="Дата" sortable />
      <Column field="importance" header="Важность" sortable />
      <Column field="equipment" header="Оборудование" sortable />
      <Column field="message" header="Сообщение" sortable />
      <Column field="assignee" header="Ответственный" sortable />
      <Column field="isRead" header="Статус" body={renderIsRead} sortable />
    </DataTable>
  );
}
