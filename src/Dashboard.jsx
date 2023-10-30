import "./Dashboard.css";
import Card from "./Card";
import {
  AiFillCheckCircle,
  AiFillCloseCircle,
  AiOutlineLine,
} from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { FaCircleHalfStroke } from "react-icons/fa6";
import { BsCircle, BsPauseCircle } from "react-icons/bs";
import {
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineKeyboardArrowDown,
} from "react-icons/md";
import { LuAlertTriangle } from "react-icons/lu";

export default function Dashboard({ groupBy, sortBy }) {
  const tickets = !!localStorage.getItem("tickets")
    ? JSON.parse(localStorage.getItem("tickets"))
    : [];
  const users = !!localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [];

  const allStatus = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];

  const allPriority = [
    {
      name: "Urgent",
      value: 4,
    },
    {
      name: "High",
      value: 3,
    },
    {
      name: "Medium",
      value: 2,
    },
    {
      name: "Low",
      value: 1,
    },
    {
      name: "No priority",
      value: 0,
    },
  ];

  const photos = [
    // 5 random image background colors for initials
    "#ee6633",
    "#FFB399",
    "#ff9eee",
    "#FFFF99",
    "#00f1E6",
  ];

  return (
    <section className="dashboard">
      {groupBy === "status" &&
        allStatus.map((status) => {
          return (
            <div key={status} className="column">
              <div className="header">
                <div className="left">
                  <div className="icon">
                    {status === "Backlog" && <BsPauseCircle />}
                    {status === "Todo" && (
                      <BsCircle style={{ color: "#c4c4c4" }} />
                    )}
                    {status === "In progress" && (
                      <FaCircleHalfStroke style={{ color: "#f1c94b" }} />
                    )}
                    {status === "Done" && (
                      <AiFillCheckCircle style={{ color: "#5e6ad2" }} />
                    )}
                    {status === "Cancelled" && (
                      <AiFillCloseCircle style={{ color: "#94a2b3" }} />
                    )}
                  </div>
                  <span className="heading">{status}</span>
                  <span className="count">
                    {
                      tickets.filter((ticket) => ticket.status === status)
                        .length
                    }
                  </span>
                </div>
                <div className="right">
                  <div className="add">
                    <IoMdAdd />
                  </div>
                  <div className="more">
                    <SlOptions />
                  </div>
                </div>
              </div>
              <div className="list">
                {tickets
                  .filter((ticket) => ticket.status === status)
                  // if sortBy === priority then sort by priority else if sortBy === title then sort by title else return tickets
                  .sort((a, b) =>
                    sortBy === "priority"
                      ? b.priority - a.priority
                      : sortBy === "title"
                      ? a.title.localeCompare(b.title)
                      : tickets
                  )
                  .map((ticket) => {
                    return (
                      <Card key={ticket.id} ticket={ticket} groupBy={groupBy} />
                    );
                  })}
              </div>
            </div>
          );
        })}
      {groupBy === "priority" &&
        allPriority.map((priority) => {
          return (
            <div key={priority.value} className="column">
              <div className="header">
                <div className="left">
                  <div className="icon">
                    {priority.value === 4 && (
                      <LuAlertTriangle style={{ color: "red" }} />
                    )}
                    {priority.value === 3 && (
                      <MdKeyboardDoubleArrowUp style={{ color: "orange" }} />
                    )}
                    {priority.value === 2 && (
                      <MdKeyboardArrowUp style={{ color: "orange" }} />
                    )}
                    {priority.value === 1 && (
                      <AiOutlineLine style={{ color: "#5e6ad2" }} />
                    )}
                    {priority.value === 0 && (
                      <MdOutlineKeyboardArrowDown
                        style={{ color: "#5e6ad2" }}
                      />
                    )}
                  </div>
                  <span className="heading">{priority.name}</span>
                  <span className="count">
                    {
                      tickets.filter(
                        (ticket) => ticket.priority === priority.value
                      ).length
                    }
                  </span>
                </div>
                <div className="right">
                  <div className="add">
                    <IoMdAdd />
                  </div>
                  <div className="more">
                    <SlOptions />
                  </div>
                </div>
              </div>
              <div className="list">
                {tickets
                  .filter((ticket) => ticket.priority === priority.value)
                  .sort((a, b) =>
                    sortBy === "priority"
                      ? b.priority - a.priority
                      : sortBy === "title"
                      ? a.title.localeCompare(b.title)
                      : tickets
                  )
                  .map((ticket) => {
                    return (
                      <Card key={ticket.id} ticket={ticket} groupBy={groupBy} />
                    );
                  })}
              </div>
            </div>
          );
        })}
      {groupBy === "user" &&
        users.map((user) => {
          return (
            <div key={user.id} className="column">
              <div className="header">
                <div className="left">
                  <div className="icon">
                    <div
                      style={{
                        backgroundColor: `${
                          photos[user?.id?.split("-")[1] - 1]
                        }`,
                      }}
                      className="photo"
                    >
                      {`${user?.name?.split(" ")[0][0]}${
                        user?.name?.split(" ").length > 1
                          ? user?.name?.split(" ")[1][0]
                          : ""
                      } `}
                      <div
                        style={{
                          // check in users array if user is available or not
                          backgroundColor: `${
                            user?.available ? `#00ff00` : `white`
                          }`,
                        }}
                        className="status"
                      ></div>
                    </div>
                  </div>
                  <span className="heading">{user.name}</span>
                  <span className="count">
                    {
                      tickets.filter((ticket) => ticket.userId === user.id)
                        .length
                    }
                  </span>
                </div>
                <div className="right">
                  <div className="add">
                    <IoMdAdd />
                  </div>
                  <div className="more">
                    <SlOptions />
                  </div>
                </div>
              </div>
              <div className="list">
                {tickets
                  .filter((ticket) => ticket.userId === user.id)
                  .sort((a, b) =>
                    sortBy === "priority"
                      ? b.priority - a.priority
                      : sortBy === "title"
                      ? a.title.localeCompare(b.title)
                      : tickets
                  )
                  .map((ticket) => {
                    return (
                      <Card key={ticket.id} ticket={ticket} groupBy={groupBy} />
                    );
                  })}
              </div>
            </div>
          );
        })}
    </section>
  );
}
