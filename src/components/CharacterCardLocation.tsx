import Image from 'next/image';
import Link from 'next/link';

import React from 'react';

const CharacterCardLocation = ({ id, name, image }: { id: string, name: string, image: string }) => {
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
            className={`bg-white shadow-lg rounded-lg overflow-hidden m-4 flex items-center ${isHovered ? 'scale-105' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Image src={image} alt={name} width={200} height={200} className='w-10 object-cover' />
            <div className="px-2 flex-grow">
                <p className="text-lg font-semibold text-gray-900">{name}</p>
            </div>
        </Link>
    );
};

export default CharacterCardLocation;
