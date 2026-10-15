import React from 'react';
import {
  Cpu,
  ArrowRight,
  Monitor,
  Binary,
  Radio,
  Cog,
  Utensils,
  CheckCircle2,
  AlertCircle,
  Code,
  Layers,
  Zap
} from 'lucide-react';

export default function TechnologySection() {
  const steps = [
    {
      step: '01',
      title: 'User Interface Input',
      desc: 'User triggers directional translation or spoon rotation through accessible web buttons or keyboard shortcuts.',
      icon: Monitor,
      status: 'simulated',
      badge: 'Current Simulation',
      subtext: 'React State Event Triggered'
    },
    {
      step: '02',
      title: 'Command Serialization',
      desc: 'Software computes inverse kinematics, enforces safe movement bounds, and packages the command into a structured JSON/UART frame.',
      icon: Binary,
      status: 'simulated',
      badge: 'Current Simulation',
      subtext: 'Kinematics & Boundary Engine'
    },
    {
      step: '03',
      title: 'ESP32 Microcontroller',
      desc: 'Dedicated low-latency MCU receives the serialized instructions via serial UART or local Wi-Fi/Bluetooth communication bus.',
      icon: Cpu,
      status: 'planned',
      badge: 'Planned Integration',
      subtext: 'FreeRTOS Task Dispatcher'
    },
    {
      step: '04',
      title: 'Servo Motor Actuation',
      desc: 'High-torque PWM servo motors (Shoulder, Elbow, Wrist Roll) translate angle calculations into calibrated mechanical movement.',
      icon: Cog,
      status: 'planned',
      badge: 'Planned Integration',
      subtext: 'PWM Precision Pulse Driver'
    },
    {
      step: '05',
      title: 'Spoon Positioning & Feeding',
      desc: 'Robotic arm moves through table-safe trajectory, safely positioning the spoon near the food receptacle or user delivery zone.',
      icon: Utensils,
      status: 'planned',
      badge: 'Planned Integration',
      subtext: 'Target Trajectory Reached'
    },
  ];

  const techStack = [
    {
      category: 'Frontend Framework',
      tech: 'React 18 & Vite',
      role: 'High-performance reactive rendering with fast HMR and lightweight bundle size.',
      status: 'Implemented',
      color: 'cyan'
    },
    {
      category: 'UI & Controls',
      tech: 'Tailwind CSS & Lucide',
      role: 'Accessible, high-contrast, tremor-tolerant touch targets and keyboard navigation hooks.',
      status: 'Implemented',
      color: 'teal'
    },
    {
      category: 'Future Hardware Controller',
      tech: 'ESP32-WROOM-32 MCU',
      role: 'Dual-core 240MHz microcontroller for real-time PWM servo timing and hardware safety loop.',
      status: 'Planned Hardware',
      color: 'amber'
    },
    {
      category: 'Future Actuators',
      tech: 'Metal-Gear Servos (MG996R/SG90)',
      role: 'Multi-axis articulated joint actuation providing stable torque for spoon payload.',
      status: 'Planned Hardware',
      color: 'amber'
    },
    {
      category: 'Future Communication',
      tech: 'Serial / WebSockets over Wi-Fi',
      role: 'Bidirectional low-latency telemetry bus connecting web software to embedded firmware.',
      status: 'Planned Hardware',
      color: 'amber'
    },
    {
      category: 'Kinematics & Safety',
      tech: '2-Link Planar IK Model',
      role: 'Calculates shoulder and elbow angles while verifying software bounding box limits.',
      status: 'Implemented',
      color: 'cyan'
    }
  ];

  return (
    <section id="technology" className="py-16 border-t border-slate-800/80 bg-slate-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-800/40">
            <Cpu className="w-3.5 h-3.5" />
            <span>Hardware-Software Integration Blueprint</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technology & Working Principle
          </h2>
          <p className="text-base text-slate-300 mt-4 leading-relaxed">
            The end-to-end signal flow bridges intuitive assistive software inputs to physical mechanical movement.
            Below is the verified architecture detailing what is live in simulation today versus planned for physical hardware deployment.
          </p>
        </div>

        {/* Step-by-Step Architecture Flowchart */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {steps.map((item, index) => {
              const Icon = item.icon;
              const isSim = item.status === 'simulated';
              return (
                <div key={item.step} className="relative group">
                  <div
                    className={`h-full rounded-2xl p-5 border flex flex-col justify-between transition-all duration-200 ${
                      isSim
                        ? 'bg-slate-900/80 border-cyan-500/40 shadow-lg shadow-cyan-950/40 hover:border-cyan-400'
                        : 'bg-slate-900/50 border-amber-500/30 shadow-lg shadow-amber-950/20 hover:border-amber-400'
                    }`}
                  >
                    <div>
                      {/* Top Header */}
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-mono font-bold text-slate-500">{item.step}</span>
                        <span
                          className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                            isSim
                              ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                              : 'bg-amber-950 text-amber-300 border border-amber-800'
                          }`}
                        >
                          {item.badge}
                        </span>
                      </div>

                      {/* Icon */}
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${
                          isSim
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>

                      {/* Content */}
                      <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] font-mono text-slate-500">
                      {item.subtext}
                    </div>
                  </div>

                  {/* Flow Arrow (Hidden on last item and mobile) */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 items-center justify-center text-slate-400">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Technology Stack Grid */}
        <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">Proposed Engineering Stack</h3>
              <p className="text-xs text-slate-400 mt-1">Modular components designed for reliable assistive autonomy.</p>
            </div>
            <div className="flex items-center space-x-3 text-xs font-mono">
              <span className="flex items-center space-x-1.5 text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>Software Layer</span>
              </span>
              <span className="flex items-center space-x-1.5 text-amber-400">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Embedded Hardware</span>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {techStack.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/90 hover:border-slate-700 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono uppercase text-slate-500">{item.category}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
                      item.color === 'cyan'
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                        : item.color === 'teal'
                        ? 'bg-teal-950 text-teal-300 border border-teal-800'
                        : 'bg-amber-950 text-amber-300 border border-amber-800'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-white mb-1.5">{item.tech}</h5>
                <p className="text-xs text-slate-400 leading-relaxed">{item.role}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
