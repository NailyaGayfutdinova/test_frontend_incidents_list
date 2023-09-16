import React, { useEffect, useLayoutEffect } from "react";
import IncidentsTable from "./IncidentsTable";
import IncidentsCards from "./IncidentsCards";
import { viewOptions } from "../../data/incidentsConstants";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { addNewIncident } from "../../redux/incidentSlice";
import createNewIncident from "../../data/incidentsFunctions";
import { setWindowSize } from "../../redux/sizeSlice";

export default function ContentContainer(): JSX.Element {
  const incidentsViewOption = useAppSelector(
    (store) => store.incidents.incidentsViewOption
  );
  const incidentList = useAppSelector((store) => store.incidents.incidentList);
  const searchingIncidents = useAppSelector(
    (store) => store.incidents.searchingIncidents
  );
  // если showFiltered - false, на странице показываются все инциденты, иначе - инциденты, которые отвечают условиям поиска
  const showFiltered = useAppSelector((store) => store.incidents.showFiltered);
  const dispatch = useAppDispatch();

  // определение доступных размеров окна пользовотеля, чтобы в дальнейшем определить объем отражаемой информации
  useLayoutEffect(() => {
    const size = {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    };
    dispatch(setWindowSize(size));
  }, [dispatch]);

  // генерация новых инцидентов по таймеру
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(addNewIncident(createNewIncident(incidentList.length)));
    }, 5000);
    return () => clearTimeout(timer);
  }, [incidentList, dispatch]);

  return (
    <div>
      {incidentsViewOption === viewOptions[0] && (
        <IncidentsTable
          incidentList={showFiltered ? searchingIncidents : incidentList}
        />
      )}
      {incidentsViewOption === viewOptions[1] && (
        <IncidentsCards
          incidentList={showFiltered ? searchingIncidents : incidentList}
        />
      )}
    </div>
  );
}
