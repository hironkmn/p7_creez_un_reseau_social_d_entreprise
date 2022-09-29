

function isAdmin(user){
    return user.roles.includes("admin")
}

function isUser(user){
    return user.roles.includes("user")
}
