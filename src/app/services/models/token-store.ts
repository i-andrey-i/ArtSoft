import { Token } from "./token"

const TOKEN_KEY = 'token'

const get = (): Token | undefined => {
    const item = localStorage.getItem(TOKEN_KEY);
    if (!item) {
        return undefined;
    }
    return JSON.parse(item)
}

const set = (token: Token) => {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token))
}

const remove = () => {
    localStorage.removeItem(TOKEN_KEY)
}

export const tokenStore = {
    get,
    set,
    remove
}