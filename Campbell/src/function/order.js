import React, { useState, useEffect } from 'react';
import {Table, Input, InputNumber, Popconfirm, Form, Typography, ConfigProvider, DatePicker, message} from 'antd';
import '../css/test1.css';
import axios from 'axios';
import { Spin } from 'antd';
import { Button } from 'antd';
import MyModal from "../login/modal";
import enEN from "antd/lib/locale/en_US";
import ProForm, {ProFormDatePicker, ProFormText} from "@ant-design/pro-form";
import {VerticalAlignBottomOutlined} from "@ant-design/icons";
import Paragraph from "antd/es/typography/Paragraph";
import server from "../constName/url";
const originData = [];

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
  const inputNode =  inputType === 'date'?<DatePicker/>:<Input/>;
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

const Order = () => {
  const [isChanging, setIsChanging] = useState(1);
    useEffect(async ()=>{
        axios.get(server+'/campbell/orderheader' ,{withCredentials: true})
        .then(function (response) {
          console.log(response.data);
          setData(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
        })
    },[isChanging]);
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState('');
  const isEditing = (record) => record.orderid === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
    });
    setEditingKey(record.orderid);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => id === item.orderid);
      console.log(index);

      if (index > -1) {
        const item = newData[index];
        console.log(row);
        newData.splice(index, 1, {...item, ...row});
        
        setData(newData);

        setEditingKey('');
        console.log('send a put request,id: '+id);

        const i = newData.findIndex((item)=>item.orderid == id)
        // console.log(newData[i].deliverydate);
        if(!parseDate(newData[i].deliverydate)) {
          message.error("Invalid Date format");
          setIsChanging(isChanging*(-1));
          return;
        }
      if(!(newData[i].documenttype in ['credit','sale','debit'])){
        message.error("Invalid Document Type");
        setIsChanging(isChanging*(-1));
        return;
      }
          axios.put(server+'/campbell/orderheader', newData[i],{withCredentials: true})
          .then(function (response) {
            console.log(response.data);
            if(response.data.error!==null) setIsChanging(isChanging*(-1));
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

  const parseDate = (text)=> {
    try{
      let date = Date.parse(text);
      if(isNaN(date)) return false;
      return true;
      return true;
    } catch (error){
      return false;
    }
  }

  const deleteRecord = (id) => {
    console.log('send a delete request,id: '+id);
    const dataSource = [...data];
    axios.delete(server+'/campbell/orderheader?id='+id,{withCredentials: true})
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        })
    setData(dataSource.filter(item => item.orderid !== id));
  }

  const Loading = () => {
    return (<Spin tip="Loading..."></Spin>);
  }

  const columns = [
    {
        title: 'OrderID',
        dataIndex: 'orderid',
      align:'center',
      render: (text) =>{
          return (
              <Paragraph copyable>{text}</Paragraph>
          )
      }
      },
      {
        title: 'CreatedBy',
        dataIndex: 'createdby',
        editable: false,
        align:'center',
        width: '15%',
      },
      {
        title: 'DocumentType',
        dataIndex: 'documenttype',
        editable: true,
        align:'center',
        width: '10%',
        valueType: 'select',
        valueEnum: {
          all: { text: 'sale',},
          open: {
            text: 'credit',
          },
          closed: {
            text: 'debit',
          },
        },
      },
      {
        title: 'SoldCustomer',
        dataIndex: 'soldcustomer',
        editable: true,
        align:'center',
        width: '10%',
      },
      {
        title: 'ShipCustomer',
        dataIndex: 'shipcustomer',
        editable: true,
        align:'center',
        width: '10%',
      },
      {
        title: 'DeliveryDate',
        dataIndex: 'deliverydate',
        editable: true,
        align:'center',
        inputType: 'date',
        valueType: 'date'
      },
      {
        title: 'Route',
        dataIndex: 'route',
        editable: false,
        align: 'center'
      },
      {
        title: 'Reference',
        dataIndex: 'reference',
        editable: true,
        align:'center'
      },
    {
      title: 'Operation',
      dataIndex: 'Operation',
      align:'center',
      width: '15%',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.orderid)}
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
          <Button disabled={editingKey !== ''} onClick={() => edit(record)} size="small">
            Edit
          </Button>
          <Button type="primary" danger size="small">
          <Popconfirm onConfirm={()=>deleteRecord(record.orderid)}>
            Delete
          </Popconfirm>
          </Button>
          <MyModal orderid = {record.orderid}/>
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
        inputType: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });


  function handleOnSubmit(e){
    console.log(e);
    axios.get(server+'/campbell/orderheader',{withCredentials: true, params:e})
        .then(function (response) {
          console.log(response.data);
          setData(response.data.data);
        })
        .catch(function (error) {
          console.error(error);
        })
        .then(function () {
        })
  }


  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setSelectedRowKeys( selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const exportOrders = ()=>{
    console.log(selectedRowKeys);
    axios.post(server+"/campbell/order/export",{orderid: selectedRowKeys},{withCredentials: true})
        .then(function (response){
          console.log(response)
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'EXPORT_'+new Date().toLocaleDateString()+'.csv'); //or any other extension
          document.body.appendChild(link);
          link.click();
        })
        .catch(function (error){
          console.error(error)
        })
  }

  return (
    <>
      <ConfigProvider locale={enEN}>
        <ProForm
            onFinish={(e)=>handleOnSubmit(e)}
            layout="horizontal"
        >
          <ProForm.Group>
            <ProFormText name="id" label="Order id" placeholder="Order ID" fieldProps={{ autoComplete: 'off' }}/>
            <ProFormText name="customer" label="Customer" placeholder="Customer" fieldProps={{ autoComplete: 'off' }}/>
            <ProFormDatePicker name="date" label="Delivery Date" placeholder="Delivery Date" fieldProps={{ autoComplete: 'off' }}/>
            <ProFormText name="route" label="Route" placeholder="Route" fieldProps={{ autoComplete: 'off' }}/>
            <ProFormText name="material" label="Material" placeholder="Material" fieldProps={{ autoComplete: 'off' }}/>
          </ProForm.Group>
        </ProForm>
      </ConfigProvider>
      <Form form={form} component={false} >
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            tableLayout="fixed"
            size="small"
            bordered
            dataSource={data}
            rowKey="orderid"
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
              pageSize: 20,
            }}
            loading={Loading}
            rowSelection={rowSelection}
            style={{marginTop:'20px'}}
          />
    </Form>
      <Button onClick={exportOrders} disabled={selectedRowKeys.length===0} icon={<VerticalAlignBottomOutlined />} title="Export" style={{width:'100px'}} type="primary"/>
    </>
  );
};

export default Order;