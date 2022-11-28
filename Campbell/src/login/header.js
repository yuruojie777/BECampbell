import React, {useEffect, useState} from "react";
import '../css/header.css';
import {Avatar} from 'antd';
import img from '../logo.png'
import axios from "axios";
import {useHistory, withRouter} from "react-router-dom";
import server from "../constName/url";
const Header = (props)=>{
    const [user,setUser] = useState({});
    const history = useHistory()
    useEffect(async ()=>{
        axios.get(server+'/campbell/user',{withCredentials: true})
            .then(function (response) {
                console.log(response.data.data);
                setUser(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            })
    },[]);




    function logout(){
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT";
        window.location.reload();
    }



    return(
        <div className="header" style={{backgroundColor: 'rgb(15,59,110)', height: '65px'}}>
            <div className="logo">
                <img src={img}/>
            </div>
            <h1>Welcome to Campbell!</h1>
            <h1 className="username" >{localStorage.getItem('username')}</h1>
            <h1 className="access">{localStorage.getItem('access').toUpperCase()}</h1>
            <div style={{display:'inline-block',marginTop:'15px', marginLeft:'5%'}}>
                <Avatar src={"https://ui-avatars.com/api/?rounded=true&&background=random&&format=svg&&name="+localStorage.getItem('username')}/>
            </div>
            <div style={{display:'inline-block',marginTop:'15px', marginLeft:'1%'}}>
                <button style={{fontWeight:'bolder', color:'rgb(15,59,110)'}}  onClick={logout}>logout</button>
            </div>
        </div>
    )
}

export default withRouter(Header);