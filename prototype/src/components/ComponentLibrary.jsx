/**
 * ComponentLibrary.jsx
 * Core component repository for World2Wired application.
 * Defines the mapping between semantic types and UI components.
 */
import React from 'react';

import {
    Zap,
    Settings,
    Layout,
    ToggleRight,
    BarChart3,
    Table as TableIcon,
    Image as ImageIcon,
    Type,
    ExternalLink,
    CreditCard,
    User,
    AlertCircle,
    Activity,
    Search as SearchIcon,
    ChevronRight,
    TrendingUp,
    Shield
} from 'lucide-react';

export const COMPONENT_TYPES = [
    { id: 'button', label: 'Action Button', icon: Zap, category: 'Basic' },
    { id: 'input', label: 'Source Input', icon: Settings, category: 'Basic' },
    { id: 'card', label: 'Data Container', icon: Layout, category: 'Layout' },
    { id: 'toggle', label: 'Switch/Toggle', icon: ToggleRight, category: 'Basic' },
    { id: 'stats', label: 'Stats Card', icon: BarChart3, category: 'Data' },
    { id: 'table', label: 'Data Table', icon: TableIcon, category: 'Data' },
    { id: 'hero', label: 'Hero Section', icon: ImageIcon, category: 'Layout' },
    { id: 'text', label: 'Content Block', icon: Type, category: 'Typography' },
    { id: 'pricing', label: 'Pricing Plan', icon: CreditCard, category: 'Data' },
    { id: 'profile', label: 'User Profile', icon: User, category: 'Identity' },
    { id: 'alert', label: 'System Alert', icon: AlertCircle, category: 'Feedback' },
    { id: 'chart', label: 'Analytics Chart', icon: Activity, category: 'Data' },
    { id: 'search', label: 'Global Search', icon: SearchIcon, category: 'Navigation' },
];

export const renderComponent = (item, idx, theme) => {
    const getStyle = () => ({
        borderRadius: `${theme.radius}px`,
        borderColor: theme.accent + '33',
        backdropFilter: `blur(${theme.glass / 4}px)`,
        background: `rgba(255,255,255,${theme.glass / 200})`,
        boxShadow: `0 ${theme.depth / 5}px ${theme.depth / 2}px -${theme.depth / 10}px rgba(0,0,0,${theme.depth / 100})`,
        fontFamily: theme.font === 'Mono' ? 'monospace' : `'${theme.font}', sans-serif`,
    });

    const getAccentBg = () => ({
        backgroundColor: theme.accent,
        borderRadius: `${theme.radius}px`,
        boxShadow: `0 ${theme.depth / 8}px ${theme.depth / 4}px -${theme.depth / 20}px ${theme.accent}33`,
    });

    const getAccentText = () => ({
        color: theme.accent,
    });

    const getAccentBorder = () => ({
        borderColor: theme.accent,
        borderRadius: `${theme.radius}px`,
        boxShadow: `0 ${theme.depth / 5}px ${theme.depth / 2}px -${theme.depth / 10}px ${theme.accent}22`,
    });

    switch (item.component) {
        case 'button':
            return (
                <button
                    key={idx}
                    style={getAccentBg()}
                    className="w-full text-white font-bold py-3 px-6 shadow-lg transition-all active:scale-95 border border-white/10 hover:brightness-110"
                >
                    {item.word}
                </button>
            );
        case 'input':
            return (
                <div key={idx} className="space-y-1 w-full">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">{item.word}</label>
                    <div
                        style={getStyle()}
                        className="w-full border p-3 text-slate-300 focus-within:border-blue-500/50 transition-all cursor-text"
                    >
                        <span className="opacity-50 text-sm">Enter {item.word.toLowerCase()}...</span>
                    </div>
                </div>
            );
        case 'card':
            return (
                <div
                    key={idx}
                    style={getStyle()}
                    className="border p-5 hover:border-white/20 transition-all group w-full"
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                            <Layout className="w-4 h-4 text-slate-400" />
                        </div>
                        <h3 className="text-sm font-bold text-white uppercase tracking-tight">{item.word}</h3>
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 w-3/4 bg-white/10 rounded-full"></div>
                        <div className="h-2 w-1/2 bg-white/5 rounded-full"></div>
                    </div>
                </div>
            );
        case 'toggle':
            return (
                <div
                    key={idx}
                    style={getStyle()}
                    className="flex items-center justify-between p-4 border w-full"
                >
                    <span className="text-sm font-medium text-slate-300">{item.word}</span>
                    <div
                        style={{ backgroundColor: theme.accent + '44' }}
                        className="w-12 h-6 rounded-full relative p-1 shadow-inner"
                    >
                        <div
                            style={{ backgroundColor: theme.accent }}
                            className="absolute right-1 w-4 h-4 rounded-full shadow-sm"
                        ></div>
                    </div>
                </div>
            );
        case 'stats':
            return (
                <div
                    key={idx}
                    style={{ ...getStyle(), background: `linear-gradient(135deg, ${theme.accent}11, ${theme.accent}22)` }}
                    className="border p-6 relative overflow-hidden group w-full"
                >
                    <BarChart3 className="absolute -right-2 -bottom-2 w-16 h-16 opacity-5 group-hover:scale-110 transition-transform" />
                    <p style={getAccentText()} className="text-[10px] font-bold uppercase tracking-widest mb-1">{item.word}</p>
                    <h4 className="text-3xl font-black text-white">4.8k</h4>
                    <p className="text-[10px] text-emerald-400 mt-1 flex items-center gap-1">
                        <span>↑ 24%</span> vs last month
                    </p>
                </div>
            );
        case 'table':
            return (
                <div
                    key={idx}
                    style={getStyle()}
                    className="w-full border overflow-hidden"
                >
                    <div className="bg-white/5 px-4 py-2 border-b border-white/5 flex gap-4">
                        <div className="h-2 w-12 bg-white/20 rounded"></div>
                        <div className="h-2 w-20 bg-white/20 rounded"></div>
                    </div>
                    <div className="p-4 space-y-3">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="flex gap-4 opacity-40">
                                <div className="h-2 w-12 bg-white/10 rounded"></div>
                                <div className="h-2 w-32 bg-white/10 rounded"></div>
                                <div className="h-2 w-8 bg-white/10 rounded ml-auto"></div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case 'hero':
            return (
                <div
                    key={idx}
                    style={getStyle()}
                    className="w-full relative overflow-hidden border p-10 text-center space-y-4"
                >
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${theme.accent}, transparent)` }}></div>
                    <h2 className="text-3xl font-black text-white relative z-10">{item.word}</h2>
                    <p className="text-slate-400 text-sm max-w-sm mx-auto relative z-10">Building tomorrow's interfaces today with semantic mapping and rapid wired prototyping.</p>
                    <div className="flex gap-3 justify-center relative z-10">
                        <div style={getAccentBg()} className="px-5 py-2 text-xs font-bold text-white shadow-lg">Get Started</div>
                        <div className="px-5 py-2 text-xs font-bold text-white border border-white/10" style={{ borderRadius: `${theme.radius}px` }}>Learn More</div>
                    </div>
                </div>
            );
        case 'text':
            return (
                <div key={idx} className="w-full space-y-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <div className="w-1 h-4" style={getAccentBg()}></div>
                        {item.word}
                    </h4>
                    <div className="space-y-2 opacity-40">
                        <div className="h-2 w-full bg-white/10 rounded"></div>
                        <div className="h-2 w-full bg-white/10 rounded"></div>
                        <div className="h-2 w-3/4 bg-white/10 rounded"></div>
                    </div>
                </div>
            );
        case 'pricing':
            return (
                <div key={idx} className="w-full grid grid-cols-3 gap-4">
                    {[
                        { name: 'Basic', price: '$0', feat: '3 projects' },
                        { name: 'Pro', price: '$29', feat: 'Unlimited', highlight: true },
                        { name: 'Enterprise', price: '$99', feat: 'Custom SLA' }
                    ].map((p, i) => (
                        <div key={i} style={p.highlight ? getAccentBorder() : getStyle()}
                            className={`p-4 bg-slate-800/40 border flex flex-col items-center text-center ${p.highlight ? 'scale-105 z-10 shadow-2xl' : 'opacity-80'}`}>
                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500 mb-1">{p.name}</p>
                            <h4 className="text-xl font-black text-white">{p.price}</h4>
                            <p className="text-[10px] text-slate-400 mt-2 mb-4">{p.feat}</p>
                            <div className={`w-full py-1.5 text-[9px] font-black uppercase rounded ${p.highlight ? 'text-white' : 'bg-white/5 text-slate-400'}`} style={p.highlight ? { backgroundColor: theme.accent } : {}}>Select</div>
                        </div>
                    ))}
                </div>
            );
        case 'profile':
            return (
                <div key={idx} style={getStyle()} className="w-full p-4 border flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center border-2" style={{ borderColor: theme.accent }}>
                        <User className="text-slate-400" size={20} />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-white">{item.word}</h4>
                        <div className="flex items-center gap-2 mt-0.5">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Active Now</span>
                        </div>
                    </div>
                    <button className="ml-auto p-2 hover:bg-white/5 rounded-lg text-slate-400">
                        <ChevronRight size={16} />
                    </button>
                </div>
            );
        case 'alert':
            return (
                <div key={idx} style={{ ...getStyle(), borderLeftWidth: '4px', borderLeftColor: theme.accent }}
                    className="w-full p-4 border flex items-center gap-3">
                    <Shield style={getAccentText()} size={18} />
                    <div>
                        <p className="text-xs font-bold text-white leading-none">{item.word}</p>
                        <p className="text-[10px] text-slate-500 mt-1">System processing remains optimal at this time.</p>
                    </div>
                </div>
            );
        case 'chart':
            return (
                <div key={idx} style={getStyle()} className="w-full p-6 border space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">{item.word}</h4>
                        <TrendingUp style={getAccentText()} size={14} />
                    </div>
                    <div className="h-32 flex items-end gap-2 px-2">
                        {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                            <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
                                className="flex-1 rounded-t-sm opacity-60 hover:opacity-100 transition-all"
                                style={{ backgroundColor: theme.accent }} />
                        ))}
                    </div>
                    <div className="flex justify-between text-[8px] text-slate-600 font-bold">
                        <span>MON</span><span>WED</span><span>FRI</span><span>SUN</span>
                    </div>
                </div>
            );
        case 'search':
            return (
                <div key={idx} className="w-full relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-white transition-colors">
                        <SearchIcon size={16} />
                    </div>
                    <input type="text" placeholder={`Search ${item.word.toLowerCase()}...`}
                        style={getStyle()}
                        className="w-full border p-3.5 pl-12 text-sm text-white focus:outline-none focus:ring-1 transition-all" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-0.5 rounded bg-white/5 text-[9px] font-bold text-slate-500 border border-white/5">
                        ⌘K
                    </div>
                </div>
            );
        default:
            return null;
    }
};
