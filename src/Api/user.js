import { notification } from "antd";
import { basePath, apiVersion} from "./config";

//#region ComunicationServer User
export const base = `${basePath}/${apiVersion}`;
export function signUpApi(data) {
    const url = `${base}/User/CreateUser`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }
    };
    console.log(data);
    
    return fetch(url, params)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(result => {
            if (result.user) {
                return { ok: true, message: "Usuario creado correctamente" };
            }
            return { ok: false, message: result.message };
        })
        .catch(err => {
            notification["error"]({
                message: err.message
            });
            return { ok: false, message: err.message };
        });

}

export function singnInApi(data){
    const url = `${base}/User/LoginUser`;
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

export function getUserApiList(data){
    const url = `${base}/User/GetUser`;
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

//#endregion ComunicationServer User