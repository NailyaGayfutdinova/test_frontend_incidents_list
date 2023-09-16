import React, { useEffect, useState } from "react";
import {
  DataTable,
  DataTableSelectionSingleChangeEvent,
} from "primereact/datatable";
import { Column } from "primereact/column";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { IncidentType } from "../../types/incidentTypes";
import { changeReadStatus, selectIncident } from "../../redux/incidentSlice";
import { calculateTableRows } from "../../data/sizeFunctions";

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

  // функция для определения текста статуса (прочтано ли сообщение)
  const getStatusText = (isRead: boolean) => {
    return isRead ? "прочитано" : "не прочитано";
  };

  // расчет количества строк таблицы, которые будут представлены на странице первоначально
  useEffect(() => {
    setTableRows(calculateTableRows(windowSize));
  }, [windowSize]);

  return (
    <DataTable
      value={incidentList}
      sortMode="multiple" // возможность сортировки по нескольким столбцам в порядке выбора (при удерживании ctrl)
      removableSort // возможность отмены сортировки
      paginator
      rows={tableRows}
      rowsPerPageOptions={[3, 5, 10, 15, tableRows]
        .filter((el, index, arr) => arr.indexOf(el) === index)
        .sort((a, b) => a - b)}
      rowClassName={(rowData) => (rowData.isRead ? "bg-white" : "bg-red-50")}
      selectionMode="single" // возможность выбора единственной строки
      selection={selectedIncident}
      onSelectionChange={(
        e: DataTableSelectionSingleChangeEvent<IncidentType[]>
      ) => dispatch(selectIncident(e.value || null))}
      dataKey="id"
      metaKeySelection={false}
      onKeyDown={(e) => {
        if (e.key === " " && selectedIncident) {
          e.preventDefault();
          dispatch(changeReadStatus(selectedIncident.id)); // изменение статуса прочтения сообщения по нажатию на пробел
        }
      }}
    >
      <Column field="createdAt" header="Дата" sortable />
      <Column field="importance" header="Важность" sortable />
      <Column field="equipment" header="Оборудование" sortable />
      <Column field="message" header="Сообщение" sortable />
      <Column field="assignee" header="Ответственный" sortable />
      <Column
        field="isRead"
        header="Статус"
        body={(rowData: IncidentType) => getStatusText(rowData.isRead)}
        sortable
      />
    </DataTable>
  );
}
