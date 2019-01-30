/**
 * @param date
 * @returns {string}
 */
export function formatDate(date) {
  const d = new Date(date);
  const monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  const day = d.getDate();
  const monthIndex = d.getMonth();
  const year = d.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

/**
 * @returns {string} format YYYY-MM-DD
 */
export function getToday() {
  return (new Date()).toJSON().slice(0, 10);
}