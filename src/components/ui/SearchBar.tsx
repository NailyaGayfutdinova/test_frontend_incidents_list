import React from "react";
import { SelectButton } from "primereact/selectbutton";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import useIncidentHook from "../../hooks/useIncidentHook";
import { viewOptions } from "../../data/incidentsData";

type SearchBarPropsType = {
  view: string;
  setView: (arg: string) => void;
};

export default function SearchBar({
  view,
  setView,
}: SearchBarPropsType): JSX.Element {
  const { searchHandler } = useIncidentHook();

  const startContent = (
    <React.Fragment>
      <SelectButton
        value={view}
        onChange={(e) => setView(e.value)}
        options={viewOptions}
      />
    </React.Fragment>
  );

  const endContent = (
    <React.Fragment>
      <div className="p-input-icon-left">
        <i className="pi pi-search" />
        <InputText
          onInput={(e) => searchHandler(e)}
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
