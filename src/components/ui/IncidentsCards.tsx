import React, { useState } from "react";
import OneIncidentCard from "./OneIncidentCard";
import { Paginator } from "primereact/paginator";
import { useAppSelector } from "../../hooks/reduxHooks";

export default function IncidentsCards(): JSX.Element {
  const incidentList = useAppSelector(store => store.incidents.incidentList);

  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(10);

  return (
    <>
      <div className="flex flex-wrap gap-3 justify-content-center">
        {incidentList.slice(first, first + rows).map((oneIncident) => (
          <OneIncidentCard key={`${oneIncident.id}_${oneIncident.isRead}`} oneIncident={oneIncident} />
        ))}
      </div>
        <Paginator
          first={first}
          rows={rows}
          totalRecords={incidentList.length}
          rowsPerPageOptions={[3, 5, 10, 15, 20]}
          onPageChange={(e) => {
            setFirst(e.first);
            setRows(e.rows);
          }}
        />
    </>
  );
}
