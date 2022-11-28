import React, {useState} from "react";
import axios from "axios";
import {Button, ConfigProvider, Form, Input, InputNumber, message, Popconfirm, Table, Typography} from "antd";
import enEN from "antd/lib/locale/en_US";
import ProForm, {ProFormDatePicker, ProFormText} from "@ant-design/pro-form";
import MyModal from "./modal";
import { Divider } from 'antd';
import server from "../constName/url";
const Invoice = ()=>{
    const [page, setPage] = useState(1);
    const[orderheader, setOrderheader] = useState([]);
    const[orderline, setOrderline] = useState([]);
    const[finish, setFinish] = useState(false);
    const columns = [
        {
            title: 'OrderID',
            dataIndex: 'orderid',
            align:'center'
        },
        {
            title: 'DocumentType',
            dataIndex: 'documenttype',
            editable: false,
            align:'center',
            width: '10%',
        },
        {
            title: 'SoldCustomer',
            dataIndex: 'soldcustomer',
            editable: false,
            align:'center',
            width: '10%',
        },
        {
            title: 'ShipCustomer',
            dataIndex: 'shipcustomer',
            editable: false,
            align:'center',
            width: '10%',
        },
        {
            title: 'DeliveryDate',
            dataIndex: 'deliverydate',
            editable: false,
            align:'center',
        },
        {
            title: 'Route',
            dataIndex: 'route',
            editable: false,
            align:'center'
        },
        {
            title: 'Reference',
            dataIndex: 'reference',
            editable: false,
            align:'center'
        }
    ];

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
        const inputNode = <InputNumber/>;
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



    const [form] = Form.useForm();
    const [additionalInfo] = Form.useForm();
    const[editingKey, setEditingKey] = useState('')
    const isEditing = (record) => record.materialid === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.materialid);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (id)=> {
        try {
            const row = await form.validateFields();
            const newData = [...orderline];
            console.log(newData);
            const index = newData.findIndex((item) => id === item.materialid);
            console.log(index);

            if (index > -1) {
                const item = newData[index];
                console.log(row);
                newData.splice(index, 1, {...item, ...row});

                setOrderline(newData);
                setEditingKey('');
                console.log('send a put request,id: '+id);

                const i = newData.findIndex((item)=>item.materialid == id)
                console.log(newData[i]);
                axios.put(server+'/campbell/invoice', newData[i],{withCredentials: true})
                    .then(function (response) {
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })

            } else {
                newData.push(row);
                setOrderline(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    }

    const columnsLine = [
        {
            title: 'Line No.',
            key: 'index',
            align:'center',
            render : (text, record, index) => (page - 1) * 10 + index + 1
        },
        {
            title: 'Material',
            dataIndex: 'materialid',
            editable: false,
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
            editable: false,
            align : 'center',
            render: (text, record, index) => text+record.baseuom
        },
        {
            title: 'Qty(Price Unit)',
            dataIndex: 'priceqty',
            editable: false,
            align : 'center',
            render: (text => text+'kg')
        },
        {
            title: 'Price',
            dataIndex: 'oprice',
            editable: false,
            align : 'center'
        },
        {
            title: 'Invoice Date',
            dataIndex: 'invoiceDate',
            editable: false,
            align : 'center',
            // render: text => new Date().getFullYear() + '-' + (new Date().getMonth()+1) + '-' + new Date().getDate()
            render: text => new Date().toLocaleDateString()
        },
        {
            title: 'Invoice Quantity',
            dataIndex: 'invoiceqty',
            editable: true,
            align : 'center'
        },
        {
            title: 'Invoice Weight',
            dataIndex: 'invoiceweight',
            editable: true,
            align : 'center'
        },
        {
          title: 'Operation',
            align:'center',
            width: '15%',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
            <Typography.Link
                onClick={() => save(record.materialid)}
                style={{marginRight:'10px'}}
            >
              Save
            </Typography.Link>
            <Typography.Link onClick={cancel}>
              Cancel
            </Typography.Link>
          </span>
                ) : (
                    <>
                        <Button disabled={editingKey !== ''} onClick={() => edit(record)} size="small" type="primary">
                            Edit
                        </Button>
                    </>

                );}
        }
    ];


    const mergedColumns = columnsLine.map((col) => {
        if (!col.editable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });















    function handleDownLoad(){

        const data = {
            header: orderheader[0],
            lines: orderline,
            additional: additionalInfo.getFieldsValue()
        }
        console.log(data);
        axios.post(server+'/campbell/invoice',data,{withCredentials: true, responseType: 'blob'})
            .then(function (response) {
                // console.log(response.data);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'invoice_'+orderheader[0].orderid+'.pdf'); //or any other extension
                document.body.appendChild(link);
                link.click();
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            })
    }

    async function handleOnSubmit(e){
        console.log(e);
        await axios.get(server+'/campbell/order',{withCredentials: true, params:e})
            .then(function (response) {
                console.log(response.data);
                setOrderheader(response.data.data.orderHeader);
                // setOrderline(response.data.data.orderLines);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            })

        await axios.get(server+'/campbell/orderline?orderid='+e.id,{withCredentials: true})
            .then(function (response) {
                response.data.data.map((item)=>{
                    if(item.oprice === -1) item.oprice = item.mprice
                });
                console.log(response.data.data);
                setOrderline(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            })
    }


    // function handleOnSubmit(e){
    //     console.log(e);
    //     axios.get(server+'/campbell/orderheader',{withCredentials: true, params:e})
    //         .then(function (response) {
    //             console.log(response.data);
    //             setOrderheader(response.data.data);
    //             // setOrderline(response.data.data.orderLines);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         })
    //         .then(function () {
    //         })
    // }

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        setSelectedRowKeys( selectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    const handleAdditionalInfo = ()=> {
        console.log(additionalInfo.getFieldsValue());
        setFinish(true);
    }

    return(
        <>
            <div>
                <ConfigProvider locale={enEN}>
                    <ProForm
                        onFinish={(e)=>handleOnSubmit(e)}
                        layout="horizontal"
                    >
                        <ProForm.Group>
                            <ProFormText name="id" label="Order id" placeholder="Order ID" fieldProps={{ autoComplete: 'off' }}/>
                            {/*<ProFormDatePicker name="date" label="Delivery Date" placeholder="Delivery Date" fieldProps={{ autoComplete: 'off' }}/>*/}
                            {/*<ProFormText name="route" label="Route" placeholder="Route" fieldProps={{ autoComplete: 'off' }}/>*/}
                        </ProForm.Group>
                    </ProForm>
                </ConfigProvider>
            </div>
            <Divider>Order Header</Divider>
            <div style={{marginTop:'30px'}}>

                <Table
                    columns={columns}
                    dataSource={orderheader}
                    size='small'
                    rowKey="orderid"
                    rowSelection={rowSelection}
                />
            </div>
            <Divider>Order Lines</Divider>
            <div style={{marginTop:'30px'}}>
                <Form form={form} component={false} >
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    // columns={columnsLine}
                    dataSource={orderline}
                    size='small'
                    rowKey="materialid"
                    pagination={{
                        onChange(current) {
                            setPage(current);
                        }
                    }}
                    columns={mergedColumns}
                    // rowSelection={rowSelection}
                />
                </Form>
            </div>
            <Divider>Additional Info</Divider>
            <Form labelCol={{ flex: '180px' }} onFinish={handleAdditionalInfo} form={additionalInfo}>
                <Form.Item label="Telephone" name="tel" rules={[{ required: true, message: 'Telephone is required' }]}>
                    <Input disabled={finish} autoComplete="off"/>
                </Form.Item>

                <Form.Item label="Shipment Number." name="shipment" rules={[{ required: true, message: 'Shipment Number is required' }]}>
                    <Input disabled={finish} autoComplete="off"/>
                </Form.Item>
                <Form.Item label="Special Delivery Instructions" name="sdi">
                    <Input disabled={finish} autoComplete="off"/>
                </Form.Item >
                <Form.Item>
                    <Button type="primary" style={{marginRight:'10px'}} onClick={()=>{setFinish(!finish)}} disabled={!finish}>Prev</Button>
                    <Button type="primary" htmlType="submit" disabled={finish}>Next</Button>
                </Form.Item>
            </Form>
            <Divider>Please complete above information before download</Divider>
            <Button type="primary" onClick={handleDownLoad} disabled={selectedRowKeys.length === 0 || !finish || editingKey!==''} style={{marginTop: '30px'}}>Download</Button>
        </>
    )
};


export default Invoice;