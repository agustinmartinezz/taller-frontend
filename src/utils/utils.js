export function validateText(inputText) {
  return inputText !== null && inputText.trim() !== '';
}

export function validateDate(inputDate) {
  const dateObj = new Date(inputDate);
  return !isNaN(dateObj.getTime());
}

export function validateNumber(inputNumber) {
  return !isNaN(parseFloat(inputNumber)) && isFinite(inputNumber);
}

export function esMenorEdad(date) {
  const currentDate = new Date();
  const inputDate = new Date(date);
  const differenceInMilliseconds = currentDate - inputDate;
  const yearsDifference = differenceInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);
  return yearsDifference < 18;
}

export const finDelCenso = '2023-08-31'