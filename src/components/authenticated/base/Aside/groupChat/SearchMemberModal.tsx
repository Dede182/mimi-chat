import { t } from "i18next"
import { Member } from "./types/types";
import { ChangeEvent, useCallback, useRef } from "react";
import _ from "lodash";
interface SearchMemberModalProps {
        memberList : Member[],
        memberHolder : Member[],
        setMemberList : React.Dispatch<React.SetStateAction<Member[]>>,
        setMemberHolder : React.Dispatch<React.SetStateAction<Member[]>>
    }

const SearchMemberModal = ({memberList,memberHolder,setMemberList,setMemberHolder} : SearchMemberModalProps) => {

    const  searchRef = useRef<HTMLInputElement>();
     const addMember = useCallback((id : number,e : ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.checked)
        const newMember = memberList.filter(member => member.id === id)[0];
        if(e.target.checked){
            newMember.added = true;
        }
        else{
            newMember.added = false;
        }
        const newMemberList = [...memberHolder,newMember];

        const filteredMemberList = newMemberList.filter((member) => {
            return member.added == true
        });
        
        setMemberHolder(filteredMemberList);

     },[memberHolder, memberList, setMemberHolder]);


     const debouncedSearch = _.debounce((inputValue) => {
        const filtered = _.filter(memberList, (member) => {
        return member.name.toLowerCase().includes(inputValue.toLowerCase());
        });
        
    
        console.log(filtered);
      }, 300);

      const handleSearch = () => {
        console.log('changed')
        const inputValue = searchRef!.current.value! ;
        debouncedSearch(inputValue); // Use the debounced search function
      };

    return (
        <>
            <input type="checkbox"  id="my_modal_12" className="modal-toggle" />
            <div className="modal ">
                <div className="modal-box scroll !z-[120] relative  w-5/6 md:w-4/6  max-h-[50vh] min-h-[30vh]  px-8 md:px-12">
                    <h3 className="text-lg font-bold mb-1 bb capitalize">{t('search')}</h3>

                   
                    <div className="form-control w-full flex flex-col gap-3 mb-7">
                        <input ref={searchRef} onChange={handleSearch} type="text" placeholder={t('search your friend')} className="res-input w-full input-bordered" />
                    </div>
               

                     <div className="flex flex-col gap-10 px-3">
                     {memberList.map((member, index) => (
                            <div key={index} className="flex flex-row items-center justify-between gap-5">
                              <div className="flex flex-row items-center gap-5">
                              <div className={`avatar`}>
                                    <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1">
                                        <img src={member.profile_photo} />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <h3 className="text-sm">{member.name}</h3>
                                </div>
                              </div>
                              <div className="">
                                    <input onChange={(e)=>addMember(member.id,e)} type="checkbox" className="checkbox checkbox-accent" />
                              </div>
                            </div>
                        ))}
                     </div>
                </div>


                <label className="modal-backdrop" htmlFor="my_modal_12">Close</label>
            </div>
        </>
    )
}

export default SearchMemberModal