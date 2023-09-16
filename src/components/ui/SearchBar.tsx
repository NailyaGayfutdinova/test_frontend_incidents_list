import React, { useEffect } from "react";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { viewOptions } from "../../data/incidentsConstants";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useDispatch } from "react-redux";
import {
  selectIncident,
  selectViewOption,
  setSearchInput,
  setSearchingIncidents,
  setShowFiltered,
} from "../../redux/incidentSlice";

export default function SearchBar(): JSX.Element {
  const incidentsViewOption = useAppSelector(
    (store) => store.incidents.incidentsViewOption
  );
  const searchInput = useAppSelector((store) => store.incidents.searchInput);
  const dispatch = useDispatch();

  // динамический поиск с дебаунс эффектом
  useEffect(() => {
    if (searchInput.trim()) {
      const searchTimer = setTimeout(() => {
        dispatch(setSearchingIncidents(searchInput));
        dispatch(setShowFiltered(true));
      }, 300);

      return () => {
        clearTimeout(searchTimer);
      };
    }
    if (!searchInput) {
      dispatch(setShowFiltered(false));
    }
  }, [searchInput, dispatch]);

  // выбор вида просмотра (таблица или карточки)
  const startContent = (
    <React.Fragment>
      <SelectButton
        value={incidentsViewOption}
        onChange={(e) => {
          dispatch(selectViewOption(e.value));
          dispatch(selectIncident(null));
        }}
        options={viewOptions}
      />
    </React.Fragment>
  );

  // поисковая строка
  const endContent = (
    <React.Fragment>
      <div className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          placeholder="Поиск..."
          onChange={(e) => dispatch(setSearchInput(e.target.value))}
        />
      </div>
    </React.Fragment>
  );

  return (
    <div className="header pb-3">
      <Toolbar start={startContent} end={endContent} />
    </div>
  );
}
