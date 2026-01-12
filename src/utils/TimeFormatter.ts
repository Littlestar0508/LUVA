import dayjs from "dayjs";

function TimeFormatter(time: string) {
  if (time === null) return null;
  return dayjs(time).format("YYYY-MM-DD HH:mm");
}

export default TimeFormatter;
