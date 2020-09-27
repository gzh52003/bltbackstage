import axios from 'axios';


const request = axios.create({
    baseURL:'http://localhost:2003/api',
    withCredentials:true
})

export async function get(url,data,config={}){
    const {data:result} = await request({
        ...config,
        url,
        method:'get',
        params:data
    })
    return result;
}


export async function post(url,data,config={}){
    
    const {data:result} = await request({
        ...config,
        url,
        method:'post',
        data
    })

    return result;
}


export async function remove(url,data,config={}){
    
    const {data:result} = await request({
        ...config,
        url,
        method:'delete',
        data
    })

    return result;
}



export default {
    get,
    post,
    remove
};