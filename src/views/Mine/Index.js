import React,{useState,useEffect} from 'react';
import './Index.scss';
import {LeftOutlined,RightOutlined} from '@ant-design/icons'
import { List, Typography,Popover} from 'antd';
// import React, { useState, useEffect,useMemo,useCallback } from 'react';


function Mine(props){
  // const {path,gotoLogin} = useState('./mine')
  // const skipLogin = useCallback(function)

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
        <div className="mine_wrap">
          mine
        </div>
    )
}

export default Mine;