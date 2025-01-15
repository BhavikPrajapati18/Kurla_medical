import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwriteService/auth'
import {logout} from '../../store/authSlice'


function LoginBtn() {

  const dispatch = useDispatch()

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

  return (
    <button className='bg-red-500 text-white px-4 py-2 rounded-md' 
    onClick={logoutHandler}
    > 
      Logout
    </button>
  )
}

export default LoginBtn
