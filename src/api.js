import React, { useState } from "react";
import logo from "./logoCF.png";
import { Link } from "react-router-dom";
import styles from "./ApiCall.module.css";

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
  async function calling() {
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
    } else {
      setContest(data.result.sort((a, b) => a.rank - b.rank));
      setFirstName(data1.result[0].firstName);
      setRating(data1.result[0].rating);
      setMaxRating(data1.result[0].maxRating);
      console.log(valid);
      setValid(true);
    }
  }

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontWeight: "bold",
            fontSize: "1.2rem",
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
              fontSize: "16px",
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
          onClick={calling}
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
