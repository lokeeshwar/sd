import React from 'react'
import { useDispatch } from "react-redux";
import { signoutSuccess } from '../Redux/User/UserSlice'
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const Signout = async () => {

    try {
      const res = await fetch("http://127.0.0.1:5000/apisd/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
        navigate('/')
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <div>HomePage
      <button onClick={Signout}> sign out</button>
    </div>
  )
}
