fs = require("fs");
const https = require("https");
process = require("process");
require("dotenv").config();

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const USE_GITHUB_DATA = process.env.USE_GITHUB_DATA;
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME;

const ERR = {
  noUserName:
    "Github Username was found to be undefined. Please set all relevant environment variables.",
  requestFailed:
    "The request to GitHub didn't succeed. Check if GitHub token in your .env file is correct.",
  requestFailedMedium:
    "The request to Medium didn't succeed. Check if Medium username in your .env file is correct."
};

// Create public directory if it doesn't exist
try {
  if (!fs.existsSync('./public')) {
    fs.mkdirSync('./public');
    console.log("Created public directory");
  }
} catch (err) {
  console.error("Error checking/creating public directory:", err);
}

if (USE_GITHUB_DATA === "true") {
  try {
    if (GITHUB_USERNAME === undefined) {
      throw new Error(ERR.noUserName);
    }

    console.log(`Fetching profile data for ${GITHUB_USERNAME}`);
    var data = JSON.stringify({
      query: `
    {
      user(login:"${GITHUB_USERNAME}") { 
        name
        bio
        avatarUrl
        location
        pinnedItems(first: 6, types: [REPOSITORY]) {
          totalCount
          edges {
              node {
                ... on Repository {
                  name
                  description
                  forkCount
                  stargazers {
                    totalCount
                  }
                  url
                  id
                  diskUsage
                  primaryLanguage {
                    name
                    color
                  }
                }
              }
            }
          }
        }
    }
    `
    });
    const default_options = {
      hostname: "api.github.com",
      path: "/graphql",
      port: 443,
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "User-Agent": "Node"
      }
    };

    const req = https.request(default_options, res => {
      let data = "";

      console.log(`statusCode: ${res.statusCode}`);
      if (res.statusCode !== 200) {
        console.error(ERR.requestFailed);
        // Don't throw here - let's complete with a warning
        console.warn("Continuing without GitHub data.");
        return;
      }

      res.on("data", d => {
        data += d;
      });
      res.on("end", () => {
        fs.writeFile("./public/profile.json", data, function (err) {
          if (err) return console.log(err);
          console.log("saved file to public/profile.json");
        });
      });
    });

    req.on("error", error => {
      console.error("Error with GitHub request:", error.message);
      console.warn("Continuing without GitHub data.");
    });

    req.write(data);
    req.end();
  } catch (error) {
    console.error("Error fetching GitHub data:", error.message);
    console.warn("Continuing without GitHub data.");
  }
}

if (MEDIUM_USERNAME !== undefined) {
  try {
    console.log(`Fetching Medium blogs data for ${MEDIUM_USERNAME}`);
    const options = {
      hostname: "api.rss2json.com",
      path: `/v1/api.json?rss_url=https://medium.com/feed/@${MEDIUM_USERNAME}`,
      port: 443,
      method: "GET"
    };

    const req = https.request(options, res => {
      let mediumData = "";

      console.log(`Medium API statusCode: ${res.statusCode}`);
      if (res.statusCode !== 200) {
        console.error(ERR.requestFailedMedium);
        console.warn("Continuing without Medium data.");
        return;
      }

      res.on("data", d => {
        mediumData += d;
      });
      res.on("end", () => {
        fs.writeFile("./public/blogs.json", mediumData, function (err) {
          if (err) return console.log(err);
          console.log("saved file to public/blogs.json");
        });
      });
    });

    req.on("error", error => {
      console.error("Error with Medium request:", error.message);
      console.warn("Continuing without Medium data.");
    });

    req.end();
  } catch (error) {
    console.error("Error fetching Medium data:", error.message);
    console.warn("Continuing without Medium data.");
  }
}
