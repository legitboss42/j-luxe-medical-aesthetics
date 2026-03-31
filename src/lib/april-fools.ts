export const APRIL_FOOLS_STORAGE_KEY = "jluxe_april_fools_seen_2026_v2";

export function isAprilFoolsWindow(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return year === 2026 && month === 3 && day === 1;
}
