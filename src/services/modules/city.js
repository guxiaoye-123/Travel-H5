import hyRequest from "../request"


export const getCityAll = () => {
    return hyRequest.get({
        url:'/city/all'
    })
}
