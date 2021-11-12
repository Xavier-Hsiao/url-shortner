function pickRandomIndex(array) {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function digitGenerator() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const number = '0123456789'
  const collection = lowerCaseLetters + upperCaseLetters + number

  let digits = ''

  for(let i = 1; i < 6; i++) {
    digits += pickRandomIndex(collection)
  }

  return digits
}

module.exports = digitGenerator