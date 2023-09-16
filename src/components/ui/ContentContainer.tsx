import React, { useEffect, useLayoutEffect } from "react";
import IncidentsTable from "./IncidentsTable";
import IncidentsCards from "./IncidentsCards";
import { viewOptions } from "../../data/constants";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addNewIncident } from "../../redux/incidentSlice";
import createNewIncident from "../../data/incidentsData";
import { setWindowSize } from "../../redux/sizeSlice";

export default function ContentContainer(): JSX.Element {
  const incidentsViewOption = useAppSelector(
    (store) => store.incidents.incidentsViewOption
  );
  const incidentList = useAppSelector((store) => store.incidents.incidentList);
  const searchingIncidents = useAppSelector(store => store.incidents.searchingIncidents);
  const showFiltered = useAppSelector(store => store.incidents.showFiltered);
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    const size = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
    dispatch(setWindowSize(size));
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(addNewIncident(createNewIncident(incidentList.length)));
    }, 10000);
    return () => clearTimeout(timer);
  }, [incidentList, dispatch]);

  return (
    <div className="pt-3">
      {incidentsViewOption === viewOptions[0] && <IncidentsTable incidentList={showFiltered ? searchingIncidents : incidentList} />}
      {incidentsViewOption === viewOptions[1] && <IncidentsCards incidentList={showFiltered ? searchingIncidents : incidentList} />}
    </div>
  );
}
