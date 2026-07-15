/**
 * Order pricing for the Agentwerke V-model pilot.
 *
 * Deliberately small and pure: the pilot proves that a requirement can be traced through a real CI
 * run to a real test result, so this needs just enough behaviour to have tests worth failing.
 */

/** @typedef {{ sku: string, unitPrice: number, quantity: number }} OrderLine */

/**
 * Sums an order's lines.
 *
 * @param {OrderLine[]} lines
 * @returns {number} total in whole cents, to keep the arithmetic exact
 */
export function orderTotal(lines) {
  if (!Array.isArray(lines)) {
    throw new TypeError('lines must be an array');
  }

  return lines.reduce((total, line) => total + line.unitPrice * line.quantity, 0);
}

/**
 * @param {OrderLine[]} lines
 * @returns {boolean} whether the order can be submitted
 */
export function canSubmit(lines) {
  return Array.isArray(lines) && lines.length > 0;
}
