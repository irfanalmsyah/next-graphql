import { gql, useQuery } from "@apollo/client";
import Image from "next/image";
import { Inter } from "next/font/google";
import CharacterCard from "@/components/CharacterCard";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

const GET_CHARACTERS = gql`
    query GetCharacters {
        characters {
        results {
            id
            name
            image
        }
        }
    }
`;

export default function Home() {
    const { data, loading, error } = useQuery(GET_CHARACTERS);

    return (
        <main
        className={`flex min-h-screen flex-col items-center justify-between pt-10 ${inter.className}`}
        >
            <h1 className="text-4xl font-bold text-center">Rick and Morty Characters</h1>
            <Link href="/location">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2">
                    Locations
                </button>
            </Link>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-8 min-h-screen justify-items-center">
                {loading && <p>Loading...</p>}
                {error && <p>Error</p>}
                {data &&
                    data.characters.results.map(({ id, name, image }: { id: string, name: string, image: string }) => (
                        <CharacterCard key={id} id={id} name={name} image={image} />
                    ))
                }
            </div>
        </main>
    );
}
