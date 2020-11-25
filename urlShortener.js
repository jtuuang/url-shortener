const numbers = '1234567890'
const lowerCaseAlphabets = 'abcdefghijklmnopqrstuvwxyz'
const upperCaseAlphabets = lowerCaseAlphabets.toUpperCase()
const characterString = numbers + lowerCaseAlphabets + upperCaseAlphabets
const characterArray = characterString.split('')

function sample(array) {
  const randomIndex = Math.floor(Math.random() * array.length)
  return array[randomIndex]
}

function urlShortener() {
  let shortenedUrl = ''

  for (let i = 0; i < 5; i++) {
    shortenedUrl += sample(characterArray)
  }

  return shortenedUrl
}

module.exports = urlShortener