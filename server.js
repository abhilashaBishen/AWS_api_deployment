const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
	res.send({ message: "Hello from my first AWS deployed Node.js app!" });
});

app.listen(PORT, () => {
	console.log(`Server running on port http://localhost:${PORT}`);
});
