// HelpPage.js
import React from "react";
import { Heading } from "@chakra-ui/react";
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
      <Heading as="h2" size="lg" style={headingStyle}>
        Welcome to the ProCoder's Insight
      </Heading>
      <p>
        This web application provides you with insightful features to analyze
        your CodeForces contest standings, view problems solved by you, and
        track problems solved by your friend that are yet to be solved by you.
      </p>

      <div style={featureStyle}>
        <Heading as="h4" size="lg" style={{ margin: "2rem 0px 0px 0px" }}>
          Features
        </Heading>
        <br />
        <div>
          <Heading as="h2" size="md" style={{ margin: "2px 0px 0px 0px" }}>
            Contest Rank Hub:
          </Heading>
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
          <Heading as="h2" size="md" style={{ margin: "2rem 0px 0px 0px" }}>
            Friend's Forte: Uncharted Code Territories:
          </Heading>
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
              You can sort the problems based on rating, submission time and
              more by clicking on heading of any of them.
            </li>
            <li>
              Order of sorting them can be alter by clicking multiple time on
              heading
            </li>
          </ul>
        </div>

        <div>
          <Heading as="h2" size="md" style={{ margin: "2rem 0px 0px 0px" }}>
            CodeCrafted: Your Problem Victories
          </Heading>
          <ul>
            <li>
              Explore a list of problems solved by you in various CodeForces
              contests.
            </li>
            <li>
              Flex in front of your friends by shoeing the list of problems
            </li>
            <li>
              You can sort the problems based on rating, submission time and
              more by clicking on heading of any of them.
            </li>
            <li>
              Order of sorting them can be alter by clicking multiple time on
              heading
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;
