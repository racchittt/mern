import React, { useEffect, useState } from "react";

const Table = () => {
  const [data, setData] = useState([]);
  const [totalFuel, setTotalFuel] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(7)
  useEffect(() => {
    const fetchdata = async () => {
      const res = await fetch("http://localhost:3000/api/fuel/calculate");
      const fuelData = await res.json();
      console.log("Refuel Data: ", fuelData);

      const formattedData = fuelData.fuelEvents.map((entry, index) => ({
        id: index,
        start_time: new Date(entry.start_time)
          .toLocaleTimeString()
          .toLowerCase(),
        end_time: new Date(entry.end_time).toLocaleTimeString().toLowerCase(),
        fuelAdded: entry.fuelAdded,
        latitude: entry.location.latitude,
        longitude: entry.location.longitude,
      }));

      setData(formattedData);
      setTotalFuel(fuelData.totalFuelConsumed);
    };
    fetchdata();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Total Fuel Consumed: {totalFuel.toFixed(3)} Liters</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="text-left px-4 py-2 border-b">Start Time</th>
              <th className="text-left px-4 py-2 border-b">End Time</th>
              <th className="text-left px-4 py-2 border-b">Fuel Filled (L)</th>
              <th className="text-left px-4 py-2 border-b">Location</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{item.start_time}</td>
                <td className="px-4 py-2 border-b">{item.end_time}</td>
                <td className="px-4 py-2 border-b">{item.fuelAdded.toFixed(3)}</td>
                <td className="px-4 py-2 border-b">
                  {item.latitude}, {item.longitude}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <nav>
          <ul className="flex space-x-1">
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-3 py-1 rounded-md ${currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                    }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Table;