import axios from 'axios';
import { captchaImage, requestImageToServerBody } from '../interfaces/i.captcha';

const getImageUrl: string = "https://xtima6ctq9.execute-api.us-east-1.amazonaws.com/dev/"
const testImageUrl: string = "https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs";
const authorizationKey: string = "10a253b5940d49eab778ec456dff4a55";

export const getImagesFromServer = () => {
    return fetch(getImageUrl)
        .then((response) => { return response.json() })
        .then((data) => {
            return {
                imageUrl: data?.imageUrl,
                isLoading: false,
            }
        })
}

export const getImagesFromServerWithAxios = () => {
    return axios.get<captchaImage>(getImageUrl)
        .then((response) => {
            return {
                imageUrl: response?.data?.imageUrl,
                isLoading: false,
            }
        });
}

export const shouldReplaceSelectedImage = (imageUrl: string = "") => {
    const body: requestImageToServerBody = { inputs: [{ data: { image: { url: imageUrl, } } }] }
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Key ${authorizationKey}`,
    };
    return fetch(testImageUrl, {
        method: 'post',
        body: JSON.stringify(body),
        headers,
    }).then((response) => {
        return response.json();
    }).then((data) => {
        if (data?.status?.description === "Ok" || data?.status?.code === 10000) {
            return true
        }
        return false;
    }).catch((error) => {
        console.error("🚀 ~ shouldReplaceSelectedImage error", error)
        return false;
    });
}
