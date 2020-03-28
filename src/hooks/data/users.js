import useAxios from 'axios-hooks'
//TODO Add Auth token all request

export function useGetUsers() {
    return useAxios(
        {
            url: 'http://176.10.124.161:7777/users',
            method: 'GET'
        },
        { manual: true }
    )
};

export function useGetUser() {
    return useAxios(
        {
            url: `http://176.10.124.161:7777/users/(id)`,
            method: 'GET'
        },
        { manual: true }
    )
};

export function useCreateUser() {
    return useAxios(
        {
            url: 'http://176.10.124.161:7777/users',
            method: 'POST'
        },
        { manual: true }
    )
};

export function useUpdateUser() {
    return useAxios(
        {
            url: 'http://176.10.124.161:7777/users(id)',
            method: 'PUT'
        },
        { manual: true }
    )
};

export function useDeleteUser() {
    return useAxios(
        {
            url: 'http://176.10.124.161:7777/users(id)',
            method: 'DELETE'
        },
        { manual: true }
    )
};