import { Table} from 'antd';
import {useEffect, useState} from "react";
import axios from "axios";
import UploadDemo from "../upload/uploadTest";
import server from "../constName/url";

const DeliveryRoute = () => {
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
            title: 'routeid',
            dataIndex: 'routeid',
            align: 'center'
        },
        {
            title: 'description',
            dataIndex: 'description',
            key: 'description',
            align:'center'
        },
    ];
    useEffect( ()=>{
        async function fetchData() {
        await axios.get(server+'/campbell/route',{withCredentials: true})
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
            <UploadDemo filetype='route'/>
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

export default DeliveryRoute;