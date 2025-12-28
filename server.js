import express from "express";
import { GoogleAuth } from "google-auth-library";
import { google } from "googleapis";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";

const app = express();
app.use(express.json());

/* ---------- MCP SERVER ---------- */
const mcp = new McpServer({
  name: "SubTrack Google Connector",
  version: "1.0.0"
});

/* ---------- SIMPLE TEST TOOL ---------- */
mcp.tool("google_profile", async () => {
  return {
    content: [
      {
        type: "text",
        text: "Google connector is alive"
      }
    ]
  };
});

/* ---------- MCP ENDPOINT ---------- */
app.post("/mcp", async (req, res) => {
  try {
    const result = await mcp.handleRequest(req.body);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("SubTrack MCP Server Running");
});

/* ---------- START SERVER ---------- */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`MCP server running on port ${PORT}`);
});
