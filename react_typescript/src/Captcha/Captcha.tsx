import React, { FC, useEffect, useState } from 'react';
import { getImagesFromServerWithAxios, getImagesFromServer, shouldReplaceSelectedImage } from './utils/captchaUtils';
import { testObject, captchaImage } from './interfaces/i.captcha';
import './index.css';
interface Props {
    name: string;
    sampleAsObject?: testObject;
}

const Captcha: FC<Props> = ({ name, sampleAsObject }) => {
    const amountOfImages: number = 6;
    const amountOfCorrectImages: number = 3;

    const [title, setTitle] = useState('Empty');
    const [arrayOfImages, setArrayOfImages] = useState<Array<captchaImage>>([]);
    const [arrayOfCorrectImages, setArrayCorrectOfImages] = useState<Array<captchaImage>>([]);

    useEffect(() => {
        async function fetchData() {
            let arrayAux: Array<captchaImage> = [];
            for (let index = 0; index < amountOfImages; index++) {
                arrayAux.push(await getImagesFromServerWithAxios());
            }
            setArrayOfImages(arrayAux);
        }
        fetchData();

        return (() => { setTitle('Done') })
    }, [])

    const imageClicked = async (event: React.MouseEvent<EventTarget>) => {
        const target = event.target as HTMLImageElement;
        const source: string = target?.src;
        const id: number = parseInt(target?.id);

        const isCaptchaValidatingImage = arrayOfImages.some((element: captchaImage) => {
            return element.isLoading === true;
        });
        if (isCaptchaValidatingImage) return;

        arrayOfImages[id].isLoading = true;
        setArrayOfImages([...arrayOfImages]);

        const shouldReplace = await shouldReplaceSelectedImage(source);

        if (!shouldReplace) {
            arrayOfImages[id].isLoading = false;
            setArrayOfImages([...arrayOfImages]);
            return;
        }

        replaceInArray(id);
    }

    const replaceInArray = async (index: number) => {
        const imageUrl: captchaImage = await getImagesFromServer();
        setArrayCorrectOfImages([...arrayOfCorrectImages, arrayOfImages[index]]);

        if (index !== -1) {
            arrayOfImages[index] = imageUrl;
        }

        if (arrayOfCorrectImages.length < amountOfCorrectImages - 1) {
            setArrayOfImages([...arrayOfImages]);
        }
    }

    const renderingOfCatcha = () => {
        if (Array.isArray(arrayOfImages) && Array.isArray(arrayOfCorrectImages) && arrayOfCorrectImages.length < amountOfCorrectImages) {
            return arrayOfImages.map((element, index) => {
                return (
                    <div className="container" key={index}>
                        <img
                            onClick={imageClicked}
                            src={element?.imageUrl}
                            alt={`image_${index}`}
                            key={index}
                            id={index.toString()}
                            width="400"
                            height="400" />
                        {
                            (element.isLoading) &&
                            <span className="loading-icon lds-dual-ring" />
                        }
                    </div>
                )
            })
        }
        return (
            arrayOfCorrectImages.map((element, index) => {
                return (
                    <div className="result-container">
                        <img
                            src={element?.imageUrl}
                            alt={`image_${index}`}
                            key={index}
                            id={index.toString()}
                            width="400"
                            height="400" />
                    </div>
                )
            })
        )
    }

    return (
        <div>
            {title} {name}
            <br />
            {arrayOfCorrectImages.length > 2 && <h2>Selected Images:</h2>}
            <section
                className="captcha-container"
            >
                {renderingOfCatcha()}
            </section>
        </div>
    )
};

export default Captcha;
