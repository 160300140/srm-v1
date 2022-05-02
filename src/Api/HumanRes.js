import { basePathHR, apiVersionHR } from "./config";

//#region ComunicationServer HumanResources
export const base = `${basePathHR}/${apiVersionHR}`;
export function setHumanResAPi(data){
    const url = `${base}/CreateEmployee`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url,params).then(response => {
        //console.log(response);
        return response.json();
    }).then(result => {
        //console.log("TEST RESULT" + JSON.stringify(result));
        return result;
    }).catch(err => {
        return err.message;
    })
}

export function getHumanResApiList(data){
    const url = `${base}/GetEmployeeList`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type" : "application/json;charset=UTF-8"
        }
    };

    return fetch(url, params).then(response => {
        console.log("LIST RESPONSE" + response);
        return response.json();
    }).then(result => {
        console.log(result);
        return result;
    }).catch(err => {
        return err.message;
    })
}

//#endregion ComunicationServer HumanResources