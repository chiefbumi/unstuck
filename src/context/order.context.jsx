import { Children, createContext, useEffect, useState } from "react";
import { createLostDoc, getLostDocs, successToast } from "../utils/firebase/firebase.utils";


export const OrderContext = createContext({
    lostItems: [],
    addLostItem: () => {},
    getLostItems: () => {},
});


export const OrderProvider = ({children}) => {
  // const [ orders, setClients ] = useState([]);
  const [ lostItems, setLostItem ] = useState([]);
  // const [ curPage, setCurPage ] = useState();


  // Inquiry

  const addLostItem = async (docToAdd) => {
    var msg = '';
      if (docToAdd.type == 'lost') {
        msg = "Your lost item has been reported. Others can now help you find it.";
      } else {
        msg = "Thanks for reporting! Others can see this item and reclaim it.";
      }
    await createLostDoc(docToAdd).then(
      getLostItems(),
      successToast(msg),
    );
  }

  const getLostItems = async () => {
    const lostMap = await getLostDocs();
    setLostItem(lostMap);
  }


  useEffect(() => {
    getLostItems();
  }, [])




  const value = { 
    lostItems, addLostItem,
  };
  return (<OrderContext.Provider value={value}>{children}</OrderContext.Provider>)
}