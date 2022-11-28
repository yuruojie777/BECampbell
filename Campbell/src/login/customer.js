import { Table} from 'antd';
import React, {useEffect, useState} from "react";
import axios from "axios";
import UploadDemo from "../upload/uploadTest";
import server from "../constName/url";

const Customer = () => {
    const [data, setData] = useState();
    const [page, setPage] = useState(1);

    const columns = [
        {
            title: '#',
            key: 'index',
            align:'center',
            render : (text, record, index) => (page - 1) * 10 + index + 1
        },
        {
            title: 'name',
            dataIndex: 'name',
            key: 'name',
            align:'center'
        },
        {
            title: 'suburb',
            dataIndex: 'suburb',
            key: 'suburb',
            align:'center'
        },
        {
          title:'address',
          dataIndex: 'address',
          key: 'address',
          align:'centers'
        },
        {
            title: 'postcode',
            dataIndex: 'postcode',
            key: 'postcode',
            align:'center'
        },
        {
            title: 'state',
            dataIndex: 'state',
            key: 'state',
            align:'center'
        },
        {
            title: 'mon',
            dataIndex: 'mon',
            key: 'mon',
            align:'center'
        },
        {
            title: 'tue',
            dataIndex: 'tue',
            key: 'tue',
            align:'center'

        },
        {
            title: 'wed',
            dataIndex: 'wed',
            key: 'wed',
            align:'center'
        },
        {
            title: 'thur',
            dataIndex: 'thur',
            key: 'thur',
            align:'center'
        },
        {
            title: 'fri',
            dataIndex: 'fri',
            key: 'fri',
            align:'center'
        },
        {
            title: 'sat',
            dataIndex: 'sat',
            key: 'sat',
            align:'center'
        },
        {
            title: 'sun',
            dataIndex: 'sun',
            key: 'sun',
            align:'center'
        },
        {
            title: 'paymentterms',
            dataIndex: 'paymentterms',
            key: 'paymentterms',
            align:'center'
        },
        {
            title: 'salesperson',
            dataIndex: 'salesperson',
            key: 'salesperson',
            align:'center'
        },
    ];
    useEffect(()=>{
        async function fetchData(){
            await axios.get(server+'/campbell/customer',{withCredentials: true})
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
            <UploadDemo filetype='customer'/>
            <Table
                pagination={{
                    onChange(current) {
                        setPage(current);
                    }
                }}
                style={{marginTop:'30px'}}
                dataSource={data}
                columns={columns}
                rowKey="id"/>
        </>
    );
};

export default Customer;