// Inside your component file
import React from "react";
import logo from "./logoCF.png";
import { Link } from "react-router-dom";
import styles from "./ApiCall.module.css"; // Import your CSS file

const Nav = () => {
  return (
    <div>
      <p className={styles.heading}>
        <img src={logo} width={"8%"} alt="CodeForces Logo" />
        <h1>ProCoder's Insight</h1>
      </p>
      <nav>
        <ul className={styles.navbar}>
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
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
