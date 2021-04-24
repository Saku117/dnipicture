// const baseUrl = `http://127.0.0.1:3000/`

// const showToast = (title) => {
//     uni.showToast({
//         title: title,
//         icon: 'none'
//     })
// }

/**
 * 请求接口
 * @param {String} url 接口地址 
 * @param {*} option 接口配置信息
 * @returns 
 */
const http = (url, option = {}) => {
    // let hideLoading = option.hideLoading || false // 是否显示 loading
    // let hideMsg = option.hideMsg || false // 是否隐藏错误提示
    // let token = '' // 登录鉴权获得的 token
    // uni.getStorage({
    //     key: 'token',
    //     success: (ress) => {
    //         token = ress.data
    //     }
    // })
    // if (!hideLoading) {
    //     uni.showLoading({
    //         title: '加载中...',
    //         mask: true
    //     })
    // }
    return new Promise((resolve, reject) => {
        uni.request({
            url: url,
            method: option.method || 'GET', // 默认 post 请求
            data: option.data,
            header: option.header
        }).then((resp) => {
            if (resp[0] !== null) {
                return false;
            }
            console.log(resp);
            resolve(resp[1]);
        }).catch((err) => {
            console.log(err);
            reject(err)
        })
    })
}
export default http