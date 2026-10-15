import React from 'react';
import {
  ShieldAlert,
  HeartHandshake,
  Users,
  AlertTriangle,
  FileText,
  Sparkles,
  CheckCircle,
  HelpCircle,
  Lock
} from 'lucide-react';

export default function ProjectInfoSafety() {
  return (
    <section id="safety" className="py-16 border-t border-slate-800/80 bg-slate-950/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-cyan-400 mb-3 bg-cyan-950/60 px-3 py-1 rounded-md border border-cyan-800/40">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>Clinical Context & Research Ethics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Project Information & Safety Standards
          </h2>
          <p className="text-base text-slate-300 mt-4 leading-relaxed">
            Assistive robotics must balance user empowerment with rigorous safety boundaries.
            Here is the clinical motivation, intended target population, current prototype scope, and ethical testing boundaries.
          </p>
        </div>

        {/* 4 Cards: Problem, Solution, Users, Accessibility */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          {/* Card 1: The Real-World Challenge */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 rounded-xl bg-red-950/60 text-red-400 border border-red-800/50">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-red-400 uppercase">The Challenge</span>
                <h3 className="text-lg font-bold text-white">Loss of Feeding Autonomy</h3>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Conditions such as Parkinson's disease, essential tremor, amyotrophic lateral sclerosis (ALS), spinal cord injury, cerebral palsy, and post-stroke paresis can severely compromise fine motor control. 
              The inability to hold and manipulate standard cutlery often forces reliance on caregivers, causing emotional frustration and reduced dietary independence.
            </p>
          </div>

          {/* Card 2: The Proposed Solution */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 rounded-xl bg-cyan-950/60 text-cyan-400 border border-cyan-800/50">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase">The Engineering Solution</span>
                <h3 className="text-lg font-bold text-white">Software-Controlled Robotic Feeder</h3>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              A stable, table-mounted articulated arm controlled through simple, tremor-tolerant digital inputs. 
              By translating deliberate low-frequency directional inputs into smooth, velocity-capped servo motions, the user remains in complete command of every bite without requiring physical grip strength.
            </p>
          </div>

          {/* Card 3: Intended User Population */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 rounded-xl bg-teal-950/60 text-teal-400 border border-teal-800/50">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-teal-400 uppercase">Target Users</span>
                <h3 className="text-lg font-bold text-white">Individuals with Limited Hand Mobility</h3>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Designed specifically for individuals who retain cognitive awareness and upper-body head/neck orientation, but experience tremors, spasticity, muscle weakness, or paralysis that make handling a standard spoon difficult or exhausting.
            </p>
          </div>

          {/* Card 4: User-Controlled Empowerment */}
          <div className="glass-panel rounded-2xl p-6 border border-slate-800">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2.5 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-800/50">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono text-blue-400 uppercase">Accessibility Philosophy</span>
                <h3 className="text-lg font-bold text-white">Agency & Pace Control</h3>
              </div>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Unlike fully autonomous systems that feed on an automatic timer, this system centers user agency. 
              The user dictates when the spoon descends, when it scoops, and when it reaches the mouth, restoring the psychological comfort of self-paced eating.
            </p>
          </div>

        </div>

        {/* Mandatory Research & Medical Disclaimer Banner */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-red-950/40 via-amber-950/30 to-red-950/40 border-2 border-amber-600/50 shadow-2xl relative overflow-hidden">
          <div className="flex items-start space-x-4">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 shrink-0">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  Regulatory & Safety Declaration
                </span>
                <span className="text-xs text-slate-400 font-mono">Academic Prototype Notice</span>
              </div>
              
              <h4 className="text-lg font-bold text-white">
                Simulation Scope — Not a Certified Medical Device
              </h4>

              <div className="text-xs sm:text-sm text-slate-300 space-y-2 leading-relaxed">
                <p>
                  <strong>1. Software Simulation Disclaimer:</strong> This web application serves strictly as an interactive software simulation for college research and academic demonstration (Innovative Design Project - IDP 2.0). It does not claim proven clinical efficacy, diagnostic capability, or regulatory medical approval.
                </p>
                <p>
                  <strong>2. Prototype Testing Protocol:</strong> Initial physical hardware validation (Stage 2 & 3) will be conducted exclusively using dummy food substances (such as applesauce, gelatin, or simulated rice) and a stationary mannequin target. No human trials will be performed prior to formal institutional ethical review, torque-limiting mechanical failsafes, and emergency shutoff verification.
                </p>
                <p>
                  <strong>3. Planned Physical Safety Measures:</strong> Future hardware builds will mandate redundant safety mechanisms: mechanical torque slip-clutches to prevent excessive force, software velocity caps, physical hardware kill-switches, and proximity optical barriers.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono text-amber-300/80">
                <span>• Strict Pre-Clinical Testing Only</span>
                <span>• Zero Diagnostic or Clinical Claims</span>
                <span>• Safe Laboratory Protocol Mandated</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
