import { useState, useEffect } from 'react';
import Head from 'next/head';
import { createClient } from '@supabase/supabase-js';

// ─── REPLACE THESE TWO VALUES after creating your Supabase project ───
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
// ─────────────────────────────────────────────────────────────────────

const supabase = SUPABASE_URL && SUPABASE_ANON_KEY
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const LOCAL_KEY = 'vj-ai-devops-v1';

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

export default function AIDevOpsTracker() {
  const [progress, setProgress] = useState({});
  const [expanded, setExpanded] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const [syncStatus, setSyncStatus] = useState('idle'); // idle | syncing | saved | error
  const [authLoading, setAuthLoading] = useState(false);

  // ── Auth listener + initial load ──────────────────────────────────
  useEffect(() => {
    if (!supabase) {
      // No Supabase config yet — fall back to localStorage only
      try {
        const saved = localStorage.getItem(LOCAL_KEY);
        if (saved) setProgress(JSON.parse(saved));
      } catch (e) {}
      setLoaded(true);
      return;
    }

    // Load local cache immediately for instant render
    try {
      const saved = localStorage.getItem(LOCAL_KEY);
      if (saved) setProgress(JSON.parse(saved));
    } catch (e) {}

    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        loadFromSupabase(session.user.id);
      } else {
        setLoaded(true);
      }
    });

    // Listen for auth changes (OAuth redirect callback)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        loadFromSupabase(u.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ── Load progress from Supabase ───────────────────────────────────
  const loadFromSupabase = async (userId) => {
    setSyncStatus('syncing');
    try {
      const { data, error } = await supabase
        .from('tracker_progress')
        .select('progress')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows

      const remote = data?.progress ?? {};
      setProgress(remote);
      localStorage.setItem(LOCAL_KEY, JSON.stringify(remote));
      setSyncStatus('saved');
    } catch (e) {
      setSyncStatus('error');
    } finally {
      setLoaded(true);
    }
  };

  // ── Save progress ─────────────────────────────────────────────────
  const save = async (next) => {
    setProgress(next);
    // Always write localStorage instantly
    try { localStorage.setItem(LOCAL_KEY, JSON.stringify(next)); } catch (e) {}

    if (!supabase || !user) return;

    setSyncStatus('syncing');
    try {
      const { error } = await supabase
        .from('tracker_progress')
        .upsert({ user_id: user.id, progress: next, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
      if (error) throw error;
      setSyncStatus('saved');
    } catch (e) {
      setSyncStatus('error');
    }
  };

  const setStatus = (id, status) => save({ ...progress, [id]: status });
  const toggleStep = (stepId) => setExpanded(expanded === stepId ? null : stepId);

  // ── GitHub OAuth ──────────────────────────────────────────────────
  const signIn = async () => {
    if (!supabase) return;
    setAuthLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: window.location.href },
    });
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setUser(null);
    setSyncStatus('idle');
  };

  // ── Stats ─────────────────────────────────────────────────────────
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
          --bg: #0a0a14;
          --surface: #0f0f1e;
          --surface2: #141428;
          --border: #1e1e38;
          --faint: #2a2a4a;
          --muted: #6b7280;
          --text: #e2e8f0;
          --cyan: #22d3ee;
          --blue: #818cf8;
          --blue-dim: #1a1a35;
          --green: #34d399;
          --green-dim: #0a2a1a;
          --mono: 'JetBrains Mono', monospace;
          --sans: 'Inter', sans-serif;
        }

        body { background: var(--bg); color: var(--text); font-family: var(--sans); min-height: 100vh; }

        .site-header {
          background: linear-gradient(180deg, #0d0d20 0%, var(--bg) 100%);
          border-bottom: 1px solid var(--border);
          padding: 32px 20px 28px;
        }
        .header-inner { max-width: 740px; margin: 0 auto; }
        .terminal-label {
          font-family: var(--mono); font-size: 10px; color: var(--green);
          letter-spacing: 0.12em; margin-bottom: 10px;
          display: flex; align-items: center; gap: 6px;
        }
        .terminal-label::before {
          content: ''; display: inline-block; width: 6px; height: 6px;
          border-radius: 50%; background: var(--green);
          box-shadow: 0 0 6px var(--green);
        }
        h1.tracker-title {
          font-family: var(--sans); font-size: 26px; font-weight: 700;
          color: var(--text); letter-spacing: -0.02em; margin-bottom: 4px;
        }
        h1.tracker-title span { color: var(--cyan); }
        .subtitle {
          font-family: var(--mono); font-size: 11px; color: var(--muted);
          margin-bottom: 20px;
        }

        .summary-bar { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; }
        .pct-block { display: flex; flex-direction: column; align-items: flex-start; }
        .pct-num {
          font-family: var(--mono); font-size: 36px; font-weight: 700; color: var(--cyan);
          line-height: 1; letter-spacing: -0.03em;
        }
        .pct-num sup { font-size: 14px; }
        .pct-label { font-family: var(--mono); font-size: 9px; color: var(--muted); letter-spacing: 0.1em; }
        .progress-right { display: flex; flex-direction: column; gap: 6px; }
        .block-bar { font-family: var(--mono); font-size: 18px; color: var(--cyan); letter-spacing: 2px; }
        .block-bar .empty { color: var(--faint); }
        .stats-row { display: flex; gap: 14px; flex-wrap: wrap; }
        .stat { font-family: var(--mono); font-size: 10px; }
        .stat.done { color: var(--green); }
        .stat.prog { color: var(--blue); }
        .stat.left { color: var(--muted); }

        .main-tracker { max-width: 740px; margin: 0 auto; padding: 28px 20px 60px; }

        .week { margin-bottom: 32px; }
        .week-header {
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 10px; flex-wrap: wrap;
        }
        .week-tag {
          font-family: var(--mono); font-size: 9px; font-weight: 700;
          background: var(--surface2); border: 1px solid var(--border);
          color: var(--cyan); padding: 3px 9px; border-radius: 4px;
          letter-spacing: 0.1em;
        }
        .week-title { font-size: 13px; font-weight: 600; color: var(--text); flex: 1; }
        .week-days { font-family: var(--mono); font-size: 10px; color: var(--muted); }
        .week-pct { font-family: var(--mono); font-size: 10px; font-weight: 700; }

        .step-list { display: flex; flex-direction: column; gap: 6px; }
        .step-card {
          background: var(--surface); border: 1px solid var(--border);
          border-radius: 10px; overflow: hidden; transition: border-color 0.2s;
        }
        .step-card.in_progress { border-color: #2a2a55; }
        .step-card.done { border-color: #1a3a28; }
        .step-card.open { border-color: var(--blue); }

        .step-header {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 14px; cursor: pointer; user-select: none;
        }
        .step-header:hover { background: var(--surface2); }
        .step-num {
          width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--mono); font-size: 11px; font-weight: 700;
          background: var(--surface2); border: 1px solid var(--faint); color: var(--muted);
        }
        .done .step-num { background: var(--green-dim); border-color: var(--green); color: var(--green); }
        .in_progress .step-num { background: var(--blue-dim); border-color: var(--blue); color: var(--blue); }

        .step-info { flex: 1; min-width: 0; }
        .step-title { font-size: 13px; font-weight: 600; color: var(--text); }
        .step-meta { font-family: var(--mono); font-size: 10px; color: var(--muted); margin-top: 1px; }

        .status-pill {
          font-family: var(--mono); font-size: 9px; font-weight: 700;
          padding: 3px 9px; border-radius: 20px; letter-spacing: 0.06em;
          border: 1px solid; white-space: nowrap; flex-shrink: 0;
        }
        .pill-not_started { color: var(--muted); border-color: var(--faint); background: transparent; }
        .pill-in_progress { color: var(--blue); border-color: var(--blue); background: var(--blue-dim); }
        .pill-done { color: var(--green); border-color: var(--green); background: var(--green-dim); }

        .chevron { color: var(--muted); font-size: 9px; transition: transform 0.2s; flex-shrink: 0; }
        .open .chevron { transform: rotate(180deg); }

        .step-detail { display: none; padding: 0 14px 14px; border-top: 1px solid var(--border); }
        .open .step-detail { display: block; padding-top: 12px; }

        .detail-section { margin-bottom: 12px; }
        .detail-label {
          font-family: var(--mono); font-size: 9px; font-weight: 700;
          color: var(--cyan); letter-spacing: 0.1em; margin-bottom: 7px;
        }

        .action-item { display: flex; gap: 8px; margin-bottom: 5px; align-items: flex-start; }
        .action-arrow { color: var(--blue); font-family: var(--mono); font-size: 11px; flex-shrink: 0; margin-top: 1px; }
        .action-item span:last-child { font-size: 12px; color: var(--text); line-height: 1.5; }

        .tools-row { display: flex; gap: 5px; flex-wrap: wrap; }
        .tool-chip {
          font-size: 10px; font-family: var(--mono);
          background: #121830; border: 1px solid #2a2a4a;
          color: #818cf8; padding: 3px 9px; border-radius: 20px;
        }

        .done-box {
          background: var(--green-dim); border: 1px solid #1a4a30;
          border-radius: 8px; padding: 10px 12px;
        }
        .done-box .detail-label { color: var(--green); margin-bottom: 4px; }
        .done-box p { font-size: 12px; color: #6ee7b7; line-height: 1.5; }

        .status-buttons { display: flex; gap: 6px; margin-top: 13px; }
        .status-btn {
          flex: 1; padding: 8px 4px; border-radius: 7px;
          border: 1px solid var(--faint); background: transparent;
          color: var(--muted); font-family: var(--mono); font-size: 10px;
          font-weight: 700; cursor: pointer; transition: all 0.15s; letter-spacing: 0.04em;
        }
        .status-btn:hover { border-color: var(--blue); color: var(--blue); }
        .status-btn.active-not_started { border-color: var(--muted); color: var(--muted); background: var(--surface2); }
        .status-btn.active-in_progress { border-color: var(--blue); color: var(--blue); background: var(--blue-dim); }
        .status-btn.active-done { border-color: var(--green); color: var(--green); background: var(--green-dim); }

        .site-footer {
          text-align: center; padding: 20px;
          font-family: var(--mono); font-size: 10px; color: var(--faint);
          border-top: 1px solid var(--border); margin-top: 40px;
        }
        .site-footer a { color: var(--cyan); text-decoration: none; }

        .auth-bar {
          display: flex; gap: 10px; justify-content: center;
          align-items: center; flex-wrap: wrap; margin-bottom: 8px;
        }
        .auth-btn {
          display: flex; align-items: center; gap: 6px;
          font-family: var(--mono); font-size: 10px; font-weight: 700;
          padding: 6px 14px; border-radius: 7px; cursor: pointer;
          transition: all 0.15s; letter-spacing: 0.04em;
        }
        .auth-btn-github {
          background: #161b22; border: 1px solid #30363d; color: #e6edf3;
        }
        .auth-btn-github:hover { border-color: var(--cyan); color: var(--cyan); }
        .auth-btn-signout {
          background: transparent; border: 1px solid var(--faint); color: var(--muted);
        }
        .auth-btn-signout:hover { border-color: #f87171; color: #f87171; }
        .sync-indicator {
          font-family: var(--mono); font-size: 10px;
        }

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
        <div className="auth-bar">
          {!supabase ? (
            <span style={{ color: 'var(--muted)' }}>⚠ add supabase env vars to enable sync</span>
          ) : user ? (
            <>
              <span className="sync-indicator" style={{
                color: syncStatus === 'saved' ? 'var(--green)' :
                       syncStatus === 'syncing' ? 'var(--blue)' :
                       syncStatus === 'error' ? '#f87171' : 'var(--muted)',
              }}>
                {syncStatus === 'saved' ? '✓ synced' :
                 syncStatus === 'syncing' ? '⟳ syncing…' :
                 syncStatus === 'error' ? '✗ sync error' : '◌ connected'}
              </span>
              <span style={{ color: 'var(--faint)' }}>·</span>
              <span style={{ color: 'var(--muted)' }}>{user.user_metadata?.user_name ?? user.email}</span>
              <span style={{ color: 'var(--faint)' }}>·</span>
              <button className="auth-btn auth-btn-signout" onClick={signOut}>sign out</button>
            </>
          ) : (
            <button className="auth-btn auth-btn-github" onClick={signIn} disabled={authLoading}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"/>
              </svg>
              {authLoading ? 'redirecting…' : 'sign in with github'}
            </button>
          )}
        </div>
        <div>
          <a href="https://www.youtube.com/watch?v=Yb-asGyMM8A" target="_blank" rel="noopener noreferrer">
            source: Abhishek Veeramalla
          </a>
        </div>
      </footer>
    </>
  );
}
