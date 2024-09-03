import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useQuery, gql } from '@apollo/client';
import Image from 'next/image';
import { useEffect, useState } from "react";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const GET_CHARACTER_DETAIL = gql`
    query GetCharacterDetail($id: ID!) {
        character(id: $id) {
        name
        status
        species
        gender
        image
        }
    }
`;

export default function Home() {
    const [location, setLocation] = useState('');
    const [locationMap, setLocationMap] = useState<Record<string, string[]>>({});
    const [feedback, setFeedback] = useState('');
    const router = useRouter()
    const { data, loading, error } = useQuery(GET_CHARACTER_DETAIL, {
        variables: { id: router.query.id },
    });


    const locationHandle = (key: string) => {
        setFeedback('Assigning...');
        const value = router.query.id?.toString() ?? ''
        setLocationMap((prev: Record<string, string[]>) => {
            const updatedLocationMap = { ...prev };
            Object.keys(updatedLocationMap).forEach(k => {
                updatedLocationMap[k] = updatedLocationMap[k].filter(v => v !== value);
                if (updatedLocationMap[k].length === 0) {
                    delete updatedLocationMap[k];
                }
            });
            if (!updatedLocationMap[key]) {
                updatedLocationMap[key] = [];
            }
            updatedLocationMap[key].push(value);
            localStorage.setItem('locationMap', JSON.stringify(updatedLocationMap));
            setFeedback('Location Assigned!');
            return updatedLocationMap;
        });
    };

    useEffect(() => {
        const storedLocationMap = localStorage.getItem('locationMap');
        const currentId = router.query.id?.toString();
        if (storedLocationMap) {
            const locationMap = JSON.parse(storedLocationMap);
            setLocationMap(locationMap); // Set the locationMap state from localStorage
            const foundKey = Object.keys(locationMap).find(key =>
                locationMap[key].includes(currentId)
            );
            if (foundKey) {
                setLocation(foundKey);
            }
        }
    }, [router.query.id]);

    return (
        <main
        className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
        >
            <Link href="/">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2">
                    Back
                </button>
            </Link>
            {loading && <p>Loading...</p>}
            {error && <p>Error</p>}
            {data && (
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                    <Image src={data.character.image} alt={data.character.name} width={200} height={200} className="mx-auto h-40 w-40 rounded-full object-cover"/>
                    <h1 className="text-2xl font-bold text-gray-800 mt-4">{data.character.name}</h1>
                    <p className="text-gray-600">Status: <span className="text-gray-800">{data.character.status}</span></p>
                    <p className="text-gray-600">Species: <span className="text-gray-800">{data.character.species}</span></p>
                    <p className="text-gray-600">Gender: <span className="text-gray-800">{data.character.gender}</span></p>
                    <div className="mt-4">
                        <input 
                            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                            type="text" 
                            value={location} 
                            onChange={(e) => setLocation(e.target.value)} 
                            placeholder="Assign location" 
                        />
                        <button 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-2"
                            onClick={() => locationHandle(location)}>
                            Assign Location
                        </button>
                        <p className="mt-2 text-green-500">{feedback}</p>
                    </div>
                </div>
            )}
        </main>
    );
}
