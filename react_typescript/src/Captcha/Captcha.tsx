import React, { useEffect, useState } from 'react';
import './index.css';

interface testObject {
    testName?: string;
    testNumber?: number;
}

interface captchaImage {
    imageUrl: string;
}

interface requestImageToServerBody {
    inputs: [{
        data: {
            image: {
                url: string,
            }
        }
    }]
}

interface Props {
    name: string;
    sampleAsObject?: testObject;
}

const Captcha: React.FC<Props> = ({ name, sampleAsObject }) => {
    const amountOfImages: number = 6;

    const [title, setTitle] = useState('Empty');
    const [arrayOfImages, setArrayOfImages] = useState<Array<any>>([]);

    const getImagesFromServer = () => {
        const url: string = "https://xtima6ctq9.execute-api.us-east-1.amazonaws.com/dev/"
        return fetch(url)
            .then((response) => { return response.json() })
            .then((data) => {
                return data;
            })
    }

    useEffect(() => {
        async function fetchData() {
            let arrayAux: Array<any> = [];
            for (let index = 0; index < amountOfImages; index++) {
                arrayAux.push(await getImagesFromServer());
                /* setArrayOfImages([
                    ...arrayOfImages,
                    image,
                ]) */
            }
            setArrayOfImages(arrayAux);
        }
        fetchData();

        return (() => { setTitle('Done') })
    }, [])

    const imageClicked = async (event: React.FormEvent<EventTarget>) => {
        const target = event.target as HTMLImageElement;
        const shouldReplace = await shouldReplaceSelectedImage(target?.src);
        if (shouldReplace) {
            replaceInArray(parseInt(target?.id));
        }
    }

    const replaceInArray = async (index: number) => {
        const imageUrl: captchaImage = await getImagesFromServer();
        console.log("🚀 ~ imageUrl", imageUrl)
        if (index !== -1) {
            arrayOfImages[index] = imageUrl;
        }
        setArrayOfImages([...arrayOfImages]);
    }

    const shouldReplaceSelectedImage = (imageUrl?: string) => {
        const url: string = "https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs";
        const authorizationKey: string = "10a253b5940d49eab778ec456dff4a55";
        const body: requestImageToServerBody = { inputs: [{ data: { image: { url: imageUrl || "", } } }] }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Key ${authorizationKey}`,
        };
        return fetch(url, {
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

    return (
        <div>
            {title} {name}
            <br />
            <section
                className="container"
            >
                {
                    arrayOfImages.map((element, index) => {
                        return (
                            <img
                                onClick={imageClicked}
                                src={element?.imageUrl}
                                alt={`image_${index}`}
                                key={index}
                                id={index.toString()}
                                width="400"
                                height="400" />
                        )
                    })
                }
            </section>
        </div>
    )
};

export default Captcha;
