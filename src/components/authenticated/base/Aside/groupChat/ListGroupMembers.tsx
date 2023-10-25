
import { AiOutlinePlus } from 'react-icons/ai';

const ListGroupMembers = () => {
    return (
        <>
            {/* The button to open modal */}
            <label htmlFor="my_modal_12" className="cursor-pointer avatar ">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-1 hover:ring-accent-focus ">
                    <span className="w-full h-full flex items-center justify-center text-xl">
                        <AiOutlinePlus />
                    </span>
                </div>
            </label>
        </>
    )
}

export default ListGroupMembers