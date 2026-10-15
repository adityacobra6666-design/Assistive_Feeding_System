import React from 'react';
import { ArrowRight, Sliders, Cpu, Cog, ShieldCheck, CornerDownLeft } from 'lucide-react';

export default function HowItWorksView({ onBackToControl }) {
  const steps = [
    {
      num: '1',
      title: 'User Interface & Input',
      desc: 'Users trigger directional translation (X, Y) and spoon rotation through accessible on-screen buttons or keyboard shortcuts (Arrow keys, Q/E).',
      badge: 'Live in Simulation',
      badgeColor: 'teal',
      icon: Sliders
    },
    {
      num: '2',
      title: 'Kinematics & Limit Verification',
      desc: 'The software validates that the requested move remains within the permitted safe envelope and calculates 2-link inverse kinematics for shoulder and elbow angles.',
      badge: 'Live in Simulation',
      badgeColor: 'teal',
      icon: Cog
    },
    {
      num: '3',
      title: 'Planned ESP32 Hardware Bridge',
      desc: 'Serialized JSON command packets will be received by an ESP32 microcontroller over UART/Serial to drive physical PWM servo motors on a table-mounted arm.',
      badge: 'Planned Integration',
      badgeColor: 'amber',
      icon: Cpu
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-sm">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight">How the System Works</h2>
            <p className="text-sm text-slate-500 mt-1">
              A practical overview of the control flow from software commands to planned hardware actuation.
            </p>
          </div>
          <button
            onClick={onBackToControl}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-teal-700 hover:bg-teal-800 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
            <span>Open Control Panel</span>
          </button>
        </div>

        {/* 3 Step Practical Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="p-4 rounded-lg bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 font-mono text-xs font-bold flex items-center justify-center">
                      {step.num}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                        step.badgeColor === 'teal'
                          ? 'bg-teal-50 text-teal-800 border border-teal-200'
                          : 'bg-amber-50 text-amber-800 border border-amber-200'
                      }`}
                    >
                      {step.badge}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-800 mb-1.5">{step.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear Engineering Note */}
        <div className="p-3.5 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-start space-x-2.5">
          <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-800">Note on Hardware Status:</strong> Physical ESP32 microcontroller and servo motor connections are currently in development. The simulation workspace demonstrates complete kinematic calculations and boundary enforcement.
          </div>
        </div>

      </div>
    </div>
  );
}
