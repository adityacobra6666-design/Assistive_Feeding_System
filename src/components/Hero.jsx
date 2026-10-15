import React from 'react';
import { Play, Cpu, ArrowRight, ShieldAlert, Sparkles, Sliders, CheckCircle2 } from 'lucide-react';

export default function Hero({ onLaunchDashboard, onExploreTech }) {
  return (
    <section id="overview" className="relative pt-12 pb-20 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/10 to-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Project Status Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full glass-panel border border-amber-500/30 text-xs text-amber-300 shadow-lg shadow-amber-950/20">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-semibold tracking-wide">STATUS:</span>
            <span className="text-slate-300">Software Simulation Active</span>
            <span className="text-slate-500">|</span>
            <span className="text-amber-400 font-medium">Hardware Integration Planned</span>
          </div>
        </div>

        {/* Hero Title & Subtext */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-block text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 bg-cyan-950/50 px-3 py-1 rounded-md border border-cyan-800/40">
            Innovative Design Project • IDP 2.0
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Independence,{' '}
            <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-500 bg-clip-text text-transparent">
              One Movement at a Time.
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            A software-controlled assistive robotic feeding arm engineered for individuals with restricted hand mobility. 
            Providing intuitive, self-paced directional controls and adaptive spoon rotation to restore dignified independent dining.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onLaunchDashboard}
              className="flex items-center space-x-2.5 px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Launch Control Dashboard</span>
            </button>

            <button
              onClick={onExploreTech}
              className="flex items-center space-x-2 px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-200 glass-panel hover:bg-slate-800/80 hover:text-white border border-slate-700/80 transition-all duration-200"
            >
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Explore the Technology</span>
              <ArrowRight className="w-4 h-4 ml-1 opacity-70" />
            </button>
          </div>
        </div>

        {/* Hero Interactive Illustration / Showcase Banner */}
        <div className="max-w-5xl mx-auto glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800/80 relative shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            
            {/* Left: Interactive Diagram / Graphic */}
            <div className="w-full lg:w-3/5 bg-slate-950/80 rounded-xl p-6 border border-slate-800/80 relative overflow-hidden">
              <div className="absolute top-3 left-4 flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="text-[11px] font-mono text-slate-400 ml-2">SYSTEM SCHEMATIC // MODEL FEED-ARM-V1</span>
              </div>

              {/* High-tech SVG Hero Illustration */}
              <div className="pt-6 flex justify-center">
                <svg viewBox="0 0 540 280" className="w-full max-w-[500px] h-auto drop-shadow-md select-none">
                  {/* Grid Lines */}
                  <defs>
                    <pattern id="heroGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1"/>
                    </pattern>
                    <linearGradient id="armMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#38bdf8"/>
                      <stop offset="50%" stopColor="#0284c7"/>
                      <stop offset="100%" stopColor="#0369a1"/>
                    </linearGradient>
                    <linearGradient id="jointGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#0f172a"/>
                      <stop offset="100%" stopColor="#1e293b"/>
                    </linearGradient>
                    <linearGradient id="glowTeal" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#14b8a6"/>
                      <stop offset="100%" stopColor="#06b6d4"/>
                    </linearGradient>
                  </defs>

                  <rect width="540" height="280" fill="url(#heroGrid)" rx="8" />

                  {/* Table Base & Clamp */}
                  <rect x="30" y="225" width="480" height="14" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  <text x="270" y="254" fill="#64748b" fontSize="10" fontFamily="monospace" textAnchor="middle">
                    TABLE SURFACE • CLINICAL / HOME MOUNTING PLANE
                  </text>

                  {/* Clamping Bracket */}
                  <rect x="70" y="200" width="45" height="30" rx="3" fill="#0f172a" stroke="#0ea5e9" strokeWidth="1.5" />
                  <rect x="65" y="230" width="55" height="10" rx="2" fill="#334155" />
                  <circle cx="92.5" cy="235" r="3" fill="#38bdf8" />
                  <text x="92.5" y="193" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle">C-CLAMP BASE</text>

                  {/* Base Turntable & Servo */}
                  <rect x="80" y="170" width="25" height="32" rx="4" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <circle cx="92.5" cy="170" r="10" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                  <circle cx="92.5" cy="170" r="4" fill="#38bdf8" />
                  
                  {/* Link 1: Shoulder Link */}
                  <line x1="92.5" y1="170" x2="195" y2="85" stroke="url(#armMetal)" strokeWidth="10" strokeLinecap="round" />
                  <line x1="92.5" y1="170" x2="195" y2="85" stroke="#bae6fd" strokeWidth="2" strokeDasharray="3 3" />

                  {/* Shoulder Actuator Detail */}
                  <circle cx="140" cy="125" r="3" fill="#0284c7" />

                  {/* Joint 2: Elbow Servo */}
                  <circle cx="195" cy="85" r="14" fill="#0f172a" stroke="#0ea5e9" strokeWidth="2.5" />
                  <circle cx="195" cy="85" r="6" fill="#38bdf8" />
                  <text x="195" y="62" fill="#7dd3fc" fontSize="9" fontFamily="monospace" textAnchor="middle">ELBOW SERVO (J2)</text>

                  {/* Link 2: Forearm */}
                  <line x1="195" y1="85" x2="330" y2="125" stroke="url(#armMetal)" strokeWidth="8" strokeLinecap="round" />

                  {/* Joint 3: Wrist Rotator */}
                  <circle cx="330" cy="125" r="11" fill="#0f172a" stroke="#14b8a6" strokeWidth="2" />
                  <circle cx="330" cy="125" r="4" fill="#2dd4bf" />
                  <text x="330" y="105" fill="#2dd4bf" fontSize="9" fontFamily="monospace" textAnchor="middle">WRIST ROLL (J3)</text>

                  {/* Spoon Rod & Holder */}
                  <line x1="330" y1="125" x2="385" y2="155" stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />

                  {/* Spoon Head */}
                  <path d="M 385 155 Q 405 160 415 150 Q 425 140 405 145 Z" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1.5" />
                  <ellipse cx="405" cy="150" rx="4" ry="2" fill="#f59e0b" />
                  
                  {/* Plate / Bowl */}
                  <ellipse cx="405" cy="220" rx="42" ry="12" fill="#1e293b" stroke="#0ea5e9" strokeWidth="1.5" />
                  <ellipse cx="405" cy="218" rx="32" ry="8" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                  <ellipse cx="405" cy="216" rx="20" ry="4" fill="rgba(245, 158, 11, 0.25)" />
                  <text x="405" y="240" fill="#94a3b8" fontSize="9" fontFamily="monospace" textAnchor="middle">DINING BOWL</text>

                  {/* Feeding Trajectory Arc */}
                  <path d="M 405 145 C 430 110, 470 90, 485 70" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="485" cy="70" r="4" fill="#06b6d4" />
                  <text x="485" y="55" fill="#38bdf8" fontSize="9" fontFamily="monospace" textAnchor="middle">USER FEEDING ZONE</text>
                </svg>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-[11px] text-cyan-400">Simulated 4-DOF Table Mount Architecture</span>
                <span className="text-[11px] text-slate-400">Target Controller: ESP32 NodeMCU</span>
              </div>
            </div>

            {/* Right: Key Specs & Pillars */}
            <div className="w-full lg:w-2/5 space-y-4">
              <h3 className="text-xl font-bold text-white tracking-tight">Key Architectural Highlights</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Engineered to bring assistive independence through low-latency software interfaces and smooth servo motion profiles.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800/50 shrink-0">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Full Software Simulation</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Accurate 2-link kinematics and spoon rotation simulation with bounding limit protections.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-blue-950 text-blue-400 border border-blue-800/50 shrink-0">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">ESP32 Hardware Pathway</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Prepared command framing ready to bridge to physical servo drivers over Serial/UART.
                    </p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80 flex items-start space-x-3">
                  <div className="p-2 rounded-lg bg-teal-950 text-teal-400 border border-teal-800/50 shrink-0">
                    <ShieldAlert className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Safety-First Design</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Instant emergency stop override, calibrated travel limits, and pre-clinical safety protocols.
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
