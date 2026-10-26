export function formatCurrency(value) {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency: 'AED',
    maximumFractionDigits: 2,
  }).format(value)
}

export function calculateDiscountedPrice(price, offerPercent = 0) {
  const validPercent = Math.max(0, Number(offerPercent) || 0)
  return Number(price) * (1 - validPercent / 100)
}

export function getOfferLabel(offerPercent = 0) {
  const value = Math.max(0, Number(offerPercent) || 0)
  return value > 0 ? `${value}% OFF` : ''
}

export function getProductAvailability(product) {
  const stock = Number(product?.stock ?? 0)
  const isManualOut = Boolean(product?.isOutOfStock)
  const isAvailable = !isManualOut && stock > 0

  return {
    isAvailable,
    status: isManualOut || stock === 0 ? 'Out of stock' : 'In stock',
    stock,
  }
}

export function generateWhatsAppLink({ product, quantity, selectedSize, selectedColor, customer }) {
  const offerPercent = Number(product.offerPercent ?? 0)
  const pricePerItem = calculateDiscountedPrice(product.price, offerPercent)
  const totalPrice = pricePerItem * quantity

  const message = [
    'Hello! I would like to order:',
    `- Product: ${product.name} (Size: ${selectedSize || 'N/A'}, Color: ${selectedColor || 'N/A'})`,
    `- Quantity: ${quantity}`,
    `- Price: ${formatCurrency(pricePerItem)} each = ${formatCurrency(totalPrice)} total`,
    offerPercent > 0 ? `- Offer: ${offerPercent}% discount applied` : '',
    '',
    `Customer Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
    `Email: ${customer.email || 'Not provided'}`,
    '',
    'Please confirm my order.',
  ]
    .filter(Boolean)
    .join('\n')

  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/971500000000?text=${encodedMessage}`
}
