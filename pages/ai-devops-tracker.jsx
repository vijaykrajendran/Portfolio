import { useState, useEffect } from "react";

const ROADMAP = [
  {
    week: 1,
    weekTitle: "Core AI & Local Execution",
    days: "Days 1–7",
    steps: [
      {
        id: 1,
        title: "Master Prompt Engineering",
        days: "Days 1–2",
        goal: "Get exact outputs, reduce token waste",
        actions: [
          "Practice few-shot & zero-shot prompting for scripting tasks",
          "Take an existing script/pipeline — prompt Claude/ChatGPT to rewrite it with constraints",
          "Focus on concise prompts: no chatty responses, copy-paste ready output",
        ],
        done: "You can get a fully functional script from AI on the first try",
        tools: ["Claude", "ChatGPT"],
      },
      {
        id: 2,
        title: "Run Local Models",
        days: "Days 3–4",
        goal: "Prepare for enterprise privacy restrictions",
        actions: [
          "Install Ollama or Llama.cpp on your machine",
          "Pull a small model (Llama 3 8B) locally",
          "Deploy a local model to your Kubernetes cluster so devs can hit a local API",
        ],
        done: "Send a prompt to local model via terminal — fully offline response",
        tools: ["Ollama", "Llama.cpp", "Docker", "Kubernetes"],
      },
      {
        id: 3,
        title: "Understand the Model Ecosystem",
        days: "Days 5–6",
        goal: "Treat models like software applications",
        actions: [
          "Create a free Hugging Face account",
          "Install the Hugging Face CLI",
          "Download a public model via CLI — same workflow as pulling a Docker image",
        ],
        done: "You've pulled a model from Hugging Face via command line",
        tools: ["Hugging Face", "HF CLI"],
      },
      {
        id: 4,
        title: "Adopt AI Agents Daily",
        days: "Day 7",
        goal: "Build muscle memory for AI assistance",
        actions: [
          "Install GitHub Copilot, Claude, or Codeium in VS Code",
          "Force yourself to use it daily for DevOps scripting, debugging, config",
          "Use it to write, refactor, or comment at least one config file today",
        ],
        done: "AI agent is part of your daily dev workflow — not just occasional",
        tools: ["GitHub Copilot", "Codeium", "Claude", "VS Code"],
      },
    ],
  },
  {
    week: 2,
    weekTitle: "Context, Control & Orchestration",
    days: "Days 8–14",
    steps: [
      {
        id: 5,
        title: "Implement Model Context Protocol (MCP)",
        days: "Days 8–9",
        goal: "Connect AI securely to official documentation",
        actions: [
          "Research official MCP servers for AWS or Kubernetes",
          "Understand the architecture: MCP server sits between AI agent and the K8s API docs",
          "Practice asking AI to deploy an app using only the official K8s MCP server as knowledge base",
        ],
        done: "You can explain how MCP prevents hallucination from outdated blogs",
        tools: ["MCP", "AWS MCP Server", "Kubernetes MCP Server"],
      },
      {
        id: 6,
        title: "Enforce AI Guardrails & Control",
        days: "Days 10–11",
        goal: "Restrict AI from violating company policies",
        actions: [
          "Read Anthropic's skills.md / system prompt documentation",
          "Write a system prompt that explicitly forbids a specific vulnerable package",
          "Define a basic compliance policy and test forcing your AI model to adhere to it",
        ],
        done: "AI refuses to generate code that includes your banned package",
        tools: ["Anthropic skills.md", "System Prompts", "Local LLMs"],
      },
      {
        id: 7,
        title: "Build Agent Orchestration Pipelines",
        days: "Days 12–14",
        goal: "Chain multiple AI agents together like CI/CD",
        actions: [
          "Sign up for n8n or sim.io (free tier)",
          "Build a 2-step workflow: Agent 1 summarises webhook → Agent 2 posts to Slack",
          "Stretch: 4-agent pipeline — diff analysis → vulnerability scan → fix → email summary",
        ],
        done: "Two AI agents pass data between each other with zero human intervention",
        tools: ["n8n", "sim.io", "Slack", "GitHub Webhooks"],
      },
    ],
  },
  {
    week: 3,
    weekTitle: "Enterprise AI & Observability",
    days: "Days 15–21",
    steps: [
      {
        id: 8,
        title: "Learn RAG & Vector Databases",
        days: "Days 15–17",
        goal: "Give AI access to internal company data",
        actions: [
          "Understand Retrieval-Augmented Generation (RAG) — teach AI your private data without retraining",
          "Set up a free vector database (Pinecone or Retool)",
          "Upload fake 'internal company docs' (mock Confluence/Jira) and query locally",
        ],
        done: "AI answers a question that only exists in your uploaded PDF",
        tools: ["Pinecone", "Retool", "LangChain", "Ollama"],
      },
      {
        id: 9,
        title: "Implement AI Observability (AIOps)",
        days: "Days 18–19",
        goal: "Automate incident response and anomaly detection",
        actions: [
          "Review docs for Rootly, Resolve AI, or Datadog Watchdog",
          "Understand how AIOps tools integrate with Prometheus",
          "Learn how ML detects a 3AM traffic spike that static threshold alerts would miss",
        ],
        done: "You can explain how AIOps catches anomalies static alerts miss",
        tools: ["Rootly", "Resolve AI", "Datadog Watchdog", "Prometheus"],
      },
      {
        id: 10,
        title: "Apply AI Security (DevSecOps for AI)",
        days: "Days 20–21",
        goal: "Secure the AI infrastructure itself",
        actions: [
          "Research OWASP Top 10 for LLMs",
          "Pick one vulnerability: Prompt Injection",
          "Write a one-page summary: how to prevent prompt injection in your Step 7 pipeline",
        ],
        done: "You have a written framework for enterprise AI security controls",
        tools: ["OWASP LLM Top 10", "Guardrails AI", "NeMo Guardrails"],
      },
    ],
  },
];

const STATUS = {
  not_started: { label: "Not started", color: "#3a3a4a", text: "#888" },
  in_progress: { label: "In progress", color: "#1a2a4a", text: "#60a5fa" },
  done: { label: "Done ✓", color: "#0f2a1a", text: "#34d399" },
};

export default function App() {
  const [progress, setProgress] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const r = await window.storage.get("vj-ai-devops-progress");
        if (r) setProgress(JSON.parse(r.value));
      } catch (_) {
        // Ignore storage errors
      }
      setLoaded(true);
    })();
  }, []);

  const save = async (next) => {
    setProgress(next);
    try { await window.storage.set("vj-ai-devops-progress", JSON.stringify(next)); } catch (_) { /* Ignore storage errors */ }
  };

  const setStatus = (id, status) => {
    save({ ...progress, [id]: status });
  };

  const allSteps = ROADMAP.flatMap(w => w.steps);
  const doneCount = allSteps.filter(s => progress[s.id] === "done").length;
  const inProgressCount = allSteps.filter(s => progress[s.id] === "in_progress").length;
  const pct = Math.round((doneCount / allSteps.length) * 100);

  const weekProgress = (steps) => {
    const d = steps.filter(s => progress[s.id] === "done").length;
    return Math.round((d / steps.length) * 100);
  };

  if (!loaded) return <div style={{ background: "#0d0d14", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "#888", fontFamily: "monospace" }}>Loading...</div>;

  return (
    <div style={{ background: "#0d0d14", minHeight: "100vh", fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif", color: "#e2e8f0", padding: "0 0 60px 0" }}>
      {/* Header */}
      <div style={{ padding: "32px 20px 24px", borderBottom: "1px solid #1e1e2e" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#60a5fa", textTransform: "uppercase", marginBottom: 8, fontWeight: 600 }}>AI DevOps Roadmap</div>
          <h1 style={{ margin: "0 0 4px", fontSize: 22, fontWeight: 700, color: "#f1f5f9" }}>21-Day Tracker</h1>
          <p style={{ margin: "0 0 20px", fontSize: 13, color: "#64748b" }}>Become an AI DevOps Engineer — step by step</p>

          {/* Overall progress */}
          <div style={{ background: "#13131f", borderRadius: 12, padding: "16px 20px", display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 32, fontWeight: 800, color: "#f1f5f9", lineHeight: 1 }}>{pct}<span style={{ fontSize: 16, color: "#64748b" }}>%</span></div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>Overall</div>
            </div>
            <div style={{ flex: 1, minWidth: 120 }}>
              <div style={{ background: "#1e1e2e", borderRadius: 4, height: 6, overflow: "hidden", marginBottom: 8 }}>
                <div style={{ height: "100%", width: `${pct}%`, background: "linear-gradient(90deg, #3b82f6, #34d399)", borderRadius: 4, transition: "width 0.4s ease" }} />
              </div>
              <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
                <span style={{ color: "#34d399" }}>✓ {doneCount} done</span>
                <span style={{ color: "#60a5fa" }}>◑ {inProgressCount} in progress</span>
                <span style={{ color: "#475569" }}>○ {allSteps.length - doneCount - inProgressCount} remaining</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weeks */}
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 20px" }}>
        {ROADMAP.map((week) => {
          const wp = weekProgress(week.steps);
          return (
            <div key={week.week} style={{ marginTop: 28 }}>
              {/* Week header */}
              <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#3b82f6", textTransform: "uppercase" }}>Week {week.week}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#cbd5e1" }}>{week.weekTitle}</div>
                <div style={{ fontSize: 11, color: "#475569", marginLeft: "auto" }}>{week.days}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: wp === 100 ? "#34d399" : "#64748b" }}>{wp}%</div>
              </div>

              {/* Steps */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {week.steps.map((step) => {
                  const status = progress[step.id] || "not_started";
                  const isOpen = expanded === step.id;
                  const s = STATUS[status];

                  return (
                    <div key={step.id} style={{ background: "#13131f", border: `1px solid ${status === "done" ? "#1a3a2a" : status === "in_progress" ? "#1a2a4a" : "#1e1e2e"}`, borderRadius: 10, overflow: "hidden", transition: "border-color 0.2s" }}>
                      {/* Step row */}
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setExpanded(isOpen ? null : step.id)}
                        onKeyDown={(e) => e.key === 'Enter' && setExpanded(isOpen ? null : step.id)}
                        style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer" }}
                      >
                        {/* Step number */}
                        <div style={{ width: 28, height: 28, borderRadius: "50%", background: status === "done" ? "#0f2a1a" : status === "in_progress" ? "#1a2a4a" : "#1a1a2a", border: `2px solid ${status === "done" ? "#34d399" : status === "in_progress" ? "#60a5fa" : "#2a2a3a"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: s.text, flexShrink: 0 }}>
                          {status === "done" ? "✓" : step.id}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: "#e2e8f0" }}>{step.title}</div>
                          <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{step.days} · {step.goal}</div>
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 600, color: s.text, background: s.color, padding: "3px 8px", borderRadius: 20, whiteSpace: "nowrap", flexShrink: 0 }}>
                          {s.label}
                        </div>
                        <div style={{ color: "#475569", fontSize: 12, flexShrink: 0 }}>{isOpen ? "▲" : "▼"}</div>
                      </div>

                      {/* Expanded detail */}
                      {isOpen && (
                        <div style={{ padding: "0 16px 16px", borderTop: "1px solid #1e1e2e" }}>
                          {/* Actions */}
                          <div style={{ marginTop: 14 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#475569", textTransform: "uppercase", marginBottom: 8 }}>Actions</div>
                            {step.actions.map((a, i) => (
                              <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 13, color: "#94a3b8", lineHeight: 1.5 }}>
                                <span style={{ color: "#3b82f6", flexShrink: 0, marginTop: 1 }}>→</span>
                                <span>{a}</span>
                              </div>
                            ))}
                          </div>

                          {/* Tools */}
                          <div style={{ marginTop: 14 }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#475569", textTransform: "uppercase", marginBottom: 8 }}>Tools</div>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                              {step.tools.map((t) => (
                                <span key={t} style={{ fontSize: 11, background: "#1a1a2e", border: "1px solid #2a2a4a", color: "#818cf8", padding: "3px 10px", borderRadius: 20 }}>{t}</span>
                              ))}
                            </div>
                          </div>

                          {/* Done condition */}
                          <div style={{ marginTop: 14, background: "#0f1a0f", border: "1px solid #1a3a1a", borderRadius: 8, padding: "10px 12px" }}>
                            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: "#34d399", textTransform: "uppercase", marginBottom: 4 }}>Done when</div>
                            <div style={{ fontSize: 12, color: "#86efac", lineHeight: 1.5 }}>{step.done}</div>
                          </div>

                          {/* Status controls */}
                          <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                            {Object.entries(STATUS).map(([key, val]) => (
                              <button
                                key={key}
                                onClick={(e) => { e.stopPropagation(); setStatus(step.id, key); }}
                                style={{ flex: 1, padding: "8px 4px", borderRadius: 8, border: `1px solid ${status === key ? val.text : "#2a2a3a"}`, background: status === key ? val.color : "transparent", color: status === key ? val.text : "#475569", fontSize: 11, fontWeight: 600, cursor: "pointer", transition: "all 0.15s" }}
                              >
                                {val.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
