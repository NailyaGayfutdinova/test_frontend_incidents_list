import React from "react";
import "primereact/resources/themes/soho-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import SearchBar from "../ui/SearchBar";
import ContentContainer from "../ui/ContentContainer";

export default function IncidentPage(): JSX.Element {
  return (
    <>
      <SearchBar />
      <ContentContainer />
    </>
  );
}
