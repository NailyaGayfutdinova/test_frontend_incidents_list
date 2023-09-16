import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IncidentSliceType, IncidentType } from "../types/incidentTypes";

const initialState: IncidentSliceType = {
  incidentsViewOption: "Таблица",
  incidentList: [],
  selectedIncident: null,
  showFiltered: false,
  searchInput: "",
  searchingIncidents: [],
};

const incidentSlice = createSlice({
  name: "incidents",
  initialState,
  reducers: {
    selectViewOption(state, action: PayloadAction<string>) {
      state.incidentsViewOption = action.payload;
    },

    addNewIncident(state, action: PayloadAction<IncidentType>) {
      state.incidentList = [...state.incidentList, action.payload];
    },

    selectIncident(state, action: PayloadAction<IncidentType | null>) {
      state.selectedIncident = action.payload;
    },

    changeReadStatus(state, action: PayloadAction<IncidentType["id"]>) {
      state.incidentList = state.incidentList.map((el) =>
        el.id !== action.payload ? el : { ...el, isRead: !el.isRead }
      );
      state.searchingIncidents = state.searchingIncidents.map((el) =>
        el.id !== action.payload ? el : { ...el, isRead: !el.isRead }
      );
      state.selectedIncident = null;
    },

    setSearchInput(state, action: PayloadAction<string>) {
      console.log("slice", action.payload);
      state.searchInput = action.payload;
    },

    setSearchingIncidents(state, action: PayloadAction<string>) {
      state.searchingIncidents = state.incidentList.filter((el) =>
        el.message.toLowerCase().includes(action.payload.toLowerCase())
      );
    },

    setShowFiltered(state, action: PayloadAction<boolean>) {
      state.showFiltered = action.payload;
    },
  },
});

const incidentReducer = incidentSlice.reducer;
export const {
  selectViewOption,
  addNewIncident,
  selectIncident,
  changeReadStatus,
  setSearchInput,
  setSearchingIncidents,
  setShowFiltered,
} = incidentSlice.actions;

export default incidentReducer;
