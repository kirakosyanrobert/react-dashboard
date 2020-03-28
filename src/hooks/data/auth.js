import useAxios from 'axios-hooks'
//TODO: add Request address globally


export function useSignInAsAdmin() {
    return useAxios(
        {
            url: 'http://176.10.124.161:7777/auth/admin-signin',
            method: 'POST'
        },
        { manual: true }
    )
}

export function useSignIn() {
    return useAxios(
        {
            url: 'http://176.10.124.161:7777/auth/signin',
            method: 'POST'
        },
        { manual: true }
    )
}