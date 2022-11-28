import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import OrderLine from "./orderline";
const MyModal = (orderid) => {
    const [visible, setVisible] = useState(false);
    return (
        <>
            <Button type="primary" onClick={() => setVisible(true)} size="small">
                Detail
            </Button>
            <Modal
                title="Order Line"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1300}
            >
                <OrderLine orderID={orderid}/>
            </Modal>
        </>
    );
};

export default MyModal;