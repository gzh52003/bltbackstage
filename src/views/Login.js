import React,{useState,useEffect,useContext} from 'react';
import './Login.scss';
import {LeftOutlined,RightOutlined,MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons'

import { Button,Menu } from 'antd'

import request from '@/utils/request'

import {MyContext} from '../store';
const { SubMenu } = Menu;

function Login(props){

  const {state,dispatch} = useContext(MyContext);
  console.log('state=',state,dispatch);
      // 写登录导航
      const [current,setCurrent] = useState('mail');

      const handleClick = (e)=>{
          setCurrent(e.key)
      }
  
  
      // 写登录注册逻辑
  
      const [form,setInfo] = useState({
        username:'',
        password:''
      })
  
      const printValue = async(e) => {
        e.preventDefault();
        console.log(form.username,form.password)
        const {username,password} = form
        console.log(username,password)
        const data = await request.get('/login',{username,password})
  
        console.log('data',data);
  
        if(data.code ==1){
          
          dispatch({type:'login',user:data.data})
          //  localStorage.setItem('currentUser',JSON.stringify(data.data));
           props.history.push('./home')
        }
      }
  
      const updateField = e => {
        setInfo({
          ...form,
          [e.target.name]:e.target.value
        });
      };

    
    return (
        <div className="login_page">

        login
          <div className="login_square">
                  <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="app">
          账号登录
        </Menu.Item>
      </Menu>


  :<div className="login_box">
        <div className="login_username">
        <img src="//js.baletoo.cn/static/m/static/images/iphone.png"/>
        <input value={form.username} name="username" type="text" placeholder="请输入用户名" onChange={updateField}/>
        </div>
        <div className="login_password">
         <img src="//js.baletoo.cn/static/m/static/images/yijian.png"/>
        <input value={form.password} name="password" type="password" placeholder="请输入密码" onChange={updateField}/>
        </div>
        
        </div>


        <div className="ht_submit">
         <Button className="login_btn" type="primary" onClick={printValue}>登录</Button>
         </div>
        </div>

        </div>




    )
}

export default Login;
