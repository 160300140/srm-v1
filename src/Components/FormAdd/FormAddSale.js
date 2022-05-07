import React, { useState, useEffect } from "react";
import {
    Form,
    Collapse,
    notification,
    Button,
    Steps,
    message
} from "antd";
import {saleCreate} from '../../Constants/ObjsSale';
import FirstStep from '../../Components/StepContent/FirstStep';
import SecondStep from "../../Components/StepContent/SecondStep";
import { setSaleAPi } from '../../Api/Sale';
import "./FormAdd.scss";

export default function FormAddSale(props) {

    //#region constants
    const [form] = Form.useForm();
    const [ inputs, setInputs] = useState();
    const [ descVal, setDescVal ] = useState();
    const [ params, setParams ] = useState();
    const { Step } = Steps;
    const [current, setCurrent] = React.useState(0);
    //#endregion constants

    //#region functions

    const steps = [
        {
            title: 'First',
            content: <FirstStep inputs={inputs} setInputs={setInputs} />,
        },
        {
            title: 'Last',
            content: <SecondStep setDescVal={setDescVal}/>,
        },
    ];

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    async function onChange(){
        console.log("Inputs on father component",inputs);
        console.log("Inputs on father component desc",descVal);
        setParams({...saleCreate,...inputs, ...descVal});

        const allParams = {...saleCreate,...inputs, ...descVal};
        console.log("All params", allParams)

        const results = await setSaleAPi(allParams);

        if (results.success === false) {
            notification["error"]({
                message:
                    "Parece que hay problemas, Intenta nuevamente.",
            });
        } else {
            /* notification["success"]({
                message: "El clientes se agregó exitosamente",
            }); */
            message.success('Processing complete!');
        }  
    }

    //#endregion functions

    //#region return
    return (
        <>
            <Steps current={current}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">{steps[current].content}</div>
            <div className="steps-action">
                {current < steps.length - 1 && (
                    <Button type="primary" onClick={() => next()}>
                        Next
                    </Button>
                )}
                {current > 0 && (
                    <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                        Previous
                    </Button>
                )}
                {current === steps.length - 1 && (
                    <Button type="primary" onClick={onChange}>
                        Done
                    </Button>
                )}
            </div>
        </>
    );
    //#endregion return
}
