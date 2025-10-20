require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 4500;

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log("✅ MongoDB connected"))
	.catch((err) => console.log("❌ MongoDB connection error:", err));

const userSchema = new mongoose.Schema({
	name: String,
	email: String,
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
	res.send("Hello World from Express backend!");
});

app.get("/about", (req, res) => {
	res.send("This is my first Express.js backend API!");
});

app.post("/users", async (req, res) => {
	try {
		const { name, email } = req.body; // get name/email from request
		const user = new User({ name, email });
		await user.save();
		res.send("User saved!");
	} catch (err) {
		res.status(400).send(err);
	}
});

// Get all users
app.get("/users", async (req, res) => {
	try {
		const users = await User.find();
		res.send(users);
	} catch (error) {
		res.status(500).send(error);
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
