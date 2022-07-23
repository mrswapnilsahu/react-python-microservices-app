import { useState } from "react";

export default function Photo({ item, setSelectedImage }) {
    const [isLoading, setIsLoading] = useState(true);

    const handleImageClick = (src) => {
        setSelectedImage(src);
    }

    return <div className="image-card">
        <p className="image-title">{item.title}</p>
        <button className="image-container" onClick={() => handleImageClick(item.src)}>
            <img src={item.src} alt={item.title} onLoad={() => setIsLoading(false)} />
            {isLoading && <span className="spinner"></span>}
        </button>
    </div>
}