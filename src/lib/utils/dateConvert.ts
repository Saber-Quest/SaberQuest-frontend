function getOrdinalSuffix(day: number): string {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function dateConvert({
  isoDate,
  type,
}: {
  isoDate: string;
  type: number;
}) {
  const date = new Date(isoDate);

  const day = date.getUTCDate().toString().padStart(2, "0");
  const ordinalSuffix = getOrdinalSuffix(Number(day));
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const monthShort = date.toLocaleString("default", { month: "short" });
  const year = date.getUTCFullYear().toString();
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");
  const seconds = date.getUTCSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHours = (hours % 12 || 12).toString();

  if (type === 1) {
    const formattedDate = `${monthShort}. ${day}${ordinalSuffix}, ${year}, ${formattedHours}:${minutes}:${seconds} ${ampm}`;
    return formattedDate;
  }
  if (type === 2) {
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
}
