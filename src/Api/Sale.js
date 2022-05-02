import { basePathSale, apiVersionSale, apiVersionQuotation } from "./config";

//#region ComunicationServer Sale
export const base = `${basePathSale}/${apiVersionSale}`;
export const baseQ = `${basePathSale}/${apiVersionQuotation}`;

export function setSaleAPi(data) {
    const url = `${base}/CreateSale`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params).then(response => {
        console.log(response);
        return response.json();
    }).then(result => {
        console.log("TEST RESULT" + JSON.stringify(result));
        return result;
    }).catch(err => {
        return err.message;
    })
}

export function getSaleApiList(data) {
    const url = `${base}/GetSaleList`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
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

//Quotation
export function setQuotationAPi(data) {
    const url = `${baseQ}/CreateQuotation`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };

    return fetch(url, params).then(response => {
        console.log(response);
        return response.json();
    }).then(result => {
        console.log("TEST RESULT" + JSON.stringify(result));
        return result;
    }).catch(err => {
        return err.message;
    })
}

export function getQuotationApiList(data) {
    const url = `${baseQ}/GetQuotationList`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
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

export function setCalculateApi(data) {
    const url = `${baseQ}/CalculateTotalAmount`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
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

//#endregion ComunicationServer Sale