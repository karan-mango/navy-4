import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FiEdit, FiTrash, FiEye, FiSearch } from "react-icons/fi";
import "./Home.css"

export default function Home() {
  const post = "http://localhost:3000";
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ all: 0, ship: 0, navcc: 0, with_us: 0 });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${post}/all_complaints`);
        const data = response.data;
        setData(data);
        setFilteredData(data);

        const allCount = data.length;
        const shipCount = data.filter((item) => item.unit === "ship").length;
        const navccCount = data.filter((item) => item.unit === "navcc").length;
        const withUsCount = data.filter((item) => item.delivery_status === "with_us").length;

        setCounts({ all: allCount, ship: shipCount, navcc: navccCount, with_us: withUsCount });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [post]);

  useEffect(() => {
    filterData();
  }, [searchQuery, activeTab, data]);

  const handleSort = (column) => {
    const sortedData = [...filteredData].sort((a, b) => {
      if (column === "name" || column === "unit" || column === "item") {
        return sortOrder === "asc"
          ? a[column].localeCompare(b[column])
          : b[column].localeCompare(a[column]);
      }
      return 0;
    });

    setFilteredData(sortedData);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortColumn(column);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value.toLowerCase().trim());
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${post}/delete_complaint/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleRowClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const filterData = () => {
    let filtered = data;

    if (searchQuery) {
      filtered = filtered.filter((item) => {
        const nameMatch = item.name && item.name.toLowerCase().includes(searchQuery);
        const userIdMatch = item.userId && item.userId.toLowerCase().includes(searchQuery);
        const defectMatch = item.defect && item.defect.toLowerCase().includes(searchQuery);
        const unitMatch = item.unit && item.unit.toLowerCase().includes(searchQuery);
        const itemMatch = item.item && item.item.toLowerCase().includes(searchQuery);

        return nameMatch || userIdMatch || defectMatch || unitMatch || itemMatch;
      });
    }

    if (activeTab === "ship") {
      filtered = filtered.filter((item) => item.unit === "ship");
    } else if (activeTab === "navcc") {
      filtered = filtered.filter((item) => item.unit === "navcc");
    } else if (activeTab === "with_us") {
      filtered = filtered.filter((item) => item.delivery_status === "with_us");
    }

    setFilteredData(filtered);
  };

  const filterDataByTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-0 home_cont   min-h-screen text-[#1A2130] mt-[60px]">
      <div className="banner flex  justify-center ">
      <h1 className=" text-5xl text-blue-950 font-bold  flex items-center"><span className="text-red-500">C</span>omplaint <span className="text-red-500 pl-4">R</span>egister

        <img src="../../public/complaint.svg" className="w-12 ml-5" alt="" />
      </h1>
      </div>
     
      <div className="flex text-lg  rounded-t-lg p-4 font-semibold  ">
        <button
          onClick={() => filterDataByTab("all")}
          className={`text-black mr-4 w-52 p-4 ${
            activeTab === "all"
              ? "border-b-[3px] text-xl border-blue-500 text-blue-700 font-semibold"
              : "border-b-2 border-transparent"
          }`}
        >
          All <span className="ml-2 pl-1 pr-1 text-sm font-semibold bg-gray-100">{counts.all}</span>
        </button>
        <button
          onClick={() => filterDataByTab("ship")}
          className={`bg-white text-black mr-4 w-52 p-4 ${
            activeTab === "ship"
              ? "border-b-[3px] text-xl border-blue-500 text-blue-700 font-semibold"
              : "border-b-2 border-transparent"
          }`}
        >
          Ship <span className="ml-2 pl-1 pr-1 text-sm font-semibold bg-gray-100">{counts.ship}</span>
        </button>
        <button
          onClick={() => filterDataByTab("navcc")}
          className={`bg-white text-black w-52 p-4 ${
            activeTab === "navcc"
              ? "border-b-[3px] text-xl border-blue-500 text-blue-700 font-semibold"
              : "border-b-2 border-transparent"
          }`}
        >
          Navcc <span className="ml-2 pl-1 pr-1 text-sm font-semibold bg-gray-100">{counts.navcc}</span>
        </button>
        <button
          onClick={() => filterDataByTab("with_us")}
          className={`bg-white text-xl text-black w-52 p-4 ${
            activeTab === "with_us"
              ? "border-b-[3px] border-blue-500 text-blue-700 font-semibold"
              : "border-b-2 border-transparent"
          }`}
        >
          With Us <span className="ml-2 pl-1 pr-1 text-sm font-semibold bg-gray-100">{counts.with_us}</span>
        </button>
      </div>

      <div className="table-cont bg-white rounded-lg mb-[50px] ">
        <div className="relative mb-4 flex justify-between">
          <div>
            <Button className="ml-8">
              <Link to="/form">New Complaint</Link>
            </Button>
          </div>
          <div>
            <FiSearch className="absolute right-[230px] top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search..."
              className="p-2 pl-10 mr-8 border border-gray-300 rounded-lg ml-8"
            />
          </div>
        </div>

        <table className="w-full bg-white rounded-lg text-black">
          <thead>
            <tr className="bg-[#f2ffff] text-[17px] h-14 text-black border-b-2 border-gray-400">
              <th className="p-4">S.No</th>
              <th className="p-4">
                <button onClick={() => handleSort("name")} className="underline">
                  Name {sortColumn === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </button>
              </th>
              <th>Unit</th>
              <th>Item</th>
              <th className="p-4">Working Status</th>
              <th className="p-4">Delivery Status</th>
              <th className="p-4">Defect</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr
                key={item._id}
                className="border-b border-gray-300 cursor-pointer"
                onDoubleClick={() => handleRowClick(item._id)}
              >
                <td className="p-4 pl-12">{index + 1}</td>
                <td className="p-4 font-bold">{item.name}</td>
                <td className="p-4">{item.unit}</td>
                <td className="p-4">{item.item}</td>
                <td className="p-4">{item.status}</td>
                <td className="p-4">
                  <span className={`p-2 rounded ${item.delivery_status === 'with_us' ? 'bg-red-400' : 'bg-green-400'} text-white`}>
                    {item.delivery_status}
                  </span>
                </td>
                <td className="p-4">{item.defect}</td>
                <td className="p-4">
                  <button
                    className="text-gray-500 hover:text-blue-500 mx-2"
                    onClick={() => handleEdit(item._id)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="text-gray-500 hover:text-red-500 mx-2"
                    onClick={() => handleDelete(item._id)}
                  >
                    <FiTrash />
                  </button>
                  <button
                    className="text-gray-500 hover:text-blue-500 mx-2"
                    onClick={() => handleRowClick(item._id)}
                  >
                    <FiEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
