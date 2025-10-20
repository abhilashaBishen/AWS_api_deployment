const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 4500;

mongoose
	.connect(
		"mongodb+srv://abhilashasingh1391_db_user:JUr3yRRzWWEWL7KF@cluster0.gvvveeg.mongodb.net/UsersInformation?retryWrites=true&w=majority&appName=Cluster0"
	)
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
		const user = new User({ name: "Abhilasha", email: "a@gmail.com" });
		await user.save(); // saves to MongoDB
		res.send("User saved!");
	} catch (err) {
		res.send(err);
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
