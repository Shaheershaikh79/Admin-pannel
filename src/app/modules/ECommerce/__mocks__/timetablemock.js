import timeTableMockdata from "./timetabledataMock";
import MockUtils from "./mock.utils";

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
      subject = "English",
    } = timetable;

    const id = generateUserId();
    const newTimetable = {
      id,
      subject,
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

  // call customers

  mock.onPost("api/timetable/find").reply(({ data }) => {
    const mockUtils = new MockUtils();
    const { queryParams } = JSON.parse(data);

    const timeTableList = mockUtils.baseFilter(timeTableMockdata, queryParams);
    return [200, { timeTableList: timeTableList }];
  });

  mock.onDelete(/api\/timetable\/\d+/).reply((config) => {
    const id = config.url.match(/api\/timetable\/(\d+)/)[1];
    const index = timeTableMockdata.findIndex((el) => el.id === +id);
    timeTableMockdata.splice(index, 1);
    if (!index === -1) {
      return [400];
    }

    return [200];
  });
}

function generateUserId() {
  const ids = timeTableMockdata.map((el) => el.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
