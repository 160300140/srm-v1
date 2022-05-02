import { basePathCompany, apiVersionCompany } from "./config";

//#region ComunicationServer Company
export const base = `${basePathCompany}/${apiVersionCompany}`;
export function setCompanyAPi(data){
    const url = `${base}/CreateStore`;
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

export function getCompanyApiList(data){
    const url = `${base}/GetStoreList`;
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

//#endregion ComunicationServer Company