import { useAxios } from "../../API";


export function useSignInAsAdmin() {
    return useAxios(
        {
            url: `/auth/admin-signin`,
            method: 'POST'
        },
        { manual: true }
    )
};

export function useSignIn() {
    return useAxios(
        {
            url:  `/auth/signin`,
            method: 'POST'
        },
        { manual: true }
    )
};