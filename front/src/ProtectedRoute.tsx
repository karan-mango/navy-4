import React, { useContext } from 'react'
import { Mycontext } from './Globalapiprovider'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({element:Component,...rest}) {
  // const {isauth}=useContext(Mycontext)
  return (
    <div>
        {/* {isauth?<Component {...rest}/>:<Navigate to="/signin"/>} */}

    </div>
  )
}
