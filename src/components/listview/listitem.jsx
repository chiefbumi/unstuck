import React from 'react'
import { ListViewOne } from '../../components/lnflist'
import { IoWarning } from 'react-icons/io5'
import { FaUser, FaRegCircleCheck, FaAccusoft, FaRegUser } from 'react-icons/fa6'
import { MdOutlineLocationOn, MdOutlineAccessTime } from "react-icons/md";
import { LuUserRoundPen } from "react-icons/lu";
import { HiFlag } from "react-icons/hi";
import { FaCalendarAlt } from "react-icons/fa";
import { RiTriangularFlagFill } from "react-icons/ri";
import { Button } from '@material-tailwind/react';


const ListItem = ({ itm, onClick }) => {
  return (
    <>
        <div className="listItem flex mb-4" onClick={onClick}>
            {/* <FaAccusoft className='text-red-600 text-3xl' /> */}
            <FaAccusoft className={itm.type == 'lost' ? 'text-red-600 text-3xl mr-4' : 'text-green-600 text-3xl mr-4'} />
            <div className="listText">
                <h2>{itm.title}</h2>
                <p className='text-sm'>{itm.description}</p>
                <div className='text-xs flex gap-5'>
                    {/* <p><MdOutlineLocationOn size={15} className='float-left mr-1' /> Dining Hall - North</p> */}
                    { itm.contact ? 
                      <p><MdOutlineLocationOn size={15} className='float-left mr-1' /> {itm.contact}</p>
                    :null}
                    <p><MdOutlineAccessTime size={14} className='float-left mr-1' /> 4 hours ago</p>
                </div>
                <p className='text-xs mt-1'><LuUserRoundPen size={15} className='float-left mr-1' /> John Doe</p>
                {/* <Button className='align-right'><MdOutlineAccessTime size={14} className='float-left mr-1' /> Chat</Button> */}
            </div>
        </div>

        {/* <div className="listItem flex mb-4">
            <FaAccusoft className='text-red-600 text-3xl mr-4' />
            <div className="listText">
                <h2>Brown Leather Jacket</h2>
                <p className='text-sm'>This item was found lying on one of the tables. This item was found lying on one of the tables. </p>
                <div className='text-xs flex gap-5'>
                    <p><MdOutlineLocationOn size={15} className='float-left mr-1' /> Dining Hall - North</p>
                    <p><MdOutlineAccessTime size={14} className='float-left mr-1' /> 4 hours ago</p>
                </div>
                <p className='text-xs mt-1'><LuUserRoundPen size={15} className='float-left mr-1' /> John Doe</p>
            </div>
        </div> */}
    </>
  )
}

export default ListItem