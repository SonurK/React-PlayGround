export interface testObject {
    testName?: string;
    testNumber?: number;
}

export interface captchaImage {
    imageUrl: string;
    isLoading?: boolean;
}

export interface requestImageToServerBody {
    inputs: [{
        data: {
            image: {
                url: string,
            }
        }
    }]
}
