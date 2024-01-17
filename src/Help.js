// HelpPage.js
import React from "react";

const HelpPage = () => {
  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  };

  const headingStyle = {
    color: "#333",
  };

  const linkStyle = {
    color: "#007BFF",
    textDecoration: "none",
  };

  const featureStyle = {
    marginTop: "20px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Welcome to the ProCoder's Insight</h1>
      <p>
        This web application provides you with insightful features to analyze
        your CodeForces contest standings, view problems solved by you, and
        track problems solved by your friend that are yet to be solved by you.
      </p>

      <div style={featureStyle}>
        <h2 style={headingStyle}>Features</h2>

        <div>
          <h3 style={headingStyle}>Contest Rank Hub:</h3>
          <ul>
            <li>
              View your CodeForces contest standings and analyze your
              performance.
            </li>
            <li>
              The contest are sorted based on your performance in the contest.
            </li>
          </ul>
        </div>

        <div>
          <h3 style={headingStyle}>
            Friend's Forte: Uncharted Code Territories:
          </h3>
          <ul>
            <li>
              Track problems solved by your friend on CodeForces and identify
              unsolved challenges for personal improvement.
            </li>
            <li>
              Here you can see the problems solved by your friend that are yet
              to be solved by you.
            </li>
            <li>
              Here it has option of two handles for main user as many time you
              have some problem solved on your diffrent account and you want to
              solve the only the distinct one from your friend.
            </li>
            <li>
              Though this is not a good practice to have more than one account
            </li>
          </ul>
        </div>

        <div>
          <h3 style={headingStyle}>CodeCrafted: Your Problem Victories</h3>
          <ul>
            <li>
              Explore a list of problems solved by you in various CodeForces
              contests.
            </li>
            <li>
              Flex in front of your friends by shoeing the list of problems
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
