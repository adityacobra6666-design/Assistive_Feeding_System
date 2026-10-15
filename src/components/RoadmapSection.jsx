import React from 'react';
import {
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Cpu,
  ShieldAlert,
  Sliders,
  Scale,
  Microscope,
  RotateCw
} from 'lucide-react';

export default function RoadmapSection() {
  const stages = [
    {
      stage: 'Stage 1',
      title: 'Current Software Prototype',
      status: 'Current Milestone',
      statusType: 'completed',
      timeline: 'Completed / Active Simulation',
      description: 'The foundational software and kinematic simulation layer enabling full user interaction testing before physical hardware deployment.',
      features: [
        { name: 'Interactive Arm Simulation', detail: 'Real-time 2-link inverse kinematics and visual SVG viewport rendering' },
        { name: 'Directional & Rotation Controls', detail: 'D-Pad planar translation and dedicated wrist roll spoon rotation' },
        { name: 'Instant Emergency Stop', detail: 'Fail-safe movement halt, queue clear, and position lock' },
        { name: 'Dynamic System Status', detail: 'Live telemetry cards displaying X, Y coordinates, rotation, speed, and command count' },
        { name: 'Movement History & Logging', detail: 'Real-time activity audit log with JSON export capability' },
      ],
      badgeColor: 'emerald'
    },
    {
      stage: 'Stage 2',
      title: 'Physical Hardware Integration',
      status: 'Planned Next Phase',
      statusType: 'planned',
      timeline: 'Upcoming Milestone',
      description: 'Fabrication of the table-mount chassis and integration of physical servo actuators controlled by an ESP32 microcontroller.',
      features: [
        { name: 'Table-Mounted Mechanical Chassis', detail: 'Rigid C-clamp base with 3D printed / CNC aluminum articulating links' },
        { name: 'Servo Motor Control via ESP32', detail: 'High-torque PWM servo motors driven by ESP32 microcontroller firmware' },
        { name: 'Actual Serial Movement Commands', detail: 'UART/Serial bus bridge executing commands on physical motors' },
        { name: 'Verified Connection & Error Handling', detail: 'Bidirectional heartbeat, watchdog timers, and disconnection fallbacks' },
        { name: 'Physical Emergency-Stop Hardware', detail: 'Hardwired physical kill-switch alongside software abort signals' },
      ],
      badgeColor: 'amber'
    },
    {
      stage: 'Stage 3',
      title: 'Advanced Assistance & Testing',
      status: 'Future Research & Validation',
      statusType: 'planned',
      timeline: 'Long-term Roadmap',
      description: 'Sensor feedback closed-loop stabilization, controlled spillage testing, and clinical safety compliance analysis.',
      features: [
        { name: 'Sensor-Based Spoon Angle Stabilization', detail: 'IMU/gyroscope feedback at spoon holder for active tilt stabilization' },
        { name: 'Controlled Spillage Measurement', detail: 'Quantitative evaluation of liquid and solid food retention during transit' },
        { name: 'Movement Accuracy & Repeatability Analysis', detail: 'Optical tracking to benchmark millimeter-level trajectory precision' },
        { name: 'Adjustable Speed & Tremor Sensitivity', detail: 'Personalized filtering profiles tailored to user-specific tremor frequencies' },
        { name: 'Controlled Test Condition Benchmarks', detail: 'Comparative performance trials using dummy food and standardized targets' },
      ],
      badgeColor: 'blue'
    },
  ];

  return (
    <section id="roadmap" className="py-16 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-teal-400 mb-3 bg-teal-950/60 px-3 py-1 rounded-md border border-teal-800/40">
            <Layers className="w-3.5 h-3.5" />
            <span>Development Trajectory</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Future Enhancements & Roadmap
          </h2>
          <p className="text-base text-slate-300 mt-4 leading-relaxed">
            Our structured three-stage roadmap spans current simulation validation to full hardware deployment and closed-loop testing.
            All future features are clearly delineated as planned objectives.
          </p>
        </div>

        {/* 3-Stage Timeline Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {stages.map((stage) => {
            const isDone = stage.statusType === 'completed';
            return (
              <div
                key={stage.stage}
                className={`glass-panel rounded-2xl p-6 sm:p-7 border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 ${
                  isDone
                    ? 'border-emerald-500/40 shadow-xl shadow-emerald-950/20'
                    : 'border-slate-800 hover:border-slate-700 shadow-xl'
                }`}
              >
                <div>
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
                      {stage.stage}
                    </span>
                    <span
                      className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full flex items-center space-x-1.5 ${
                        isDone
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {isDone ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          <span>{stage.status}</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3 text-amber-400" />
                          <span>{stage.status}</span>
                        </>
                      )}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">{stage.title}</h3>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed">{stage.description}</p>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-2 border-t border-slate-800/80">
                    {stage.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start space-x-3 text-xs">
                        <div className="mt-0.5">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-amber-500/60 flex items-center justify-center shrink-0">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-200">{feat.name}</p>
                          <p className="text-[11px] text-slate-400 mt-0.5">{feat.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="mt-8 pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                  <span>{stage.timeline}</span>
                  <span className={isDone ? 'text-emerald-400' : 'text-amber-400'}>
                    {isDone ? '● OPERATIONAL' : '○ PENDING HARDWARE'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
