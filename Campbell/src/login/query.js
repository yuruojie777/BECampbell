import React from 'react';
import { ConfigProvider } from 'antd';
import enEN from 'antd/lib/locale/en_US';
import {
  QueryFilter,
  ProFormText,
  ProFormDatePicker,
  ProFormRadio,
  ProFormCheckbox,
} from '@ant-design/pro-form';

const Query = () => {
    return (
        <ConfigProvider locale={enEN}>
            <QueryFilter layout="vertical" span="reset" collapsed={true} labelWidth='500px' defaultCollapsed={false}>
                <ProFormText name="id" label="Order id" placeholder="order id"/>
                <ProFormText name="customer" label="Customer" placeholder="Customer"/>
                <ProFormDatePicker name="date" label="Delivery Date" placeholder="delivery date"/>
                <ProFormText name="route" label="Route" placeholder="route"/>
            </QueryFilter>
        </ConfigProvider>
    );
};


export default Query;