import { sendEventFileMessage } from "@/api/generals/ChatList"
import { BaseSyntheticEvent, createRef, memo, useCallback, useEffect, useMemo, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { ClipLoader } from "react-spinners"
import { BsFillSendFill, ImCross } from '@/utils/helpers/SidebarHelper'
import { AxiosError } from "axios"
import styles from './style.module.scss'


interface FileInputProps {
    icon: JSX.Element,
    user: any,
    chatId: string,
    chatPrefix: React.MutableRefObject<number>
}
interface ImageFile {
    id: number,
    file: File
}
interface FormDataType {
    files: File[];
}

const FileInput = ({ icon, user, chatId, chatPrefix }: FileInputProps) => {
    const [images, setImages] = useState<any[]>([]);
    const modal = createRef<HTMLInputElement>();
    const fileInput = createRef<HTMLInputElement>();
    const { register, handleSubmit, resetField } = useForm<FormDataType>();
    const formData = new FormData();
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);
    const pop = () => {
        fileInput.current?.click();
    }

    const icons = useMemo(() => {
        return {
            send: <BsFillSendFill />
        }
    }, [])

    useEffect(() => {
        console.log('this run once')
        if (modal.current?.checked && images.length < 1) {
            modal.current!.checked = false;
            closeImageModal();
        }
        if (images.length < 1) return;
        modal.current!.checked = true;

    }, [images])

    const imageChange = useCallback((event: BaseSyntheticEvent) => {
        const files = event.target.files;
        if (files) {
            const filesArray = Array.from(files);
            const filesArrayWithId = filesArray.map((file) => {
                return {
                    id: Math.random() * 1000,
                    file
                }
            })
            setImages([...filesArrayWithId]);
        }
    }, []);

    const removeImage = useCallback((id: number) => {
        setImages((prevImages) => prevImages.filter((image) => image.id !== id));
    }, []);

    const closeImageModal = useCallback(
        () => {
            console.log('close was called')
            if(modal.current?.checked) modal.current!.checked = false;
            setImages([]);
            resetField('files');
            setLoading(false);
            setErrors([]);
            fileInput.current!.value = '';
        }, [fileInput, resetField,modal])

    const onSubmit: SubmitHandler<FormDataType> = useCallback(async (data: any, event?: BaseSyntheticEvent) => {

        event?.preventDefault();
        if (!loading) {
            setErrors([]);
            const imagesData: File[] = [];
            images.forEach((image: any) => {
                imagesData.push(image.file);
                formData.append(`files[]`, image.file);
            });
            formData.append('chat_id', chatId);
            formData.append('prefix_id', chatPrefix.current.toString());
            formData.append('sender_id', user!.id);
            formData.append('message_type', 'file');
            formData.append('message', `sent ${imagesData.length} photos`);
            setLoading(true);
            const res  = await sendEventFileMessage(formData);
           
            if (res instanceof AxiosError) {
                const e  = res.response?.data
                setErrors(() => [ e.message]);
            }
            else {
              res && res.status === 200 && closeImageModal();
            }
            setLoading(false);
        }
    }
        , [loading, images, formData, chatId, chatPrefix, user, closeImageModal])

    console.log(errors);
    return (
        <div  >
            <form id="fileSendForm" onSubmit={handleSubmit(onSubmit)} className="hidden">
            </form>
            <input type="file"
                {...register('files')}
                className="hidden" form="fileSendForm" onChange={imageChange} accept="image/*" ref={fileInput} multiple />
            <button type="button" tabIndex={0} className={styles.sidebarItem} onClick={pop}>
                <span className={styles.sidebarIcon}>
                    {icon}
                </span>
            </button>
            <input type="checkbox" ref={modal} id="my_modal_6" className="modal-toggle" />
            <div className="modal ">
                <div className={styles.modalContainer}>
                    {/* <h3 className="font-bold text-lg">Hello!</h3> */}
                    <div className="flex flex-wrap gap-3 justify-center">
                        {
                            images.map((image: ImageFile) => (
                                <MemorizedImageBox key={image.id} image={image} removeImage={removeImage} />
                            ))
                        }
                    </div>
                    <div className={styles.modalFooter}>
                        <div className="">
                            {errors.length > 0 && <div className={styles.errorText}>
                                {errors.map((error: string) => (
                                    <p key={error}>{error}</p>
                                ))}
                            </div>}
                        </div>
                        <div className={styles.modalBtnContainer}>
                            <button type="button" onClick={closeImageModal} className={styles.btnSoft}>Close!</button>
                            <button form="fileSendForm" type="submit"
                                disabled={loading}
                                className={styles.btnPrimary}>
                                {loading ? <ClipLoader size={15} color="#fff" /> : icons.send}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface ImageBoxProps {
    image: ImageFile,
    removeImage: (id: number) => void
}

const ImageBox = ({ image, removeImage }: ImageBoxProps) => {
    const ImCrossIcon = useMemo(() => ImCross, []);
    const url = useMemo(() => URL.createObjectURL(image.file), [image.file]);
    return (
        <div key={image.id} className="w-32 h-36 md:w-36 object-cover relative ">
            <button type="button" className="absolute top-0 right-0 text-red-500" onClick={() => removeImage(image.id)}>
                <ImCrossIcon />
            </button>
            <img src={url} alt="" className="w-full h-full rounded-lg" />
        </div>
    )
}

const isSameImageBox = ({ image: prevImage }: ImageBoxProps, { image: nextImage }: ImageBoxProps) => {
    return prevImage.id === nextImage.id;
}

const MemorizedImageBox = memo(ImageBox, isSameImageBox);

export default FileInput