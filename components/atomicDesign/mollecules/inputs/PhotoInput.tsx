import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Webcam from 'react-webcam';

type Props = {
    pictureToSend:string,
    setPictureToSend:Function

}

function PhotoInput ({pictureToSend, setPictureToSend }: Props) {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [photoFromCamera, setPhotoFromCamera] = useState<string | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setSelectedFile(file);

        // Vous pouvez également effectuer des opérations supplémentaires ici avec le fichier
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const webcamRef = React.useRef<Webcam>(null);

    const capturePhotoFromCamera = () => {
        if (webcamRef.current) {
            const photo = webcamRef.current.getScreenshot();
            setPhotoFromCamera(photo);
        }
    };

    useEffect(() => {
        
        setPictureToSend(photoFromCamera)

    }, [photoFromCamera,setPictureToSend])


    return (
        <div>
            <h2>Take a picture </h2>

            {/* <div {...getRootProps()} >
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Glissez-déposez une photo ici...</p>
                ) : (
                    <p>Cliquez ici pour choisir une photo depuis vos fichiers</p>
                )}
            </div>

            {selectedFile && (
                <div>
                    <h3>Photo choisie :</h3>
                    <Image src={URL.createObjectURL(selectedFile)} alt="Selected" width={300} height={300} />
                </div>
            )} */}


            {photoFromCamera ? (
                <div className='w-full flex flex-col items-center justify-center gap-4'>
                    <Image src={photoFromCamera} alt="From Webcam" width={300} height={300} className=' w-full rounded-md shadow-2xl' />
                    <Button color='danger' onClick={() => setPhotoFromCamera("")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </Button>
                </div>
            ) : (<div className='flex flex-col items-center justify-center gap-4'>
                <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className=' rounded-md shadow-2xl'
                />
                <Button color='primary' onClick={capturePhotoFromCamera}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
                </Button>
            </div>)}

        </div>
    );
};

export default PhotoInput;
