import axios from "axios";

export const CUSTOMERS_URL = "api/timetable";

// create new timetable

export function createTimetable(timetable) {
  return axios.post(CUSTOMERS_URL, { timetable });
}

export function findtimeTables(queryParams) {
  return axios.post(`${CUSTOMERS_URL}/find`, { queryParams });
}
export function deletetimetable(customerId) {
  console.log("at axios", customerId);
  return axios.delete(`${CUSTOMERS_URL}/${customerId}`);
}
