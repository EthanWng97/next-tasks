const glob = require("glob");
const path = require("path");
const axios = require("axios");

const HOST = "https://next-scripts.vercel.app";
function getApiRoutes() {
  const apiRoutes = glob
    .sync("**/*.ts", { cwd: path.join(__dirname, "pages/api") })
    .map((file) => {
      const ext = path.extname(file);
      const route = "/api/" + file.replace(new RegExp(`${ext}$`), "");
      return route;
    });
  return apiRoutes;
}

async function runTasks() {
  try {
    const apis = getApiRoutes();

    for (const api of apis) {
      const url = `${HOST}${api}`;
      await axios.get(url);
    }
  } catch (error) {
    console.error("API error:", error.message);
  }
}

runTasks();
