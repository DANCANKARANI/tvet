"use client";
import { FC, useState, useEffect } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

interface Sponsor {
  id: string;
  name: string;
  description: string;
  application_link: string;
}

const SponsorList: FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/api/v1/sponsor"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch sponsors");
        }
        const data = await response.json();
        setSponsors(data.data);
      } catch (error) {
        setErrorMessage("" + error);
      }
    };

    fetchSponsors();
  }, []);

  const handleEdit = (id: string) => {
    console.log(`Edit sponsor with id: ${id}`);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + `/api/v1/sponsor/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete sponsor");
      }
    } catch (error) {
      setErrorMessage("error:" + error);
    }
    console.log(`Delete sponsor with id: ${id}`);
  };

  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-6 border border-gray-300">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Existing Sponsors</h2>
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
      {sponsors.length > 0 ? (
        <ul className="space-y-4">
          {sponsors.map((sponsor) => (
            <li
              key={sponsor.id}
              className="bg-white p-5 rounded-lg shadow-sm flex justify-between items-center border border-gray-200"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{sponsor.name}</h3>
                <p className="text-gray-600">{sponsor.description}</p>
              </div>
              <div className="flex space-x-3 items-center">
                {/* Apply Button */}
                <Link href={sponsor.application_link} target="_blank">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                    Apply
                  </button>
                </Link>

                {/* Edit Button */}
                <button
                  onClick={() => handleEdit(sponsor.id)}
                  className="text-yellow-600 hover:text-yellow-800 transition"
                >
                  <PencilIcon className="h-5 w-5" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(sponsor.id)}
                  className="text-red-600 hover:text-red-800 transition"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-700">No sponsors available.</p>
      )}
    </div>
  );
};

export default SponsorList;
