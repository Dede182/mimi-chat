import { AxiosResponse } from 'axios';
import { ApiRequest } from '@/api/ApiRequest';


export const getFavorites = async (url: string) => {
        return await ApiRequest({
            method: 'get',
            url: url,
          })

}

export const postFavorites = async (url: string,data : any,method :string = "delete") => {
        return await ApiRequest({
            method: method,
            url: url,
            params : data
          })

}

export const findFavorites = async (url: string,search : any) => {
  return await ApiRequest({
      method: 'get',
      url: url,
      params : {
        search : search
      }
    })

}

export type findFavoritesResponse  = AxiosResponse