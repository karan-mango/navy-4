import React, { createContext, useState, useEffect } from 'react';


export const Mycontext = createContext();

export default function Globalapiprovider({ children }) {
   const obj={
   }

    return (
        <Mycontext.Provider value={obj}>
            {children}
        </Mycontext.Provider>
    );
}
