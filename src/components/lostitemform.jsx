import { Button, DialogFooter, Input, Textarea } from "@material-tailwind/react";
import { useContext, useState } from "react";
import GMap from "./gmap";
import { OrderContext } from "../context/order.context";

export default function LostItemForm({ onSubmit, onClose }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contact, setContact] = useState("");
  const { addLostItem, getLostItems } = useContext(OrderContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = {
      type: "lost",
      title,
      description,
      contact,
      createdAt: new Date(),
    };


    await addLostItem(newItem, ).then(
        // setFormFields([])
        console.log("Lost item added"),
        // getLostItems(),
        onClose() // directly close after submit
    );

    onSubmit?.(newItem);
    // reset form
    setTitle("");
    setDescription("");
    setContact("");
  };

  return (
    <div className="max-h-[80vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className='text-orange-50/50'>
        
            <div className="input-div mb-2">
                <input variant="outlined" value={title} onChange={(e) => setTitle(e.target.value)} type="text" size="lg" label="Title" placeholder="Item name"/>
            </div>

            <div className="input-div">
                <textarea label="Description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Tell me about it" />
            </div>

            <div className="input-div mb-2">
                <input variant="outlined" value={contact} onChange={(e) => setContact(e.target.value)} type="text" size="lg" label="Contact" placeholder="Contact"/>
            </div>

            <DialogFooter>
                <Button type="submit" variant="gradient" color="orange"><span>Report Lost Item</span></Button>
            </DialogFooter>

        </form>
    </div>
  );
}
