export const BASE_URL = "http://192.168.3.8:8080/emos-wx-api"
//封装通用$http1
export default function $http(options) {
	const {
		url,
		data,
		method
	} = options
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASE_URL + url,
			data: data,
			method: method,
			header: {
				token: uni.getStorageSync("token")
			},
			success(resp) {
				if (resp.statusCode===401) {
					uni.redirectTo({
						url:"/pages/login/login.vue"
					})
				} else if(resp.statusCode===200&&resp.data.code===200){
					let data = resp.data
					console.log("token",data.hasOwnProperty("token"))
					if (data.hasOwnProperty("token")) {
						let token = data.token
						console.log(token)
						uni.setStorageSync("token", token)
					}
					resolve(resp)
				}else{
					reject(resp.data.msg);
				}
			},
			fail(error) {
				reject(error);
			},
			complete: () => {
				uni.hideLoading();
			}

		});
	})
}
