import { basePathProvider, apiVersionProvider } from "./config";

//#region ComunicationServer Providers
export const base = `${basePathProvider}/${apiVersionProvider}`;
export function setProvidersAPi(data){
    const url = `${base}/CreateProvider`;
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

export function getProvidersApiList(data){
    const url = `${base}/GetProviderList`;
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

//#endregion ComunicationServer Providers