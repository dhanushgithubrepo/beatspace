import express from "express";
import { PORT } from "./config/env.js";
import communityRouter from "./routes/communities.route.js";
const app = express();

app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/communities", communityRouter);
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});

export default app;