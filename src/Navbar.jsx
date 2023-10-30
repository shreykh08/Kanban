import { useState } from "react";
import "./Navbar.css";
import { IoMdOptions } from "react-icons/io";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

export default function Navbar({ groupBy, setGroupBy, sortBy, setSortBy }) {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const allGroupBy = ["status", "user", "priority"];
  const allSortBy = ["none", "priority", "title"];

  return (
    <nav className="navbar">
      <button
        onClick={() => setToggleDropdown((prev) => !prev)}
        className="options main-shadow main-border"
      >
        <IoMdOptions /> Display <MdOutlineKeyboardArrowDown />
      </button>
      {toggleDropdown && (
        <div className="dropdown main-border main-shadow">
          <div className="row">
            <span>Grouping</span>
            <select
              value={groupBy}
              onChange={(e) => {
                localStorage.setItem("groupBy", JSON.stringify(e.target.value));
                setGroupBy(e.target.value);
              }}
              name="groupBy"
              id="groupId"
            >
              {
                // map over allGroupBy array and create options
                allGroupBy.map((groupBy) => {
                  return (
                    <option key={groupBy} value={groupBy}>
                      {groupBy}
                    </option>
                  );
                })
              }
            </select>
          </div>
          <div className="row">
            <span>Ordering</span>
            <select
              value={sortBy}
              onChange={(e) => {
                localStorage.setItem("sortBy", JSON.stringify(e.target.value));
                setSortBy(e.target.value);
              }}
              name="sortby"
              id="sortby"
            >
              {
                // map over allSortBy array and create options
                //check if sortBy is priority then dont show option for priority
                allSortBy.map((sortBy) => {
                  if (groupBy === "priority" && sortBy === "priority")
                    return null;
                  return (
                    <option key={sortBy} value={sortBy}>
                      {sortBy}
                    </option>
                  );
                })
              }
            </select>
          </div>
        </div>
      )}
    </nav>
  );
}
