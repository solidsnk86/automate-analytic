const rtf = new Intl.RelativeTimeFormat("es", { numeric: "auto" });

export const timeAgo = (str) => {
  const diff = new Date(str).getTime() - Date.now();
  const abs = Math.abs(diff);

  const units = [
    { unit: "year", ms: 31536000000 },
    { unit: "month", ms: 2592000000 },
    { unit: "week", ms: 604800000 },
    { unit: "day", ms: 86400000 },
    { unit: "hour", ms: 3600000 },
    { unit: "minute", ms: 60000 },
    { unit: "second", ms: 1000 },
  ];

  for (const { unit, ms } of units) {
    const value = Math.trunc(diff / ms);

    if (abs >= ms || unit === "second") {
      return rtf.format(value, unit);
    }
  }
};
