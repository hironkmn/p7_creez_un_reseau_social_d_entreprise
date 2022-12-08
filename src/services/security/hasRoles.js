const jwt = require('jsonwebtoken')

function hasRoles(postOfUser){
    let token = jwt.decode(localStorage.getItem('token'))
    if(token.role === 'ADMIN'){
        return true
    } else {
        if(postOfUser === token.userId){
            return true
        } else {
            return false
        }
    }
}
export default hasRoles