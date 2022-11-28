import ProForm, {ProFormDatePicker, ProFormSelect, ProFormText} from '@ant-design/pro-form';
import React from "react";
import {Button, ConfigProvider} from "antd";
import enEN from "antd/lib/locale/en_US";

const QueryTest = () => {
    function handleOnSubmit(e){
        console.log(e.target);
    }
    return (
        <ConfigProvider locale={enEN}>
            <ProForm
                onFinish={(e)=>console.log(e)}
                layout="horizontal"
            >
                <ProForm.Group>
                    <ProFormText name="id" label="Order id" placeholder="Order ID" fieldProps={{ autoComplete: 'off' }}/>
                    <ProFormText name="customer" label="Customer" placeholder="Customer" fieldProps={{ autoComplete: 'off' }}/>
                    <ProFormDatePicker name="date" label="Delivery Date" placeholder="Delivery Date" fieldProps={{ autoComplete: 'off' }}/>
                    <ProFormText name="material" label="Material" placeholder="Material" fieldProps={{ autoComplete: 'off' }}/>
                    {/*<Button type='primary' htmlType='submit' style={{width:'110px'}}>Query</Button>*/}
                </ProForm.Group>
            </ProForm>
        </ConfigProvider>
    );
};

export default QueryTest;