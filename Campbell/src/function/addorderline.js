import {Form, Input, Button, Space, DatePicker, InputNumber} from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import axios from "axios";
import React, {useEffect, useState} from "react";
import server from "../constName/url";
const Addorderline = ()=>{

    const [material, setMaterial] = useState([]);
    const [qty, setQty] = useState([1]);
    const [lineSet, setLineSet] = useState([]);
    return (
        <Form.List name="orderline">
            {(fields, { add, remove }) => (
                <>
                    {fields.map(({ key, name, ...restField }) => {

                        return(
                            <div key={key}>
                                <div style={{width:'600px'}}>
                                    <Space key={key} style={{ display: 'flex', marginBottom: '0px' }} align="baseline">
                                        <Form.Item
                                            {...restField}
                                            hasFeedback
                                            name={[name, 'material']}
                                            rules={
                                                [
                                                    { required: true, message: 'Missing Material' },
                                                    () => ({
                                                         async validator(_, value) {

                                                            let id = value;
                                                            let status = 0;
                                                            let message = '';
                                                            await axios.get(server+'/campbell/material?id='+encodeURI(id),{withCredentials: true})
                                                                .then(function (response) {
                                                                    if(response.data.error!==null) {
                                                                        status = 3;
                                                                        message = response.data.error;
                                                                        console.log(message);
                                                                    }else{
                                                                        // console.log(response.data);
                                                                        if(response.data.data !== null) {
                                                                            console.log(response.data.data);

                                                                            const arr = [...material];
                                                                            arr[key] = {
                                                                                description: response.data.data.description,
                                                                                price: response.data.data.price,
                                                                                baseuom: response.data.data.baseuom,
                                                                                currency: response.data.data.currency,
                                                                                priceunit: response.data.data.priceunit,
                                                                                per: response.data.data.per,
                                                                                weight: response.data.data.weight
                                                                            };
                                                                            setMaterial(arr);
                                                                            status = 1;

                                                                        }else{
                                                                            status = 2;
                                                                        }
                                                                    }
                                                                })
                                                                .catch(function (error) {
                                                                    console.log(error);
                                                                })
                                                             console.log(status);
                                                            if(status === 0) return Promise.reject('Bad Request');
                                                            else if(status === 3) return Promise.reject(message);
                                                            else if(status === 2) return Promise.reject('Material does not exist');
                                                            else return Promise.resolve();
                                                        },
                                                    })

                                                ]
                                            }
                                        >
                                            <Input placeholder="material" autoComplete="off" style={{width:'300px'}}/>
                                        </Form.Item>
                                        <Input  placeholder="Material desciption" value={material[key]===undefined?'':material[key].description} allowClear={true} disabled={true} style={{width:'200px'}}/>

                                    </Space>
                                </div>


                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'orderqty']}
                                        rules={
                                            [{
                                                required: true,
                                                pattern: new RegExp(/^[0-9]\d*$/,"g"),
                                                message: 'Missing Quantity (Order Unit)'
                                            }]
                                        }
                                        getValueFromEvent={(e) => {return e.target.value.replace(/\D/g,'')}}
                                    >
                                        <Input placeholder="Quantity (Order Unit)" style={{textAlign: 'right'}} autoComplete='off'
                                               onChange={
                                                   (e)=>{
                                                       let arr = [...qty];
                                                       arr[key] = e.target.value;
                                                       setQty(arr);
                                                       console.log(qty);
                                                   }
                                               }
                                        />
                                    </Form.Item>
                                    <Input placeholder="Uom" value= {material[key]===undefined?'':material[key].baseuom} disabled={true} style={{width:'60px'}}/>
                                    <span>=</span>
                                    <Input placeholder="Weight" autoComplete='off' value= {material[key]===undefined?'':material[key].weight * qty[key]+material[key].priceunit} disabled={true} style={{width:'80px'}}/>
                                    <span>,</span>
                                    <span>price =</span>
                                    <Input placeholder="Original Price" value= {material[key]===undefined?'':(material[key].price + material[key].currency + '/' + (material[key].per===1?'':material[key].per) + material[key].priceunit)}
                                           disabled={true} style={{width:'150px'}} autoComplete='off'/>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'price']}
                                        style={{width:'100px'}}
                                    >
                                        <Input placeholder="Price (Not required if equal)" style={{width:'200px'}} autoComplete='off'/>
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} style={{marginLeft:'100px'}}/>
                                </Space>
                            </div>)
                    })}
                    <Form.Item
                        style={{width:'805px'}}
                    >
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            Add field
                        </Button>
                    </Form.Item>
                </>
            )}
        </Form.List>

    )
}

export default Addorderline;