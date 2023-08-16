import React, { useState } from "react";
import logo from "./logoCF.png";
export default function ApiCall() {
  console.log("call");
  const [firstName, setFirstName] = useState("");
  const [rating, setRating] = useState("");
  const [maxRating, setMaxRating] = useState("");
  const [valid, setValid] = useState(false);
  const [user, setUser] = useState("");
  const [contest, setContest] = useState([]);
  let counter = 0;
  async function calling() {
    counter = 0;
    if (user === "") {
      alert("Please Enter User Handel");
      return;
    }
    // const response = await fetch(
    //   " https://codeforces.com/api/user.rating?handle=" + user
    // )
    //   .then((res) => {
    //     if (res.status == 400) {
    //       alert("Please Enter Valid User Handel");
    //     }
    //     return res.json();
    //   })
    //   .then((data) => {
    //     console.log(data);
    //     setContest(data.result.sort((a, b) => a.rank - b.rank));
    //   });
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
      <p className="heading">
        <img src={logo} />
        <h1>CodeForces Contest Visulaizer</h1>
      </p>
      <p>
        <span
          style={{
            marginRight: "10px",
            fontWeight: "bold",
          }}
        >
          UserHandel
        </span>
        <input
          type="text"
          onChange={(ev) => setUser(ev.target.value)}
          required
        ></input>
      </p>
      <button type="submit" onClick={calling}>
        Show Results
      </button>
      <div
        className="rating"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <p style={{ textAlign: "center", margin: "5px", marginBottom: "20px" }}>
          <span style={{ fontWeight: "bold" }}>Current Rating: </span>
          {rating}
        </p>
        <p style={{ textAlign: "center", margin: "5px", marginBottom: "20px" }}>
          <span style={{ fontWeight: "bold" }}>Max Rating: </span>
          {maxRating}
        </p>
      </div>
      <table>
        <thead>
          <td style={{ fontWeight: "bold" }}>No.</td>
          <td style={{ fontWeight: "bold" }}>Contest</td>
          <td style={{ fontWeight: "bold" }}>Rank</td>
          <td style={{ fontWeight: "bold" }}>Date</td>
        </thead>
        {contest.map((item) => {
          let date = item.ratingUpdateTimeSeconds;
          date = new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }).format(date * 1000);
          return (
            <tr>
              <td>{++counter}</td>
              <a
                href={`https://codeforces.com/contest/${item.contestId}`}
                style={{ textDecoration: "none", color: "black" }}
                target="_blank"
              >
                <td>{item.contestName}</td>
              </a>
              <td>{item.rank}</td>
              <td>{date}</td>
            </tr>
          );
        })}
      </table>
    </>
  );
}
