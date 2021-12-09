import $http from "../http.js";

export const getBaseUrl = ()=>{
    return 'http://192.168.3.8:8080/emos-wx-api';
}

/**
 * 注册
 */
export const getRegister = (data)=>{
    return $http({
        url:'/user/register',
		data,
		method:"POST"
    });
}


export const getLogin = (data)=>{
    return $http({
        url:'/user/login',
		data,
		method:"POST"
    });
}

export const getCheckin = (data)=>{
    return $http({
        url:'/checkin/checkin',
		data,
		method:"POST"
    });
}

export const createFaceModel = (data)=>{
    return $http({
        url:'/checkin/createFaceModel',
		data,
		method:"POST"
    });
}

export const validCancheckIn = (data)=>{
    return $http({
        url:'/checkin/validCanCheckIn',
		data,
    });
}

export const searchTodayCheckin = (data)=>{
    return $http({
        url:'/checkin/searchTodayCheckin',
		data,
    });
}
