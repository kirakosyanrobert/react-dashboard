import { useEffect } from 'react';

export function useEffectOnce (callback) {
    return useEffect(callback, [])
}

export { useCategoriesList } from './useCategoriesList';
export { useLoggedInAsSuper } from './useLoggedInAsSuper';
export { useFormatDate } from './useFormatDate';