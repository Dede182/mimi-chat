import React from 'react'

const FileInput = ({ icon }: { icon: JSX.Element }) => {
    return (
            <div className="dropdown dropdown-top">
                <label tabIndex={0} className={`sidebar-item `}>
                <span className="sidebar-icon">
                    {icon}
                </span>
                </label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><a>Item 1</a></li>
                    <li><a>Item 2</a></li>
                </ul>
            </div>
    )
}

export default FileInput