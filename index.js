const app = require("./server")

const { port } = require("./server/src/config");

app.listen(port, () => console.log(`Server running at ${port}`));
