import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IncidentSliceType, IncidentType } from "../types/incidentTypes";

const initialState: IncidentSliceType = {
  incidentsViewOption: "Таблица",
  incidentList: [],
  selectedIncident: null,
};

const incidentSlice = createSlice({
  name: "incidents",
  initialState,
  reducers: {
    selectViewOption(state, action: PayloadAction<string>) {
      state.incidentsViewOption = action.payload;
    },

    addNewIncident(state, action: PayloadAction<IncidentType>) {
      state.incidentList.push(action.payload);
    },

    selectIncident(state, action: PayloadAction<IncidentType | null>) {
      state.selectedIncident = action.payload;
    },

    changeReadStatus(state, action: PayloadAction<IncidentType["id"]>) {
      state.incidentList = state.incidentList.map((el) =>
        el.id !== action.payload ? el : { ...el, isRead: !el.isRead }
      );
      state.selectedIncident = null;
    },

    //   setAllPosts(state, action: PayloadAction<PostType[]>) {
    //     console.log('-----',action.payload);
    //     return action.payload
    //   },

    //   addNewPost(state, action: PayloadAction<PostType>) {
    //     state.push(action.payload);
    //   },

    //   deleteOnePost(state, action: PayloadAction<number>) {
    //     const ind = state.findIndex((el) => el.id === action.payload);
    //     if (ind) {
    //       state.splice(ind, 1);
    //     }
    //   },
  },
});

const incidentReduser = incidentSlice.reducer;
export const { selectViewOption, addNewIncident, selectIncident, changeReadStatus } =
  incidentSlice.actions;

export default incidentReduser;
