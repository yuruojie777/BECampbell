import React, {useEffect, useState} from "react";
import Addorderline from "../function/addorderline";
import Addorderheader from "../function/addorderheader";
import {Button, Descriptions, Form, Input, message, Select} from "antd";
import {Option} from "antd/es/mentions";
import { Empty } from 'antd';
import { Modal, Space } from 'antd';
import {useForm} from "antd/es/form/Form";
import axios from "axios";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import server from "../constName/url";


const AddNewOrderLine = (props)=>{


    const [orderHeader, setOrderHeader] = useState({})

    const [orderLineForm] = Form.useForm();
    console.log(props.location.state.orderID);
    useEffect(()=>{
        async function fetchData(){
            await axios.get(server+'/campbell/order?id='+props.location.state.orderID.orderid,{withCredentials: true})
                .then(function (response) {
                    if(response.data.error===null) {
                        console.log(response.data.data.orderHeader[0]);
                        setOrderHeader(response.data.data.orderHeader[0])
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                })
        }
        fetchData();
    },[]);


    async function submitAddition(){

        const lines = orderLineForm.getFieldsValue().orderline;
        const newLines = [];
        console.log(lines);

        for(let i = 0; i < lines.length; i++){
            newLines.push({
                orderid: props.location.state.orderID.orderid,
                materialid: lines[i].material,
                orderqty: lines[i].orderqty,
                price: lines[i].price
            })
        }
        await axios.post(server+'/campbell/orderline/addition?orderid='+props.location.state.orderID.orderid,{orderLines:newLines},{withCredentials: true})
            .then(function (response) {
                console.log(response.data);
                if(response.data.error===null) {

                    props.history.push({
                        pathname: "/result",
                        state: {orderID: props.location.state.orderID.orderid}
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
    }

    return (
        <div className="mystepform">
            <div className="progressbar">

            </div>
            <div className="formContainer" style={{width:'800px'}}>
                <div className="formBody">
                    <Descriptions title="Order Info" layout="vertical" bordered size='small' contentStyle={{textAlign:'center'}} column={2}>
                        <Descriptions.Item label="Document Type" span={1}>{orderHeader.documenttype}</Descriptions.Item>
                        <Descriptions.Item label="Reference" span={1}>{orderHeader.reference}</Descriptions.Item>
                        <Descriptions.Item label="Delivery Date" span={1}>{orderHeader.deliverydate}</Descriptions.Item>
                        <Descriptions.Item label="Route" span={1}>{orderHeader.route}</Descriptions.Item>
                        <Descriptions.Item label="Sold Customer" >{orderHeader.soldcustomer}</Descriptions.Item>
                        {/*<Descriptions.Item label="Sold Customer description" ></Descriptions.Item>*/}
                        <Descriptions.Item label="Ship Customer" >{orderHeader.shipcustomer}</Descriptions.Item>
                        {/*<Descriptions.Item label="Ship Customer description" ></Descriptions.Item>*/}


                    </Descriptions>
                </div>
                <div className="formBody">
                    <h1 style={{fontSize: 'medium', fontWeight: 'bolder',marginTop:'30px'}}>New Order Line</h1>
                    <Form form={orderLineForm} onFinish={submitAddition}>
                        <Addorderline/>
                        <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
                            <Button type="primary" htmlType="submit" >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>


            </div>

        </div>
    )
};

export default AddNewOrderLine;