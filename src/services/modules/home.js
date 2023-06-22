import hyRequest from "../request"

export const getHomeHotSuggests = () => {
    return hyRequest.get({
        url: '/home/hotSuggests'
    })
}

export const getHomeCategories = ()=> {
    return hyRequest.get({
        url:'/home/categories',
    })
}

export const getHomeHouselist = page => {
  return hyRequest.get({
    url:'/home/houselist',
    params: {
        page
    }
  })
}