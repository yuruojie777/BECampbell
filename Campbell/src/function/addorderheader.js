import React, {useState} from "react";
import {Form, Input, Select} from "antd";
import axios from "axios";
import { DatePicker, Space } from 'antd';
import TextArea from "antd/es/input/TextArea";
import server from "../constName/url";
const Addorderheader = (props)=>{

    const [sold, setSold] = useState();
    const [ship, setShip] = useState();
    const [customer, setCustomer] = useState();
    const [route, setRoute] = useState('');

    return(
        <div style={{width:'250px'}}>
                <Form.Item
                    hasFeedback
                    name='documenttype'
                    rules={[{ required: true, message: 'Missing Documenttype' }]}
                >
                <Select
                    disabled={props.isfinish}
                    showSearch
                    style={{ width: 200 }}
                    placeholder="Choose document type"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                        optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                    }
                >
                    <Select.Option value="sale">Sale</Select.Option>
                    <Select.Option value="credit">Credit</Select.Option>
                    <Select.Option value="debit">Debit</Select.Option>
                </Select>
                </Form.Item>

                {/*<Space style={{ display: 'flex', marginBottom: '5px' }} align="baseline">*/}
                <Form.Item
                    name='soldcustomer'
                    hasFeedback
                    rules={
                        [
                            { required: true, message: 'Missing Sold customer' },
                            () => ({
                                async validator(_, value) {
                                    let id = value;
                                    let status = 0;
                                    await axios.get(server+'/campbell/customer?id='+encodeURI(id),{withCredentials: true})
                                        .then(function (response) {
                                            if(response.data.error!==null) {
                                                status = 3;
                                            }else{
                                                if(response.data.data !== null) {
                                                    setSold(response.data.data['name']);
                                                    status = 1;
                                                }else{
                                                    status = 2;
                                                }
                                            }
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                            return Promise.reject('Error');
                                        })
                                    if(status === 3) return Promise.reject('Error');
                                    else if(status === 2) return Promise.reject('Customer does not exist');
                                    else return Promise.resolve();
                                },
                            })

                        ]
                    }
                >
                    <div style={{width:'200px'}}>
                        <Input  placeholder="Sold Customer" disabled={props.isfinish}/>
                    </div>

                </Form.Item>
                <Form.Item>
                    <TextArea  placeholder="Sold Customer description" value={sold} allowClear={true} disabled={true} style={{width:'200px'}}/>
                </Form.Item>

                <Form.Item
                    name = 'shipcustomer'
                    hasFeedback

                    rules={
                        [
                            { required: true, message: 'Missing Ship customer' },
                            () => ({
                                async validator(_, value) {
                                    let id = value;
                                    let status = 0;
                                    await axios.get(server+'/campbell/customer?id='+encodeURI(id),{withCredentials: true})
                                        .then(function (response) {
                                            if(response.data.error!==null) {
                                                status = 3;
                                            }else{
                                                if(response.data.data !== null) {
                                                    setShip(response.data.data['name']);
                                                    setCustomer(id);
                                                    status = 1;
                                                }else{
                                                    status = 2;
                                                }
                                            }
                                        })
                                        .catch(function (error) {
                                            console.log(error);
                                        })
                                    if(status === 3) return Promise.reject('Error');
                                    else if(status === 2) return Promise.reject('Customer does not exist');
                                    else return Promise.resolve();
                                },
                            })

                        ]
                    }
                >
                    <div style={{width:'200px'}}>
                        <Input placeholder="Ship Customer" autoComplete="off" disabled={props.isfinish}/>
                    </div>
                </Form.Item>
                <Form.Item>
                    <TextArea  placeholder="Ship Customer description" value={ship} allowClear={true} disabled={true} style={{width:'200px'}}/>
                </Form.Item>
                <Form.Item
                    hasFeedback
                    name='deliverydate'
                    rules={[
                        { required: true, message: 'Missing Delivery Date' },
                        () => ({
                            async validator(_, value) {
                                if(ship === undefined) return Promise.reject('Please fill ship customer first');
                                let date = value.format("yyyy-MM-DD");
                                let status = 0;
                                console.log(date);
                                await axios.get(server+'/campbell/customer/route?id='+encodeURI(customer)+'&&date='+date,{withCredentials: true})
                                    .then(function (response) {
                                        if(response.data.error!==null) {
                                            status = 3;
                                        }else{
                                            if(response.data.data !== null) {
                                                let route = response.data.data;
                                                console.log(response.data);
                                                setRoute(route);

                                                status = 1;
                                            }else{
                                                status = 2;
                                            }
                                        }
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    })
                                if(status === 3) return Promise.reject('Error');
                                else if(status === 2) return Promise.reject('No available Routes');
                                else return Promise.resolve();
                            },
                        })
                    ]}
                >
                    <DatePicker placeholder='select delivery date' style={{width:'200px'}} disabled={props.isfinish}/>
                </Form.Item>

                <Form.Item>
                    <Input type='text' placeholder={"Default Route: "+route} autoComplete="off" disabled={true} style={{width:'200px'}}/>
                </Form.Item>

                <Form.Item
                    name='route'
                    hasFeedback
                    rules={
                        [
                            { required: true, message: 'Missing Route' },
                            () => ({
                                async validator(_, value) {
                                    // if(route !== null) return Promise.resolve();
                                        let id = value;
                                        let status = 0;
                                    await axios.get(server+'/campbell/route?id='+encodeURI(id),{withCredentials: true})
                                            .then(function (response) {
                                                if(response.data.error!==null) {
                                                    status = 3;
                                                }else{
                                                    if(response.data.data !== undefined) {
                                                        status = 1;
                                                    }else{
                                                        status = 2;
                                                    }
                                                }
                                            })
                                            .catch(function (error) {
                                                console.log(error);
                                            })
                                    if(status === 3) return Promise.reject('Route does not exist');
                                    else if(status === 2) return Promise.reject('Error');
                                    else return Promise.resolve();
                                },
                            })

                        ]
                    }
                >

                    <div style={{float:'left'}}>
                        <Input type='text' placeholder="Route" autoComplete="off" disabled={props.isfinish}/>
                    </div>

                </Form.Item>

                <Form.Item
                    name='reference'
                    hasFeedback
                    rules={[{ required: true, message: 'Missing Reference' }]}
                >
                    <div style={{float:'left', width:'200px'}}>
                        <Input placeholder="Reference" autoComplete="off" disabled={props.isfinish}/>
                    </div>
                </Form.Item>
        </div>
    )
};

export default Addorderheader;