import { AxiosResponse } from 'axios';
import { ApiRequest } from '@/api/ApiRequest';


export const getFavorites = async (url: string) => {
        const data =  await ApiRequest({
            method: 'get',
            url: url,
          });

        console.log(data!.data)
        return data

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