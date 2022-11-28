import React from "react";

import { Result, Button } from 'antd';

const MyResult =  (props) => {

    const sub = "Order number: "+props.location.state.orderID+" has successfully added."
    console.log(props.location.state.orderID)
    return (
        <Result
            status="success"
            title="Successfully Add A New Order"
            subTitle={sub}
            extra={[
                <Button type="primary" key="view" href={'/index/#/orders'}>
                    View All the Orders
                </Button>,
                <Button type="primary" key="add" href={'/index/#/enter'}>
                    Continue to ADD
                </Button>,
            ]}
        />
    )
};

export default MyResult;

