import dayjs from "dayjs";

function TimeFormatter(time: string) {
  return dayjs(time).format("YYYY-MM-DD HH:mm");
}

export default TimeFormatter;
