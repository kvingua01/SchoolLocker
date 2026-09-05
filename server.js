const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;

// Serve files from the public folder
app.use(
    express.static(
        path.join(__dirname, "public")
    )
);

// Main page
app.get("/", (req, res) => {
    res.sendFile(
        path.join(
            __dirname,
            "public",
            "index.html"
        )
    );
});

// Start server
app.listen(
    PORT,
    "0.0.0.0",
    () => {
        console.log(
            "BOB'S SCHOOL LOCKER IS RUNNING!"
        );

        console.log(
            `Server running on port ${PORT}`
        );
    }
);