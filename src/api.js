import React, { useState } from "react";
import logo from "./logoCF.png";
import { Link } from "react-router-dom";
import styles from "./ApiCall.module.css";
import { Spinner, Button } from "@chakra-ui/react";

export default function ApiCall() {
  console.log("call");
  const [firstName, setFirstName] = useState("");
  const [rating, setRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [valid, setValid] = useState(false);
  const [user, setUser] = useState("");
  const [contest, setContest] = useState([]);
  const [loading, setLoading] = useState(false);
  let counter = 0;
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
  async function calling() {
    setLoading(true);
    counter = 0;
    if (user === "") {
      alert("Please Enter User Handel");
      return;
    }
    const response = await fetch(
      " https://codeforces.com/api/user.rating?handle=" + user
    );
    const response1 = await fetch(
      "https://codeforces.com/api/user.info?handles=" + user
    );
    const data1 = await response1.json();
    console.log(data1);
    const data = await response.json();
    console.log(data);
    if (data.status == "FAILED") {
      alert("Please Enter Valid User Handel");
      setContest([]);
      setUser("");
      setValid(false);
      setLoading(false);
    } else {
      setContest(data.result.sort((a, b) => a.rank - b.rank));
      setFirstName(data1.result[0].firstName);
      setRating(data1.result[0].rating);
      setMaxRating(data1.result[0].maxRating);
      console.log(valid);
      setValid(true);
      setLoading(false);
    }
  }

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "1rem",
            fontWeight: "bold",
            fontSize: "1.5vw",
            size: "sm",
            marginTop: "1rem",
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
          onClick={calling}
          fontSize={{ base: "xs", md: "md", lg: "lg" }}
          px={{ base: 2, md: 6, lg: 8 }} // Adjust horizontal padding for different screen sizes
          py={2} // Adjust vertical padding for different screen sizes
        >
          {loading ? (
            <Spinner alignSelf="center" margin="auto" size="md" />
          ) : (
            <p>Show Results</p>
          )}
        </Button>
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
      {/* ... your existing code ... */}
      <div className={styles.rating}>
        <p>
          <span style={{ fontWeight: "bold" }}>Current Rating: </span>
          {rating}
        </p>
        <p>
          <span style={{ fontWeight: "bold" }}>Max Rating: </span>
          {maxRating}
        </p>
      </div>
      {/* ... your existing code ... */}
      <table>
        <thead>
          <tr>
            <td>No.</td>
            <td>Contest</td>
            <td>Rank</td>
            <td>Date</td>
          </tr>
        </thead>
        <tbody>
          {contest.map((item) => {
            let date = item.ratingUpdateTimeSeconds;
            date = new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }).format(date * 1000);
            return (
              <tr key={item.contestId}>
                <td>{++counter}</td>
                <td>
                  <a
                    href={`https://codeforces.com/contest/${item.contestId}`}
                    style={{ textDecoration: "none", color: "black" }}
                    target="_blank"
                  >
                    {item.contestName}
                  </a>
                </td>
                <td>{item.rank}</td>
                <td>{date}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
