import { useState, useEffect } from 'react';
import Head from 'next/head';

const ROADMAP = [
  {
    week: 1, title: 'Core AI & Local Execution', days: 'Days 1–7',
    steps: [
      {
        id: 1, title: 'Master Prompt Engineering', days: 'Days 1–2',
        goal: 'Get exact outputs, reduce token waste',
        actions: [
          'Practice few-shot & zero-shot prompting for scripting tasks',
          'Take an existing script/pipeline — prompt Claude/ChatGPT to rewrite it with constraints',
          'Write concise prompts: no chatty responses, copy-paste ready output on the first try',
        ],
        done: 'You can get a fully functional script from AI on the first try, no follow-up needed',
        tools: ['Claude', 'ChatGPT'],
      },
      {
        id: 2, title: 'Run Local Models', days: 'Days 3–4',
        goal: 'Prepare for enterprise privacy restrictions',
        actions: [
          'Install Ollama or Llama.cpp on your machine or VPS',
          'Pull a small model (Llama 3 8B) and run it completely offline',
          'Deploy local model to your Kubernetes cluster so devs can hit a local API endpoint',
        ],
        done: 'Send a prompt to a local model via terminal and get a response with no internet connection',
        tools: ['Ollama', 'Llama.cpp', 'Docker', 'Kubernetes'],
      },
      {
        id: 3, title: 'Understand the Model Ecosystem', days: 'Days 5–6',
        goal: 'Treat models like software applications',
        actions: [
          'Create a free Hugging Face account',
          'Install the Hugging Face CLI on your machine',
          'Download a public model via CLI — same workflow as pulling a Docker image',
        ],
        done: "You've pulled a model from Hugging Face via command line",
        tools: ['Hugging Face', 'HF CLI'],
      },
      {
        id: 4, title: 'Adopt AI Agents Daily', days: 'Day 7',
        goal: 'Build muscle memory for AI assistance',
        actions: [
          'Install GitHub Copilot, Claude, or Codeium in VS Code',
          'Force yourself to use it daily for DevOps scripting, debugging, and config',
          'Use it to write, refactor, or comment at least one config file today',
        ],
        done: 'AI agent is part of your daily dev workflow — not just occasional use',
        tools: ['GitHub Copilot', 'Codeium', 'Claude', 'VS Code'],
      },
    ],
  },
  {
    week: 2, title: 'Context, Control & Orchestration', days: 'Days 8–14',
    steps: [
      {
        id: 5, title: 'Implement Model Context Protocol (MCP)', days: 'Days 8–9',
        goal: 'Connect AI securely to official documentation',
        actions: [
          'Research official MCP servers for AWS or Kubernetes',
          'Understand the architecture: MCP server sits between your AI agent and the K8s API docs',
          'Practice asking AI to deploy an app using only the official K8s MCP server as its knowledge base',
        ],
        done: 'You can explain how MCP prevents AI hallucination from outdated internet blogs',
        tools: ['MCP', 'AWS MCP Server', 'K8s MCP Server'],
      },
      {
        id: 6, title: 'Enforce AI Guardrails & Control', days: 'Days 10–11',
        goal: 'Restrict AI from violating company policies',
        actions: [
          "Read Anthropic's skills.md / system prompt documentation for guardrails",
          'Write a system prompt that explicitly forbids a specific vulnerable package or API',
          'Define a basic compliance policy and test forcing your AI model to adhere to it',
        ],
        done: 'AI refuses to generate code that includes your banned package',
        tools: ["Anthropic skills.md", 'System Prompts', 'Local LLMs'],
      },
      {
        id: 7, title: 'Build Agent Orchestration Pipelines', days: 'Days 12–14',
        goal: 'Chain multiple AI agents together like CI/CD',
        actions: [
          'Sign up for n8n or sim.io (free tier)',
          'Build a 2-step workflow: Agent 1 summarises a webhook → Agent 2 posts to Slack',
          'Stretch goal: 4-agent pipeline — diff analysis → vuln scan → fix → email summary',
        ],
        done: 'Two AI agents pass data between each other with zero human intervention',
        tools: ['n8n', 'sim.io', 'Slack', 'GitHub Webhooks'],
      },
    ],
  },
  {
    week: 3, title: 'Enterprise AI & Observability', days: 'Days 15–21',
    steps: [
      {
        id: 8, title: 'Learn RAG & Vector Databases', days: 'Days 15–17',
        goal: 'Give AI access to internal company data',
        actions: [
          'Understand Retrieval-Augmented Generation (RAG) — teach AI your private data without retraining',
          'Set up a free vector database (Pinecone or Retool)',
          "Upload fake 'internal docs' (mock Confluence/Jira pages) and query locally",
        ],
        done: 'AI answers a question that only exists in the PDF you uploaded',
        tools: ['Pinecone', 'Retool', 'LangChain', 'Ollama'],
      },
      {
        id: 9, title: 'Implement AI Observability (AIOps)', days: 'Days 18–19',
        goal: 'Automate incident response and anomaly detection',
        actions: [
          'Review docs for Rootly, Resolve AI, or Datadog Watchdog',
          'Understand how AIOps tools integrate with Prometheus',
          'Learn how ML detects a 3AM traffic spike that static threshold alerts would miss',
        ],
        done: 'You can explain how AIOps catches anomalies that static Prometheus alerts miss',
        tools: ['Rootly', 'Resolve AI', 'Datadog Watchdog', 'Prometheus'],
      },
      {
        id: 10, title: 'Apply AI Security (DevSecOps for AI)', days: 'Days 20–21',
        goal: 'Secure the AI infrastructure itself',
        actions: [
          'Research the OWASP Top 10 for LLMs',
          'Pick one vulnerability to focus on: Prompt Injection',
          'Write a one-page summary on preventing prompt injection in your Step 7 pipeline',
        ],
        done: 'You have a written enterprise AI security framework — publishable on LinkedIn',
        tools: ['OWASP LLM Top 10', 'Guardrails AI', 'NeMo Guardrails'],
      },
    ],
  },
];

const STORAGE_KEY = 'vj-ai-devops-v1';

export default function AIDevOpsTracker() {
  const [progress, setProgress] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProgress(JSON.parse(saved));
    } catch (e) {
      // Ignore storage errors
    }
    setLoaded(true);
  }, []);

  const save = (next) => {
    setProgress(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch (e) {
      // Ignore storage errors
    }
  };

  const setStatus = (id, status) => {
    save({ ...progress, [id]: status });
  };

  const toggleStep = (stepId) => {
    setExpanded(expanded === stepId ? null : stepId);
  };

  const allSteps = ROADMAP.flatMap(w => w.steps);
  const doneCount = allSteps.filter(s => progress[s.id] === 'done').length;
  const progCount = allSteps.filter(s => progress[s.id] === 'in_progress').length;
  const leftCount = allSteps.length - doneCount - progCount;
  const pct = Math.round((doneCount / allSteps.length) * 100);

  const blockBar = Array.from({ length: 10 }, (_, i) => i < Math.round(pct / 10));

  if (!loaded) return null;

  return (
    <>
      <Head>
        <title>AI DevOps Roadmap — VJ&apos;s 21-Day Tracker</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <style jsx global>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg:        #080c14;
          --surface:   #0d1220;
          --surface2:  #111827;
          --border:    #1c2840;
          --border2:   #243044;
          --blue:      #3b82f6;
          --blue-dim:  #1e3a6a;
          --cyan:      #22d3ee;
          --cyan-dim:  #0a2535;
          --green:     #10b981;
          --green-dim: #092a1e;
          --amber:     #f59e0b;
          --text:      #e8eef8;
          --muted:     #8896aa;
          --faint:     #2a3548;
          --mono:      'JetBrains Mono', monospace;
          --sans:      'Inter', system-ui, sans-serif;
        }

        html { scroll-behavior: smooth; }
        body { background: var(--bg); color: var(--text); font-family: var(--sans); min-height: 100vh; }

        .site-header {
          border-bottom: 1px solid var(--border);
          padding: 32px 24px 28px;
        }
        .header-inner { max-width: 680px; margin: 0 auto; }

        .terminal-label {
          font-family: var(--mono);
          font-size: 11px;
          color: var(--cyan);
          letter-spacing: 0.08em;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .terminal-label::before {
          content: '';
          display: inline-block;
          width: 8px; height: 8px;
          background: var(--cyan);
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

        h1.tracker-title {
          font-size: 26px;
          font-weight: 700;
          color: var(--text);
          letter-spacing: -0.02em;
          line-height: 1.2;
          margin-bottom: 4px;
        }
        h1.tracker-title span { color: var(--cyan); }
        .subtitle {
          font-size: 13px;
          color: var(--muted);
          margin-bottom: 24px;
          font-family: var(--mono);
        }

        .summary-bar {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          padding: 16px 20px;
          display: flex;
          gap: 20px;
          align-items: center;
          flex-wrap: wrap;
        }
        .pct-block { text-align: center; min-width: 52px; }
        .pct-num {
          font-family: var(--mono);
          font-size: 30px;
          font-weight: 700;
          color: var(--text);
          line-height: 1;
        }
        .pct-num sup { font-size: 14px; color: var(--muted); }
        .pct-label { font-size: 10px; color: var(--muted); margin-top: 2px; font-family: var(--mono); }

        .progress-right { flex: 1; min-width: 180px; }
        .block-bar {
          font-family: var(--mono);
          font-size: 13px;
          letter-spacing: 2px;
          color: var(--cyan);
          margin-bottom: 8px;
          word-break: break-all;
        }
        .block-bar .empty { color: var(--faint); }
        .stats-row { display: flex; gap: 16px; flex-wrap: wrap; }
        .stat { font-size: 11px; font-family: var(--mono); }
        .stat.done  { color: var(--green); }
        .stat.prog  { color: var(--blue); }
        .stat.left  { color: var(--muted); }

        .main-tracker { max-width: 680px; margin: 0 auto; padding: 0 24px 60px; }

        .week { margin-top: 36px; }
        .week-header {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 14px;
          padding-bottom: 10px;
          border-bottom: 1px solid var(--border);
        }
        .week-tag {
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--cyan);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          background: var(--cyan-dim);
          padding: 3px 8px;
          border-radius: 4px;
          border: 1px solid #0e3a4a;
        }
        .week-title { font-size: 14px; font-weight: 600; color: var(--text); }
        .week-days { font-size: 11px; color: var(--muted); margin-left: auto; font-family: var(--mono); }
        .week-pct  { font-size: 11px; font-weight: 700; font-family: var(--mono); }

        .step-list { display: flex; flex-direction: column; gap: 6px; }

        .step-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .step-card.in_progress { border-color: var(--blue-dim); }
        .step-card.done        { border-color: #0e3a22; }

        .step-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 13px 14px;
          cursor: pointer;
          user-select: none;
        }
        .step-header:hover .step-title { color: var(--cyan); }

        .step-num {
          width: 28px; height: 28px;
          border-radius: 50%;
          border: 2px solid var(--faint);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--muted);
          flex-shrink: 0;
          transition: all 0.2s;
        }
        .step-card.in_progress .step-num { border-color: var(--blue); color: var(--blue); background: var(--blue-dim); }
        .step-card.done        .step-num { border-color: var(--green); color: var(--green); background: var(--green-dim); }

        .step-info { flex: 1; min-width: 0; }
        .step-title { font-size: 13px; font-weight: 600; color: var(--text); transition: color 0.15s; }
        .step-meta  { font-size: 11px; color: var(--muted); margin-top: 2px; font-family: var(--mono); }

        .status-pill {
          font-size: 10px;
          font-weight: 700;
          font-family: var(--mono);
          padding: 3px 9px;
          border-radius: 20px;
          white-space: nowrap;
          flex-shrink: 0;
          border: 1px solid transparent;
        }
        .pill-not_started { color: var(--muted);  background: var(--surface2); border-color: var(--faint); }
        .pill-in_progress { color: var(--blue);   background: var(--blue-dim); border-color: #2a4a8a; }
        .pill-done        { color: var(--green);  background: var(--green-dim);border-color: #0e4a28; }

        .chevron { color: var(--faint); font-size: 9px; flex-shrink: 0; transition: transform 0.2s; }
        .step-card.open .chevron { transform: rotate(180deg); }

        .step-detail {
          display: none;
          padding: 0 14px 14px;
          border-top: 1px solid var(--border);
        }
        .step-card.open .step-detail { display: block; }

        .detail-section { margin-top: 13px; }
        .detail-label {
          font-family: var(--mono);
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--muted);
          margin-bottom: 7px;
        }

        .action-item {
          display: flex;
          gap: 8px;
          margin-bottom: 5px;
          font-size: 12px;
          color: #94a3b8;
          line-height: 1.55;
        }
        .action-arrow { color: var(--blue); flex-shrink: 0; font-family: var(--mono); }

        .tools-row { display: flex; gap: 5px; flex-wrap: wrap; }
        .tool-chip {
          font-size: 10px;
          font-family: var(--mono);
          background: #121830;
          border: 1px solid #2a2a4a;
          color: #818cf8;
          padding: 3px 9px;
          border-radius: 20px;
        }

        .done-box {
          background: var(--green-dim);
          border: 1px solid #1a4a30;
          border-radius: 8px;
          padding: 10px 12px;
        }
        .done-box .detail-label { color: var(--green); margin-bottom: 4px; }
        .done-box p { font-size: 12px; color: #6ee7b7; line-height: 1.5; }

        .status-buttons { display: flex; gap: 6px; margin-top: 13px; }
        .status-btn {
          flex: 1;
          padding: 8px 4px;
          border-radius: 7px;
          border: 1px solid var(--faint);
          background: transparent;
          color: var(--muted);
          font-family: var(--mono);
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.15s;
          letter-spacing: 0.04em;
        }
        .status-btn:hover { border-color: var(--blue); color: var(--blue); }
        .status-btn.active-not_started { border-color: var(--muted);  color: var(--muted);  background: var(--surface2); }
        .status-btn.active-in_progress { border-color: var(--blue);   color: var(--blue);   background: var(--blue-dim); }
        .status-btn.active-done        { border-color: var(--green);  color: var(--green);  background: var(--green-dim); }

        .site-footer {
          text-align: center;
          padding: 20px;
          font-family: var(--mono);
          font-size: 10px;
          color: var(--faint);
          border-top: 1px solid var(--border);
          margin-top: 40px;
        }
        .site-footer a { color: var(--cyan); text-decoration: none; }

        @media (max-width: 500px) {
          .site-header { padding: 24px 16px 20px; }
          .main-tracker { padding: 0 16px 40px; }
          h1.tracker-title { font-size: 21px; }
          .summary-bar { gap: 14px; }
          .status-buttons { flex-direction: column; gap: 4px; }
          .status-btn { padding: 9px; }
        }
      `}</style>

      <header className="site-header">
        <div className="header-inner">
          <div className="terminal-label">learning in public</div>
          <h1 className="tracker-title">AI DevOps <span>Roadmap</span></h1>
          <p className="subtitle">$ ./21-day-challenge.sh --track-progress</p>
          <div className="summary-bar">
            <div className="pct-block">
              <div className="pct-num">{pct}<sup>%</sup></div>
              <div className="pct-label">complete</div>
            </div>
            <div className="progress-right">
              <div className="block-bar">
                {blockBar.map((filled, i) => 
                  filled ? '█' : <span key={i} className="empty">░</span>
                )}
              </div>
              <div className="stats-row">
                <span className="stat done">✓ {doneCount} done</span>
                <span className="stat prog">◑ {progCount} in progress</span>
                <span className="stat left">○ {leftCount} remaining</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="main-tracker">
        {ROADMAP.map(week => {
          const wpDone = week.steps.filter(s => progress[s.id] === 'done').length;
          const wpPct = Math.round((wpDone / week.steps.length) * 100);
          const wpColor = wpPct === 100 ? 'var(--green)' : 'var(--muted)';

          return (
            <section key={week.week} className="week">
              <div className="week-header">
                <span className="week-tag">Week {week.week}</span>
                <span className="week-title">{week.title}</span>
                <span className="week-days">{week.days}</span>
                <span className="week-pct" style={{ color: wpColor }}>{wpPct}%</span>
              </div>
              <div className="step-list">
                {week.steps.map(step => {
                  const status = progress[step.id] || 'not_started';
                  const isOpen = expanded === step.id;
                  const pillText = status === 'not_started' ? 'not started'
                                 : status === 'in_progress' ? 'in progress'
                                 : 'done ✓';

                  return (
                    <div 
                      key={step.id} 
                      className={`step-card ${status} ${isOpen ? 'open' : ''}`}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        className="step-header"
                        onClick={() => toggleStep(step.id)}
                        onKeyDown={(e) => e.key === 'Enter' && toggleStep(step.id)}
                      >
                        <div className="step-num">
                          {status === 'done' ? '✓' : step.id}
                        </div>
                        <div className="step-info">
                          <div className="step-title">{step.title}</div>
                          <div className="step-meta">{step.days} · {step.goal}</div>
                        </div>
                        <div className={`status-pill pill-${status}`}>{pillText}</div>
                        <div className="chevron">▼</div>
                      </div>
                      <div className="step-detail">
                        <div className="detail-section">
                          <div className="detail-label">Actions</div>
                          {step.actions.map((action, i) => (
                            <div key={i} className="action-item">
                              <span className="action-arrow">→</span>
                              <span>{action}</span>
                            </div>
                          ))}
                        </div>
                        <div className="detail-section">
                          <div className="detail-label">Tools</div>
                          <div className="tools-row">
                            {step.tools.map((tool, i) => (
                              <span key={i} className="tool-chip">{tool}</span>
                            ))}
                          </div>
                        </div>
                        <div className="detail-section">
                          <div className="done-box">
                            <div className="detail-label">Done when</div>
                            <p>{step.done}</p>
                          </div>
                        </div>
                        <div className="status-buttons">
                          {['not_started', 'in_progress', 'done'].map(s => {
                            const labels = { not_started: 'Not started', in_progress: 'In progress', done: 'Done ✓' };
                            const isActive = status === s;
                            return (
                              <button
                                key={s}
                                className={`status-btn ${isActive ? `active-${s}` : ''}`}
                                onClick={(e) => { e.stopPropagation(); setStatus(step.id, s); }}
                              >
                                {labels[s]}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </main>

      <footer className="site-footer">
        progress saved locally in your browser &nbsp;·&nbsp;
        <a href="https://www.youtube.com/watch?v=Yb-asGyMM8A" target="_blank" rel="noopener noreferrer">
          source: Abhishek Veeramalla
        </a>
      </footer>
    </>
  );
}
