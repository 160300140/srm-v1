import { basePathPayment, apiVersionPayment } from "./config";

//#region ComunicationServer Payment
export const base = `${basePathPayment}/${apiVersionPayment}`;
export function setPaymentAPi(data){
    const url = `${base}/CreatePayment`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type" : "aplication/json;charset=UTF-8"
        }
    };

    return fetch(url,params).then(response => {
        console.log(response);
        return response.json();
    }).then(result => {
        console.log("TEST RESULT" + JSON.stringify(result));
        return result;
    }).catch(err => {
        return err.message;
    })
}

export function getPaymentApiList(data){
    const url = `${base}/GetPaymentListBySaleId`;
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

//#endregion ComunicationServer Payment