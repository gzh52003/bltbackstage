/**
 * 使用Hook实现redux的效果
    * 唯一数据源：useReducer实现redux的功能
    * 数据共享：useContext实现react-redux的功能
    * 注意事项
        * hook必须写在函数组件中
        * 组件内容传递：props.children
 */
import React, { useReducer } from 'react';

let currentUser = localStorage.getItem('currentUser');
try{
    currentUser = JSON.parse(currentUser)
}catch(err){
    currentUser = currentUser;
}

if(!currentUser){
    currentUser = {}
}

const initState = {...currentUser}
function reducer(state,action){
    switch (action.type) {
        case 'login' :localStorage.setItem('currentUser',JSON.stringify(action.user))
        return action.user;
        case 'logout':
            localStorage.removeItem('currentUser')
            return {}
        // case 'removeLis':return state.filter(item=>item.username!=action.username)
        // case 'add':
        //     return [action.goods, ...state];
        // case 'remove':
        //     return state.filter(item => item.name != action.name);
        // case 'changeQty':
        //     return state.map(item=>{
        //         if(item.name === action.name){
        //             item.qty = action.qty;
        //         }
        //         return item;
        //     })
        // case 'clear':
        //     return [];
        default:
            throw new Error('type error');
    }
}

export const MyContext = React.createContext(null);
// export const store = useReducer(reducer,initState);

export function Provider(props){
    const [state,dispatch] = useReducer(reducer,initState);
    return (
        <MyContext.Provider value={{state,dispatch}}>
            {props.children}
        </MyContext.Provider>
    )
}

// export default MyContext
