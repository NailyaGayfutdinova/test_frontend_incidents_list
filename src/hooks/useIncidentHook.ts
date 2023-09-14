import { useEffect, useState } from "react";
import { FilterMatchMode } from "primereact/api";
import { IncidentType } from "../types/incidentTypes";
import createNewIncident, { viewOptions } from "../data/incidentsData";

const useIncidentHook = () => {
  const [view, setView] = useState(viewOptions[0]);
  const [incidentsList, setIncidentsList] = useState<IncidentType[]>([]);
  const [searchText, setSearchText] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    global: {
      value: "",
      matchMode: FilterMatchMode.CONTAINS,
    },
  });

  const searchHandler = (e: React.FormEvent<HTMLInputElement>): void => {
    setSearchText(e.currentTarget.value);
    console.log(searchText);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIncidentsList((prev: IncidentType[]) => [
        createNewIncident(prev),
        ...prev,
      ]);
    }, 10000);
    return () => clearTimeout(timer);
  }, [incidentsList]);

  useEffect(() => {
    if (searchText?.trim()) {
      console.log('поиск', searchText);
      const debouncingTimer = setTimeout(() => {
        setFilters((prev) => ({
          ...prev,
          global: { ...prev.global, value: searchText },
        }));
      }, 500);
      return () => clearTimeout(debouncingTimer);
    }

    if (!searchText) {
        
    }
  }, [searchText]);

  return {
    view,
    setView,
    incidentsList,
    searchText,
    filters,
    searchHandler,
  };
};

export default useIncidentHook;
