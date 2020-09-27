import React,{useEffect,useState} from 'react';
import { PageHeader,Input,Row, Col, Divider } from 'antd';
import {
    CaretDownOutlined,
    UserOutlined,
    SearchOutlined,
    HomeFilled,
    CopyFilled,
    InsertRowRightOutlined,
    TeamOutlined
} from '@ant-design/icons';

import './Home.scss'


function Home(props){
 
    const [user,changeUser] = useState('')
        useEffect(function () {
          
          console.log(1111)
          let currentUser = localStorage.getItem('currentUser');
              try{
                  currentUser = JSON.parse(currentUser)
              }catch(err){
                  currentUser = currentUser;
              }
      
              if(!currentUser){
                  currentUser = {}
              }
      
              console.log(currentUser);
              currentUser
              changeUser(currentUser)
        },[])
        console.log(user);
  
    return (
        
        <div className="home_square" style={{background:'#f0f0f0'}}>
            Home
            <div className="user_name">{user.username}</div>
     
        </div>
    )
}

export default Home;