import React, { useEffect, useLayoutEffect, useState } from "react";
import OneIncidentCard from "./OneIncidentCard";
import { Paginator } from "primereact/paginator";
import { IncidentType } from "../../types/incidentTypes";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function IncidentsCards({
  incidentList,
}: {
  incidentList: IncidentType[];
}): JSX.Element {
  const [first, setFirst] = useState(0);
  const [cardQuantity, setCardQuantity] = useState(1);
  const [rows, setRows] = useState(0);
  const windowSize = useAppSelector((store) => store.windowSize);

  useEffect(() => {
    if (windowSize.width > 550) {
      const quantity =
        (Math.floor(windowSize.width / 340) || 1) *
        (Math.floor((windowSize.height - 180) / 106) || 1);
      setCardQuantity(quantity);
      setRows(quantity);
    } else {
      const quantity =
        (Math.floor(windowSize.width / 340) || 1) *
        (Math.floor((windowSize.height - 349) / 106) || 1);
      setCardQuantity(quantity);
      setRows(quantity);
    }
  }, [windowSize]);

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-content-center">
        {incidentList.slice(first, first + rows).map((oneIncident) => (
          <OneIncidentCard
            key={`${oneIncident.id}_${oneIncident.isRead}`}
            oneIncident={oneIncident}
          />
        ))}
      </div>
      <Paginator
        first={first}
        rows={rows}
        totalRecords={incidentList.length}
        rowsPerPageOptions={[3, 5, 10, 15, 20, cardQuantity]
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
