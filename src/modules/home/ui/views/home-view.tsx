"use client";

import { useEffect, useState } from "react";

const stats = [
  { value: "10x", label: "Faster Summaries" },
  { value: "99%", label: "Transcription Accuracy" },
  { value: "50+", label: "Integrations" },
  { value: "∞", label: "Agent Possibilities" },
];

const meetingTabs = [
  {
    id: "summary",
    label: "Summary",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
      </svg>
    ),
    content: (
      <div>
        <p
          style={{
            fontSize: 13,
            color: "rgba(232,245,233,0.45)",
            marginBottom: 14,
            fontStyle: "italic",
          }}
        >
          Q4 Planning · 42 min · March 18, 2026
        </p>
        <p
          style={{
            fontSize: 14,
            color: "rgba(232,245,233,0.78)",
            lineHeight: 1.75,
            marginBottom: 18,
          }}
        >
          The team aligned on shipping the new dashboard by March 31. Raj will
          lead development with design assets from Priya by Wednesday EOD.
          Budget approval for Q4 marketing was greenlit at $45K.
        </p>
        <div
          style={{ borderTop: "1px solid rgba(0,230,118,0.1)", paddingTop: 14 }}
        >
          <p
            style={{
              fontSize: 11,
              color: "#69f0ae",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              marginBottom: 10,
            }}
          >
            Key Decisions
          </p>
          {[
            "Dashboard ships March 31",
            "Marketing budget: $45K approved",
            "Weekly syncs moved to Tuesdays",
          ].map((d) => (
            <div
              key={d}
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                fontSize: 13,
                color: "rgba(232,245,233,0.68)",
                marginBottom: 8,
              }}
            >
              <span style={{ color: "#00e676", fontSize: 15 }}>✓</span> {d}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "recording",
    label: "Recording",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" />
      </svg>
    ),
    content: (
      <div>
        <div
          style={{
            background: "rgba(0,0,0,0.28)",
            borderRadius: 12,
            overflow: "hidden",
            marginBottom: 12,
          }}
        >
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(0,230,118,0.07), rgba(0,0,0,0.18))",
              height: 110,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: "rgba(0,230,118,0.14)",
                border: "1px solid rgba(0,230,118,0.38)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#00e676">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
            <span
              style={{
                position: "absolute",
                bottom: 10,
                right: 14,
                fontSize: 11,
                color: "rgba(232,245,233,0.35)",
              }}
            >
              42:17
            </span>
          </div>
          <div
            style={{
              padding: "8px 12px",
              display: "flex",
              gap: 3,
              alignItems: "flex-end",
              height: 44,
            }}
          >
            {Array.from({ length: 55 }).map((_, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: Math.sin(i * 0.4) * 10 + 14,
                  background:
                    i < 22 ? "rgba(0,230,118,0.55)" : "rgba(255,255,255,0.1)",
                  borderRadius: 2,
                }}
              />
            ))}
          </div>
        </div>
        <p
          style={{
            fontSize: 13,
            color: "rgba(232,245,233,0.45)",
            textAlign: "center" as const,
          }}
        >
          Full recording saved · 4 participants · HD quality
        </p>
      </div>
    ),
  },
  {
    id: "transcript",
    label: "Transcript",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <line x1="17" y1="10" x2="3" y2="10" />
        <line x1="21" y1="6" x2="3" y2="6" />
        <line x1="21" y1="14" x2="3" y2="14" />
        <line x1="17" y1="18" x2="3" y2="18" />
      </svg>
    ),
    content: (
      <div style={{ maxHeight: 195, overflowY: "auto" as const }}>
        {[
          {
            t: "00:00",
            s: "Sarah K.",
            m: "Alright, let's get started. Q4 planning — we have a lot to cover.",
          },
          {
            t: "00:08",
            s: "Raj M.",
            m: "I've been looking at the dashboard specs. I think we can ship by March 31 if we stay focused.",
          },
          {
            t: "00:21",
            s: "Priya S.",
            m: "I'll get the Figma designs to you by Wednesday EOD, Raj.",
          },
          {
            t: "00:35",
            s: "Sarah K.",
            m: "Perfect. Marketing budget — I'm approving the $45K ask for Q4.",
          },
          {
            t: "00:48",
            s: "Raj M.",
            m: "Should we also move our weekly syncs? Tuesdays work better for the team.",
          },
        ].map(({ t, s, m }) => (
          <div
            key={t}
            style={{
              display: "flex",
              gap: 10,
              marginBottom: 13,
              alignItems: "flex-start",
            }}
          >
            <span
              style={{
                fontSize: 11,
                color: "rgba(232,245,233,0.28)",
                minWidth: 36,
                paddingTop: 1,
              }}
            >
              {t}
            </span>
            <span
              style={{
                fontSize: 11,
                color: "#69f0ae",
                minWidth: 56,
                fontWeight: 600,
                paddingTop: 1,
              }}
            >
              {s}
            </span>
            <span
              style={{
                fontSize: 13,
                color: "rgba(232,245,233,0.68)",
                lineHeight: 1.55,
              }}
            >
              {m}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "askai",
    label: "Ask AI",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    content: (
      <div>
        <div style={{ marginBottom: 14 }}>
          {[
            {
              q: "What was the marketing budget decided?",
              a: "$45K was approved for Q4 marketing by Sarah.",
            },
            {
              q: "Who owns the dashboard delivery?",
              a: "Raj M. owns the dashboard, shipping by March 31.",
            },
          ].map(({ q, a }) => (
            <div key={q} style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontSize: 12,
                  color: "rgba(232,245,233,0.42)",
                  marginBottom: 5,
                }}
              >
                You: {q}
              </div>
              <div
                style={{
                  background: "rgba(0,230,118,0.06)",
                  border: "1px solid rgba(0,230,118,0.15)",
                  borderRadius: 8,
                  padding: "8px 12px",
                  fontSize: 13,
                  color: "rgba(232,245,233,0.82)",
                  lineHeight: 1.55,
                }}
              >
                🤖 {a}
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            readOnly
            placeholder="Ask anything about this meeting…"
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(0,230,118,0.18)",
              borderRadius: 8,
              padding: "8px 12px",
              color: "#e8f5e9",
              fontSize: 13,
              outline: "none",
              fontFamily: "'DM Sans', sans-serif",
            }}
          />
          <button
            style={{
              background: "rgba(0,230,118,0.13)",
              border: "1px solid rgba(0,230,118,0.28)",
              borderRadius: 8,
              padding: "8px 14px",
              color: "#00e676",
              cursor: "pointer",
              fontSize: 13,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            Ask
          </button>
        </div>
      </div>
    ),
  },
];

const agentCards = [
  {
    emoji: "🤖",
    tag: "Meetings",
    name: "Daily Standup Bot",
    desc: "Joins your daily standups, extracts blockers, and posts a Slack digest every morning.",
    schedule: "Every weekday · 9:00 AM",
  },
  {
    emoji: "📧",
    tag: "Email",
    name: "Follow-Up Agent",
    desc: "After each call, drafts and sends personalised follow-up emails to every participant.",
    schedule: "After every meeting",
  },
  {
    emoji: "🎓",
    tag: "Insights",
    name: "Learning Coach",
    desc: "Analyses your meetings over time, identifies patterns, and coaches you to communicate better.",
    schedule: "Weekly report · Fridays",
  },
];

export const Homeview = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");

  useEffect(() => {
    setMounted(true);
    const h = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        .vh * { box-sizing: border-box; margin: 0; padding: 0; }

        .vh {
          font-family: 'DM Sans', sans-serif;
          background: #060d0a;
          color: #e8f5e9;
          min-height: 100vh;
          overflow-x: hidden;
          position: relative;
        }

        .vh-mesh {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
        }
        .vh-mesh::before {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          background: radial-gradient(circle, rgba(0,230,118,0.10) 0%, transparent 65%);
          border-radius: 50%;
          top: -180px; left: -180px;
          animation: bg1 13s ease-in-out infinite alternate;
        }
        .vh-mesh::after {
          content: '';
          position: absolute;
          width: 450px; height: 450px;
          background: radial-gradient(circle, rgba(105,240,174,0.07) 0%, transparent 65%);
          border-radius: 50%;
          bottom: -80px; right: -80px;
          animation: bg2 16s ease-in-out infinite alternate;
        }
        @keyframes bg1 { to { transform: translate(70px, 50px) scale(1.08); } }
        @keyframes bg2 { to { transform: translate(-50px, -35px) scale(1.12); } }

        .vh-cursor {
          position: fixed;
          width: 260px; height: 260px; border-radius: 50%;
          background: radial-gradient(circle, rgba(0,230,118,0.05) 0%, transparent 70%);
          pointer-events: none; z-index: 1;
          transform: translate(-50%, -50%);
          transition: left 0.07s, top 0.07s;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .vh-wrap {
          position: relative; z-index: 2;
          max-width: 860px; margin: 0 auto; padding: 0 24px;
        }

        /* HERO */
        .vh-hero {
          text-align: center;
          padding: 72px 24px 56px;
          max-width: 860px;
          margin: 0 auto;
          position: relative; z-index: 2;
        }

        .vh-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(0,230,118,0.07); border: 1px solid rgba(0,230,118,0.22);
          border-radius: 100px; padding: 5px 16px;
          font-size: 12px; color: #69f0ae; letter-spacing: 0.06em;
          margin-bottom: 26px; animation: fadeUp 0.5s ease both;
        }
        .vh-dot {
          width: 6px; height: 6px; border-radius: 50%; background: #00e676;
          animation: pulse 2s ease infinite;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(0,230,118,0.5); }
          50%      { box-shadow: 0 0 0 5px rgba(0,230,118,0); }
        }

        .vh-h1 {
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-size: 32px;
          font-weight: 700;
          line-height: 1.25;
          letter-spacing: -0.015em;
          margin-bottom: 18px;
          animation: fadeUp 0.55s 0.08s ease both;
        }
        @media (max-width: 580px) { .vh-h1 { font-size: 26px; } }

        .vh-grad {
          background: linear-gradient(130deg, #00e676 0%, #69f0ae 55%, #b9f6ca 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .vh-sub {
          font-size: 15px; color: rgba(232,245,233,0.52);
          max-width: 480px; margin: 0 auto 36px;
          line-height: 1.78; font-weight: 300;
          animation: fadeUp 0.55s 0.14s ease both;
        }

        .vh-cta {
          display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;
          animation: fadeUp 0.55s 0.2s ease both;
        }

        .btn-p {
          background: linear-gradient(135deg, #00e676, #00c853);
          color: #060d0a; font-weight: 700; font-size: 14px;
          padding: 11px 26px; border-radius: 10px; border: none; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: transform 0.18s, box-shadow 0.18s;
          box-shadow: 0 4px 22px rgba(0,230,118,0.28);
          text-decoration: none; display: inline-block;
        }
        .btn-p:hover { transform: translateY(-2px); box-shadow: 0 8px 32px rgba(0,230,118,0.42); }

        .btn-g {
          background: rgba(255,255,255,0.04); backdrop-filter: blur(10px);
          color: #e8f5e9; font-weight: 500; font-size: 14px;
          padding: 11px 26px; border-radius: 10px;
          border: 1px solid rgba(255,255,255,0.1); cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.18s, border-color 0.18s;
          text-decoration: none; display: inline-block;
        }
        .btn-g:hover { background: rgba(255,255,255,0.07); border-color: rgba(0,230,118,0.28); }

        /* GLASS */
        .glass {
          background: rgba(255,255,255,0.027);
          backdrop-filter: blur(22px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 20px;
          position: relative; overflow: hidden;
          box-shadow: 0 6px 44px rgba(0,0,0,0.42), inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .glass-g { border-color: rgba(0,230,118,0.14); }
        .glass::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,230,118,0.3), transparent);
        }

        /* STATS */
        .vh-stats {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px;
          margin-bottom: 64px;
        }
        @media (max-width: 520px) { .vh-stats { grid-template-columns: repeat(2,1fr); } }
        .stat-c {
          padding: 22px 14px; text-align: center;
          transition: transform 0.22s, border-color 0.22s;
        }
        .stat-c:hover { transform: translateY(-4px); border-color: rgba(0,230,118,0.3) !important; }
        .stat-v {
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 28px; font-weight: 800;
          background: linear-gradient(135deg, #00e676, #69f0ae);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text; line-height: 1; margin-bottom: 6px;
        }
        .stat-l { font-size: 12px; color: rgba(232,245,233,0.42); line-height: 1.4; }

        /* SECTION HEADER */
        .sec-tag {
          font-size: 11px; color: #00e676; letter-spacing: 0.14em;
          text-transform: uppercase; margin-bottom: 8px;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .sec-h2 {
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 26px; font-weight: 700;
          margin-bottom: 8px; color: #e8f5e9;
        }
        .sec-p {
          font-size: 14px; color: rgba(232,245,233,0.46); line-height: 1.68;
          margin-bottom: 28px; max-width: 510px;
        }

        /* MEETING TABS */
        .meeting-sec { margin-bottom: 68px; }
        .meeting-top {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 20px 0; flex-wrap: wrap; gap: 10px;
        }
        .meeting-meta { font-size: 13px; color: rgba(232,245,233,0.43); }
        .meeting-meta strong { color: #e8f5e9; font-weight: 500; }
        .ended-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; color: #69f0ae;
          background: rgba(0,230,118,0.07); border: 1px solid rgba(0,230,118,0.18);
          border-radius: 100px; padding: 3px 10px;
        }

        .tab-row {
          display: flex; gap: 2px; padding: 12px 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          overflow-x: auto;
        }
        .tab-btn {
          display: flex; align-items: center; gap: 6px;
          font-size: 13px; font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          padding: 7px 13px;
          border-radius: 8px 8px 0 0;
          border: none; background: transparent;
          color: rgba(232,245,233,0.42); cursor: pointer;
          transition: color 0.16s, background 0.16s;
          border-bottom: 2px solid transparent; margin-bottom: -1px;
          white-space: nowrap;
        }
        .tab-btn:hover { color: rgba(232,245,233,0.72); }
        .tab-btn.tab-active {
          color: #00e676; border-bottom-color: #00e676;
          background: rgba(0,230,118,0.05);
        }
        .tab-content {
          padding: 18px 20px 20px; min-height: 175px;
          animation: fadeUp 0.28s ease both;
        }

        /* AGENTS */
        .agents-sec { margin-bottom: 68px; }
        .agents-grid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px;
          margin-bottom: 14px;
        }
        @media (max-width: 600px) { .agents-grid { grid-template-columns: 1fr; } }
        .agent-card {
          padding: 20px 18px;
          transition: transform 0.22s, border-color 0.22s; cursor: pointer;
        }
        .agent-card:hover { transform: translateY(-5px); border-color: rgba(0,230,118,0.28) !important; }
        .agent-emoji { font-size: 24px; margin-bottom: 10px; display: block; }
        .agent-tag {
          display: inline-block; font-size: 10px; color: #69f0ae;
          background: rgba(0,230,118,0.08); border: 1px solid rgba(0,230,118,0.18);
          border-radius: 100px; padding: 2px 8px; margin-bottom: 9px;
          letter-spacing: 0.05em; text-transform: uppercase;
        }
        .agent-name {
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px; font-weight: 700;
          color: #e8f5e9; margin-bottom: 7px;
        }
        .agent-desc { font-size: 13px; color: rgba(232,245,233,0.48); line-height: 1.6; margin-bottom: 13px; }
        .agent-sched {
          display: flex; align-items: center; gap: 6px;
          font-size: 11px; color: rgba(232,245,233,0.32);
          border-top: 1px solid rgba(255,255,255,0.05); padding-top: 11px;
        }

        .new-agent-btn {
          width: 100%; padding: 14px;
          background: rgba(0,230,118,0.05);
          border: 1px dashed rgba(0,230,118,0.24); border-radius: 14px;
          color: #69f0ae; font-size: 14px; font-family: 'DM Sans', sans-serif;
          cursor: pointer; display: flex; align-items: center;
          justify-content: center; gap: 8px;
          transition: background 0.2s, border-color 0.2s;
        }
        .new-agent-btn:hover { background: rgba(0,230,118,0.09); border-color: rgba(0,230,118,0.42); }

        /* HOW IT WORKS */
        .how-sec { margin-bottom: 68px; }
        .steps-row {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 0; position: relative;
        }
        @media (max-width: 520px) { .steps-row { grid-template-columns: 1fr; gap: 24px; } }
        .steps-row::after {
          content: ''; position: absolute;
          top: 35px; left: 17%; right: 17%; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(0,230,118,0.22), rgba(0,230,118,0.22), transparent);
        }
        @media (max-width: 520px) { .steps-row::after { display: none; } }
        .step-item { display: flex; flex-direction: column; align-items: center; text-align: center; padding: 0 14px; }
        .step-num {
          width: 70px; height: 70px; border-radius: 50%;
          background: rgba(0,230,118,0.07); border: 1px solid rgba(0,230,118,0.2);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 21px; font-weight: 800; color: #00e676;
          margin-bottom: 18px; position: relative; z-index: 1; backdrop-filter: blur(8px);
        }
        .step-t { font-family: 'Plus Jakarta Sans', sans-serif; font-size: 15px; font-weight: 700; margin-bottom: 7px; }
        .step-d { font-size: 13px; color: rgba(232,245,233,0.46); line-height: 1.6; }

        /* CTA */
        .cta-box {
          margin-bottom: 60px; text-align: center; padding: 48px 28px;
        }
        .cta-box::before {
          content: ''; position: absolute;
          top: -55px; left: 50%; transform: translateX(-50%);
          width: 240px; height: 240px;
          background: radial-gradient(circle, rgba(0,230,118,0.09) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-box h2 {
          font-family: 'Plus Jakarta Sans', sans-serif; font-size: 28px; font-weight: 800;
          margin-bottom: 10px;
        }
        @media (max-width: 480px) { .cta-box h2 { font-size: 22px; } }
        .cta-box p { font-size: 14px; color: rgba(232,245,233,0.48); margin-bottom: 26px; font-weight: 300; }
      `}</style>

      <div className="vh">
        <div className="vh-mesh" />
        {mounted && (
          <div
            className="vh-cursor"
            style={{ left: mousePos.x, top: mousePos.y }}
          />
        )}

        {/* ── HERO ── */}
        <section className="vh-hero">
          <div className="vh-badge">
            <span className="vh-dot" />
            AI-Powered Meetings &amp; Agents
          </div>
          <h1 className="vh-h1">
            Your meetings, <span className="vh-grad">supercharged by AI</span>
          </h1>
          <p className="vh-sub">
            Vionex joins your calls, transcribes everything, extracts action
            items, and deploys agents to handle follow-ups — so you focus on
            what matters.
          </p>
          <div className="vh-cta">
            <a href="/meetings" className="btn-p">
              Get Started Free →
            </a>
            <a href="/agents" className="btn-g">
              Explore Agents
            </a>
          </div>
        </section>

        <div className="vh-wrap">
          {/* ── STATS ── */}
          <div className="vh-stats">
            {stats.map((s) => (
              <div className="glass glass-g stat-c" key={s.label}>
                <div className="stat-v">{s.value}</div>
                <div className="stat-l">{s.label}</div>
              </div>
            ))}
          </div>

          {/* ── MEETING INSIGHTS ── */}
          <section className="meeting-sec">
            <div className="sec-tag">After Every Meeting</div>
            <h2 className="sec-h2">Four powerful views, instantly ready</h2>
            <p className="sec-p">
              Once your meeting ends, click it in the sidebar. You'll get four
              instant insights — no manual work, no waiting.
            </p>

            <div className="glass glass-g">
              <div className="meeting-top">
                <div className="meeting-meta">
                  <strong>Q4 Planning</strong>&nbsp;·&nbsp;4
                  participants&nbsp;·&nbsp;42 min
                </div>
                <span className="ended-badge">
                  <svg width="7" height="7" viewBox="0 0 8 8">
                    <circle cx="4" cy="4" r="4" fill="#00e676" />
                  </svg>
                  Meeting ended · Results ready
                </span>
              </div>

              <div className="tab-row">
                {meetingTabs.map((t) => (
                  <button
                    key={t.id}
                    className={`tab-btn ${activeTab === t.id ? "tab-active" : ""}`}
                    onClick={() => setActiveTab(t.id)}
                  >
                    {t.icon} {t.label}
                  </button>
                ))}
              </div>

              <div className="tab-content">
                {meetingTabs.find((t) => t.id === activeTab)?.content}
              </div>
            </div>
          </section>

          {/* ── AGENTS ── */}
          <section className="agents-sec">
            <div className="sec-tag">Agents</div>
            <h2 className="sec-h2">Build agents that work for you</h2>
            <p className="sec-p">
              Create custom AI agents, schedule them around your meetings, and
              let them handle tasks, draft emails, and even coach you to
              communicate better over time.
            </p>

            <div className="agents-grid">
              {agentCards.map((a) => (
                <div className="glass glass-g agent-card" key={a.name}>
                  <span className="agent-emoji">{a.emoji}</span>
                  <span className="agent-tag">{a.tag}</span>
                  <div className="agent-name">{a.name}</div>
                  <div className="agent-desc">{a.desc}</div>
                  <div className="agent-sched">
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {a.schedule}
                  </div>
                </div>
              ))}
            </div>

            <button className="new-agent-btn">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
              Create your own agent
            </button>
          </section>

          {/* ── HOW IT WORKS ── */}
          <section className="how-sec">
            <div className="sec-tag" style={{ textAlign: "center" }}>
              How It Works
            </div>
            <h2
              className="sec-h2"
              style={{ textAlign: "center", marginBottom: 36 }}
            >
              Up and running in 60 seconds
            </h2>
            <div className="steps-row">
              {[
                {
                  n: "01",
                  t: "Connect",
                  d: "Link your calendar. Vionex auto-detects every upcoming meeting.",
                },
                {
                  n: "02",
                  t: "Meet",
                  d: "Vionex joins silently, transcribes, and understands your conversation live.",
                },
                {
                  n: "03",
                  t: "Act",
                  d: "Click any ended meeting for Summary, Recording, Transcript & Ask AI.",
                },
              ].map((s) => (
                <div className="step-item" key={s.n}>
                  <div className="step-num">{s.n}</div>
                  <div className="step-t">{s.t}</div>
                  <div className="step-d">{s.d}</div>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <div className="glass glass-g cta-box">
            <h2>Ready to reclaim your time?</h2>
            <p>Join teams that run sharper, smarter meetings with Vionex.</p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <a href="/meetings" className="btn-p">
                Start for Free
              </a>
              <a href="/agents" className="btn-g">
                See Agents Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
