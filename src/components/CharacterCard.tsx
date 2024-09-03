import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

const CharacterCard = ({ id, name, image }: { id: string, name: string, image: string }) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <Link href={`/${id}`}
            key={id}
            className={`bg-white shadow-lg rounded-lg overflow-hidden m-4 text-center ${isHovered ? 'scale-105' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Image src={image} alt={name} width={200} height={200} className='w-full h-56 object-cover' />
            <div className="p-4">
                <p className="text-lg font-semibold text-gray-900">{name}</p>
            </div>
        </Link>
    );
};

export default CharacterCard;
