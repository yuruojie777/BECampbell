import React from 'react';
import { BetaSchemaForm } from '@ant-design/pro-form';
import { useRef } from 'react';
import { message } from 'antd';
import enEN from "antd/lib/locale/en_US";
import {ConfigProvider} from "@ant-design/pro-table";
const valueEnum = {
    open: {
        text: 'Sales',
        status: 'Sales',
    },
    closed: {
        text: 'Credit',
        status: 'Credit',
    },
    processing: {
        text: 'Debit',
        status: 'Debit',
    },
};
const columns = [
    [
        {
            title: 'Document Type',
            dataIndex: 'DocumentType',
            valueType: 'select',
            valueEnum,
            width: 'm',
        },
    ],
    [
        {
            title: 'Sold Customer',
            dataIndex: 'soldCustomer',
            width: 'm',
        },
        {
            title: 'Ship Customer',
            key: 'shipCustomer',
            dataIndex: 'shipCustomer',
        },
        {
            title: 'Delivery Date',
            dataIndex: 'deliveryDate',
            valueType: 'date',
        },
    ],
    [
        {
            title: 'Order Line',
            valueType: 'formList',
            dataIndex: 'list',
            columns: [
                {
                    valueType: 'group',
                    columns: [
                        {
                            title: 'material',
                            dataIndex: 'state',
                            valueType: 'select',
                            width: 'xs',
                            valueEnum,
                        },
                        {
                            title: 'Quantity (Order Unit) ',
                            dataIndex: 'title',
                            formItemProps: {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ],
                            },
                            width: 'm',
                        },
                        {
                            title: 'Quantity (Pricing Unit) ',
                            dataIndex: 'title',
                            formItemProps: {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ],
                            },
                            width: 'm',
                        },
                        {
                            title: 'Price',
                            dataIndex: 'title',
                            formItemProps: {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ],
                            },
                            width: 'm',
                        },
                        {
                            title: 'Price',
                            dataIndex: 'title',
                            formItemProps: {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ],
                            },
                            width: 'm',
                        },
                        {
                            title: 'Invoice Date',
                            dataIndex: 'title',
                            formItemProps: {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ],
                            },
                            width: 'm',
                        },
                        {
                            title: 'Invoice Quantity',
                            dataIndex: 'title',
                            formItemProps: {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ],
                            },
                            width: 'm',
                        },
                        {
                            title: 'Invoice Weight',
                            dataIndex: 'title',
                            formItemProps: {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ],
                            },
                            width: 'm',
                        },
                        {
                            title: 'Invoice Number',
                            dataIndex: 'title',
                            formItemProps: {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Required',
                                    },
                                ],
                            },
                            width: 'm',
                        },
                    ],
                },
            ],
        },
        {
            title: 'Finish',
            valueType: 'formSet',
            dataIndex: 'formSet',
        },
    ],
];
const TestStep = () => {
    const formRef = useRef();
    return (
        <BetaSchemaForm layoutType="StepsForm" steps={[
        {
            title: 'Order Header',
        },
        {
            title: 'Order Line',
        },
        {
            title: 'Finish',
        },
    ]} onCurrentChange={(current) => {
        console.log('current: ', current);
    }} formRef={formRef} onFinish={async (values) => {
        return new Promise((resolve) => {
            console.log(values);
            message.success('Success');
            setTimeout(() => {
                var _a;
                resolve(true);
                (_a = formRef.current) === null || _a === void 0 ? void 0 : _a.resetFields();
            }, 2000);
        });
    }} columns={columns}/>
);
};

export default TestStep;
