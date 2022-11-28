import React,{useState} from "react";
import Addorderline from "./addorderline";
import Addorderheader from "./addorderheader";
import {Button, Form, Input, message, Select} from "antd";
import {Option} from "antd/es/mentions";
import { Empty } from 'antd';
import { Modal, Space } from 'antd';
import {useForm} from "antd/es/form/Form";
import axios from "axios";
import server from "../constName/url";


const MyForm = (props)=>{

    const [orderLineForm] = Form.useForm();
    const [orderHeaderForm] = Form.useForm();
    const [finish, setFinish] = useState(false);
    function warning() {
        Modal.confirm({
            title: 'Warning',
            content: 'All the order lines will be lost',
            onOk:()=>{setFinish(false)}
        });
    }

    async function submitOrderHeader(){
        const header = orderHeaderForm.getFieldsValue();
        let lines = orderLineForm.getFieldsValue();
        for(let i = 0; i<lines.orderline.length; i++){
            if(lines.orderline[i].price === undefined) lines.orderline[i].price = -1;
        }
        console.log(lines.orderline);
        const postHeader = {
            documenttype:header.documenttype,
            soldcustomer:header.soldcustomer,
            shipcustomer:header.shipcustomer,
            deliverydate:header.deliverydate,
            reference:header.reference,
            route:header.route,
            createdby: localStorage.getItem("id"),
            orderlines:lines.orderline
        }

        console.log(postHeader);

        await axios.post(server+'/campbell/order',postHeader,{withCredentials: true})
            .then(function (response) {
                console.log(response.data.data);
                if(response.data.error===null) {

                    props.history.push({
                        pathname: "/result",
                        state: {orderID: response.data.data.id}
                    });
                }else{
                    message.error(response.data.error);
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            })

        console.log(postHeader);

    }
    return (
        <div className="mystepform">
            <div className="formContainer" >
                <div className="formBody" style={{float:'left'}}>
                    <h1 >Order header</h1>
                    <Form form={orderHeaderForm} id='orderform' onFinish={()=>{setFinish(true);console.log('submit');return}}>
                        <Addorderheader isfinish={finish}/>
                        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                            {/*<Button type="primary" disabled={!finish} style={{marginRight:'20px'}} onClick={()=>{setFinish(false)}}>*/}
                            {/*    Prev*/}
                            {/*</Button>*/}
                            <Button onClick={warning} type="primary" disabled={!finish} style={{marginRight:'20px'}} >Prev</Button>
                            <Button type="primary" htmlType="submit" disabled={finish} >
                                Next
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                { finish?
                    <div className="formBody" style={{float:'left'}}>
                        <h1 >Order Line</h1>
                        <Form form={orderLineForm} onFinish={submitOrderHeader}>
                        <Addorderline/>
                            <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                                <Button type="primary" htmlType="submit" >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>:<div ><Empty description='No order line' /></div>
                }
            </div>
        </div>
    )
};

export default MyForm;