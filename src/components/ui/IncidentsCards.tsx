import React, { useEffect, useState } from "react";
import OneIncidentCard from "./OneIncidentCard";
import { Paginator } from "primereact/paginator";
import { IncidentType } from "../../types/incidentTypes";
import { useAppSelector } from "../../hooks/reduxHooks";
import { calculateCardQuantity } from "../../data/sizeFunctions";

export default function IncidentsCards({
  incidentList,
}: {
  incidentList: IncidentType[];
}): JSX.Element {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(0);
  const windowSize = useAppSelector((store) => store.windowSize);

  // расчет количества карточек, которые будут представлены на странице первоначально
  useEffect(() => {
    setRows(calculateCardQuantity(windowSize));
  }, [windowSize]);

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-content-center">
        {incidentList.slice(first, first + rows).map((oneIncident) => (
          <OneIncidentCard key={oneIncident.id} oneIncident={oneIncident} />
        ))}
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={incidentList.length}
        rowsPerPageOptions={[3, 5, 10, 15, 20, calculateCardQuantity(windowSize)]
          .filter((el, index, arr) => arr.indexOf(el) === index)
          .sort((a, b) => a - b)}
        onPageChange={(e) => {
          setFirst(e.first);
          setRows(e.rows);
        }}
      />
    </>
  );
}
