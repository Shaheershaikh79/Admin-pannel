import axios from "axios";

export const CUSTOMERS_URL = "api/timetable";

// create new timetable

export function createTimetable(timetable) {
  return axios.post(CUSTOMERS_URL, { timetable });
}
