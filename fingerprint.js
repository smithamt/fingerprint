import cors from "cors";
import express from "express";
import {
  deleteFingerprintUser,
  getFingerprintData,
  getFingerprintUsers,
} from "./config/connect.js";
import { corsOptions } from "./whitelist.js";

const app = express();

const PORT = 27015;

app.use(cors(corsOptions));
app.use(express.json());

app.get("/attendances", async (req, res) => {
  const { address, port } = req.query;
  try {
    const response = await getFingerprintData(address, Number(port));
    return res.status(200).json(response);
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({ error: error.message });
  }
});

app.get("/users", async (req, res) => {
  const { address, port } = req.query;
  try {
    const response = await getFingerprintUsers(address, Number(port));
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

app.delete("/users/delete", async (req, res) => {
  const { address, port, uid } = req.query;
  try {
    console.log("delete", address, Number(port), Number(uid));
    if (!address || !port || !uid) {
      return res.status(401).json({ error: 'need some field' })
    }
    const response = await deleteFingerprintUser(
      address,
      Number(port),
      Number(uid)
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// createFingerprintUser({
//   link: "172.16.89.30",
//   uid: 413,
//   userId: "S20",
//   password: "",
//   role: 0,
//   name: "Saw Sein Chit",
// });

app.listen(PORT, () => console.log(`running on http://localhost:${PORT}`));
