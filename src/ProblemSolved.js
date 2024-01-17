import React, { useState } from "react";
import logo from "./logoCF.png";
import { Link } from "react-router-dom";
import styles from "./ApiCall.module.css";

const ProblemSolved = () => {
  const [user, setUser] = useState("");
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [counter, setCounter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [buttonStyle, setButtonStyle] = useState({
    padding: "10px 20px",
    fontSize: "1.2vw",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  });

  const buttonHoverStyle = {
    backgroundColor: "#45a049",
  };
  const fetchSolvedProblems = async () => {
    if (user.trim() === "") {
      alert("Please enter a valid User Handle");
      return;
    }

    try {
      const response = await fetch(
        `https://codeforces.com/api/user.status?handle=${user}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      if (data.status === "OK") {
        const problems = data.result
          .filter((submission) => submission.verdict === "OK")
          .map((submission) => ({
            contestId: submission.problem.contestId,
            index: submission.problem.index,
            rating: submission.problem.rating,
            name: submission.problem.name,
            submissionTime: submission.creationTimeSeconds,
          }));
        setCounter(problems.length);
        setSolvedProblems(problems);
      } else {
        throw new Error("Failed to get user status");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  const sortTable = (option) => {
    const sortedProblems = [...solvedProblems];

    if (option === sortOption) {
      // Toggle sort order if clicking on the same option
      sortedProblems.reverse();
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Sort in ascending order by default
      sortedProblems.sort((a, b) => a[option] - b[option]);
      setSortOrder("asc");
    }

    setSortOption(option);
    setSolvedProblems(sortedProblems);
  };

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = solvedProblems.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const [loading, setLoading] = useState(false);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(solvedProblems.length / entriesPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            fontSize: "20px",
          }}
        >
          User Handle
          <input
            type="text"
            name="user"
            onChange={(ev) => setUser(ev.target.value)}
            required
            style={{
              padding: "8px",
              width: "20%",
              boxSizing: "border-box",
              border: "1px solid #ddd",
              borderRadius: "4px",
              fontSize: "1.2vw",
              marginLeft: "10px",
            }}
          />
        </label>
      </div>
      <div style={{ display: "flex" }}>
        <button
          style={buttonStyle}
          onMouseOver={() => {
            // Apply hover styles on mouse over
            setButtonStyle((prevStyle) => ({
              ...prevStyle,
              ...buttonHoverStyle,
            }));
          }}
          onMouseOut={() => {
            // Reset styles on mouse out
            setButtonStyle((prevStyle) => ({
              ...prevStyle,
              backgroundColor: "#4CAF50",
            }));
          }}
          type="submit"
          onClick={fetchSolvedProblems}
        >
          Show Results
        </button>
        {loading ? (
          <p
            style={{
              marginLeft: "20px",
              fontSize: "1.1vw",
            }}
          >
            Loading ...
          </p>
        ) : null}
      </div>
      <div>
        <h2 style={{ fontSize: "1.5vw" }}>Solved Problems:{counter} </h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th onClick={() => sortTable("contestId")}>Contest ID</th>
              <th onClick={() => sortTable("index")}>Index</th>
              <th onClick={() => sortTable("rating")}>Rating</th>
              <th onClick={() => sortTable("submissionTime")}>
                Submission Time
              </th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {solvedProblems.map((problem, index) => (
              <tr key={index}>
                <td>{problem.contestId}</td>
                <td>{problem.index}</td>
                <td>{problem.rating}</td>
                <td>
                  {new Date(problem.submissionTime * 1000).toLocaleString()}
                </td>

                <td>
                  <a
                    href={`https://codeforces.com/contest/${problem.contestId}/problem/${problem.index}`}
                    style={{ textDecoration: "none", color: "blue" }}
                    target="_blank"
                  >
                    {problem.name}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProblemSolved;
