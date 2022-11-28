import React from "react";
import QueryTest from "../upload/queryTest";
import {ConfigProvider} from "antd";
import enEN from "antd/lib/locale/en_US";
import ProForm, {ProFormDatePicker, ProFormText} from "@ant-design/pro-form";
import axios from "axios";
import server from "../constName/url";
const Orderroute = ()=>{

    async function handleOnSubmit(e){
        await axios.get(server+"/campbell/orderheader",{withCredentials: true, params: e})
            .then(function (response){
                console.log(response.data)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    return(
        <>
            <ConfigProvider locale={enEN}>
                <ProForm
                    onFinish={(e)=>handleOnSubmit(e)}
                    layout="horizontal"
                >
                    <ProForm.Group>
                        <ProFormDatePicker name="date" label="Delivery Date" placeholder="Delivery Date" fieldProps={{ autoComplete: 'off' }}/>
                    </ProForm.Group>
                </ProForm>
            </ConfigProvider>
        </>
    )
};

export default Orderroute;