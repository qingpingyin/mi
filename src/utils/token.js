
export function getToken(TokenKey) {
    return localStorage.getItem(TokenKey)
}

export function setToken(TokenKey,token){
    localStorage.setItem(TokenKey, token)
}

export function removeToken(TokenKey) {
    localStorage.removeItem(TokenKey)
}
