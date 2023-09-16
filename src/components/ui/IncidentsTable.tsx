import React, { useEffect, useState } from "react";
import {
  DataTable,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { IncidentType } from "../../types/incidentTypes";
import { changeReadStatus, selectIncident } from "../../redux/incidentSlice";
import {
  headerHeightMax,
  headerHeightMin,
  paginatorHeight,
  tableFirstRowHeight,
  tableRowHeightAv,
  tableRowHeightMin,
  windowWidthLarge,
  windowwidthMedium,
} from "../../data/constants";

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
    if (windowSize.width > windowWidthLarge)
      setTableRows(
        Math.floor(
          (windowSize.height -
            headerHeightMin -
            tableFirstRowHeight -
            paginatorHeight) /
            tableRowHeightMin
        ) || 1
      );
    else if (windowSize.width > windowwidthMedium)
      setTableRows(
        Math.floor(
          (windowSize.height -
            headerHeightMin -
            tableFirstRowHeight -
            paginatorHeight) /
            tableRowHeightAv
        ) || 1
      );
    else
      setTableRows(
        Math.floor(
          (windowSize.height -
            headerHeightMax -
            tableFirstRowHeight -
            paginatorHeight) /
            tableRowHeightAv
        ) || 1
      );
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
