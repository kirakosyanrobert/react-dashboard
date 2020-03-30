import { useAxios } from '../../API';

export function useGetUsers() {
    return useAxios(
        {
            url: `/users`,
            method: 'GET'
        },
        { manual: true }
    )
};

export function useGetUser() {
    return useAxios(
        {
            url: `/users/(id)`,
            method: 'GET'
        },
        { manual: true }
    )
};

export function useCreateUser() {
    return useAxios(
        {
            url:  `/users`,
            method: 'POST'
        },
        { manual: true }
    )
};

export function useUpdateUser() {
    return useAxios(
        {
            url:  `/users/(id)`,
            method: 'PUT'
        },
        { manual: true }
    )
};

export function useDeleteUser() {
    return useAxios(
        {
            url:  `/users/(id)`,
            method: 'DELETE'
        },
        { manual: true }
    )
};