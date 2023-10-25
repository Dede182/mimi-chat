import ListGroupMembers from './ListGroupMembers';
import { Member } from './types/types';

interface AddGroupMemberListProps {
    memberHolder: Member[],
    setMemberHolder: (member: Member[]) => void
}



const AddGroupMemberList = ({memberHolder,setMemberHolder} : AddGroupMemberListProps) => {

    const memberHolderCut = memberHolder.slice(0, 10);
    const more = memberHolder.length - memberHolderCut.length;

    const moreMember = more > 0 ? (
        <div className={`avatar absolute top-0 `} style={{ left : "200px" }}>
        <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                <div className="flex items-center justify-center h-full bg-slate-700">
                    <p className='text-[.3em]'>{more} more</p>
                </div>
        </div>
    </div>
    )  : null;

    return (
        <div className='flex w-full h-full'>
            <div className="relative w-5/6">
                {
                    memberHolderCut.map((member,index) => {
                        return (
                            <div key={member.id} className={`avatar absolute top-0 `} style={{ left: index * 20 }}>
                                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                                    <img src={member.profile_photo} />
                                </div>
                            </div>
                        )
                    })
                }

                {
                    moreMember
                }
            </div>
            <div className="w-2/6 flex justify-end">
               <ListGroupMembers />
            </div>

            
        </div>
    )
}

export default AddGroupMemberList