export const randomId = (n = 8) => {
  const str = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < n; i++) {
    result += str[parseInt((Math.random() * str.length).toString())]
  }
  return result
}
