import test from 'node:test'
import assert from 'node:assert/strict'

import {
  calculateDiscountedPrice,
  getProductAvailability,
  getOfferLabel,
} from './utils.js'

test('calculateDiscountedPrice applies percentage discount correctly', () => {
  assert.equal(calculateDiscountedPrice(200, 10), 180)
})

test('getProductAvailability marks products with zero stock as unavailable', () => {
  assert.deepEqual(getProductAvailability({ stock: 0, isOutOfStock: false }), {
    isAvailable: false,
    status: 'Out of stock',
    stock: 0,
  })
})

test('getOfferLabel shows the applied discount percentage', () => {
  assert.equal(getOfferLabel(15), '15% OFF')
})
