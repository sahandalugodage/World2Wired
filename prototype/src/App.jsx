/**
 * App.jsx - World2Wired Main Interface
 * A professional semantic design engine for rapid prototyping.
 * Powered by Llama-3.3-70b logic mapping.
 */
import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Trash2, Layout, Zap, Settings, Copy, Check, Sparkles,
  Info, Palette, Monitor, Download, RefreshCw, Search, Pencil,
  X, Save, Globe, Maximize2, Wand2, Loader2, ShieldCheck,
  BarChart3, HelpCircle, FileCode2, TrendingUp, Brain
} from 'lucide-react';
import { COMPONENT_TYPES, renderComponent } from './components/ComponentLibrary';

const LAYOUT_PRESETS = [
  { id: 'stack', label: 'Vertical Stack', icon: Layout },
  { id: 'dashboard', label: 'Dashboard Grid', icon: Monitor },
  { id: 'centered', label: 'Hero Centered', icon: Sparkles },
];

const THEME_PRESETS = [
  { accent: '#3b82f6', radius: 12, name: 'Ocean', glass: 40, font: 'Inter', bgIntensity: 40, depth: 50 },
  { accent: '#c026d3', radius: 16, name: 'Cyber', glass: 60, font: 'Inter', bgIntensity: 80, depth: 70 },
  { accent: '#10b981', radius: 8, name: 'Emerald', glass: 20, font: 'Inter', bgIntensity: 20, depth: 30 },
  { accent: '#f59e0b', radius: 24, name: 'Amber', glass: 0, font: 'Inter', bgIntensity: 60, depth: 40 },
];

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || "";

// ─── HTML/CSS EXPORTER ───────────────────────────────────────────────────────
const generateComponentHTML = (item, theme) => {
  const r = theme.radius;
  const acc = theme.accent;
  switch (item.component) {
    case 'hero':
      return `  <header class="hero-section glass-surface" style="border-radius:var(--radius)">
    <div class="hero-bg"></div>
    <h1 class="hero-title">${item.word}</h1>
    <p class="hero-sub">Building tomorrow's interfaces today with semantic mapping.</p>
    <div class="hero-btns">
      <button class="btn-primary" style="background:var(--accent);border-radius:var(--radius)">Get Started</button>
      <button class="btn-outline">Learn More</button>
    </div>
  </header>`;
    case 'stats':
      return `  <div class="stat-card glass-surface" style="border-radius:var(--radius);border-left:4px solid var(--accent)">
    <p class="stat-label" style="color:var(--accent)">${item.word}</p>
    <h2 class="stat-value">4.8k</h2>
    <p class="stat-trend">↑ 24% vs last month</p>
  </div>`;
    case 'table':
      return `  <div class="table-wrap glass-surface" style="border-radius:var(--radius)">
    <div class="table-head"><span>${item.word}</span></div>
    <table><thead><tr><th>ID</th><th>Name</th><th>Value</th></tr></thead>
    <tbody><tr><td>001</td><td>Item Alpha</td><td>$1,200</td></tr>
    <tr><td>002</td><td>Item Beta</td><td>$3,500</td></tr>
    <tr><td>003</td><td>Item Gamma</td><td>$900</td></tr></tbody></table>
  </div>`;
    case 'toggle':
      return `  <div class="toggle-row glass-surface" style="border-radius:var(--radius)">
    <label for="tog-${item.word.replace(/\s/g, '')}">${item.word}</label>
    <label class="switch"><input type="checkbox" id="tog-${item.word.replace(/\s/g, '')}" checked><span class="slider" style="background:var(--accent)"></span></label>
  </div>`;
    case 'input':
      return `  <div class="form-group">
    <label for="inp-${item.word.replace(/\s/g, '')}">${item.word}</label>
    <input id="inp-${item.word.replace(/\s/g, '')}" class="glass-surface" type="text" placeholder="Enter ${item.word.toLowerCase()}..." style="border-radius:var(--radius)"/>
  </div>`;
    case 'button':
      return `  <button class="btn-primary" style="background:var(--accent);border-radius:var(--radius)">${item.word}</button>`;
    case 'text':
      return `  <section class="text-block glass-surface" style="border-left:4px solid var(--accent)">
    <h3>${item.word}</h3>
    <p>This section provides detailed information regarding ${item.word.toLowerCase()}. Content will be populated based on your design requirements.</p>
  </section>`;
    case 'pricing':
      return `  <div class="pricing-grid">
    <div class="price-card glass-surface" style="border-radius:var(--radius)"><span>Basic</span><h3>$0</h3><p>3 projects</p></div>
    <div class="price-card active glass-surface" style="border-radius:var(--radius);border-color:var(--accent)"><span>Pro</span><h3 style="color:var(--accent)">$29</h3><p>Unlimited</p></div>
    <div class="price-card glass-surface" style="border-radius:var(--radius)"><span>Enterprise</span><h3>$99</h3><p>Custom SLA</p></div>
  </div>`;
    case 'profile':
      return `  <div class="profile-bar glass-surface" style="border-radius:var(--radius);border-color:var(--accent)33">
    <div class="avatar" style="border-color:var(--accent)"></div>
    <div class="profile-info"><strong>${item.word}</strong><span>Active Now</span></div>
  </div>`;
    case 'alert':
      return `  <div class="alert-box glass-surface" style="border-radius:var(--radius);border-left:4px solid var(--accent)">
    <strong>${item.word}</strong><p>System processing remains optimal at this time.</p>
  </div>`;
    case 'chart':
      return `  <div class="chart-mock glass-surface" style="border-radius:var(--radius)">
    <div class="chart-header"><span>${item.word}</span></div>
    <div class="chart-bars"><div class="bar" style="height:40%;background:var(--accent)88"></div><div class="bar" style="height:70%;background:var(--accent)"></div><div class="bar" style="height:45%;background:var(--accent)88"></div></div>
  </div>`;
    case 'search':
      return `  <div class="search-wrap" style="border-radius:var(--radius)">
    <input type="text" class="glass-surface" placeholder="Search ${item.word.toLowerCase()}..." style="border-radius:var(--radius)"/>
  </div>`;
    default:
      return `  <div class="card glass-surface" style="border-radius:var(--radius)"><p>${item.word}</p></div>`;
  }
};

function App() {
  // ─── STATE ───────────────────────────────────────────────────────────────────
  const [vocab, setVocab] = useState(() => {
    const saved = localStorage.getItem('word2wired_vocab_v4');
    return saved ? JSON.parse(saved) : [
      { word: 'Main Dashboard', component: 'hero', reason: 'Hero section establishes the primary identity of the interface.' },
      { word: 'User Revenue', component: 'stats', reason: 'Revenue is a quantitative KPI, best represented by a Stats card.' },
      { word: 'Sync Data', component: 'toggle', reason: 'Sync implies a binary on/off state, perfect for a Toggle control.' },
      { word: 'Transaction History', component: 'table', reason: 'History data is tabular and benefits from row-based scanning.' },
    ];
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('word2wired_theme');
    return saved ? JSON.parse(saved) : THEME_PRESETS[0];
  });

  const [generationHistory, setGenerationHistory] = useState(() => {
    const saved = localStorage.getItem('word2wired_history');
    return saved ? JSON.parse(saved) : [];
  });

  const [layout, setLayout] = useState('stack');
  const [newWord, setNewWord] = useState('');
  const [newComp, setNewComp] = useState('button');
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('magic');
  const [magicPrompt, setMagicPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeReasonIdx, setActiveReasonIdx] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editWord, setEditWord] = useState('');
  const [editComp, setEditComp] = useState('button');
  const [aiGeneratedCount, setAiGeneratedCount] = useState(0);
  const [librarySearch, setLibrarySearch] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // ─── REFINEMENT STATE ──────────────────────────────────────────────────────
  const [refinementData, setRefinementData] = useState(null);
  const [isRefining, setIsRefining] = useState(false);
  const [useRefinedPlan, setUseRefinedPlan] = useState(false);

  // ─── PERSISTENCE ───────────────────────────────────────────────────────────
  useEffect(() => {
    localStorage.setItem('word2wired_vocab_v4', JSON.stringify(vocab));
    localStorage.setItem('word2wired_theme', JSON.stringify(theme));
  }, [vocab, theme]);

  useEffect(() => {
    localStorage.setItem('word2wired_history', JSON.stringify(generationHistory));
  }, [generationHistory]);

  // ─── LOCAL HEURISTIC ───────────────────────────────────────────────────────
  const getLocalComponent = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('submit') || lower.includes('save') || lower.includes('click') || lower.includes('button')) return 'button';
    if (lower.includes('name') || lower.includes('email') || lower.includes('input') || lower.includes('search') || lower.includes('form')) return 'input';
    if (lower.includes('toggle') || lower.includes('enable') || lower.includes('sync') || lower.includes('switch')) return 'toggle';
    if (lower.includes('stats') || lower.includes('growth') || lower.includes('total') || lower.includes('revenue') || lower.includes('metric')) return 'stats';
    if (lower.includes('list') || lower.includes('table') || lower.includes('history') || lower.includes('data') || lower.includes('record')) return 'table';
    if (lower.includes('hero') || lower.includes('welcome') || lower.includes('banner') || lower.includes('landing')) return 'hero';
    if (lower.includes('description') || lower.includes('about') || lower.includes('text') || lower.includes('content')) return 'text';
    if (lower.includes('price') || lower.includes('plan') || lower.includes('cost') || lower.includes('tier') || lower.includes('billing')) return 'pricing';
    if (lower.includes('user') || lower.includes('profile') || lower.includes('account') || lower.includes('member') || lower.includes('avatar')) return 'profile';
    if (lower.includes('alert') || lower.includes('warning') || lower.includes('error') || lower.includes('notice') || lower.includes('status')) return 'alert';
    if (lower.includes('chart') || lower.includes('graph') || lower.includes('trend') || lower.includes('analytics') || lower.includes('activity')) return 'chart';
    if (lower.includes('search') || lower.includes('find') || lower.includes('query') || lower.includes('lookup')) return 'search';
    return 'button';
  };

  useEffect(() => { setNewComp(getLocalComponent(newWord)); }, [newWord]);

  // ─── GROQ IDEA REFINER (New Feature) ──────────────────────────────────────
  const refineIdea = async () => {
    if (!magicPrompt) return;
    setIsGenerating(true);
    setIsRefining(true);

    try {
      const response = await fetch('/api/groq/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `You are a Senior Product Strategist and UI/UX Architect. 
              The user has a vague idea for a software interface. Your job is to analyze it, detect the core goal, and suggest a professional set of components to "flesh out" the UX.
              
              Available component types: [hero, stats, table, toggle, input, button, text, pricing, profile, alert, chart, search].
              
              Return ONLY a valid JSON object with:
              - "detectedGoal": A professional title for the app (3-5 words)
              - "summary": A 2-sentence vision of the app's functionality.
              - "missingCoreFeatures": Array of 3 key features the user likely needs but didn't mention.
              - "refinedPlan": A detailed prompt that describes a complete, professional version of their idea.
              
              Example input: "coffee shop app"
              Example output: {
                "detectedGoal": "Artisan Brew Management Suite",
                "summary": "A comprehensive platform for managing specialty coffee orders and customer loyalty. It bridges the gap between digital ordering and artisanal brewing.",
                "missingCoreFeatures": ["Live Barista Queue", "Dynamic Menu Pricing", "Customer Taste Profiles"],
                "refinedPlan": "A professional coffee shop dashboard with live order tracking (Table), daily revenue metrics (Stats), a featured artisan blend banner (Hero), and a customer loyalty toggle (Toggle)."
              }`
            },
            { role: "user", content: magicPrompt }
          ]
        })
      });

      if (!response.ok) throw new Error("Refinement API failed");
      const data = await response.json();
      const parsed = JSON.parse(data.choices[0].message.content);
      setRefinementData(parsed);
    } catch (error) {
      console.error("Refinement Error:", error);
      // Fallback: Skip refinement and go straight to generation
      generateMagicUI(magicPrompt);
    } finally {
      setIsGenerating(false);
    }
  };

  // ─── GROQ AI COMPOSER (Updated for Refinement) ─────────────────────────────
  const generateMagicUI = async (finalPrompt = magicPrompt) => {
    if (!magicPrompt) return;
    setIsGenerating(true);
    const promptSnapshot = magicPrompt;

    try {
      const response = await fetch('/api/groq/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: `You are a senior UI Architect for the Word2Wired design engine. Analyze the user's description and generate a semantic component map.
Allowed components: [hero, stats, table, toggle, input, button, text, pricing, profile, alert, chart, search].
Return ONLY a valid JSON array. Each object MUST have exactly these fields:
- "word": a clean, concise display name (2-4 words, no quotes)
- "component": one of the allowed types
- "reason": one clear sentence explaining WHY this component type best represents this semantic concept

Example: [{"word": "Revenue Dashboard", "component": "stats", "reason": "Revenue is a quantitative KPI metric best shown as a stat card with trend indicators."}]
Return only the JSON array, no other text.`
            },
            { role: "user", content: promptSnapshot }
          ]
        })
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`API ${response.status}: ${err}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      const jsonStr = content.includes('[') ? content.substring(content.indexOf('['), content.lastIndexOf(']') + 1) : content;
      const parsed = JSON.parse(jsonStr);

      setVocab(parsed);
      setAiGeneratedCount(prev => prev + parsed.length);
      setGenerationHistory(prev => [{
        prompt: promptSnapshot,
        count: parsed.length,
        time: new Date().toLocaleTimeString(),
        components: parsed.map(p => p.component)
      }, ...prev].slice(0, 10));
      setMagicPrompt('');
      setIsRefining(false);
      setRefinementData(null);
      setActiveTab('vocabulary');

    } catch (error) {
      console.error("AI Error:", error);
      alert(`Magic failed: ${error.message}\nSwitching to Local Semantic Parser.`);
      const fallback = promptSnapshot.split(/[.,]|\band\b/).map(part => ({
        word: part.trim(),
        component: getLocalComponent(part),
        reason: 'Mapped locally using semantic keyword heuristics.'
      })).filter(n => n.word.length > 3);
      setVocab(fallback);
    } finally {
      setIsGenerating(false);
    }
  };

  // ─── FEATURE 2: HTML/CSS EXPORT ────────────────────────────────────────────
  const exportHTML = () => {
    const acc = theme.accent;
    const r = theme.radius;
    const componentsHTML = vocab.map(item => generateComponentHTML(item, theme)).join('\n\n');

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Word2Wired Export</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet"/>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    :root { --accent: ${acc}; --radius: ${r}px; }
    body { font-family: 'Inter', sans-serif; background: #020617; color: #e2e8f0; padding: 40px 20px; min-height: 100vh; }
    .container { max-width: 860px; margin: 0 auto; display: flex; flex-direction: column; gap: 32px; }
    header.page-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.08); }
    header.page-header h1 { font-size: 1.5rem; font-weight: 900; }
    header.page-header span { color: var(--accent); }
    header.page-header small { color: #64748b; font-size: 0.7rem; letter-spacing: 0.15em; text-transform: uppercase; }
    /* Hero */
    .hero-section { position: relative; background: linear-gradient(135deg, #0f1729, #1e293b); border: 1px solid rgba(255,255,255,0.08); padding: 64px 48px; text-align: center; overflow: hidden; }
    .hero-bg { position: absolute; inset: 0; background: radial-gradient(circle at center, ${acc}22, transparent 60%); pointer-events: none; }
    .hero-title { font-size: 2.5rem; font-weight: 900; color: #fff; position: relative; z-index: 1; margin-bottom: 16px; }
    .hero-sub { color: #94a3b8; max-width: 440px; margin: 0 auto 28px; position: relative; z-index: 1; }
    .hero-btns { display: flex; gap: 12px; justify-content: center; position: relative; z-index: 1; }
    .btn-primary { padding: 12px 28px; font-weight: 700; font-size: 0.85rem; color: #fff; border: none; cursor: pointer; transition: filter 0.2s; }
    .btn-primary:hover { filter: brightness(1.1); }
    .btn-outline { padding: 12px 28px; font-weight: 700; font-size: 0.85rem; color: #fff; background: transparent; border: 1px solid rgba(255,255,255,0.15); cursor: pointer; border-radius: var(--radius); transition: background 0.2s; }
    .btn-outline:hover { background: rgba(255,255,255,0.05); }
    /* Stats */
    .stat-card { background: linear-gradient(135deg, ${acc}11, ${acc}22); border: 1px solid; padding: 28px; position: relative; overflow: hidden; }
    .stat-label { font-size: 0.65rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 8px; }
    .stat-value { font-size: 2.5rem; font-weight: 900; color: #fff; }
    .stat-trend { font-size: 0.75rem; color: #34d399; margin-top: 6px; }
    /* Table */
    .table-wrap { background: rgba(15,23,42,0.8); border: 1px solid rgba(255,255,255,0.06); overflow: hidden; }
    .table-head { background: rgba(255,255,255,0.04); padding: 12px 20px; border-bottom: 1px solid rgba(255,255,255,0.05); font-size: 0.7rem; font-weight: 900; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; }
    table { width: 100%; border-collapse: collapse; }
    th { padding: 12px 20px; text-align: left; font-size: 0.7rem; color: #94a3b8; font-weight: 700; text-transform: uppercase; }
    td { padding: 12px 20px; font-size: 0.85rem; border-top: 1px solid rgba(255,255,255,0.04); }
    tr:hover td { background: rgba(255,255,255,0.02); }
    /* Toggle */
    .toggle-row { display: flex; align-items: center; justify-content: space-between; background: rgba(30,41,59,0.6); border: 1px solid rgba(255,255,255,0.06); padding: 16px 20px; font-size: 0.9rem; }
    .switch { position: relative; display: inline-block; width: 50px; height: 26px; }
    .switch input { display: none; }
    .slider { position: absolute; inset: 0; border-radius: 50px; transition: 0.3s; }
    .switch input:checked + .slider::after { transform: translateX(24px); }
    .slider::after { content: ''; position: absolute; width: 20px; height: 20px; border-radius: 50%; background: #fff; top: 3px; left: 3px; transition: 0.3s; box-shadow: 0 2px 6px rgba(0,0,0,0.4); }
    /* Input */
    .form-group { display: flex; flex-direction: column; gap: 8px; }
    .form-group label { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; color: #94a3b8; }
    .form-group input { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 14px 18px; color: #e2e8f0; font-size: 0.9rem; font-family: inherit; outline: none; transition: border-color 0.2s; }
    .form-group input:focus { border-color: ${acc}66; }
    /* Text Block */
    .text-block { padding: 20px 24px; background: rgba(255,255,255,0.02); border-radius: ${r}px; }
    .text-block h3 { font-size: 0.95rem; font-weight: 700; color: #fff; margin-bottom: 10px; }
    .text-block p { font-size: 0.85rem; color: #94a3b8; line-height: 1.7; }
    /* Dynamic Theme Tags */
    :root { 
      --glass-blur: ${theme.glass / 4}px; 
      --glass-opacity: ${theme.glass / 200};
      --font-family: '${theme.font}', sans-serif;
      --depth-shadow: 0 ${theme.depth / 5}px ${theme.depth / 2}px -${theme.depth / 10}px rgba(0,0,0,${theme.depth / 100});
    }
    body { font-family: var(--font-family) !important; }
    .glass-surface { backdrop-filter: blur(var(--glass-blur)); background: rgba(255,255,255,var(--glass-opacity)); }
    /* New Components */
    .pricing-grid { display: grid; grid-template-cols: repeat(3, 1fr); gap: 16px; }
    .price-card { background: rgba(30,41,59,0.4); border: 1px solid rgba(255,255,255,0.06); padding: 24px; text-align: center; }
    .price-card.active { transform: scale(1.05); }
    .price-card span { font-size: 0.6rem; font-weight: 900; text-transform: uppercase; color: #64748b; }
    .price-card h3 { font-size: 1.5rem; margin: 8px 0; }
    .price-card p { font-size: 0.75rem; color: #94a3b8; }
    .profile-bar { display: flex; align-items: center; gap: 12px; background: rgba(30,41,59,0.3); border: 1px solid rgba(255,255,255,0.06); padding: 12px 16px; }
    .avatar { width: 40px; height: 40px; border-radius: 50%; border: 2px solid; background: #1e293b; }
    .profile-info strong { display: block; font-size: 0.85rem; }
    .profile-info span { font-size: 0.7rem; color: #10b981; }
    .alert-box { background: rgba(30,41,59,0.6); padding: 16px; display: flex; flex-direction: column; gap: 4px; }
    .alert-box strong { font-size: 0.8rem; }
    .alert-box p { font-size: 0.7rem; color: #64748b; }
    .chart-mock { background: rgba(15,23,42,0.6); border: 1px solid rgba(255,255,255,0.06); padding: 20px; }
    .chart-header { font-size: 0.6rem; font-weight: 900; text-transform: uppercase; color: #64748b; margin-bottom: 16px; }
    .chart-bars { display: flex; align-items: flex-end; gap: 8px; height: 60px; }
    .bar { flex: 1; border-radius: 2px 2px 0 0; }
    .search-wrap input { width: 100%; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 12px 16px; color: #fff; outline: none; }
    .footer-badge { text-align: center; padding: 32px; font-size: 0.65rem; color: #334155; text-transform: uppercase; letter-spacing: 0.2em; }
  </style>
</head>
<body>
  <div class="container">
    <header class="page-header">
      <div>
        <h1>Word<span>2Wired</span> <span style="font-size:0.7rem;color:#64748b;font-weight:400">v4.0 Professional</span></h1>
        <small>Generated by Semantic Design Engine · ${new Date().toLocaleDateString()}</small>
      </div>
    </header>

${componentsHTML}

    <div class="footer-badge">Generated by Word2Wired System Architect · ${new Date().toLocaleString()}</div>
  </div>
</body>
</html>`;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'word2wired_ui.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  // ─── ACTIONS ────────────────────────────────────────────────────────────────
  const addMapping = () => {
    if (newWord) {
      setVocab([...vocab, { word: newWord, component: newComp, reason: 'Manually added mapping.' }]);
      setNewWord('');
    }
  };

  const removeMapping = (index) => {
    setVocab(vocab.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
    if (activeReasonIdx === index) setActiveReasonIdx(null);
  };

  const startEditing = (index) => { setEditingIndex(index); setEditWord(vocab[index].word); setEditComp(vocab[index].component); };
  const saveEdit = (index) => { const u = [...vocab]; u[index] = { ...u[index], word: editWord, component: editComp }; setVocab(u); setEditingIndex(null); };
  const cancelEdit = () => setEditingIndex(null);
  const clearProject = () => { if (window.confirm('Wipe all mappings?')) { setVocab([]); setEditingIndex(null); setActiveReasonIdx(null); } };
  const exportConfig = () => { const blob = new Blob([JSON.stringify({ vocab, theme }, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'word2wired_config.json'; a.click(); };
  const copyReactCode = () => { const code = `import React from 'react';\n\nexport default function SemanticUI() {\n  return (\n    <div className="p-10 space-y-8 bg-slate-900 min-h-screen text-white">\n      ${vocab.map(v => `      {/* ${v.word} → ${v.component} */}`).join('\n')}\n    </div>\n  );\n}`; navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  // ─── ANALYTICS DATA ────────────────────────────────────────────────────────
  const componentCounts = COMPONENT_TYPES.map(ct => ({
    ...ct,
    count: vocab.filter(v => v.component === ct.id).length
  }));
  const maxCount = Math.max(1, ...componentCounts.map(c => c.count));
  const totalAI = aiGeneratedCount;
  const totalManual = vocab.length - Math.min(aiGeneratedCount, vocab.length);
  const accuracyScore = vocab.length > 0 ? Math.round((Math.min(aiGeneratedCount, vocab.length) / vocab.length) * 100) : 0;
  const mostUsed = componentCounts.reduce((a, b) => (a.count > b.count ? a : b), componentCounts[0]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ x: [0, 50, 0], y: [0, 30, 0] }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] blur-[160px] rounded-full"
          style={{ backgroundColor: theme.accent, opacity: theme.bgIntensity / 200 }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[160px] rounded-full" style={{ opacity: theme.bgIntensity / 400 }} />
      </div>

      <div className="relative z-10 p-4 lg:p-8 max-w-[1700px] mx-auto">
        {/* Header */}
        <header className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="p-2 shadow-lg shadow-blue-600/20" style={{ backgroundColor: theme.accent, borderRadius: `${theme.radius / 1.5}px` }}>
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-black tracking-tighter text-white">
                Word<span style={{ color: theme.accent }}>2Wired</span>{' '}
                <span className="ml-2 text-[10px] bg-white/10 px-2 py-0.5 rounded-full border border-white/10 uppercase tracking-widest text-slate-400">Pro v4.0</span>
              </h1>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest pl-10">Professional Semantic Design Core</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/5 rounded-xl border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={12} /> Neural Core Active
            </div>
            <button onClick={exportHTML} style={{ borderRadius: `${theme.radius}px` }}
              className="flex items-center gap-2 px-4 py-2.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 font-black text-xs uppercase tracking-widest hover:bg-orange-500/20 transition-all" title="Export Design">
              <FileCode2 size={14} /> Export Assets
            </button>
            <button onClick={exportConfig} className="p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-slate-400" title="Download JSON Config">
              <Download size={18} />
            </button>
            <button onClick={clearProject} className="p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-red-500/10 hover:text-red-400 transition-all text-slate-400">
              <RefreshCw size={18} />
            </button>
            <div className="h-4 w-[1px] bg-white/10 mx-1" />
            <button onClick={copyReactCode} style={{ borderRadius: `${theme.radius}px` }}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-black text-xs uppercase tracking-widest hover:brightness-90 transition-all">
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Export React'}
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* ── Left Panel ── */}
          {!isFullscreen && (
            <aside className="xl:col-span-4 flex flex-col gap-6">
              <div className="bg-white/[0.03] border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-3xl shadow-2xl">
                {/* Tab Nav */}
                <div className="flex border-b border-white/5 p-2 gap-1">
                  {[
                    { id: 'magic', icon: Wand2, label: 'Architect' },
                    { id: 'vocabulary', icon: Settings, label: 'Library' },
                    { id: 'analytics', icon: BarChart3, label: 'Metrics' },
                    { id: 'theme', icon: Palette, label: 'Theme' },
                  ].map(tab => (
                    <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 py-2.5 px-2 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white/10 text-white shadow-inner' : 'text-slate-500 hover:text-slate-300'}`}>
                      <div className="flex items-center justify-center gap-1.5">
                        <tab.icon size={12} /> {tab.label}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="p-6">
                  {/* ── Neural Architect Tab ── */}
                  {activeTab === 'magic' && (
                    <div className="space-y-5">
                      {!isRefining ? (
                        <div className="p-5 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 rounded-3xl border border-white/5">
                          <h3 className="text-sm font-black text-white mb-2 flex items-center gap-2">
                            <Sparkles className="text-blue-400" size={16} /> Neural Architect
                          </h3>
                          <p className="text-xs text-slate-400 leading-relaxed mb-4">
                            Define your interface vision. The core engine will analyze and map your semantic requirements.
                          </p>
                          <textarea value={magicPrompt} onChange={(e) => setMagicPrompt(e.target.value)}
                            placeholder="e.g. Design a SaaS dashboard with user stats, a pricing table, and a sync toggle..."
                            className="w-full h-32 bg-black/40 border border-white/5 rounded-2xl p-4 text-xs text-slate-300 focus:border-blue-500/50 outline-none transition-all resize-none custom-scrollbar" />
                          <button onClick={refineIdea} disabled={isGenerating || !magicPrompt}
                            style={{ backgroundColor: theme.accent, borderRadius: `${theme.radius}px` }}
                            className="w-full mt-4 flex items-center justify-center gap-2 py-4 text-white font-black uppercase text-xs tracking-widest shadow-xl disabled:opacity-50 transition-all active:scale-95">
                            {isGenerating ? <Loader2 className="animate-spin" size={16} /> : <Wand2 size={16} />}
                            {isGenerating ? 'Mapping Concept...' : 'Construct Logic'}
                          </button>
                        </div>
                      ) : (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                          className="p-5 bg-gradient-to-br from-purple-600/10 to-blue-600/10 rounded-3xl border border-white/5 space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="text-sm font-black text-white flex items-center gap-2">
                              <Brain className="text-purple-400" size={16} /> Logical Blueprint
                            </h3>
                            <button onClick={() => setIsRefining(false)} className="text-slate-500 hover:text-white"><X size={14} /></button>
                          </div>

                          {refinementData ? (
                            <>
                              <div>
                                <p className="text-[10px] font-black uppercase text-purple-400 mb-1">Concept</p>
                                <p className="text-sm font-bold text-white leading-tight">{refinementData.detectedGoal}</p>
                                <p className="text-[11px] text-slate-400 italic mt-1">{refinementData.summary}</p>
                              </div>

                              <div>
                                <p className="text-[10px] font-black uppercase text-blue-400 mb-2">Smart Suggestions</p>
                                <div className="flex flex-wrap gap-2">
                                  {refinementData.missingCoreFeatures.map((feat, i) => (
                                    <span key={feat} className="text-[9px] bg-white/5 border border-white/5 px-2 py-1 rounded-full text-slate-300">
                                      + {feat}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div className="pt-2">
                                <button onClick={() => generateMagicUI(refinementData.refinedPlan)}
                                  style={{ backgroundColor: theme.accent, borderRadius: `${theme.radius}px` }}
                                  className="w-full flex items-center justify-center gap-2 py-3 text-white font-black uppercase text-[10px] tracking-widest shadow-xl hover:brightness-110 transition-all">
                                  {isGenerating ? <Loader2 className="animate-spin" size={14} /> : <Check size={14} />}
                                  Confirm & Construct UI
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className="flex flex-col items-center py-10 gap-3">
                              <Loader2 className="animate-spin text-purple-500" size={32} />
                              <p className="text-xs text-slate-500 uppercase font-black tracking-widest">Architecting Plan...</p>
                            </div>
                          )}
                        </motion.div>
                      )}

                      <div className="p-3 bg-blue-500/5 rounded-2xl border border-blue-500/10">
                        <p className="text-[10px] text-slate-500 text-center">
                          <Brain size={10} className="inline mr-1 text-blue-400" />
                          System Core: <strong className="text-blue-400">Logic Mapping</strong> ensures professional UI/UX consistency for all inputs.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ── Library Tab ── */}
                  {activeTab === 'vocabulary' && (
                    <div className="space-y-5">
                      <div className="relative">
                        <input type="text" placeholder="Search mappings..." value={librarySearch} onChange={(e) => setLibrarySearch(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-xs text-white focus:ring-1 transition-all pr-10"
                          style={{ borderColor: theme.accent + '33' }} />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600"><Search size={14} /></div>
                      </div>

                      <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                        <AnimatePresence mode="popLayout">
                          {vocab.filter(v => v.word.toLowerCase().includes(librarySearch.toLowerCase())).length === 0 && (
                            <div className="text-center py-10 opacity-20 italic text-sm">No mappings found...</div>
                          )}
                          {vocab
                            .filter(v => v.word.toLowerCase().includes(librarySearch.toLowerCase()))
                            .map((item, idx) => (
                              <motion.div key={item.word + idx} layout initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.9 }}
                                className={`group p-4 border rounded-2xl transition-all ${editingIndex === idx ? 'bg-white/10 border-blue-500/50' : 'bg-white/[0.02] border-white/[0.04]'}`}>
                                {editingIndex === idx ? (
                                  <div className="space-y-3">
                                    <input value={editWord} onChange={(e) => setEditWord(e.target.value)} className="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" />
                                    <div className="flex gap-2">
                                      <button onClick={() => saveEdit(idx)} className="flex-1 bg-blue-600 py-2 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-1"><Save size={12} /> Save</button>
                                      <button onClick={cancelEdit} className="bg-white/5 px-3 py-2 rounded-lg text-slate-400 text-xs"><X size={12} /></button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                      <div className="text-slate-500 group-hover:text-white transition-colors">
                                        {React.createElement(COMPONENT_TYPES.find(c => c.id === item.component)?.icon || Zap, { size: 15 })}
                                      </div>
                                      <div>
                                        <h4 className="font-bold text-white text-sm">{item.word}</h4>
                                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{item.component}</span>
                                      </div>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <button onClick={() => startEditing(idx)} className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-600 hover:text-white transition-all"><Pencil size={13} /></button>
                                      <button onClick={() => removeMapping(idx)} className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-600 hover:text-red-400 transition-all"><Trash2 size={13} /></button>
                                    </div>
                                  </div>
                                )}
                              </motion.div>
                            ))}
                        </AnimatePresence>
                      </div>

                      <div className="pt-5 border-t border-white/5 space-y-4">
                        <div className="flex flex-wrap gap-2">
                          {['Basic', 'Data', 'Layout', 'Identity'].map(cat => (
                            <div key={cat} className="w-full">
                              <p className="text-[10px] font-black uppercase text-slate-600 tracking-[0.2em] mb-2">{cat}</p>
                              <div className="flex flex-wrap gap-2">
                                {COMPONENT_TYPES.filter(t => t.category === cat).map(type => (
                                  <button key={type.id} onClick={() => setNewComp(type.id)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${newComp === type.id ? 'bg-white/10 border-white/20 text-white shadow-xl' : 'bg-transparent border-white/5 text-slate-500 hover:border-white/10'}`}
                                    style={newComp === type.id ? { color: theme.accent, borderColor: theme.accent + '55' } : {}}>
                                    {React.createElement(type.icon, { size: 10 })} {type.id}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <input type="text" placeholder="Word tag..." value={newWord} onChange={(e) => setNewWord(e.target.value)}
                            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white focus:ring-1 transition-all text-sm"
                            style={{ borderColor: theme.accent + '22' }} />
                          <button onClick={addMapping} disabled={!newWord} style={{ backgroundColor: theme.accent, borderRadius: `${theme.radius}px` }}
                            className="px-6 text-white font-black shadow-xl transition-all active:scale-95 disabled:opacity-30">
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Feature 3: Analytics Tab ── */}
                  {activeTab === 'analytics' && (
                    <div className="space-y-6">
                      {/* Summary Stats */}
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { label: 'Total Nodes', value: vocab.length, color: theme.accent },
                          { label: 'Deep Mapped', value: Math.min(aiGeneratedCount, vocab.length), color: '#10b981' },
                          { label: 'Design Integrity', value: `${accuracyScore}%`, color: '#8b5cf6' },
                          { label: 'Frequent Block', value: mostUsed?.id || '—', color: '#f59e0b' },
                        ].map(stat => (
                          <div key={stat.label} className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
                            <p className="text-lg font-black truncate" style={{ color: stat.color }}>{stat.value}</p>
                          </div>
                        ))}
                      </div>

                      {/* Component Breakdown Bar Chart */}
                      <div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 mb-4">
                          <TrendingUp size={11} /> Component Distribution
                        </h3>
                        <div className="space-y-3">
                          {componentCounts.filter(c => c.count > 0 || vocab.length === 0).map(ct => (
                            <div key={ct.id} className="space-y-1">
                              <div className="flex justify-between text-[10px]">
                                <span className="font-bold text-slate-400 uppercase tracking-widest">{ct.id}</span>
                                <span className="font-black text-slate-300">{ct.count}</span>
                              </div>
                              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${(ct.count / maxCount) * 100}%` }}
                                  transition={{ duration: 0.8, ease: 'easeOut' }}
                                  className="h-full rounded-full"
                                  style={{ backgroundColor: theme.accent }}
                                />
                              </div>
                            </div>
                          ))}
                          {vocab.length === 0 && <p className="text-center text-slate-600 text-xs italic py-4">Generate a design to see analytics</p>}
                        </div>
                      </div>

                      {/* Generation History */}
                      <div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2 mb-3">
                          <Brain size={11} /> Generation History
                        </h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
                          {generationHistory.length === 0 && <p className="text-center text-slate-600 text-xs italic py-4">No records found</p>}
                          {generationHistory.map((h, i) => (
                            <div key={i} className="bg-white/[0.02] border border-white/5 rounded-xl p-3">
                              <p className="text-[10px] text-slate-400 truncate mb-1">"{h.prompt}"</p>
                              <div className="flex items-center justify-between">
                                <div className="flex gap-1 flex-wrap">
                                  {h.components.slice(0, 4).map((c, ci) => (
                                    <span key={ci} className="text-[9px] bg-white/5 px-2 py-0.5 rounded-md font-bold uppercase tracking-wide" style={{ color: theme.accent }}>{c}</span>
                                  ))}
                                </div>
                                <span className="text-[9px] text-slate-600">{h.time}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── Theme Tab ── */}
                  {activeTab === 'theme' && (
                    <div className="space-y-6 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                      <div className="bg-white/5 rounded-3xl p-5 border border-white/5 space-y-6">
                        <div className="space-y-4">
                          <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Surface Radius</h3>
                          <div className="flex items-center gap-4">
                            <input type="range" min="0" max="40" value={theme.radius}
                              onChange={(e) => setTheme({ ...theme, radius: parseInt(e.target.value) })}
                              className="flex-1" style={{ accentColor: theme.accent }} />
                            <span className="text-[10px] font-bold text-white w-8">{theme.radius}px</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Glass Depth</h3>
                          <div className="flex items-center gap-4">
                            <input type="range" min="0" max="100" value={theme.glass}
                              onChange={(e) => setTheme({ ...theme, glass: parseInt(e.target.value) })}
                              className="flex-1" style={{ accentColor: theme.accent }} />
                            <span className="text-[10px] font-bold text-white w-8">{theme.glass}%</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Blob Intensity</h3>
                          <div className="flex items-center gap-4">
                            <input type="range" min="0" max="100" value={theme.bgIntensity}
                              onChange={(e) => setTheme({ ...theme, bgIntensity: parseInt(e.target.value) })}
                              className="flex-1" style={{ accentColor: theme.accent }} />
                            <span className="text-[10px] font-bold text-white w-8">{theme.bgIntensity}%</span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Shadow Lift</h3>
                          <div className="flex items-center gap-4">
                            <input type="range" min="0" max="100" value={theme.depth}
                              onChange={(e) => setTheme({ ...theme, depth: parseInt(e.target.value) })}
                              className="flex-1" style={{ accentColor: theme.accent }} />
                            <span className="text-[10px] font-bold text-white w-8">{theme.depth}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Global Accent</h3>
                        <div className="flex flex-wrap gap-4 p-2">
                          {THEME_PRESETS.map(p => (
                            <button key={p.name} onClick={() => setTheme(p)}
                              className={`w-10 h-10 rounded-full border-4 transition-all ${theme.name === p.name ? 'border-white scale-110 shadow-xl' : 'border-black/50 hover:scale-105'}`}
                              style={{ backgroundColor: p.accent }} />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500">Typography</h3>
                        <div className="grid grid-cols-3 gap-2">
                          {['Inter', 'Outfit', 'Mono'].map(f => (
                            <button key={f} onClick={() => setTheme({ ...theme, font: f })}
                              className={`py-3 rounded-xl border text-[10px] font-black uppercase tracking-widest transition-all ${theme.font === f ? 'bg-white/10 border-white/20 text-white' : 'bg-white/5 border-transparent text-slate-500'}`}
                              style={{ fontFamily: f === 'Mono' ? 'monospace' : f }}>
                              {f}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-xs font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                          <Layout size={11} /> Composition Mode
                        </h3>
                        <div className="grid grid-cols-1 gap-2">
                          {LAYOUT_PRESETS.map(l => (
                            <button key={l.id} onClick={() => setLayout(l.id)}
                              className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${layout === l.id ? 'bg-white/10 border-white/20' : 'bg-white/5 border-transparent hover:border-white/10'}`}>
                              <l.icon size={15} style={{ color: layout === l.id ? theme.accent : '#475569' }} />
                              <span className={`text-sm font-bold ${layout === l.id ? 'text-white' : 'text-slate-500'}`}>{l.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-600/10 to-blue-600/10 border border-white/5 rounded-3xl p-5 flex gap-4">
                <Info className="text-blue-400 shrink-0" size={18} />
                <p className="text-xs text-slate-400 leading-relaxed">
                  <span className="text-white font-bold block mb-1">Neural System Active</span>
                  Word2Wired v4.0 utilizes a high-performance semantic core to architect interfaces and map design requirements.
                </p>
              </div>
            </aside>
          )}

          {/* ── Canvas Section ── */}
          <section className={isFullscreen ? "xl:col-span-12" : "xl:col-span-8"}>
            <div className="bg-[#0f172a] border-4 border-slate-800/50 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)] min-h-[850px] relative overflow-hidden flex flex-col">
              <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

              {/* Window Header */}
              <div className="flex items-center justify-between px-8 py-5 bg-white/[0.03] border-b border-white/10 relative z-10 backdrop-blur-2xl">
                <div className="flex items-center gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f57] shadow-lg shadow-red-500/30" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e] shadow-lg shadow-yellow-500/30" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#28c840] shadow-lg shadow-green-500/30" />
                </div>
                <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
                  <div className="flex items-center gap-2">
                    <Globe size={11} className="text-slate-500" />
                    <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white">WORD2WIRED LOGIC MAPPING</span>
                  </div>
                  <div className="w-64 h-0.5 bg-blue-500/30 rounded-full mt-1 overflow-hidden">
                    <motion.div animate={isGenerating ? { x: ['-100%', '100%'] } : {}}
                      transition={isGenerating ? { duration: 1.5, repeat: Infinity, ease: 'linear' } : {}}
                      className={`w-1/3 h-full bg-blue-500 ${!isGenerating && 'opacity-0'}`} />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/10 shadow-inner">
                    <div className="px-3 py-1 text-[9px] font-black uppercase tracking-widest text-slate-400">{layout}</div>
                    <div className="h-3.5 w-px bg-white/10 mx-1 self-center" />
                    <div className="px-3 py-1 text-[9px] font-black uppercase tracking-widest text-blue-400">{theme.name}</div>
                  </div>
                  <button onClick={() => setIsFullscreen(!isFullscreen)} className="p-2 bg-white/5 rounded-xl border border-white/5 text-slate-500 hover:text-white transition-all">
                    {isFullscreen ? <X size={13} /> : <Maximize2 size={13} />}
                  </button>
                </div>
              </div>

              {/* Canvas Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 p-10">
                <motion.div layout
                  className={`max-w-3xl mx-auto ${layout === 'dashboard' ? 'grid grid-cols-2 gap-8' : layout === 'centered' ? 'flex flex-col items-center gap-12 text-center' : 'flex flex-col gap-8'}`}>
                  <AnimatePresence mode="popLayout">
                    {vocab.length === 0 ? (
                      <div className="py-40 flex flex-col items-center text-center opacity-20">
                        <Sparkles size={56} className="mb-6" />
                        <h3 className="text-2xl font-black uppercase tracking-widest">Awaiting Semantic Data</h3>
                        <p className="text-xs mt-2 uppercase tracking-widest">Use the Magic Composer to begin</p>
                      </div>
                    ) : (
                      vocab.map((item, idx) => (
                        <motion.div key={item.word + idx} layout
                          initial={{ opacity: 0, y: 50, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }} transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                          className={`relative group ${item.component === 'hero' ? 'col-span-2' : ''}`}>

                          {/* Feature 1: AI Reasoning Button */}
                          {item.reason && (
                            <button onClick={() => setActiveReasonIdx(activeReasonIdx === idx ? null : idx)}
                              className="absolute -top-3 -right-3 z-20 w-7 h-7 rounded-full bg-slate-700 border border-white/20 text-white flex items-center justify-center hover:bg-blue-600 transition-all shadow-lg"
                              title="Why this component?">
                              <HelpCircle size={13} />
                            </button>
                          )}

                          {/* Reasoning Panel */}
                          <AnimatePresence>
                            {activeReasonIdx === idx && item.reason && (
                              <motion.div initial={{ opacity: 0, y: -8, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8, scale: 0.97 }}
                                className="absolute -top-1 left-0 right-0 z-30 mb-2 p-4 bg-slate-800 border border-blue-500/40 rounded-2xl shadow-2xl"
                                style={{ bottom: 'calc(100% + 10px)', top: 'auto' }}>
                                <div className="flex items-start gap-3">
                                  <Brain size={16} className="text-blue-400 mt-0.5 shrink-0" />
                                  <div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Logic Mapping</p>
                                    <p className="text-xs text-slate-300 leading-relaxed">{item.reason}</p>
                                  </div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {renderComponent(item, idx, theme)}
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Status Bar */}
              <div className="px-10 py-5 bg-white/[0.02] border-t border-white/10 flex items-center justify-between relative z-10">
                <div className="flex items-center gap-8 text-[11px] font-black text-slate-500 uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-blue-500 ${isGenerating && 'animate-pulse'}`} />
                    {isGenerating ? 'MAPPING LOGIC...' : `RESOURCES: ${vocab.length} NODES`}
                  </span>
                  <span className="opacity-50 flex items-center gap-2">
                    <BarChart3 size={10} /> INTEGRITY: {accuracyScore}%
                  </span>
                </div>
                <div className="text-[10px] text-slate-600 font-black tracking-widest uppercase italic bg-white/5 px-3 py-1 rounded-lg">
                  SEMANTIC DESIGN CORE v4.0
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .bg-grid-pattern { background-image: radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 40px 40px; }
        input[type="range"] { -webkit-appearance: none; background: rgba(255,255,255,0.05); height: 6px; border-radius: 10px; }
        input[type="range"]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; background: white; border-radius: 50%; cursor: pointer; }
      `}</style>
    </div>
  );
}

export default App;
