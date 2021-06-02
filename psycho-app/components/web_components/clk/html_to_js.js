const fs = require("fs");

const bundle = fs.readFileSync("./canvas.html", "utf8");

const escaped = JSON.stringify(bundle);
const js = `export default ${escaped}`;

fs.writeFileSync("./canvas.js", js);
