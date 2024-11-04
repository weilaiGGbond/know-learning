import * as base64 from 'base-64';
import CryptoJs from 'crypto-js';
import { requestObj } from './config/index';
export const getWebsocketUrl = () => {
    return new Promise<string>((reslove, reject) => {
        let url = 'ws://spark-api.xf-yun.com/v1.1/chat';
        let host = 'spark-api.xf-yun.com';
        let apiKeyName = 'api_key';
        let date = new Date().toUTCString()
        let algorithm = 'hmac-sha256';
        let headers = 'host date request-line'
        let signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;
        let signatureSha = CryptoJs.HmacSHA256(signatureOrigin, requestObj.APISecret);
        let signature = CryptoJs.enc.Base64.stringify(signatureSha);
        let authorizatioOrigin = `${apiKeyName}="${requestObj.APIKey}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"}`
        let authorization = base64.encode(authorizatioOrigin)
        url = `${url}?authorization=${authorization}&date=${encodeURI(date)}&host=${host}`
        reslove(url)

    })
}