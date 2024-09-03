import CharactersByLocation from "@/components/CharactersByLocation";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [locationMap, setLocationMap] = useState<Record<string, string[]>>({})

    useEffect(() => {
        const storedLocationMap = localStorage.getItem('locationMap');
        if (storedLocationMap) {
            const locationMap = JSON.parse(storedLocationMap);
            setLocationMap(locationMap);
        }
    }, []);

    return (
        
        <main
        className={`flex min-h-screen flex-col items-center pt-10 ${inter.className}`}
        >
            <Link href="/">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2">
                    Back
                </button>
            </Link>
            <CharactersByLocation locationMap={locationMap} />
        </main>
    );
}
