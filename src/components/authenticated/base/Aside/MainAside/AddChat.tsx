import InputError from "@/components/ui/Fields/InputError"
import { t } from "i18next"
import { useForm } from "react-hook-form";
import { SearchedUsers } from "../types";
import { useState } from "react";
import { addUserChat, findUsers } from "@/api/generals/ChatList";
import { BeatLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const AddChat = () => {

    const [chats, setChats] = useState<Array<SearchedUsers>>([])
    const [loading, setLoading] = useState<boolean>(false)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<any>({
        //   resolver: yupResolver(error)
    });
    const handleItemAdded = () => {
        setChats([]);
    };
    window.addEventListener('newChatAdded', handleItemAdded);

    const fetchUsers = async (search: string) => {
        setLoading(true);
        try {
            const response: any = await findUsers(search);
            //want to sortby the has_chat bool 
            const sorted = response!.data.data.sort((a: any, b: any) => {
                return b.has_chat -a.has_chat  ;
            });
            setChats(sorted);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const onSubmit = (data: any) => {
        fetchUsers(data.search);
    };

    return (
        <>
            {/* The button to open modal */}
            <label htmlFor="my_modal_7" className="chat-cata cursor-pointer">{t('add')}</label>

            <input type="checkbox" id="my_modal_7" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box scroll !z-[50] relative w-4/6 max-h-[60%]">
                    <h3 className="text-lg font-bold mb-3 pb-4 bb">Find User</h3>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full flex flex-row gap-3">

                            <input type="text"
                                {...register('search')}
                                placeholder={t('find the user')} className="input modal-input w-full input-bordered" />
                            <InputError errors={errors} />
                            <button type="submit"
                            disabled={loading}
                            className="btn btn-primary" onClick={handleSubmit(onSubmit)}>{t('search')}</button>

                        </div>

                    </form>

                    {
                        <div>
                            {/* Your form and rendering logic here */}
                            {loading ?   <BeatLoader color='blue' className="text-center mt-8" loading={true} size={10} /> : null}
                            <div className="flex flex-col gap-8 mt-8">
                                {chats.map((chat, index) => (
                                    <div key={index} className="user-chat">
                                        <InlineUser chat={chat} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    }

                </div>


                <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
            </div>
        </>
    )
}

const InlineUser = ({ chat }: { chat: SearchedUsers }) => {
    const navigate = useNavigate();
    const model = document.getElementById('my_modal_7') as HTMLInputElement;

    const AddUserToChat = async ()=>{
        model.checked = false;
        const response : any = await addUserChat(chat.id);
        if(response.status === 200){
            window.dispatchEvent(new CustomEvent('newChatAdded', { detail: response.data.data.single_chat_id }));
            navigate(`/chat/${response.data.data.single_chat_id}`)
        }
    }

    const navigateToChat = () => {
        model.checked = false;
        navigate(`/chat/${chat.single_chat_infos[0].single_chat_id}`)
      }
    return (
        <>
            <div className={`avatar w-[20%]`}>
                <div className="w-14 mask mask-squircle">
                    <img src={chat.profile_photo!} />
                </div>
            </div>

            {/* chat */}
            <div className={` w-[60%] flex flex-col gap-1 `}>
                <div className={`flex justify-between`}>
                    <div className="capitalize">{chat?.name}</div>
                </div>

            </div>

            {/* time */}
            <div className=" w-[20%] flex flex-col gap-1 justify-center">
                {
                    chat?.has_chat ? <button type="submit" onClick={navigateToChat}
                    className="btn btn-soft w-20 h-4" >{t('chat')}</button> 
                    :   <button type="submit"
                    onClick={AddUserToChat}
                    className="btn btn-primary w-20 h-4" >{t('add')}</button>
                }
            </div>
        </>
    )
}

export default AddChat