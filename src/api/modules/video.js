import urls from '../urls.js'
import http from '../http.js'
export default {
    /**
     * 查询视频推荐
     * @param {*} limit 
     * @param {*} skip 
     * @param {*} order 
     * @returns 
     */
    async queryFeaturedData (limit, skip, order) {
        const url = urls.baseURL + urls.videopage.queryFeaturedData;
        const data = {
            limit,
            skip,
            order
        }
        const resp = await http(url, { data })
        return resp;
    }
}