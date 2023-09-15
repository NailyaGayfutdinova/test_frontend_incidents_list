import React from "react";
import "primereact/resources/themes/nano/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primeflex/primeflex.css';
import SearchBar from "./components/ui/SearchBar";
import ContentContainer from "./components/ui/ContentContainer";

function App() {

  return (
    <div>
      <SearchBar />
      <ContentContainer />
    </div>
  );
}

export default App;
