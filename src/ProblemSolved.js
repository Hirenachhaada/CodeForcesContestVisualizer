import React, { useState } from "react";
import logo from "./logoCF.png";
import { Link } from "react-router-dom";
import styles from "./ApiCall.module.css";
import { Spinner, Button } from "@chakra-ui/react";

const ProblemSolved = () => {
  const [user, setUser] = useState("");
  const [solvedProblems, setSolvedProblems] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [counter, setCounter] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [buttonStyle, setButtonStyle] = useState({
    padding: "1vw 1.5vw",
    fontSize: "1.25vw",
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
    setLoading(true);
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
        setLoading(false);
      } else {
        setLoading(false);
        throw new Error("Failed to get user status");
      }
    } catch (error) {
      setLoading(false);
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
            marginBottom: "1rem",
            marginTop: "1rem",
            fontWeight: "bold",
            fontSize: "1.5vw",
          }}
        >
          User Handle
          <input
            type="text"
            name="user"
            onChange={(ev) => setUser(ev.target.value)}
            required
            style={{
              padding: "0.5vw",
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
        <Button
          size="md"
          colorScheme="whatsapp"
          type="submit"
          onClick={fetchSolvedProblems}
          fontSize={{ base: "sm", md: "md", lg: "lg" }}
        >
          {loading ? (
            <Spinner alignSelf="center" margin="auto" size="xl" w={20} h={20} />
          ) : (
            <p>Show Results</p>
          )}
        </Button>
      </div>
      <div>
        <h2
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            fontSize: "1.5vw",
          }}
        >
          Solved Problems:{counter}{" "}
        </h2>
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
