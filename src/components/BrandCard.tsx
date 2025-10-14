import React, { useRef } from 'react';

type HoverVideoProps = {
    src: string;
    imageSrc: string;
    className?: string;
};

const BrandCard: React.FC<HoverVideoProps> = ({ src, imageSrc, className = '' }) => {
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.currentTime = 0;
            videoRef.current.play();
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
        }
    };

    return (
        <div
            className={`relative w-72 h-40 overflow-hidden rounded-lg shadow-lg group ${className}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="absolute inset-0 bg-black"></div>

            <video
                ref={videoRef}
                src={src}
                muted
                loop
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover border-4 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
            />

            <div className="absolute rounded-lg inset-0 flex items-center justify-center z-10">
                <img src={imageSrc} alt="Overlay" className=" rounded-lg" />
            </div>
        </div>
    );
};

export default BrandCard;
