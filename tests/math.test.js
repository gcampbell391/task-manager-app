const { calculateTip, celsiusToFahrenheit, fahrenheitToCelsius } = require('../src/math')

test('Should calculate total with tip', () => {
    const total = calculateTip(10, .3)
    expect(total).toBe(13)
})

test('Should calculate total with default tip', () => {
    const total = calculateTip(10)
    expect(total).toBe(12)
})

test('Should calculate celsius to fahrenheit successfully', () => {
    const newTemp = celsiusToFahrenheit(90)
    expect(newTemp).toBe(194)
})

test('Should calculate fahrenheit to celsius successfully', () => {
    const newTemp = fahrenheitToCelsius(32)
    expect(newTemp).toBe(0)
})


