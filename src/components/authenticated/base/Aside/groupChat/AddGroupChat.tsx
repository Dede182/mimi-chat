import { t } from 'i18next'
import { lazy, useEffect, useMemo, useState } from 'react'
import { HiPlus } from 'react-icons/hi'
const AddGroupMemberList = lazy(() => import('./AddGroupMemberList'));
const SearchMemberModal = lazy(() => import('./SearchMemberModal'));
import { Member } from './types/types'

const AddGroupChat = () => {

    const [memberList, setMemberList] = useState<Member[]>([])
    const [memberHolder, setMemberHolder] = useState<Member[]>([])

    const PlusIcon = useMemo(() => {
        return <HiPlus />
    }, [])

    //member  from api
    const members = () => {
        const memberList: Member[] = [];
        for (let i = 0; i < 20; i++) {
            const purl = `https://i2.wp.com/s3.amazonaws.com/laracasts/images/forum/avatars/default-avatar-${i+1}.png?ssl=1`;
            const newMemer = {
                id: i,
                name: `User ${i}`,
                profile_photo: purl,
                added : false
            }
            memberList.push(newMemer);
        }

        return memberList;
    }

    useEffect(() => {
        setMemberList(members())
    }, [])

    return (
        <>
            {/* The button to open modal */}
            <label htmlFor="my_modal_8" className="cursor-pointer sidebar-item w-8 h-8">
                <span className="sidebar-icon text-[1.3rem]">{PlusIcon}</span>
            </label>

            <input type="checkbox" id="my_modal_8" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box scroll !z-[100] relative w-[5/6] md:w-4/6  max-h-[90%] min-h-[40%]">
                    <h3 className="text-lg font-bold mb-3 pb-4 bb capitalize">{t('Create a group chat')}</h3>

                    <form onSubmit={(e) => {
                        e.preventDefault()
                        console.log('submitted')
                    }}>

                        <div className="form-control w-full flex flex-col gap-3 mb-4">
                            <label className="label">
                                <span className="label-text capitalize">{t("Group Name")}</span>
                            </label>
                            <input type="text"
                                placeholder={t('Enter your group name')} className="res-input w-full input-bordered" />
                        </div>

                        <div className="form-control w-full flex flex-col gap-3">
                            <label className="label">
                                <span className="label-text capitalize">{t("Add members")}</span>
                            </label>
                            <AddGroupMemberList memberHolder={memberHolder} setMemberHolder={setMemberHolder} />
                        </div>

                        <div className="modal-action">
                            <input type="submit" value={t('Create')} className="btn btn-sm btn-neutral text-[.6em]" />
                        </div>


                    </form>

                </div>


                <label className="modal-backdrop" htmlFor="my_modal_8">Close</label>
            </div>

            <SearchMemberModal memberList={memberList} memberHolder={memberHolder}   setMemberList={setMemberList} setMemberHolder={setMemberHolder} />
        </>
    )
}


export default AddGroupChat