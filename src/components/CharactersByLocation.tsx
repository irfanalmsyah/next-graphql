import { useState } from "react"
import CharacterCard from "./CharacterCard"
import { gql, useQuery } from "@apollo/client";
import CharacterCardLocation from "./CharacterCardLocation";

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

const CharactersByLocation = ({ locationMap }: { locationMap: Record<string, string[]> }) => {
  const { data, loading, error } = useQuery(GET_CHARACTERS);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null)
  const [characters, setCharacters] = useState<string[]>([])

  const handleLocationClick = (location: string) => {
      setSelectedLocation(location)
      setCharacters(locationMap[location])
  }

  return (
      <div className="grid grid-cols-3 gap-5 w-full">
          {/* <div className="w-1/2">
              {Object.keys(locationMap).map((key) => (
                  <button
                      key={key}
                      className="block w-full p-4 text-left text-white bg-blue-500 hover:bg-blue-700 focus:outline-none"
                      onClick={() => handleLocationClick(key)}
                  >
                      {key}
                  </button>
              ))}
          </div>
          <div className="w-2/3 overflow-auto">
              {selectedLocation && locationMap[selectedLocation]?.map((characterId) => (
                  <div key={characterId} className="flex items-center p-2 border-b">
                      <span className="ml-2">{characterId}</span>
                  </div>
              ))}
          </div> */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-center">Locations</h2>
            {Object.keys(locationMap).map((key) => (
                    <button
                        key={key}
                        className="block w-full p-2 text-left text-white bg-blue-500 hover:bg-blue-700 focus:outline-none m-2 text-center rounded"
                        onClick={() => handleLocationClick(key)}
                    >
                        {key}
                    </button>
              ))}
          </div>
          <div className="col-span-2">
            <h2 className="text-2xl font-bold text-center">Characters</h2>
            <div className="grid ">
              {characters.map((characterId) => (
                  <CharacterCardLocation key={characterId} id={characterId} name={data.characters.results.find((character: { id: string }) => character.id === characterId)?.name} image={data.characters.results.find((character: { id: string }) => character.id === characterId)?.image} />
              ))}
            </div>
          </div>
      </div>
  )
}

export default CharactersByLocation