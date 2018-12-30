export function formatCurrency(value) {
  return `\$${(value / 100 ).toFixed(2)}`;
}

export function formatCount(num, word) {
  if (num == 1)
    return `${num} ${word}`;

  return `${num} ${word}s`;
}

export function formatPercentage(num, decimalPlaces) {
  return `${(num * 100).toFixed(decimalPlaces)}%`;
}