import axios from "axios";

export const CUSTOMERS_URL = "api/timetable";

// create new timetable

export function createTimetable(timetable) {
  return axios.post(CUSTOMERS_URL, { timetable });
}

export function findtimeTables(queryParams) {
  console.log("here is server",queryParams)
  return axios.post(`${CUSTOMERS_URL}/find`, { queryParams });
}
