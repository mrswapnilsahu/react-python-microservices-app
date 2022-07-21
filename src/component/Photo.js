import { useState } from "react";

import "./Photo.css";

export default function Photo ({item}) {
    const [isLoading, setIsLoading] = useState(true);

    return <div className="card">
        <p>{item.title}</p>
        <img src={item.src} alt={item.title} style={{margin: '4px'}} onLoad={()=>{setIsLoading(false)}}/>
        {isLoading && <span className="loader"></span>}
    </div>
}