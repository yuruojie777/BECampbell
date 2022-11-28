import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Table} from 'antd';
import {useEffect, useState} from "react";
import axios from "axios";
import server from "../constName/url";

const props = {
    action: server+'/campbell/upload',
    onChange({ file, fileList }) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
    }
};
const columns = [
    {
        title: 'id',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'material',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'weight',
        dataIndex: 'weight',
        key: 'weight',
    },
    {
        title: 'baseuom',
        dataIndex: 'baseuom',
        key: 'baseuom',
    },
    {
        title: 'price',
        dataIndex: 'price',
        key: 'price',
    },
    {
        title: 'currency',
        dataIndex: 'currency',
        key: 'currency',
    },
    {
        title: 'per',
        dataIndex: 'per',
        key: 'per',
    },
    {
        title: 'priceunit',
        dataIndex: 'priceunit',
        key: 'priceunit',
    },
];
const Import = () => {
    const [data, setData] = useState();
    useEffect(async ()=>{
        axios.get(server+'/campbell/material')
            .then(function (response) {
                console.log(response.data);
                setData(response.data.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            })
    },[]);
    return (
        <>
            <Upload {...props}>
                <Button icon={<UploadOutlined/>}>Upload</Button>
            </Upload>
            <Table dataSource={data} columns={columns} rowKey="id"/>
        </>
    );
};

export default Import;