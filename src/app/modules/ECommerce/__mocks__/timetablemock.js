import timeTableMockdata from "./timetabledataMock";

export default function mockTimetable(mock) {
  mock.onPost("api/timetable").reply(({ data }) => {
    const { timetable } = JSON.parse(data);

    const {
      firstName = "",
      lastName = "",
      email = "",
      Gender = "Female",
      status = 0,
      dateOfBbirth = "01/01/2019",
      type = 1,
    } = timetable;

    const id = generateUserId();
    const newTimetable = {
      id,
      firstName,
      lastName,
      email,
      Gender,
      status,
      dateOfBbirth,
      type,
    };

    timeTableMockdata.push(newTimetable);
    return [200, { timetable: newTimetable }];
  });
}
function generateUserId() {
  const ids = timeTableMockdata.map((el) => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
