export function createCode() {
  return randomCode() + randomCode()
}

function randomCode() {
  return Math.floor(Date.now() * Math.random()).toString(36)
}