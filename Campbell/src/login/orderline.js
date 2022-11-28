import React, { useState, useEffect } from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Typography, message} from 'antd';
import '../css/test1.css';
import axios from 'axios';
import { Spin, Alert } from 'antd';
import { Button } from 'antd';
import AddNewOrderLine from "./addneworderline";
import {useHistory, withRouter} from "react-router-dom";
import server from "../constName/url";
const EditableCell = ({
                          editing,
                          dataIndex,
                          title,
                          inputType,
                          record,
                          index,
                          children,
                          ...restProps
                      }) => {
    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{
                        margin: 0,
                    }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const OrderLine = (props) => {

    //Send request to backend to fetch orderLines
    useEffect(async ()=>{
        axios.get(server+'/campbell/orderline?orderid='+headerID,{withCredentials: true})
            .then(function (response) {
                response.data.data.map((item)=>{
                    if(item.oprice === -1) item.oprice = item.mprice
                });
                console.log(response.data.data);
                setData(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            })
    },[]);


    console.log(props.orderID);
    const headerID = props.orderID.orderid;
    const [form] = Form.useForm();
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);

    //isEditing: return a boolean value if a record is under editing, when the user click the edit button
    // The editingKey of this record will be materialID of it. So that we can confirm which record we are editing,
    const isEditing = (record) => record.materialid === editingKey;
    const [editingKey, setEditingKey] = useState('');

    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.materialid);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (record) => {
        const id = record.id;
        try {
            const row = await form.validateFields();
            const newData = [...data];
            const index = newData.findIndex((item) => id === item.id);
            console.log(index);

            if (index > -1) {
                const item = newData[index];
                console.log(row);
                newData.splice(index, 1, {...item, ...row});

                setData(newData);

                setEditingKey('');

                const i = newData.findIndex((item)=>item.id == id)
                console.log(newData[i]);
                axios.put(server+'/campbell/orderline', newData[i],{withCredentials: true})
                    .then(function (response) {
                        console.log(response.data);
                        message.success("Update successfully!");
                    })
                    .catch(function (error) {
                        console.log(error);
                    })

            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const deleteRecord = (record) => {
        console.log(record);
        const dataSource = [...data];
        const params = {
            orderid: record.orderid,
            materialid: record.materialid
        }
        axios.delete(server+'/campbell/orderline',{params: params, withCredentials: true})
            .then(function (response) {
                console.log(response.data);
                message.success("Delete successfully!");
            })
            .catch(function (error) {
                console.log(error);
            })
        setData(dataSource.filter(item => item.materialid !== record.materialid));
    }

    const Loading = () => {
        return (<Spin tip="Loading..."></Spin>);
    }

    const columns = [

        {
            title: 'Line No.',
            key: 'index',
            align:'center',
            render : (text, record, index) => (page - 1) * 10 + index + 1
        },
        {
            title: 'Order ID',
            dataIndex: 'orderid',
            width: '8%',
            align : 'center'
        },
        {
            title: 'Material',
            dataIndex: 'materialid',
            editable: true,
            width: '6%',
            align : 'center'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            editable: false,
            align : 'center'
        },
        {
            title: 'Qty(Order Unit)',
            dataIndex: 'orderqty',
            inputType: 'number',
            editable: true,
            align : 'center'
        },
        {
            title: 'Qty(Price Unit)',
            dataIndex: 'priceqty',
            editable: false,
            align : 'center'
        },
        {
            title: 'Order Price',
            dataIndex: 'oprice',
            editable: true,
            align : 'center'
        },
        // {
        //     title: 'Material Price',
        //     dataIndex: 'mprice',
        //     editable: true,
        //     align : 'center'
        // },
        {
            title: 'Invoice Number',
            dataIndex: 'invoiceid',
            editable: false,
            align : 'center'
        },
        {
            title: 'Invoice Date',
            dataIndex: 'invoicedate',
            editable: false,
            align : 'center'
        },
        {
            title: 'Invoice Quantity',
            dataIndex: 'invoiceqty',
            editable: false,
            align : 'center'
        },
        {
            title: 'Invoice Weight',
            dataIndex: 'invoiceweight',
            editable: false,
            align : 'center'
        },
        {
            title: 'Operation',
            dataIndex: 'Operation',
            width: '8%',
            align : 'center',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link
                onClick={() => save(record)}
                style={{
                    marginRight: 8,
                }}
            >
              Save
            </Typography.Link>
            <Typography.Link title="Sure to cancel?" onClick={cancel}>
              Cancel
            </Typography.Link>
          </span>
                ) : (
                    <>
                        <Button disabled={editingKey !== ''} onClick={() => edit(record)} size="small">
                            Edit
                        </Button>
                        <Button type="primary" danger size="small">
                            <Popconfirm onConfirm={()=>deleteRecord(record)} >
                                Delete
                            </Popconfirm>
                        </Button>

                    </>

                );
            },
        },
    ];
    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                // inputType: col.dataIndex === 'price' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const history = useHistory();

    function handAdd(){
        history.push({
            pathname: "/neworderline",
            state: {orderID: props.orderID}
        })
    }

    return (
        <>
            <Button type="primary" style={{marginBottom: 16}} onClick={handAdd}>
                Add a row
            </Button>
            <Form form={form} component={false}>
                <Table
                    tableLayout="fixed"
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    size="small"
                    rowKey="materialid"
                    bordered
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange(current) {
                            cancel();
                            setPage(current);
                        }
                    }}
                    loading={Loading}
                />
            </Form>
        </>
    );
};

export default withRouter(OrderLine);