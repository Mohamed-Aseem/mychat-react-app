import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCjgSlQUVwDwNUYC-_FETYwTHMEyS7c3gY",
  authDomain: "mychat-app-c3dd5.firebaseapp.com",
  projectId: "mychat-app-c3dd5",
  storageBucket: "mychat-app-c3dd5.appspot.com",
  messagingSenderId: "539112169843",
  appId: "1:539112169843:web:375dcab2f20dd245732506"
};


const app = initializeApp(firebaseConfig);

// Login and Signup

const auth = getAuth(app);
const db = getFirestore(app);

//Signup Method

const signup = async (username,email,password ) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password)
        const user = res.user;
        await setDoc(doc(db, "users", user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email:email,
            name:"",
            avatar:"",
            bio:"Hey, There I'm using myChat app",
            lastSeen: Date.now()
        })
        await setDoc(doc(db,"chats",user.uid),{
            chatsData:[]
        })
        toast.success(`Welcome ${username} to myChat`)
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async () =>{
    try {
        await signOut(auth)
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

export {signup, login, logout, auth, db}