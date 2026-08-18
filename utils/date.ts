export function formatDate(value?: string | null) {
  if (!value) return "";

  const [datePart] = value.replace("T", " ").split(" ");
  const [year, month, day] = datePart.split("-");

  if (!year || !month || !day) return value;

  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
}

export function formatTime(value?: string | null) {
  if (!value) return "";

  const [hours = "00", minutes = "00"] = value.split(":");
  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
}

export function formatDateTime(value?: string | null) {
  if (!value) return "";

  const [datePart, timePart] = value.replace("T", " ").split(" ");
  const date = formatDate(datePart);
  const time = formatTime(timePart);

  return [date, time].filter(Boolean).join(" ");
}
