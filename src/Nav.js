// Inside your component file
import React from "react";
import logo from "./logoCF.png";
import { Link } from "react-router-dom";
import styles from "./ApiCall.module.css"; // Import your CSS file

const Nav = () => {
  return (
    <div>
      <p className={styles.heading}>
        <img src={logo} width={"10%"} alt="CodeForces Logo" />
        <h1 style={{ fontSize: "2.5vw" }}>ProCoder's Insight</h1>
      </p>
      <nav>
        <ul className={styles.navbar} style={{ fontSize: "1.4vw" }}>
          <li>
            <Link to="/">Contest Ranks Hub</Link>
          </li>
          <li>
            <Link to="/distinctProblems">
              Friend's Forte: Uncharted Code Territories
            </Link>
          </li>
          <li>
            <Link to="/problemSolved">CodeCrafted: Your Problem Victories</Link>
          </li>
          <li>
            <Link to="/help">Help</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
