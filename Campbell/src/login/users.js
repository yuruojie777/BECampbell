import {Skeleton, Switch, Card, Avatar, message, Modal, Form, Input} from 'antd';
import {EditOutlined, EllipsisOutlined, LockOutlined, SettingOutlined} from '@ant-design/icons';
import React, {useEffect, useState} from 'react';
import "../css/user.css";
import axios from "axios";
import server from "../constName/url";
const { Meta } = Card;

const Users = ()=>{

    const avatar = {
        sale: 'sale.png',
        admin: 'admin.png',
        credit: 'credit.png',
        debit: 'debit.png'
    }
    const [isChanging, setIsChanging] = useState(1);
    const resetPassword = '123456';
    const [users,setUsers] = useState([]);
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [userForm] = Form.useForm();
    const [currentUser, setCurrentUser] = useState({user: {name:'',userid:''}});

    const showModal = (e) => {
        let id = e.currentTarget.getAttribute("data-key");
        setCurrentUser(findUserById(users, id));
        console.log(id);
        setIsModalVisible(true);
    };

    const handleOk = () => {
        userForm.submit();
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleSettingSubmit = (e)=>{
        console.log(e);
        axios.put(server+'/campbell/user', e,{withCredentials: true})
            .then(function (response){
                console.log(response.data.data);
                if(response.data.error != null) message.error(response.data.error);
                else {
                    message.success("Success");
                    setIsChanging(isChanging * (-1));
                }
            })
            .catch(function (error){
                console.log(error);
            })
    }
    useEffect(async ()=>{
        axios.get(server+'/campbell/user/all',{withCredentials: true})
            .then(function (response) {
                // handle success
                console.log(response.data.data);
                setUsers(response.data.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    },[isChanging]);

    function findUserById(users, id){

        for(let i = 0; i < users.length; i++){
            if(users[i].userid === id) {
                console.log(users[i]);
                return users[i];
            }
        }
        return null;
    }

    function handleOnBanClick(e) {
        let id = e.currentTarget.getAttribute("data-key");
        let user = (findUserById(users, id));
        if(id === localStorage.getItem("id")) Modal.warning({
            title: 'Warning',
            content: "You can't ban yourself",
        });
        // console.log(id);
        else Modal.confirm({
            title: user.status===1?'Ban User':'Unban User',
            content: 'User '+ user.name+ 'will be '+ (user.status===1?'banned!':'unbanned'),
            onOk:()=>{handleBan(user)}
        });
    }

    function handleOnResetClick(e) {
        let id = e.currentTarget.getAttribute("data-key");
        let user = (findUserById(users, id));

        Modal.confirm({
            title: 'Reset Password',
            content: 'User '+ user.name+ ' will be reset to '+ resetPassword,
            onOk:()=>{handleReset(user)}
        });
    }


    async function handleReset(user){
        let status = 0;
        const newUser = {
            userid: user.userid,
            password: resetPassword
        }
        await axios.put(server+'/campbell/user',newUser,{withCredentials: true})
            .then(function (response) {
                // handle success
                console.log(response.data);
                if(response.data.error===null) {
                    status = 1;
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            })
        if(status !== 0) message.success("Success");
        else message.error("Error");
    }

    async function handleBan(user){
        let status = 0;
        const newUser = {
            userid: user.userid,
            status: user.status*(-1)
        }
        await axios.put(server+'/campbell/user',newUser,{withCredentials: true})
            .then(function (response) {
                // handle success
                console.log(response.data);
                if(response.data.error===null) {
                    status = 1;
                    const arr = [];
                    user.status *= -1;
                    for(let i = 0; i < users.length; i++){
                        if(users[i].userid !== user.userid) arr.push(users[i]);
                        else arr.push(user);
                    }
                    setUsers(arr);
                }
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            })
        if(status !== 0) message.success("Success");
        else message.error("Error");
    }

    const UserModal = (user)=>{
        return (
            <Modal title='Edit' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Form onFinish={(e)=>handleSettingSubmit(e)} name="userInfo"
                      form={userForm}
                      initialValues={{ name: user.user.name, userid: user.user.userid, password:''}}
                >
                    <Form.Item name="userid">
                        <Input disabled={true} placeholder={user.user.userid}/>
                    </Form.Item>
                    <Form.Item name="name">
                        <Input placeholder="Username" autoComplete='off'></Input>
                    </Form.Item>
                    <Form.Item name="password">
                        <Input placeholder="New Password" autoComplete='off'></Input>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
    const ListItems = users.map((user) =>
        <li key={user.id} style={{listStyle: "none"}}>
            <Card
                style={{ width: 300, marginTop: 16 }}

                actions={[
                    <SettingOutlined data-key={user.userid} onClick={(e)=>showModal(e)}/>,
                    <EditOutlined data-key={user.userid} onClick={(e)=>handleOnResetClick(e)}/>,
                    <LockOutlined data-key={user.userid} onClick={(e)=>handleOnBanClick(e)}/>
                ]}
            >
                <Skeleton loading={loading} avatar active>
                    <Meta
                        avatar={<Avatar src={"https://ui-avatars.com/api/?rounded=true&&background=random&&format=svg&&name="+user.name}/>}
                        title={user.name + (user.status<0?'(banned)':'')}
                        description={user.access}
                    />
                </Skeleton>
            </Card>

        </li>
    );



    return (
      <div className='cardlist'>
          {ListItems}

          <UserModal user = {currentUser}/>
        </div>
    );

}

export default Users;