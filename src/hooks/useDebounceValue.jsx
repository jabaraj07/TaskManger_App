import React, { useEffect, useState } from 'react'

export default function useDebounceValue(value,delay=400) {
    
   const [search,setSearch] = useState(value);

   useEffect(()=>{
    const time = setTimeout(() => {
        setSearch(value);
    }, delay);
    return ()=> clearTimeout(time)
   },[delay,value])

  return search;
}
