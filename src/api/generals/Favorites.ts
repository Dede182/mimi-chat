import { ApiRequest } from '@/api/ApiRequest';


export const getFavorites = async (url: string) => {
        return await ApiRequest({
            method: 'get',
            url: url,
          })

}