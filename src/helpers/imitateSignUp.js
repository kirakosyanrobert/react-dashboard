import { StorageKey } from "../consts";

export async function imitateSignUp(obj) {
    // не проверяю есть или нет | надо отправить запрос
    const data = JSON.parse(localStorage.getItem(StorageKey.Super));
        let success = false;
        const newData = [...data, obj];
        localStorage.setItem(StorageKey.Super, JSON.stringify(newData));
        success = true;
    return {
        success,
    }
}