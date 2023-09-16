import React, { useEffect } from "react";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { viewOptions } from "../../data/constants";
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

  useEffect(() => {
    console.log("useeffect");
    if (searchInput.trim()) {
      const searchTimer = setTimeout(() => {
        console.log("поиск");
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
    <div className="card">
      <Toolbar start={startContent} end={endContent} />
    </div>
  );
}
