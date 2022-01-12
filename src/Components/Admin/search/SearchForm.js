import React from "react";
import { Form, Input } from "antd";

/*
const valForm = {
    valTitle: "Nombre cliente:",
    valName: "nameclient",
    valType: "text",
    valPlaceHolder: "Nombre"
};
<SearchForm options={valForm}/>
 */

export default function SearchForm(props){
    const {options} = props;
    const { valTitle, valName, valType, valPlaceHolder } = options;
    return (
        <Form>
          <Form.Item name={valName}>
            <p>{valTitle}</p>
            <Input
              type={valType}
              name={valName}
              placeholder={valPlaceHolder}
              style={{ width: 200 }}
            />
          </Form.Item>
        </Form>
    );
}