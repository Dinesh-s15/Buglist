import { useState } from "react";
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
        alert(`${value}`)
    }

    return (
        <div className="relative flex">
            <button className="three-dot-icon" onClick={toggleMenu} aria-label="More options">
            <HiDotsVertical className="m-2"/>
            </button>

            {isOpen && (
                <div className=" absolute right-3 top-0 flex font-medium px-2 bg-white shadow-md  ">
                    <div className=" px-1 w-20 bg-gray-300 rounded-lg  ">
                        <div className="flex gap-2 py-1 hover:bg-gray-200 " onClick={()=>optionClick("UPDATE")}>
                        <HiOutlinePencil size={15}/>  <button>Update</button>
                        </div>
                        <div className="flex gap-2 py-1 hover:bg-gray-200" onClick={()=>optionClick("View")}>
                            <FiEye size={15} /> <button>View</button>
                        </div>
                        <div className="flex gap-2 py-1 hover:bg-gray-200" onClick={()=>optionClick()}>
                            <RiDeleteBinLine size={15} /><button>Delete</button> 
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActionMenu;