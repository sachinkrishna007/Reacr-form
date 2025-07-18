export const formatEmiratesId = (value) => {
  const digitsOnly = value.replace(/\D/g, "");
  if (digitsOnly.length <= 3) return digitsOnly;
  if (digitsOnly.length <= 7) return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3)}`;
  if (digitsOnly.length <= 14) return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 7)}-${digitsOnly.slice(7)}`;
  return `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(3, 7)}-${digitsOnly.slice(7, 14)}-${digitsOnly.slice(14, 15)}`;
};
