import { Button, DialogFooter, Input, Textarea } from "@material-tailwind/react";
import { useContext, useState } from "react";
import GMap from "./gmap";
import { OrderContext } from "../context/order.context";
import { errorToast, uploadImageAndGetURL } from "../utils/firebase/firebase.utils";

export default function FoundItemForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [photo, setPhoto] = useState(null);
    const { addLostItem, getLostItems } = useContext(OrderContext);
    const fallbackCenter = { lat: 39.25552, lng: -76.71083 }; // NYC
    const [center, setCenter] = useState(fallbackCenter);

  const handleCenterChange = (coords) => {
    setCenter(coords); // updates whenever map is clicked
    // console.log(center.lat.toFixed(5))
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!photo) {
        errorToast("Upload picture to proceed")
        return;
    }
    if (!center) {
        errorToast("Pick a location on the map to proceed");
        return;
    }
    
    // const newItem = {
    //   type: "found",
    //   title,
    //   description,
    //   contact,
    //   lat: center.lat.toFixed(5),
    //   lng: center.lng.toFixed(5),
    //   photo,
    //   createdAt: new Date(),
    // };

    try {
        // 1) Upload to Storage and get URL
        const photoURL = await uploadImageAndGetURL(photo, "found-items");

        // 2) Build the item object (store numbers, not toFixed strings)
        const newItem = {
        type: "found",
        title,
        description,
        contact,
        lat: Number(center.lat),
        lng: Number(center.lng),
        photoURL,
        createdAt: new Date(), // or serverTimestamp() if writing via Firestore here
        };

        await addLostItem(newItem, ).then(
            // setFormFields([])
            console.log("Found item added"),
            // getLostItems(),
            onClose() // directly close after submit
        );

        onSubmit?.(newItem);
        // reset form
        setTitle("");
        setDescription("");
        setContact("");
        setLat("");
        setLng("");
        setPhoto(null);

    } catch (err) {
        console.error(err);
        errorToast("Failed to upload photo or save item");
    }
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className='text-orange-50/50'>
        
            <div className="input-div mb-2">
                <input variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} type="text" size="lg" label="Item name" placeholder="Title"/>
            </div>

            <div className="input-div">
                <textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            </div>

            <div className="input-div mb-2">
                <input variant="outlined" value={contact} onChange={(e) => setContact(e.target.value)} type="text" size="lg" label="Contact" placeholder="Contact"/>
            </div>

            <div className="input-div rounded-full mb-3">
                <label className="block mb-1 mx-4 text-xs font-light">
                    Upload photo of found item here
                </label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    className="block w-full text-sm text-gray-700 
                            file:mr-4 file:py-2 file:px-4 
                            file:rounded-full file:border-0 
                            file:text-sm file:font-semibold 
                            file:bg-orange-500 file:text-white 
                            hover:file:bg-orange-600"
                />
            </div>

            <GMap onCenterChange={handleCenterChange} />

            <DialogFooter>
                <Button variant="text" color="red" className="mr-1 bg-red-500/20">Close</Button>
                <Button type="submit" variant="gradient" color="green"><span>Report Found Item</span></Button>
            </DialogFooter>

        </form>
    </div>
  );
}
