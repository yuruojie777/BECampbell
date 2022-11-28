import {ConfigProvider, Progress} from 'antd';
import React from 'react';
import "../css/dashboard.css";
import {StatisticCard} from "@ant-design/pro-card";
import {EllipsisOutlined} from "@ant-design/icons";
import enEN from "antd/lib/locale/en_US";
const Dashboard = ()=>{
    return (
        <div className='container-box'>
            <ConfigProvider locale={enEN}>
            <StatisticCard
                title="Trend"
                tip="Instruction"
                style={{ maxWidth: 480 }}
                extra={<EllipsisOutlined />}
                chart={
                    <img
                        src="https://gw.alipayobjects.com/zos/alicdn/a-LN9RTYq/zhuzhuangtu.svg"
                        alt="柱状图"
                        width="100%"
                    />
                }
            />
            </ConfigProvider>
      </div>
    )
}
export default Dashboard;