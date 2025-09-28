

import React, { useContext, useEffect, useState } from 'react'
import { OrderContext } from '../../context/order.context'
// import './homepage.styles.scss'
import { useLocation } from 'react-router-dom'
import MapView from '../../components/mapview.components'
import SimpleMap from '../../components/simplemap'
import GMap from '../../components/gmap'
import { TbFilterSearch } from "react-icons/tb";
import ListItem from '../../components/listview/listitem'
import { FaPlus, FaSearchengin } from 'react-icons/fa6'
import { RiSendPlaneFill } from "react-icons/ri";
import { FiSearch } from "react-icons/fi";import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Popover,
  PopoverHandler,
  PopoverContent,
  Avatar,
  Typography,
  List,
  ListItemPrefix,
} from "@material-tailwind/react";
import LostItemForm from '../../components/lostitemform'
import FoundItemForm from '../../components/founditemform'
import { useMemo } from "react";


const HomePage = () => {

  const [radiusKm, setRadiusKm] = useState(5);
  
  const [status, setStatus] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpenDialog = () => setOpenDialog(!openDialog);

    const { lostItems } = useContext(OrderContext)
    const [ allItems, setAllItems ] = useState(lostItems)

    const [filter, setFilter] = useState("all");   // 'all' | 'lost' | 'found'
    const [query, setQuery] = useState("");        // optional search text

    const filteredItems = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (allItems ?? []).filter((it) => {
        const matchType = filter === "all" || it.type === filter; // it.type should be 'lost' or 'found'
        const matchText =
        !q ||
        (it.title?.toLowerCase().includes(q) ||
        it.description?.toLowerCase().includes(q));
        return matchType && matchText;
    });
    }, [allItems, filter, query]);

    useEffect(() => {
        setAllItems(lostItems)
    }, [lostItems])

  const handleLost = () => {
    setOpenDialog(!openDialog);
    setStatus(1);
    }

  const handleFound = () => {
    setOpenDialog(!openDialog);
    setStatus(0);
    }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);



  const now = new Date();
  const dayName = now.toLocaleDateString("en-US", { weekday: "long" });
  const formattedDate = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });


    const [openDialog2, setOpenDialog2] = useState(false);
    const [selectedItem2, setSelectedItem2] = useState(null);

    const handleOpenDialog2 = (item) => {
        setSelectedItem2(item);
        setOpenDialog2(true);
    };

    const handleCloseDialog2 = () => {
        setOpenDialog2(false);
        setSelectedItem2(null);
    };



  return (
    <>
    <div className='content-wrapper'>

        <div className="w-full flex justify-between items-center">
            <div className="div1">
                <h1 className='text-xl font-medium text-white'>{dayName}</h1>
                <p className='text-sm'>{formattedDate}</p>
            </div>

            <div className="div2">
                <Popover placement="bottom-end">
                <PopoverHandler>
                    <Button
                    className="rounded-full w-16 h-16 mb-4"
                    onClick={handleOpen}
                    color="orange"
                    variant="gradient"
                    >
                    <FaPlus size={18} className="text-white" />
                    </Button>
                </PopoverHandler>
                <PopoverContent className="w-44 bg-black/70 border-none z-10">
                    <div className="mb-2 flex flex-col gap-2">
                    <Button
                        onClick={handleLost}
                        className="rounded-full outline-none bg-gray-400/80"
                        color="red"
                        variant="gradient"
                    >
                        Lost Item
                    </Button>
                    <Button
                        onClick={handleFound}
                        className="rounded-full outline-none bg-gray-700/80"
                        color="green"
                        variant="gradient"
                    >
                        Found Item
                    </Button>
                    </div>
                </PopoverContent>
                </Popover>
            </div>
        </div>


        {/* <Button className='rounded-full w-16 h-16' onClick={handleOpenDialog} color='orange' variant="gradient"><FaPlus size={18} className='text-white' /></Button> */}
        <GMap />

        {/* <ListViewOne /> */}

        <div>
            <div className="filterDiv2 text-xs gap-1 bg-orange-300/10 py-3 px-5 mt-3 mb-2 rounded-full">
                <TbFilterSearch size={22} className='float-left mt-1 mr-2 text-white' />
                <Button className='mr-1 rounded-md bg-orange-500' size='sm' onClick={() => setFilter('all')}>All</Button>
                <Button className='mr-1 rounded-md bg-red-600' size='sm' onClick={() => setFilter('lost')}>Lost</Button>
                <Button className='mr-1 rounded-md bg-green-600' size='sm' onClick={() => setFilter('found')}>Found</Button>
                
                <div className='flex gap-1 float-right bg-white/15 rounded-full px-3 py-1'>
                    <FiSearch size={24} className='float-left mt-0.5 mr-2 text-orange-50/30 bg-none' />
                    <input value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className='w-24 bg-transparent outline-none text-sm placeholder:text-orange-50/30' placeholder='Search Item'>
                    </input>
                </div>
            </div>
        </div>

        {/* <div className="w-full max-h-[40vh] overflow-y-auto">
            {allItems.map((item) => (
                <ListItem key={item.id} itm={item} />
            ))}
        </div> */}

        <div className="w-full max-h-[40vh] overflow-y-auto">
            {filteredItems.map((item) => (
                <ListItem key={item.id} itm={item} onClick={() => handleOpenDialog2(item)} />
            ))}
        </div>

    </div>

    <Dialog open={openDialog2} handler={handleCloseDialog2} className="dialogBG">
        <DialogHeader className="text-white/80 mx-2 mt-4">
            {selectedItem2?.title}
        </DialogHeader>
        <DialogBody>
            {selectedItem2?.photoURL ? (
                <div className="img_container">
                    <img
                    className="h-auto mt-1 w-full rounded-md"
                    src={selectedItem2.photoURL}
                    alt={selectedItem2?.title || "Found/Lost item"}
                    />
                </div>
            ) : (
                <p className='text-sm text-orange-500'>No image found</p>
            )}
            <p className='mt-3 text-white/80 text-sm'>{selectedItem2?.description}</p>
            <p className="mb-3 text-xs text-gray-500">Contact: {selectedItem2?.contact}</p>
        </DialogBody>
    </Dialog>


    
    <Dialog open={openDialog} handler={handleOpenDialog} className='dialogBG'>
        {/* <DialogHeader className='text-white/80 mx-2 mt-4'>Found an Item..?</DialogHeader> */}
        <DialogHeader className='text-white/80 mx-2 mt-4'>You Lost an Item..?</DialogHeader>
        <DialogBody>
            { status == 1 ?
            <LostItemForm onClose={handleLost} />
            :
            <FoundItemForm onClose={handleFound} />
            }
        </DialogBody>
        {/* <DialogFooter>
            <Button
            variant="text"
            color="red"
            onClick={openDialog}
            className="mr-1"
            >
            <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
            </Button>
        </DialogFooter> */}
    </Dialog>
    </>
  )
}

export default HomePage