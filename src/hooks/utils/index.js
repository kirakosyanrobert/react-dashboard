import { useEffect } from 'react';

export function useEffectOnce (callback) {
    return useEffect(callback, [])
}