export function getRandomPositiveFloat(firstValue, secondValue, digits = 1) {
  const lower = Math.min(Math.abs(firstValue), Math.abs(secondValue));
  const upper = Math.max(Math.abs(firstValue), Math.abs(secondValue));
  const result = Math.random() * (upper-lower) + lower;
  return +result.toFixed(digits);

}
export function getRandomPositiveInteger (firstValue, secondValue) {
  const lower = Math.ceil(Math.min(Math.abs(firstValue), Math.abs(secondValue)));
  const upper = Math.floor(Math.max(Math.abs(firstValue), Math.abs(secondValue)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

export function getValueToString(value) {
  return value < 10 ? `0${ value}` : value;
}

export function validateTitleLenght(value) {
  return !!value && value.length >= 30 && value.length <= 100;
}

export function validatePrice(value) {
  return !!value && value <= 100000;
}
