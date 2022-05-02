import React from 'react';
import { Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';

export default function ButtonAdd(props) {

    //#region constants
    const { openAddTo, children } = props;
    //#endregion constants

    //#region return
    return (
        <div style={{ margin: '16px 0px' }}>
            <Button
                onClick={openAddTo}
                value="large"
                type="primary"
                icon={<PlusOutlined />}
            >
                {children}
            </Button>
        </div>

    )
    //#endregion return
}