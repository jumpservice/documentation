// src/components/GitHubStars.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const GitHubStars = ({ owner, repo }) => {
  const [stars, setStars] = useState(24000);

  useEffect(() => {
    const fetchStars = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repo}`,
        );
        setStars(response.data.stargazers_count);
      } catch (err) {
        console.error(err);
        setStars(24000); // Return the default value on error
      }
    };

    fetchStars();
  }, [owner, repo]);

  return <div>{(stars / 1000).toFixed(1) + "k+"}</div>;
};

export default GitHubStars;
