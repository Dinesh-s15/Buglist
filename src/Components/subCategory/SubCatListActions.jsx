import {  useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { FiEye } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { HiOutlinePencil } from "react-icons/hi";

const ActionMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    const optionClick = (value) => {
        setIsOpen(false);
    }

    return (
        <div className="relative -me-3 flex">
            <button className="three-dot-icon" onClick={toggleMenu} aria-label="More options">
            <HiDotsVertical className="m-2"/>
            </button>

            {isOpen && (
                <div className=" absolute right-0 bottom-0.5 flex font-medium px-1  ">
                    <div className=" px-1 w-20 bg-gray-300 rounded-lg  ">
                        <div className="flex gap-2 py-1 hover:bg-gray-200 " onClick={()=>optionClick("Edit")}>
                        <HiOutlinePencil size={15}/>  <button>Edit</button>
                        </div>
                        <div className="flex gap-2 py-1 hover:bg-gray-200" onClick={()=>optionClick("Delete")}>
                            <RiDeleteBinLine size={15} /><button>Delete</button> 
                        </div>
                        <div className="flex gap-2 py-1 hover:bg-gray-200" onClick={()=>optionClick("View")}>
                        <FiEye size={15} /> <button>View</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActionMenu;