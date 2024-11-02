import React, {  useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/firebase/firebaseconfig';
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({component}) => {
    const [loading , setLoading] = useState(true)
    const navigate = useNavigate()
   useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
          
          setLoading(false)
        const uid = user.uid;
        // ...
      } else {
       navigate('/login')
      }
    });
   
     return () => {
       
     }
   }, [])
   
    return (
    <>
    <div>
        {loading ? <div><div className="d-flex justify-content-center">
  <div className="spinner-border mt-5" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div></div> :  component}
    </div>
    </>
)
}

export default ProtectedRoutes