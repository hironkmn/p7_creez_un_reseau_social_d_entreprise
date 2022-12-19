const jwt = require('jsonwebtoken')

function isAuth() {
  let body = document.querySelector('body')
  if (jwt.decode(localStorage.getItem('token')) == null) {
    console.log("Non connecté")
    return false
  } else {
    let token = jwt.decode(localStorage.getItem('token'))
    let currentDate = new Date()
    if (token.exp * 1000 < currentDate.getTime()) {
      console.log("Token expiré")
      return false
    } else {
      console.log("Token valide")
      body.style.overflowY= 'scroll'
      return true
    }
  }
}

export default isAuth;