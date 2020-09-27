import React,{Suspense, lazy,useContext} from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import './App.scss';
import {withRouter,BrowserRouter,Route,Redirect,Switch,Link,NAVLink} from 'react-router-dom';

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
} from '@ant-design/icons';


// @withRouter




import Home from './views/Home'
const Login = lazy(() => import("./views/Login"))
const Lis = lazy(() => import("./views/Lis"))
const Mine = lazy(() => import("./views/Mine/Index"))
const Single = lazy(() => import("./views/Single"))



import {Layout,Menu,Row,Col,Button} from 'antd'
import { withUser } from './utils/hoc';
import {MyContext} from './store';

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;
class App extends React.Component{
  componentWillMount(){
    // const {state,dispatch} = useContext(MyContext);
    // console.log('app=',state);
    // 获取用户信息
    let currentUser = localStorage.getItem('currentUser');
    try{
        currentUser = JSON.parse(currentUser)
    }catch(err){
        currentUser = currentUser;
    }

    if(!currentUser){
        currentUser = {}
    }
    this.setState({
      ...this.state,
      user:currentUser
    });
  }
                      


  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });

 
  };
   render(){
    return (
      <div>

        <Layout>
        <Sider trigger={<img src="//js.baletoo.cn/static/m/static/images/newlogo2.png?2018"/>} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
{/* ------------- */}
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} >
            
          <SubMenu
          key="sub1"
          title={
            <span onClick={()=>{
              this.props.history.push('./home')
            }} className="home_menu">
              <MailOutlined />
              <span  >首页</span>
            </span>
          }
        >
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu>
        <SubMenu  key="sub2" title={
            <span onClick={()=>{
              this.props.history.push('./list')
            }} className="list_menu">
              <AppstoreOutlined />
              <span  >用户管理</span>
            </span>
          } >
          <Menu.Item key="5" >Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu
          key="sub4"
          title={
            <span onClick={()=>{
              this.props.history.push('./single')
           }} className="single_menu">
              <SettingOutlined />
              <span >预约</span>
            </span>
          }
        >
          <Menu.Item key="9" >Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
          </Menu>
{/* ------------- */}
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <div>

              {this.state.user.username? <span  onClick={()=>{
                localStorage.removeItem('currentUser')
              this.props.history.push('./login')
           }} className="login_btn">退出</span>:<span  onClick={()=>{
            this.props.history.push('./login')
         }} className="logout_btn">登录</span>}
           


            {this.state.user.username?<span className="ht_username">{this.state.user.username}</span>:''}
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
          {/* --------------- */}
          <Suspense fallback={<div>loading...</div>}>
      
      <Switch>
        <Route path="/home" component={Home} /> 
        <Route path="/login" component={Login} />  
        <Route path="/mine" component={Mine} />  
        <Route path="/list" component={Lis} />  
        <Route path="/single" component={Single} /> 
        <Route path="/notfound" render={() => <div>404</div>} />
        <Redirect from="/" to="/home" exact />
      </Switch>
    </Suspense>
          {/* --------------- */}
          </Content>
        </Layout>
      </Layout>
        {/* ----------------------------------- */}
        </div>

  );
}
}

App = withRouter(App);
App = withUser(App);
export default App;
