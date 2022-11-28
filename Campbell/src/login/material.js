import { Table} from 'antd';
import {useEffect, useState} from "react";
import axios from "axios";
import UploadDemo from "../upload/uploadTest";
import server from "../constName/url";

const Material = () => {
    const [data, setData] = useState();
    const [page, setPage] = useState(1);


    const columns = [
        // {
        //     title: 'id',
        //     dataIndex: 'id',
        //     key: 'id',
        //     align:'center'
        // },
        {
            title: '#',
            key: 'index',
            align:'center',
            render : (text, record, index) => (page - 1) * 10 + index + 1
        },
        {
            title: 'materialid',
            dataIndex: 'materialid',
            align:'center'
        },
        {
            title: 'material',
            dataIndex: 'description',
            key: 'description',
            align:'center'
        },
        {
            title: 'weight',
            dataIndex: 'weight',
            key: 'weight',
            align:'center'
        },
        {
            title: 'baseuom',
            dataIndex: 'baseuom',
            key: 'baseuom',
            align:'center'
        },
        {
            title: 'price',
            dataIndex: 'price',
            key: 'price',
            align:'center'
        },
        {
            title: 'currency',
            dataIndex: 'currency',
            key: 'currency',
            align:'center'
        },
        {
            title: 'per',
            dataIndex: 'per',
            key: 'per',
            align:'center'
        },
        {
            title: 'priceunit',
            dataIndex: 'priceunit',
            key: 'priceunit',
            align:'center'
        },
    ];




    useEffect(()=>{
        async function fetchData(){
            await axios.get(server+'/campbell/material',{withCredentials: true})
                .then(function (response) {
                    console.log(response.data);
                    setData(response.data.data);
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                })
        }
        fetchData();
    },[]);
    return (
        <>
            {/*<Upload {...props}>*/}
            {/*    <Button icon={<UploadOutlined/>}>Upload</Button>*/}
            {/*</Upload>*/}
            <UploadDemo filetype='material'/>
            <Table
                pagination={{
                    onChange(current) {
                        setPage(current);
                    }
                }}
                id="row"
                style={{marginTop:'30px'}}
                dataSource={data}
                columns={columns}
                rowKey="id"/>
        </>
    );
};

export default Material;