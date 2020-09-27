import request from '@/utils/request'

import { List, Avatar, Button, Skeleton } from 'antd';
import reqwest from 'reqwest';

import React, { useState, useEffect,useCallback,useContext, useMemo } from 'react';

import {MyContext} from '../store';



const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat&noinfo`;
function Lis(){

  const getData = callback => {
    reqwest({
      url: "http://localhost:2003/api/user",
      type: 'json',
      method: 'get',
      contentType: 'application/json',
      success: res => {
        callback(res);
      },
    });
  };

  const {state,dispatch} = useContext(MyContext);
  console.log('state=',state,dispatch);


  // 删除用户
  const  removeItem = useCallback(async function(id){
    // const  action = {type:'removeLis',username}
    // dispatch(action)

    const {data} = await request.remove('/user/'+id)
    getData(res => {
      setState({
        initLoading: false,
        data: res.data,
        list: res.data
      });
    },[states]);
  },[])



    const  [states,setState] = useState({
        initLoading: true,
        loading: false,
        data: [],
        list: [],
      })

    

    // const [userList,setUserList] = useState([])


    // const getData = callback => {
    //   reqwest({
    //     url: "http://localhost:2003/api/user",
    //     type: 'json',
    //     method: 'get',
    //     contentType: 'application/json',
    //     success: res => {
    //       callback(res);
    //     },
    //   });
    // };


    useEffect(()=>{
      //  async function fetchData(){
      //       try{
      //           const {data} = await request.get('/user')
      //           setUserList(data)

 
                
      //       }catch(error){
      //           console.log(error)
      //       }
      //      }
          
      //   fetchData()

       

      getData(res => {
        setState({
          initLoading: false,
          data: res.data,
          list: res.data
        });
      },[states]);

 




         
        
        //   const onLoadMore = () => {
        //     setState({
        //       loading: true,
        //       list: this.state.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
        //     });
        //     this.getData(res => {
        //       const data = this.state.data.concat(res.results);
        //       setState(
        //         {
        //           data,
        //           list: data,
        //           loading: false,
        //         },
        //         () => {
        //           // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        //           // In real scene, you can using public method of react-virtualized:
        //           // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        //           window.dispatchEvent(new Event('resize'));
        //         },
        //       );
        //     });
        // }
    },[state])
    const loadMore =
    !states.initLoading && !states.loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={() => {
            setState({
              loading: true,
              list: states.data.concat([...new Array(count)].map(() => ({ loading: true, name: {} }))),
            });
            getData(res => {
              const data = states.data.concat(res.results);
              setState(
                {
                  data,
                  list: state,
                  loading: false,
                },
                () => {
                  // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                  // In real scene, you can using public method of react-virtualized:
                  // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                  window.dispatchEvent(new Event('resize'));
                },
              );
            });
        }}>loading more</Button>
      </div>
    ) : null;



    return (
        
        <div>
            {/* {JSON.stringify(userList)} */}
            <List
        className="demo-loadmore-list"
        loading={states.initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={states.list}
        renderItem={item => (
          <List.Item
        actions={[<a key="list-loadmore-edit">{<Button type="primary">编辑</Button>}</a>, <a key="list-loadmore-more"><Button type="danger" onClick={removeItem.bind(null,item._id)}>删除</Button></a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src="./img/35da9ffa78b28bbfed9911fb5df2e8fe_1.jpg" />
                }
                title={<a href="https://ant.design">{item.username}</a>}
                description={item._id}
              />
              <div>{item.password}</div>
            </Skeleton>
          </List.Item>
        )}
      />
        </div>
    )
}

export default Lis;