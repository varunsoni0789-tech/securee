
import { useState } from "react";
import "./App.css";

const demoUser = {
  username: "bhuvesh",
  password: "demo123",
  name: "Bhuvesh",
};

const initialData = [
  { id: 1, name: "Amazon Shopping", category: "Shopping", amount: 2499, location: "Jaipur", method: "UPI", date: "Today, 10:30 AM" },
  { id: 2, name: "Swiggy Order", category: "Food", amount: 450, location: "Jaipur", method: "UPI", date: "Today, 11:15 AM" },
  { id: 3, name: "Unknown Transfer", category: "Transfer", amount: 45000, location: "Mumbai", method: "Bank", date: "Today, 12:20 PM" },
  { id: 4, name: "Electricity Bill", category: "Bills", amount: 1800, location: "Jaipur", method: "UPI", date: "Yesterday" },
  { id: 5, name: "Netflix", category: "Entertainment", amount: 649, location: "Jaipur", method: "Card", date: "Yesterday" },
];

function analyse(t) {
  let score = 0;
  const reasons = [];

  if (Number(t.amount) > 25000) {
    score += 50;
    reasons.push("Unusually high amount");
  }

  if (t.location.toLowerCase() !== "jaipur") {
    score += 35;
    reasons.push("Unusual transaction location");
  }

  if (Number(t.amount) > 10000 && t.category === "Transfer") {
    score += 20;
    reasons.push("High-value transfer");
  }

  score = Math.min(score, 100);

  return {
    score,
    suspicious: score >= 50,
    reasons,
  };
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const [activeTab, setActiveTab] = useState("Overview");
  const [transactions, setTransactions] = useState(initialData);
  const [search, setSearch] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [notification, setNotification] = useState("");

  const [form, setForm] = useState({
    name: "",
    category: "Shopping",
    amount: "",
    location: "Jaipur",
    method: "UPI",
  });

  const alerts = transactions.filter(t => analyse(t).suspicious);
  const safeCount = transactions.length - alerts.length;
  const total = transactions.reduce((sum, t) => sum + Number(t.amount), 0);

  function handleLogin(e) {
    e.preventDefault();
    setLoginError("");

    if (
      username.trim().toLowerCase() === demoUser.username &&
      password === demoUser.password
    ) {
      setLoggingIn(true);
      setTimeout(() => {
        setLoggedIn(true);
        setLoggingIn(false);
        setActiveTab("Overview");
      }, 1100);
    } else {
      setLoginError("Incorrect username or password. Please try again.");
    }
  }

  function logout() {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    setLoginError("");
  }

  function addTransaction(e) {
    e.preventDefault();

    const newItem = {
      ...form,
      id: Date.now(),
      amount: Number(form.amount),
      date: new Date().toLocaleString(),
    };

    setTransactions(prev => [newItem, ...prev]);
    setShowAdd(false);
    setForm({
      name: "",
      category: "Shopping",
      amount: "",
      location: "Jaipur",
      method: "UPI",
    });

    setNotification("Transaction added and analysed successfully.");
    setTimeout(() => setNotification(""), 3500);
  }

  const filtered = transactions.filter(t =>
    `${t.name} ${t.category} ${t.location}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (!loggedIn) {
    return (
      <div className="login-screen">
        <div className="ambient ambient-one" />
        <div className="ambient ambient-two" />
        <div className="grid-bg" />

        <nav className="login-nav">
          <div className="logo">
            <span className="logo-mark">S</span>
            <span>SecurePay<span className="logo-green"> AI</span></span>
          </div>
          <span className="nav-security">
            <span className="live-dot" /> SECURE ENVIRONMENT
          </span>
        </nav>

        <main className="login-content">
          <section className="login-left">
            <div className="eyebrow">
              <span className="sparkle">✧</span>
              NEXT GENERATION FINANCIAL SECURITY
            </div>

            <h1>
              Your money.
              <br />
              <span className="gradient-text">Your security.</span>
              <br />
              Our intelligence.
            </h1>

            <p className="login-description">
              Experience smarter financial protection with intelligent
              transaction monitoring and AI-powered fraud detection.
            </p>

            <div className="feature-points">
              <div><span>✓</span> Intelligent transaction monitoring</div>
              <div><span>✓</span> Suspicious activity detection</div>
              <div><span>✓</span> Real-time risk assessment demo</div>
            </div>

            <div className="login-bottom-note">
              <span className="live-dot" />
              Your security dashboard awaits.
            </div>
          </section>

          <section className="login-card">
            <div className="card-orb" />

            <div className="login-card-content">
              <div className="login-icon">◈</div>

              <div className="welcome-label">WELCOME BACK</div>
              <h2>Sign in to SecurePay</h2>
              <p className="login-subtitle">
                Access your personal security dashboard.
              </p>

              <form onSubmit={handleLogin}>
                <label>USERNAME</label>
                <div className="input-wrap">
                  <span>♙</span>
                  <input
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                  />
                </div>

                <label>PASSWORD</label>
                <div className="input-wrap">
                  <span>♙</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>

                {loginError && (
                  <div className="login-error">⚠ {loginError}</div>
                )}

                <button className="login-button" disabled={loggingIn}>
                  {loggingIn ? (
                    <><span className="spinner" /> Securing your session...</>
                  ) : (
                    <>Access Dashboard <span>→</span></>
                  )}
                </button>
              </form>

              <div className="demo-credentials">
                <div className="demo-heading">
                  <span>✧</span> DEMO ACCESS
                </div>
                <div className="credential-row">
                  <span>Username</span>
                  <strong>bhuvesh</strong>
                </div>
                <div className="credential-row">
                  <span>Password</span>
                  <strong>demo123</strong>
                </div>
              </div>

              <div className="login-card-footer">
                <span>🔒</span> Protected demo environment
              </div>
            </div>
          </section>
        </main>

        <footer className="login-footer">
          <span>SECUREPAY AI © 2026</span>
          <span>SMARTER BANKING. STRONGER SECURITY.</span>
        </footer>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <aside className="side-menu">
        <div className="logo dashboard-logo">
          <span className="logo-mark">S</span>
          <span>SecurePay<span className="logo-green"> AI</span></span>
        </div>

        <div className="menu-label">WORKSPACE</div>

        {[
          ["Overview", "▦"],
          ["Transactions", "⇄"],
          ["Fraud Detection", "◈"],
          ["Analytics", "▥"],
        ].map(([label, icon]) => (
          <button
            key={label}
            className={`menu-button ${activeTab === label ? "selected" : ""}`}
            onClick={() => setActiveTab(label)}
          >
            <span>{icon}</span>
            {label}
            {label === "Fraud Detection" && alerts.length > 0 && (
              <small>{alerts.length}</small>
            )}
          </button>
        ))}

        <div className="side-bottom">
          <div className="protection-card">
            <div className="protection-symbol">🛡</div>
            <strong>Security Monitor</strong>
            <p>Transaction analysis engine is active.</p>
            <span><i /> DEMO ACTIVE</span>
          </div>

          <div className="user-profile">
            <div className="profile-avatar">B</div>
            <div className="profile-info">
              <strong>Bhuvesh</strong>
              <span>Personal Account</span>
            </div>
            <button title="Logout" onClick={logout}>↪</button>
          </div>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div>
            <div className="header-crumb">SECUREPAY / WORKSPACE</div>
            <h2>{activeTab}</h2>
          </div>
          <div className="header-right">
            <span className="monitoring"><i /> MONITORING ACTIVE</span>
            <div className="header-avatar">B</div>
            <button className="logout-button" onClick={logout}>Logout ↗</button>
          </div>
        </header>

        {notification && (
          <div className="toast">✓ {notification}</div>
        )}

        {activeTab === "Overview" && (
          <div className="page-content page-enter">
            <div className="hero-welcome">
              <div>
                <div className="eyebrow">YOUR FINANCIAL COMMAND CENTER</div>
                <h1>Good to see you, Bhuvesh <span>✦</span></h1>
                <p>Your financial security overview is ready.</p>
              </div>
              <button className="add-button" onClick={() => setShowAdd(true)}>
                + New Transaction
              </button>
            </div>

            <div className="metrics">
              <Metric label="TOTAL TRANSACTIONS" value={transactions.length} icon="⇄" note="Recorded payments" />
              <Metric label="TOTAL TRANSACTION VALUE" value={`₹${total.toLocaleString("en-IN")}`} icon="₹" note="Across all transactions" />
              <Metric label="SAFE TRANSACTIONS" value={safeCount} icon="✓" note="No risk detected" color="green" />
              <Metric label="FRAUD ALERTS" value={alerts.length} icon="⚠" note="Needs attention" color="red" />
            </div>

            <div className="dashboard-grid">
              <section className="glass-panel transaction-panel">
                <div className="section-heading">
                  <div>
                    <h3>Recent Transactions</h3>
                    <p>Your latest financial activity</p>
                  </div>
                  <button onClick={() => setActiveTab("Transactions")}>View all →</button>
                </div>
                <TransactionList transactions={transactions.slice(0, 5)} />
              </section>

              <section className="glass-panel intelligence-panel">
                <div className="section-heading">
                  <div>
                    <h3>AI Security Intelligence</h3>
                    <p>Transaction risk monitoring</p>
                  </div>
                  <span className="ai-chip">✧ AI ENGINE</span>
                </div>

                <div className="security-visual">
                  <div className="orbit orbit-one" />
                  <div className="orbit orbit-two" />
                  <div className="orbit-core">🛡</div>
                </div>

                <h2 className={alerts.length ? "risk-heading" : "secure-heading"}>
                  {alerts.length ? "Attention Required" : "System Operational"}
                </h2>
                <p className="security-description">
                  {alerts.length
                    ? `${alerts.length} suspicious transaction(s) detected.`
                    : "No suspicious activity currently detected."}
                </p>

                <div className="security-stat">
                  <span>Transactions analysed</span>
                  <strong>{transactions.length}</strong>
                </div>
                <div className="security-stat">
                  <span>Safe payments</span>
                  <strong className="green-text">{safeCount}</strong>
                </div>
                <div className="security-stat">
                  <span>Risk alerts</span>
                  <strong className="red-text">{alerts.length}</strong>
                </div>

                <button className="full-outline" onClick={() => setActiveTab("Fraud Detection")}>
                  Explore Security Report →
                </button>
              </section>
            </div>

            <section className="glass-panel alert-section">
              <div className="section-heading">
                <div>
                  <h3>Security Notifications</h3>
                  <p>Activity that requires your attention</p>
                </div>
                <button onClick={() => setActiveTab("Fraud Detection")}>All alerts →</button>
              </div>

              {alerts.length ? alerts.map(t => (
                <AlertRow key={t.id} transaction={t} />
              )) : <div className="no-alerts">✓ All clear. No suspicious payments found.</div>}
            </section>
          </div>
        )}

        {activeTab === "Transactions" && (
          <div className="page-content page-enter">
            <section className="glass-panel full-panel">
              <div className="section-heading">
                <div>
                  <h3>Transaction History</h3>
                  <p>Review and analyse all recorded payments.</p>
                </div>
                <button className="add-button" onClick={() => setShowAdd(true)}>+ Add Transaction</button>
              </div>
              <input
                className="search-input"
                placeholder="Search by name, category or location..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <TransactionList transactions={filtered} />
            </section>
          </div>
        )}

        {activeTab === "Fraud Detection" && (
          <div className="page-content page-enter">
            <section className="glass-panel full-panel">
              <div className="section-heading">
                <div>
                  <h3>Fraud Detection Center</h3>
                  <p>Risk assessment for your transactions.</p>
                </div>
                <span className="ai-chip">✧ RULE-BASED ENGINE</span>
              </div>
              <div className="fraud-banner">
                <div className="fraud-banner-icon">◈</div>
                <div>
                  <h2>{alerts.length ? `${alerts.length} Suspicious Transactions` : "Your Account Looks Secure"}</h2>
                  <p>Every recorded transaction is checked against risk indicators.</p>
                </div>
              </div>
              {alerts.length ? alerts.map(t => (
                <AlertRow key={t.id} transaction={t} />
              )) : <div className="no-alerts">✓ No suspicious transactions detected.</div>}
            </section>
          </div>
        )}

        {activeTab === "Analytics" && (
          <div className="page-content page-enter">
            <section className="glass-panel full-panel">
              <div className="section-heading">
                <div>
                  <h3>Financial Analytics</h3>
                  <p>Transaction distribution by category.</p>
                </div>
                <span className="ai-chip">LIVE DEMO DATA</span>
              </div>

              <div className="analytics-total">
                <span>Total transaction value</span>
                <h1>₹{total.toLocaleString("en-IN")}</h1>
              </div>

              {["Shopping", "Food", "Transfer", "Bills", "Entertainment", "Other"].map(category => {
                const amount = transactions
                  .filter(t => t.category === category)
                  .reduce((sum, t) => sum + Number(t.amount), 0);
                const percentage = total ? amount / total * 100 : 0;

                return (
                  <div className="chart-row" key={category}>
                    <div className="chart-label">
                      <span>{category}</span>
                      <strong>₹{amount.toLocaleString("en-IN")}</strong>
                    </div>
                    <div className="chart-track">
                      <div className="chart-fill" style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
              <p className="chart-note">These figures represent the demo transaction records, not an actual bank balance.</p>
            </section>
          </div>
        )}

        <footer className="dashboard-footer">
          SECUREPAY AI © 2026 <span>BUILT FOR SMARTER FINANCIAL SECURITY</span>
        </footer>
      </main>

      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <form className="add-modal" onSubmit={addTransaction} onClick={e => e.stopPropagation()}>
            <div className="section-heading">
              <div>
                <h3>New Transaction</h3>
                <p>Enter details for risk analysis.</p>
              </div>
              <button type="button" className="modal-close" onClick={() => setShowAdd(false)}>×</button>
            </div>

            <label>Transaction name</label>
            <input required placeholder="e.g. Shopping" value={form.name}
              onChange={e => setForm({...form, name: e.target.value})} />

            <label>Amount (₹)</label>
            <input required type="number" min="1" placeholder="Enter amount" value={form.amount}
              onChange={e => setForm({...form, amount: e.target.value})} />

            <label>Category</label>
            <select value={form.category} onChange={e => setForm({...form, category: e.target.value})}>
              {["Shopping", "Food", "Transfer", "Bills", "Entertainment", "Other"].map(c => <option key={c}>{c}</option>)}
            </select>

            <label>Location</label>
            <input required value={form.location}
              onChange={e => setForm({...form, location: e.target.value})} />

            <label>Payment method</label>
            <select value={form.method} onChange={e => setForm({...form, method: e.target.value})}>
              {["UPI", "Card", "Bank", "Cash"].map(m => <option key={m}>{m}</option>)}
            </select>

            <button className="login-button modal-submit">Analyse Transaction →</button>
          </form>
        </div>
      )}
    </div>
  );
}

function Metric({ label, value, icon, note, color }) {
  return (
    <div className="metric-card">
      <div className="metric-top">
        <span>{label}</span>
        <div className={`metric-icon ${color || ""}`}>{icon}</div>
      </div>
      <h2>{value}</h2>
      <p>{note}</p>
    </div>
  );
}

function TransactionList({ transactions }) {
  if (!transactions.length) return <div className="no-alerts">No transactions found.</div>;

  return (
    <div className="transaction-list">
      {transactions.map(t => {
        const risk = analyse(t);
        return (
          <div className="transaction-entry" key={t.id}>
            <div className="transaction-symbol">
              {t.category === "Food" ? "🍔" :
               t.category === "Shopping" ? "🛍" :
               t.category === "Bills" ? "⚡" :
               t.category === "Entertainment" ? "🎬" : "⇄"}
            </div>
            <div className="transaction-details">
              <strong>{t.name}</strong>
              <span>{t.category} · {t.location} · {t.date}</span>
            </div>
            <div className="transaction-value">
              <strong>₹{Number(t.amount).toLocaleString("en-IN")}</strong>
              <span className={risk.suspicious ? "badge-danger" : "badge-safe"}>
                {risk.suspicious ? "Suspicious" : "Safe"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AlertRow({ transaction }) {
  const risk = analyse(transaction);
  return (
    <div className="alert-entry">
      <div className="alert-symbol">⚠</div>
      <div className="alert-text">
        <strong>{transaction.name}</strong>
        <p>{risk.reasons.join(" · ")}</p>
        <span>{transaction.location} · {transaction.date}</span>
      </div>
      <div className="alert-value">
        <strong>₹{Number(transaction.amount).toLocaleString("en-IN")}</strong>
        <span className="badge-danger">Risk {risk.score}/100</span>
      </div>
    </div>
  );
}

export default App;
