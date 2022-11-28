import { Form, Input, Button, Checkbox,message} from 'antd';
import axios from "axios";
import {useEffect, useState} from "react";
import '../css/userlogin.css';
import server from "../constName/url";
const UserLogin = (props) => {

    useEffect(async ()=>{
        document.title = "Campbell";
        axios.get(server+'/campbell/loginticket',{withCredentials: true})
            .then(function (response) {
                console.log(response.data);
                if(response.data.error===null) props.history.push("/index");
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            })
    },[]);


    const [user,setUser] = useState();
    const onFinish = async (values) => {
        let status = 0;
        let text = '';
        console.log('http://localhost:8080'+'/campbell/login');
        await axios.post(server+'/campbell/login',values,{withCredentials: true}
        ).then(function (response) {
                console.log(response.data);
                if(response.data.error===null) {
                    setUser(response.data.data);
                    localStorage.setItem('id', response.data.data.userid);
                    localStorage.setItem('username', response.data.data.name);
                    localStorage.setItem('access', response.data.data.access);
                    props.history.push("/index");
                }
                else {
                    status = 1;
                    text = response.data.error;
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            })
        console.log(status);
        if(status !==0) message.error(text);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className="loginbackground">
        <div className="userlogin">
            <h1>Welcome!</h1>
        <Form
            size="large"
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="userid"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                {/*<Checkbox>Remember me</Checkbox>*/}
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
        </div>
        </div>
    );
};

export default UserLogin;