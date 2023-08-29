import { AuthUser } from "@/@types/users"
import { AiFillEdit } from "react-icons/ai"
import React, { useRef, useState } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { t } from "i18next";
import { updateProfilePicture } from "@/api/auth/AuthRequest";
import { useAppDispatch } from "@/app/hooks";
import { changeUserProfilePicture } from "@/app/slices/auth/UserSlice";
import { ClipLoader } from "react-spinners";
import { alertToast } from "@/components/tools/Toast/AlertToast";
interface ProfilePhotoEditProps {
    user: AuthUser
}

const ProfilePhotoEdit = ({ user }: ProfilePhotoEditProps) => {
    const modal = useRef<HTMLInputElement>(null);
    const imageInput = useRef<HTMLInputElement>(null);
    const cropperRef = useRef<ReactCropperElement>(null);
    const [image, setImage] = useState<any>(null);
    const formData  = new FormData();
    const [loading,setLoading] = useState<boolean>(false);
    const [errors,setErrors] = useState<any[]>([]);
    const dispatch = useAppDispatch();

    const fileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (modal && modal.current) {
            modal.current.checked = true;
        }
        if (e.target.files && e.target.files.length > 0) {
            const selectedFile = e.target.files[0];
            if (selectedFile.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    setImage(reader.result as string);
                };
                reader.readAsDataURL(selectedFile);
            } else {
                setErrors([{
                    message: "Please select an image file"
                }])
            }
        }
    };
    const dataURLtoBlob = (dataURL: string) => {
        const arr = dataURL.split(',');
        if (arr[0].indexOf('base64') >= 0) {
            const mimeMatch = arr[0].match(/:(.*?);/);
            if (mimeMatch) {
                const mime = mimeMatch[1];
                const bstr = atob(arr[1]);
                let n = bstr.length;
                const u8arr = new Uint8Array(n);
                while (n--) {
                    u8arr[n] = bstr.charCodeAt(n);
                }
                return new Blob([u8arr], {
                    type: mime,
                });
            }
        }
    };
        

    const getCropData = async () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
                const img = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
                const blob = dataURLtoBlob(img) !;
                const file = new File([blob], 'crope.jpeg', {
                    type: 'image/jpeg'
                });
                formData.append('profile_photo', file);
           
            setLoading(true);
            
            await updateProfilePicture(formData)
            .then((res) => {
                if (res && res.status === 200) {
                    const newProfilePhoto = (res as any).data.data.profile_photo as string; // Using a type assertion here
                    dispatch(changeUserProfilePicture(newProfilePhoto));
                    if (modal && modal.current) {
                        modal.current.checked = false;
                    }
                }
                else{
                    console.log(res)
                    setErrors([{
                        message: (res as any).message
                    }])
                }
            })
            setLoading(false);
        }
        else{
            setErrors([{
                message: "Uploading failed"
            }])
        }
    };

    if(errors.length > 0){
        alertToast({icon: 'error', title: errors[0].message})
        setErrors([])
      }
      console.log(errors)

      const closeEdit = () => {
        if (modal && modal.current) {
            modal.current.checked = false;
            setLoading(false);
            setImage(null);
        }
    };


    const editImage = () => {
        imageInput && imageInput.current && imageInput.current.click();
    };

    return (
        <>
            <div className="w-full flex justify-center relative">
                <div className="w-32 h-32 rounded-full relative  ">
                    <img src={user?.profile_photo} alt="" className="w-full h-full rounded-full object-cover" />
                    <button onClick={editImage} className="absolute bottom-0 right-0 sidebar-item">
                        <span className="sidebar-icon text-xl "><AiFillEdit /></span>
                    </button>
                </div>
            </div>
            <input type="file" id="file" className="hidden" accept="image/*" ref={imageInput} onChange={fileChanged} />
            <input type="checkbox" id="my_modal_22" ref={modal} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg mb-4">{t('Profile Photo Update')}</h3>
                    <Cropper
                        ref={cropperRef}
                        style={{ height: 400, width: "100%" }}
                        zoomTo={0.5}
                        initialAspectRatio={1}
                        preview=".img-preview"
                        src={image}
                        viewMode={1}
                        minCropBoxHeight={10}
                        minCropBoxWidth={10}
                        background={false}
                        responsive={true}
                        autoCropArea={1}
                        checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                        guides={true}
                    />
                    <div className="modal-action">
                        <button onClick={closeEdit} className="btn btn-soft btn-sm">Close!</button>

                        <button className="btn btn-primary btn-sm" disabled={loading} onClick={getCropData}>
                            {loading ? <ClipLoader size={15} color="#fff" /> : t("Update")}
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProfilePhotoEdit