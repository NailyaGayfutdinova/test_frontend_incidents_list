import React, { useEffect, useState } from "react";
import {
  DataTable,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { IncidentType } from "../../types/incidentTypes";
import { changeReadStatus, selectIncident } from "../../redux/incidentSlice";

export default function IncidentsTable({
  incidentList,
}: {
  incidentList: IncidentType[];
}): JSX.Element {
  const selectedIncident = useAppSelector(
    (store) => store.incidents.selectedIncident
  );
  const windowSize = useAppSelector((store) => store.windowSize);
  const [tableRows, setTableRows] = useState(1);
  const dispatch = useAppDispatch();

  const renderIsRead = (rowData: IncidentType) => {
    return <span>{rowData.isRead ? "прочитано" : "не прочитано"}</span>;
  };

  useEffect(() => {
    if (windowSize.width > 1120) setTableRows(Math.floor((windowSize.height - 210) / 53) || 1);
    else if (windowSize.width > 550) setTableRows(Math.floor((windowSize.height - 210) / 80) || 1);
    else setTableRows(Math.floor((windowSize.height - 340) / 80) || 1);
  }, [windowSize]);

  return (
    <DataTable
      value={incidentList}
      sortMode="multiple"
      removableSort
      paginator
      rows={tableRows}
      rowsPerPageOptions={[3, 5, 10, 15, tableRows]
        .filter((el, index, arr) => arr.indexOf(el) === index)
        .sort((a, b) => a - b)}
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
