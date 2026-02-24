import Iyzipay from 'iyzipay';
import dotenv from 'dotenv';
dotenv.config();

const iyzipay = new Iyzipay({
    apiKey: process.env.IYZICO_API_KEY || 'sandbox-XXXX',
    secretKey: process.env.IYZICO_SECRET_KEY || 'sandbox-XXXX',
    uri: process.env.IYZICO_URI || 'https://sandbox-api.iyzipay.com'
});

export const initializeCheckoutForm = (reqData) => {
    return new Promise((resolve, reject) => {
        iyzipay.checkoutFormInitialize.create(reqData, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

export const retrieveCheckoutForm = (reqData) => {
    return new Promise((resolve, reject) => {
        iyzipay.checkoutForm.retrieve(reqData, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};
