import express from "express";
import fetch from "node-fetch";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// ===== BASIC HEALTH CHECK =====
app.get("/", (req, res) => {
  res.send("SubTrack MCP Server Running");
});

// ===== OAUTH AUTHORIZE ENDPOINT (REQUIRED) =====
app.get("/authorize", (req, res) => {
  const { redirect_uri, state } = req.query;

  const url = new URL(redirect_uri);
  url.searchParams.set("code", "demo_code");
  url.searchParams.set("state", state);

  res.redirect(url.toString());
});

// ===== OAUTH TOKEN ENDPOINT (REQUIRED) =====
app.post("/token", (req, res) => {
  res.json({
    access_token: "demo_access_token",
    token_type: "Bearer",
    expires_in: 3600,
  });
});

// ===== MCP ENDPOINT =====
app.post("/mcp", (req, res) => {
  res.json({
    tools: [],
  });
});

app.listen(PORT, () => {
  console.log(`MCP server listening on port ${PORT}`);
});
