import React, { useEffect } from "react";
import IncidentsTable from "./IncidentsTable";
import IncidentsCards from "./IncidentsCards";
import { viewOptions } from "../../data/constants";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addNewIncident } from "../../redux/incidentSlice";
import createNewIncident from "../../data/incidentsData";

export default function ContentContainer(): JSX.Element {
  const incidentList = useAppSelector((store) => store.incidents.incidentList);
  const incidentsViewOption = useAppSelector(
    (store) => store.incidents.incidentsViewOption
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(addNewIncident(createNewIncident(incidentList)));
    }, 10000);
    return () => clearTimeout(timer);
  }, [incidentList, dispatch]);

  return (
    <div className="pt-3">
      {incidentsViewOption === viewOptions[0] && <IncidentsTable />}
      {incidentsViewOption === viewOptions[1] && <IncidentsCards />}
    </div>
  );
}
