import React from "react";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { viewOptions } from "../../data/constants";
import { useAppSelector } from "../../hooks/reduxHooks";
import { useDispatch } from "react-redux";
import { selectViewOption } from "../../redux/incidentSlice";

export default function SearchBar(): JSX.Element {
  const incidentsViewOption = useAppSelector(store => store.incidents.incidentsViewOption);
  // const { searchHandler } = useIncidentHook();
  const dispatch = useDispatch();

  const startContent = (
    <React.Fragment>
      <SelectButton
        value={incidentsViewOption}
        onChange={(e) => dispatch(selectViewOption(e.value))}
        options={viewOptions}
      />
    </React.Fragment>
  );

  const endContent = (
    <React.Fragment>
      <div className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          // onInput={(e) => searchHandler(e)}
          placeholder="Поиск..."
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
