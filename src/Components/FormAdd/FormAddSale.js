import React, { useState, useEffect } from "react";
import {
    Form,
    Collapse,
    notification,
    Button,
    Steps,
    message
} from "antd";
import { emailValidation } from "../../Utils/formValidation";
import { setPurchaseAPi } from "../../Api/Purchase";
import { paramsFormValid, purchaseParams } from '../../Constants/ObjsPurchase';
import FirstStep from '../../Components/StepContent/FirstStep';
import SecondStep from "../../Components/StepContent/SecondStep";
import "./FormAdd.scss";

export default function FormAddSale(props) {

    //#region constants
    const { Panel } = Collapse;
    const [form] = Form.useForm();
    const { titles, dataListB, dataListC } = props;
    const [dataList, setDataList] = useState([]);
    const [ListC, setListC] = useState([]);
    const [inputs, setInputs] = useState(purchaseParams);
    const [formValid, setFormValid] = useState(paramsFormValid);
    const [valuesAuth] = useState(false);
    const { Step } = Steps;
    const [current, setCurrent] = React.useState(0);
    //#endregion constants

    //#region functions
    function validList() {
        if (dataListB.length > 0) {
            setDataList(dataListB);
        }

        if (dataListC.length > 0) {
            setListC(dataListC);
        }
    }

    console.log("***LCompany", dataListB);
    console.log("***LProvider", dataListC);

    useEffect(() => {
        validList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [valuesAuth]);

    const changeForm = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
        //console.log("TEST TARGET:" + e.target.name);
        //console.log("Test gender input" + e.target.value);
    };

    const inputValidation = (e) => {
        const { type, name } = e.target;

        if (type === "email") {
            setFormValid({ ...formValid, [name]: emailValidation(e.target) });
        }
    };

    function getKeyByValue(object, value) {
        return Object.keys(object).find(key => object[key] === value);
    }

    function onChangeCompany(value, key) {
        //e.preventDefault() 
        const num = getKeyByValue(dataListB, value);
        const val = value;
        const kVal = value;

        if (val) {
            value = kVal;
        } else {
            value = '';
        }
        setInputs({
            ...inputs,
            storeId: num,
        });

    }

    const register = async (e) => {
        e.preventDefault();
        //imgValid();
        console.log(inputs);

        const nameVal = inputs.name;
        const priceVal = inputs.price;
        const stockVal = inputs.stock;
        const typeVal = inputs.type;
        const storeIdVal = inputs.storeId;
        const providerIdVal = inputs.providerId;
        //const imgNameVal = inputs.imgName;
        //const imgUrl = inputs.imgUrl;
        //const igmTypeVal = inputs.imgType;

        if (
            !nameVal ||
            !priceVal ||
            !stockVal ||
            !typeVal ||
            !storeIdVal ||
            !providerIdVal
            //!imgNameVal ||
            //!imgUrl ||
            //!igmTypeVal
        ) {
            notification["error"]({ message: "Alguno campos son obligatorios" });
        } else {

            const results = await setPurchaseAPi(inputs);

            //console.log("TEST RESULTS AFTER AWAIT" + results);

            if (results.success === false) {
                notification["error"]({
                    message:
                        "Parece que hay problemas, el cliente no se agregó con éxito.",
                });
            } else {
                notification["success"]({
                    message: "El clientes se agregó exitosamente",
                });
                resetForm();
            }
        }
    };

    const resetForm = () => {
        const inputs = document.getElementsByTagName("inputs");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");
        }

        form.resetFields()
        setInputs(purchaseParams);
        setFormValid(paramsFormValid);
    };


    const steps = [
        {
            title: 'First',
            content: <FirstStep/>,
        },
        {
            title: 'Last',
            content: <SecondStep register={register} changeForm={changeForm} inputValidation={inputValidation} onChangeCompany={onChangeCompany}/>,
        },
    ];

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

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
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
            </div>
        </>
    );
    //#endregion return
}
