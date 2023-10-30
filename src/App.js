import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard";
import Navbar from "./Navbar";
import axios from "axios";

function App() {
  if (!localStorage.getItem("groupBy")) {
    localStorage.setItem("groupBy", JSON.stringify("status"));
  }
  if (!localStorage.getItem("sortBy")) {
    localStorage.setItem("sortBy", JSON.stringify("priority"));
  }

  useEffect(() => {
    if (localStorage.getItem("tickets")) {
      return;
    }
    axios
      .get(`https://api.quicksell.co/v1/internal/frontend-assignment`)
      .then((res) => {
        localStorage.setItem("tickets", JSON.stringify(res.data.tickets));
        localStorage.setItem("users", JSON.stringify(res.data.users));
        setTickets(res.data.tickets);
        setUsers(res.data.users);
      })
      .catch((err) => {
        alert("Something went wrong");
        if (axios.isCancel(err)) {
          console.log("req cancel");
        } else {
          console.log("req performed");
        }
      });
  }, []);

  const [groupBy, setGroupBy] = useState(
    JSON.parse(localStorage.getItem("groupBy"))
  );
  const [sortBy, setSortBy] = useState(
    JSON.parse(localStorage.getItem("sortBy"))
  );
  const [tickets, setTickets] = useState(
    !!localStorage.getItem("tickets")
      ? JSON.parse(localStorage.getItem("tickets"))
      : []
  );
  const [users, setUsers] = useState(
    !!localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : []
  );

  return (
    <main className="kanban">
      <Navbar
        groupBy={groupBy}
        setGroupBy={setGroupBy}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <Dashboard
        groupBy={groupBy}
        sortBy={sortBy}
        tickets={tickets}
        users={users}
      />
    </main>
  );
}

export default App;
