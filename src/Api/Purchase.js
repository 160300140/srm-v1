import { basePathPurchase, apiVersionPurchase } from "./config";

//#region ComunicationServer Purchase
export const base = `${basePathPurchase}/${apiVersionPurchase}`;
export function setPurchaseAPi(data){
    const url = `${base}/CreateProduct`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
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

export function getPurchaseApiList(data){
    const url = `${base}/GetProductList`;
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

//#endregion ComunicationServer Purchase