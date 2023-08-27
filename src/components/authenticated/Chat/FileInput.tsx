import { BaseSyntheticEvent, createRef, memo, useCallback, useEffect, useMemo, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ImCross } from 'react-icons/im'

interface FileInputProps {
    icon: JSX.Element
}

interface Image {
    id: number,
    url: string
}

interface FormData {
    files: FileList;
  }

const FileInput = ({ icon }: FileInputProps) => {
    const [images, setImages] = useState<any>([]);
    const [imagesUrl, setImagesUrl] = useState<Image[]>([]);
    const modal = createRef<HTMLInputElement>();
    const fileInput = createRef<HTMLInputElement>();
    const { register, handleSubmit,resetField } = useForm<FormData>();
    const formData = new FormData();

    const pop = () => {
        fileInput.current?.click();
    }

    useEffect(() => {
        console.log('this run once')
        if (images.length < 1) return;
        modal.current!.checked = true;
        const newImagesUrl: any = [];
        images.forEach((image: any) => {
            const newImage = {
                id: Math.floor(Math.random() * 100000000000000) + 1,
                url: URL.createObjectURL(image)
            }
            newImagesUrl.push(newImage);
        });
        setImagesUrl(newImagesUrl);
    }, [images])

    const imageChange = useCallback((event: BaseSyntheticEvent) => {
        const files = event.target.files;
        if (files) {
            setImages([...files]);
        }
    }, []);

    const removeImage = useCallback((id: number) => {
        setImagesUrl(prevImagesUrl => prevImagesUrl.filter(image => image.id !== id));
    }, []);

    const closeImageModal = useCallback(
        () => {
            modal.current!.checked = false;
            setImages([]);
            resetField('files');
            fileInput.current!.value = '';
        }, [modal])

    const onSubmit : SubmitHandler<FormData> = (data: any,event ?: BaseSyntheticEvent) => {
        
        event?.preventDefault();
        formData.append("files", images);
    }

    return (
        <div  >
            <form id="fileSendForm" onSubmit={handleSubmit(onSubmit)} className="hidden">
            </form>
            <input type="file" 
            {...register('files')}
            className="hidden" form="fileSendForm" onChange={imageChange} accept="image/*" ref={fileInput} multiple />
            <button type="button" tabIndex={0} className={`sidebar-item `} onClick={pop}>
                <span className="sidebar-icon">
                    {icon}
                </span>
            </button>
            <input type="checkbox" ref={modal} id="my_modal_6" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box pt-12 ">
                    {/* <h3 className="font-bold text-lg">Hello!</h3> */}
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3 place-items-center">
                        {
                            imagesUrl.map((image: Image) => (
                               <MemorizedImageBox key={image.id} image={image} removeImage={removeImage} />
                            ))
                        }
                    </div>
                    <div className="modal-action">
                        <button type="button" onClick={closeImageModal} className="btn btn-soft btn-sm md:btn-md">Close!</button>
                        <button form="fileSendForm" type="submit" className="btn btn-primary btn-sm md:btn-md">Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ImageBoxProps {
    image: Image,
    removeImage: (id: number) => void
}

const ImageBox = ({ image,removeImage } : ImageBoxProps) => {
    const ImCrossIcon = useMemo(() => ImCross, []);

    return (
    <div key={image.id} className="h-32 w-20 object-contain relative ">
        <button type="button" className="absolute top-0 right-0 text-red-500" onClick={() => removeImage(image.id)}>
            <ImCrossIcon />
        </button>
        <img src={image.url} alt="" className="w-full h-full rounded-lg" />
    </div>
    )
}

const isSameImageBox = ({ image: prevImage }: ImageBoxProps, { image: nextImage }: ImageBoxProps) => {
    return prevImage.id === nextImage.id;
}

const MemorizedImageBox = memo(ImageBox, isSameImageBox);

export default FileInput