import { getImagesFromServer } from '../captchaUtils';

describe('captchaUtils', () => {

    describe('getImagesFromServer', () => {

        test('should return an image object from the server', async () => {
            const response = await getImagesFromServer();
            console.log("🚀 ~ response", response);
        });

    })

})

