import axios from 'axios'
import { makeUseAxios } from 'axios-hooks'

import { StorageKey } from './consts';
const AUTH_TOKEN = localStorage.getItem(StorageKey.Token) || ''

export const useAxios = makeUseAxios({
  axios: axios.create({ 
      baseURL: 'http://176.10.124.161:1754',
      headers: {
          token: AUTH_TOKEN
      }
    }),
});
 