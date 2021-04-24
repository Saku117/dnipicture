import urls from '../urls.js'
import http from '../http.js'

export default {
    /**
     * 
     * @param {Number} limit  获取几条
     * @param {Number} skip 跳过几条
     * @param {String} order  “new” 最新 “hot” 热门
     * @returns 
     */
    async queryRecommendData (limit = 30, skip = 0, order = "hot") {
        const url = urls.baseURL + urls.homepage.queryRecommendData;
        const data = {
            limit,
            skip,
            order,
        }
        const resp = await http(url, { data })
        return resp;
    },
    /**
     * 获取专辑详情
     * @param {Number} limit  获取几条
     * @param {Number} skip 跳过几条
     * @param {String} order  “new” 最新 
     * @returns 
     */
    async queryAlbumData (limit = 30, skip = 0, order = "new") {
        const url = urls.baseURL + urls.homepage.queryAlbumData;
        const data = {
            limit,
            skip,
            order,
        }
        const resp = await http(url, { data })
        return resp;
    },
    /**
     * 查询专辑详情
     * @param {Number} id 
     * @param {Number} limit 
     * @param {String} order 
     * @param {Number} skip 
     * @param {Number} first 
     * @returns 
     */
    async queryAlbumInfo (id, limit = 30, order = "new", skip = 0, first = 1) {
        const url = urls.baseURL + urls.homepage.queryAlbumInfo + '/' + id + '/wallpaper';
        const data = {
            limit,
            order,
            skip,
            first
        }
        const resp = await http(url, { data })
        return resp;
    },
    /**
     * 查询图片详情
     * @param {Number} id 
     * @returns 
     */
    async queryImgInfo (id) {
        const url = urls.baseURL + urls.homepage.queryImgInfo + `/${id}/comment`;
        const resp = await http(url);
        return resp;
    },
    /**
     * 查询分类数据
     * @returns 
     */
    async queryCategoryData () {
        const url = urls.baseURL + urls.homepage.queryCategoryData;
        const resp = await http(url);
        return resp;
    },
    /**
     * 查询分类详情
     * @param {*} id 
     * @param {*} limit 
     * @param {*} skip 
     * @param {*} order 
     * @returns 
     */
    async queryCategoryInfo (id, limit = 30, skip = 0, order = "new") {
        const url = urls.baseURL + urls.homepage.queryCategoryInfo + `/${id}/vertical`;
        const data = {
            limit,
            skip,
            order
        }
        const resp = await http(url, { data })
        return resp;
    },
}