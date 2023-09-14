import React from "react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import SearchBar from "./components/ui/SearchBar";
import useIncidentHook from "./hooks/useIncidentHook";
import ContentContainer from "./components/ui/ContentContainer";

function App() {
  const { view, setView, incidentsList } = useIncidentHook();

  return (
    <div>
      <SearchBar view={view} setView={setView} />
      <ContentContainer view={view} incidentsList={incidentsList} />
    </div>
  );
}

export default App;
