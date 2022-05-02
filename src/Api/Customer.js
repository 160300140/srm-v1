import { basePathCustomer, apiVersionCustomer } from "./config";

//#region ComunicationServer Customer
export const base = `${basePathCustomer}/${apiVersionCustomer}`;
export function getCustomerApi(data){
    const url = `${base}/GetCustomer`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type" : "application/json;charset=UTF-8"
        }
    };

    return fetch(url, params)
    .then(response => {
        console.log(response)
        return response.json();
    }).then(result => {
        console.log("TEST RESULT"  + JSON.stringify(result));
        return result;
    }).catch(err => {
        return err.message;
    });

    //console.log(data)
    //console.log(url)

}

export function setCustomerApi(data){
    const url = `${base}/CreateCustomer`;  
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type" : "application/json;charset=UTF-8"
        }
    };

    return fetch(url, params)
    .then(response => {
        console.log(response)
        return response.json();
    }).then(result => {
        console.log("TEST RESULT"  + JSON.stringify(result));
        return result;
    }).catch(err => {
        return err.message;
    });

    //console.log(data)
    //console.log(url)

}


export function getCustomerApiLst(data){
    const url = `${basePathCustomer}/${apiVersionCustomer}/GetCustomerList`;  
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type" : "application/json;charset=UTF-8"
        }
    };

    return fetch(url, params)
    .then(response => {
        console.log("TEST LIST RESPONSE: " + response)
        return response.json();
    }).then(result => {
        console.log( result);
        return result;
    }).catch(err => {
        return err.message;
    });

    //console.log(data)
    //console.log(url)

}
//#endregion ComunicationServer Customer