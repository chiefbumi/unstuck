
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
import { getAuth, createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, signOut, onAuthStateChanged, 
    signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail  
} from "firebase/auth";
import { Toaster, toast } from 'sonner'
import { doc, getDoc , setDoc, getFirestore, collection, where, orderBy, addDoc, getDocs, query, updateDoc, deleteDoc, startAt, endAt } from "firebase/firestore";
import { ref, uploadBytesResumable, uploadBytes, getDownloadURL } from "firebase/storage";


// Language Helpers / Lost & Found
const firebaseConfig = {
    apiKey: "AIzaSyAI-EmGL4elh2j5ipl8lN5gyZQG4_DQBkA",
    authDomain: "language-helpers-3f7c7.firebaseapp.com",
    projectId: "language-helpers-3f7c7",
    storageBucket: "language-helpers-3f7c7.firebasestorage.app",
    messagingSenderId: "865911651915",
    appId: "1:865911651915:web:913278a3886bdc40d9d7ce"
};



// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const imageDb = getStorage(firebaseApp);


export const auth = getAuth();
export const db = getFirestore();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account"
});
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const logGoogleUser = async () => {
    try {
      await signInWithGooglePopup();
    } catch (error) {
      switch (error.code) {
        case ('auth/popup-closed-by-user'):
            infoToast('Login window closed..!');
          break;
      
        default:
            infoToast('An error occured..!')
            console.log('An error occured: '+error.code);
          break;
      }
    }
    // const userDocRef = await createUserDocumentFromAuth();
    // console.log(user);
}

export const createAuth = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);  
}

export const createUserDocumentFromAuth = async (userAuth, additionalinfo = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log('userDocRef: ', userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    // console.log('userSnapshot: ', userSnapshot);

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        // const { email } = userAuth;
        const createdAt = new Date();
        const uid = userAuth.uid;
        const status = 'user';
        const del = 'no';

      try {
        await setDoc(userDocRef, {
          uid, displayName, email, status, del, createdAt, ...additionalinfo
        });
      } catch (error) {
        console.log('An error occured', error.message);
      }
    }
    return await searchUserDoc(userAuth.email)
    return userSnapshot;
}

export const signInAuthWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);  
}

export const signOutUser = async () => await signOut(auth);
export const resetPassword = (email) => sendPasswordResetEmail(auth, email);
export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback);


export const apiUrl = () => {
    const url = 'http://127.0.0.1:8000/api';
    return url;
};





// Lost Item

export const createLostDoc = async (docToAdd) => {
    const refValue = collection(db, 'lostitems');
    try {
        await addDoc(refValue, docToAdd);
    } catch (error) {
        console.log('Error occoured adding lost item: ', error.message);
    }
    
}

export const getLostDocs = async () => {
    const docsReceiver = [];
    const querySnapshot = await getDocs(query(collection(db, 'lostitems'), orderBy("createdAt", "desc")));

    const purMap = () => querySnapshot.forEach((doc) => {
        docsReceiver.push({...doc.data(), id: doc.id});
    });
    purMap();
    console.log(docsReceiver);
    return docsReceiver;
}


export const searchOtp = async (otp) => {
    // const otpRef = await getDocs(query(collection(db, 'otpgen').where("otp", "==", otp)));

    const found = [];
    const otpRef = collection(db, "otpgen");

    const findOtp = await getDocs(query(otpRef, where("otp", "==", otp)));
    const mapOtp = () => findOtp.forEach((doc) => {
        found.push({...doc.data(), id: doc.id});
    });
    mapOtp();
    return found[0];
}




// Users

export const searchUserDoc = async (email) => {
    const found = [];
    const otpRef = collection(db, "users");

    const findOtp = await getDocs(query(otpRef, where("email", "==", email)));
    const mapOtp = () => findOtp.forEach((doc) => {
        found.push({...doc.data()});
    });
    mapOtp();
    // console.log(found[0]);
    return found[0];
}

export const getUsersDocuments = async () => {
    const usersReceiver = [];
    const querySnapshot = await getDocs(query(collection(db, 'users'), orderBy("createdAt", "desc")));

    const usersMap = () => querySnapshot.forEach((doc) => {
        usersReceiver.push({...doc.data()});
    });
    usersMap();
    // console.log(usersReceiver);
    return usersReceiver;
}

export const updateUserDoc = async (user) => {
    const upRefValue = doc(db, 'users', user.uid);
    try {
        await updateDoc(upRefValue, user).then(
            successToast(user.displayName+"'s record temporarily deleted")
        )
    } catch (error) {
        console.log('Error occoured at sales: ', error.message);
    }
}





// Toasts

export const successToast = (message) => {
  toast.success(message, {
    position: 'top-left',
    duration: '5000'
  })
}

export const errorToast = (message) => {
  toast.error(message, {
    position: 'top-left',
    duration: '5000'
  })
}

export const infoToast = (message) => {
  toast.info(message, {
    position: 'top-left',
    duration: '5000'
  })
}




export const uploadToFirebase = (file, path) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(imageDb, path);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
        uploadTask.on(
            "state_changed",
            (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(`Upload is ${progress}% done`);
            },
            (error) => {
            console.error("Upload failed:", error);
            reject(error);
            },
            async () => {
                try {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve(downloadURL);
                } catch (error) {
                    console.error("Error getting download URL:", error);
                    reject(error);
                }
            }
        );
    });
};


export const getFileDownloadURL = async (filePath) => {
    const fileRef = ref(imageDb, filePath);
  
    try {
      const url = await getDownloadURL(fileRef);
      return url; // Return the file download URL
    } catch (error) {
      console.error("Error fetching download URL:", error);
      throw error;
    }
};


export async function uploadImageAndGetURL(file, pathPrefix = "found-items") {
  // Give each upload a unique path (timestamp + filename)
  const filePath = `${pathPrefix}/${Date.now()}_${file.name}`;
  const fileRef = ref(imageDb, filePath);

  // 1) Upload bytes
  await uploadBytes(fileRef, file);

  // 2) Get a public download URL
  return await getDownloadURL(fileRef);
}