export const getCountryFromTimeZone = (timezone) => {
  const array = timezone.split("/");
  const country = array[2] ? array[2] : array[1];
  return country;
};
