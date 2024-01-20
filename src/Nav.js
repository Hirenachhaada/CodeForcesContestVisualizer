import React from "react";
import logo from "./logoCF.png";
import { Link, useLocation } from "react-router-dom";
import styles from "./ApiCall.module.css";

const Nav = () => {
  const location = useLocation();

  return (
    <div>
      <p className={styles.heading}>
        <img src={logo} width={"10%"} alt="CodeForces Logo" />
        <h1 style={{ fontSize: "2.5vw" }}>ProCoder's Insight</h1>
      </p>
      <nav>
        <ul className={styles.navbar} style={{ fontSize: "1.4vw" }}>
          <li
            className={
              location.pathname === "/"
                ? `${styles.active} ${styles.underline}`
                : ""
            }
          >
            <Link to="/">Contest Ranks Hub</Link>
          </li>
          <li
            className={
              location.pathname === "/distinctProblems"
                ? `${styles.active} ${styles.underline}`
                : ""
            }
          >
            <Link to="/distinctProblems">
              Friend's Forte: Uncharted Code Territories
            </Link>
          </li>
          <li
            className={
              location.pathname === "/problemSolved"
                ? `${styles.active} ${styles.underline}`
                : ""
            }
          >
            <Link to="/problemSolved">CodeCrafted: Your Problem Victories</Link>
          </li>
          <li
            className={
              location.pathname === "/help"
                ? `${styles.active} ${styles.underline}`
                : ""
            }
          >
            <Link to="/help">Help</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
