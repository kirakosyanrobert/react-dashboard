import { StorageKey } from "../consts";

export async function imitateLogin(obj) {
    // не проверяю есть или нет | надо отправить запрос
    const data = JSON.parse(localStorage.getItem(StorageKey.Users));
    let success = false;
    let token = '';

    data.forEach((user) => {
        if(user.email === obj.email && user.password === obj.password) {
            token = Date.now().toString();
            success = true;
        }
    })

    return {
        success,
        token
    }
}