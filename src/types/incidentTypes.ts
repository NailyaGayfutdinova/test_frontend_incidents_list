export type IncidentType = {
  id: number;
  createdAt: string;
  importance: string;
  equipment: string;
  message: string;
  assignee: string;
  isRead: boolean;
};

export type IncidentSliceType = {
  incidentsViewOption: string;
  incidentList: IncidentType[];
  selectedIncident: null | IncidentType;
}