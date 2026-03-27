export function nowIsoString() {
  return new Date().toISOString();
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60_000);
}
