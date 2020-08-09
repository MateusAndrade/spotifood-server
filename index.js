const app = require("./app")

const { port } = require("./src/config");

app.listen(port, () => console.log(`Server running at ${port}`));
