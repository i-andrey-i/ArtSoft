import { Token } from './token';

const tokenKey = 'token' as const;

const get = (): Token | undefined => {
    const item = localStorage.getItem(tokenKey);

    if (item == null) {
        return undefined;
    }

    return JSON.parse(item) as Token
}

const set = (token: Token): void => {
    localStorage.setItem(tokenKey, JSON.stringify(token))
}

const remove = (): void => {
    localStorage.removeItem(tokenKey)
}

export const tokenStore = {
    get,
    set,
    remove
}