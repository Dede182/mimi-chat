import { downloadChatFile } from "@/api/generals/ChatList";
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { closeChatFile } from "@/app/slices/chat/chatFileSlice";
import { useParams } from "react-router-dom";
import { BsFillCloudDownloadFill } from 'react-icons/bs';
import { useCallback, useState } from "react";
import { ClipLoader } from "react-spinners";
import styles from "./style.module.scss";
const ChatFile = () => {
    const params = useParams();
    const chatId = params['id'];
    const dispatch = useAppDispatch();
    const chatFile = useAppSelector(state => state.chatFile);
    const [loading, setLoading] = useState<boolean>(false);
    const isOpen = chatFile.opened;
    const image = chatFile.file?.hd;
    const closeChatFileBtn = useCallback(() => {
            dispatch(closeChatFile());
            setLoading(false);},
        [dispatch]
    )

    const downloadImage = 
        () => {
            setLoading(true);
            const fileName = chatFile.file?.name;
            downloadChatFile(fileName!, chatId!).then((response) => {
                console.log(response);
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'file.jpeg');
                document.body.appendChild(link);
                link.click();
            }).catch((err) => {
                console.log(err)
            }
            ).finally(() => {
                setLoading(false);
            }
            )
        };
    

    return (
        <>
            <input type="checkbox" id="my_modal_6" className="modal-toggle" checked={isOpen} />
            <div className="modal">
                <div className="modal-box">
                    <h3 className={styles.h3Title}>Hello!</h3>
                    <p className="py-4">This modal works with a hidden checkbox!</p>
                    <img src={image} className={styles.imgContainer} alt="" />
                    <div className="modal-action">
                        <button onClick={downloadImage} disabled={loading} className="btn btn-sm btn-primary">
                            {loading ? <ClipLoader size={15} color="#fff" /> : <BsFillCloudDownloadFill />}
                        </button>
                        <button onClick={closeChatFileBtn} className={styles.closeBtnSoft}>Close</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatFile