import { StorageKey } from "../../consts";

export function useLoggedInAsSuper() {
    const loggedInUser = JSON.parse(localStorage.getItem(StorageKey.LoggedInUser));
    const loggedInAsSuper = loggedInUser.role === "0" ? true : false;
    
    return loggedInAsSuper;
}