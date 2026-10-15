import React, { useMemo } from 'react';
import { AlertCircle, ShieldAlert } from 'lucide-react';

export default function RoboticArmVisualization({
  x,
  y,
  rotation,
  activeDirection,
  emergencyStopped,
  limits,
  speedMode,
  lastCommand,
  trajectoryHistory = []
}) {
  // SVG Canvas dimensions: 580 x 390
  // Kinematic calculations:
  // Base shoulder pivot origin
  const shoulderOrigin = { x: 100, y: 250 };
  const L1 = 140; // Upper arm length
  const L2 = 120; // Forearm length
  const L3 = 48;  // Spoon length

  // Map simulated coordinates (X: 20-280, Y: 10-200) to SVG canvas coordinates
  const targetWrist = useMemo(() => {
    const svgX = 130 + ((x - 20) / (280 - 20)) * (430 - 130);
    const svgY = 285 - ((y - 10) / (200 - 10)) * (285 - 85);
    return { x: svgX, y: svgY };
  }, [x, y]);

  // Compute 2-link Inverse Kinematics for shoulder & elbow
  const { elbow, shoulderAngleDeg, elbowAngleDeg } = useMemo(() => {
    const dx = targetWrist.x - shoulderOrigin.x;
    const dy = targetWrist.y - shoulderOrigin.y;
    let dist = Math.sqrt(dx * dx + dy * dy);

    // Clamp distance to ensure reachability
    const maxReach = L1 + L2 - 2;
    const minReach = Math.abs(L1 - L2) + 2;
    dist = Math.max(minReach, Math.min(dist, maxReach));

    const alpha = Math.atan2(dy, dx);
    const cosBeta = (L1 * L1 + dist * dist - L2 * L2) / (2 * L1 * dist);
    const beta = Math.acos(Math.max(-1, Math.min(1, cosBeta)));

    // Elbow-up solution
    const theta1 = alpha - beta;
    const ex = shoulderOrigin.x + L1 * Math.cos(theta1);
    const ey = shoulderOrigin.y + L1 * Math.sin(theta1);

    const cosElbow = (L1 * L1 + L2 * L2 - dist * dist) / (2 * L1 * L2);
    const elbowAngle = Math.PI - Math.acos(Math.max(-1, Math.min(1, cosElbow)));

    return {
      elbow: { x: ex, y: ey },
      shoulderAngleDeg: Math.round((theta1 * 180) / Math.PI),
      elbowAngleDeg: Math.round((elbowAngle * 180) / Math.PI),
    };
  }, [targetWrist]);

  // Spoon angle orientation
  const spoonTip = useMemo(() => {
    const rad = (rotation * Math.PI) / 180;
    const sx = targetWrist.x + L3 * Math.cos(rad);
    const sy = targetWrist.y + L3 * Math.sin(rad);
    return { x: sx, y: sy };
  }, [targetWrist, rotation]);

  // Check boundaries
  const atBoundaryXMin = x <= limits.minX;
  const atBoundaryXMax = x >= limits.maxX;
  const atBoundaryYMin = y <= limits.minY;
  const atBoundaryYMax = y >= limits.maxY;
  const isAtLimit = atBoundaryXMin || atBoundaryXMax || atBoundaryYMin || atBoundaryYMax;

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm">
      
      {/* Top Telemetry & Status Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
          <span className="text-xs font-semibold text-slate-800 tracking-wide uppercase">
            Live Kinematic Workspace
          </span>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-[11px] text-slate-600 font-medium">
          <AlertCircle className="w-3.5 h-3.5 text-slate-500" />
          <span>Simulated Arm — No Physical Hardware Connected</span>
        </div>
      </div>

      {/* SVG Canvas Container */}
      <div className="relative flex-1 bg-[#fafafa] rounded-lg border border-slate-200 overflow-hidden min-h-[360px] flex items-center justify-center">
        
        <svg
          viewBox="0 0 580 380"
          className="w-full h-full max-h-[440px] select-none"
        >
          <defs>
            {/* Fine coordinate grid for engineering view */}
            <pattern id="lightGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
            </pattern>
            <pattern id="majorGridLight" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#e2e8f0" strokeWidth="1" />
            </pattern>

            {/* Arm Gradients - Realistic Matte Metal Finish */}
            <linearGradient id="armLinkLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#64748b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>

            <linearGradient id="forearmLinkLight" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0f766e" />
              <stop offset="50%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>

            <linearGradient id="spoonSteel" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="50%" stopColor="#94a3b8" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>

          {/* Grids */}
          <rect width="580" height="380" fill="url(#lightGrid)" />
          <rect width="580" height="380" fill="url(#majorGridLight)" />

          {/* Safe Workspace Bounding Box */}
          <rect
            x="125"
            y="75"
            width="315"
            height="215"
            fill="none"
            stroke="#cbd5e1"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            rx="4"
          />
          <text x="135" y="90" fill="#94a3b8" fontSize="9" fontFamily="monospace">
            PERMITTED ENVELOPE [X: 20-280, Y: 10-200]
          </text>

          {/* Dining Table Surface */}
          <rect x="20" y="300" width="540" height="20" rx="3" fill="#e2e8f0" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="20" y1="300" x2="560" y2="300" stroke="#94a3b8" strokeWidth="1.5" />
          <text x="290" y="314" fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle">
            TABLE LEVEL (Y = 0mm)
          </text>

          {/* Table C-Clamp & Base Mount */}
          <g id="tableClamp">
            <rect x="65" y="275" width="55" height="30" rx="2" fill="#334155" stroke="#1e293b" strokeWidth="1.5" />
            <rect x="60" y="305" width="65" height="15" rx="2" fill="#1e293b" />
            <line x1="75" y1="320" x2="110" y2="320" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="92.5" cy="328" r="4" fill="#64748b" />
            <text x="92.5" y="270" fill="#475569" fontSize="8" fontFamily="monospace" textAnchor="middle">
              C-CLAMP BASE
            </text>
          </g>

          {/* Base Turntable & Shoulder Servo */}
          <g id="baseTurntable">
            <rect x="85" y="240" width="30" height="35" rx="3" fill="#1e293b" />
            <line x1="90" y1="255" x2="110" y2="255" stroke="#0d9488" strokeWidth="2" />
            <circle cx={shoulderOrigin.x} cy={shoulderOrigin.y} r="16" fill="#334155" stroke="#0f766e" strokeWidth="2" />
            <circle cx={shoulderOrigin.x} cy={shoulderOrigin.y} r="7" fill="#0f766e" />
            <circle cx={shoulderOrigin.x} cy={shoulderOrigin.y} r="3" fill="#ffffff" />
          </g>

          {/* Plate on Table */}
          <g id="diningPlate" transform="translate(400, 292)">
            <ellipse cx="0" cy="8" rx="55" ry="12" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <ellipse cx="0" cy="6" rx="42" ry="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1" />
            <ellipse cx="0" cy="5" rx="28" ry="4" fill="#fed7aa" opacity="0.7" />
            <circle cx="-5" cy="5" r="2" fill="#ea580c" opacity="0.8" />
            <circle cx="5" cy="6" r="2" fill="#f97316" opacity="0.8" />
            <circle cx="10" cy="4" r="1.5" fill="#c2410c" opacity="0.8" />
            <text x="0" y="26" fill="#64748b" fontSize="8" fontFamily="monospace" textAnchor="middle">
              FOOD PLATE
            </text>
          </g>

          {/* Target User Zone */}
          <g id="userFeedingZone" transform="translate(495, 110)">
            <circle cx="0" cy="0" r="22" fill="#f0fdfa" stroke="#0d9488" strokeWidth="1.2" strokeDasharray="3 3" />
            <circle cx="0" cy="0" r="6" fill="#0d9488" opacity="0.2" />
            <text x="0" y="-14" fill="#0f766e" fontSize="8" fontFamily="monospace" textAnchor="middle">
              TARGET FEEDING
            </text>
          </g>

          {/* Trajectory Trail */}
          {trajectoryHistory.length > 1 && (
            <path
              d={trajectoryHistory
                .map((pt, i) => {
                  const svgX = 130 + ((pt.x - 20) / (280 - 20)) * (430 - 130);
                  const svgY = 285 - ((pt.y - 10) / (200 - 10)) * (285 - 85);
                  return `${i === 0 ? 'M' : 'L'} ${svgX} ${svgY}`;
                })
                .join(' ')}
              fill="none"
              stroke="#0d9488"
              strokeWidth="2"
              strokeDasharray="3 3"
              opacity="0.35"
            />
          )}

          {/* Link 1: Upper Arm (Shoulder -> Elbow) */}
          <line
            x1={shoulderOrigin.x}
            y1={shoulderOrigin.y}
            x2={elbow.x}
            y2={elbow.y}
            stroke="url(#armLinkLight)"
            strokeWidth="12"
            strokeLinecap="round"
            className="transition-all duration-200 ease-out"
          />
          <line
            x1={shoulderOrigin.x}
            y1={shoulderOrigin.y}
            x2={elbow.x}
            y2={elbow.y}
            stroke="#94a3b8"
            strokeWidth="2"
            strokeDasharray="3 3"
            className="transition-all duration-200 ease-out"
          />

          {/* Link 2: Forearm (Elbow -> Wrist) */}
          <line
            x1={elbow.x}
            y1={elbow.y}
            x2={targetWrist.x}
            y2={targetWrist.y}
            stroke="url(#forearmLinkLight)"
            strokeWidth="9"
            strokeLinecap="round"
            className="transition-all duration-200 ease-out"
          />

          {/* Elbow Joint (Servo J2) */}
          <g id="elbowJoint" className="transition-all duration-200 ease-out">
            <circle cx={elbow.x} cy={elbow.y} r="13" fill="#ffffff" stroke="#334155" strokeWidth="2.5" />
            <circle cx={elbow.x} cy={elbow.y} r="6" fill="#0f766e" />
            <circle cx={elbow.x} cy={elbow.y} r="2" fill="#ffffff" />
            <text x={elbow.x} y={elbow.y - 16} fill="#475569" fontSize="8" fontFamily="monospace" textAnchor="middle">
              J2: {elbowAngleDeg}°
            </text>
          </g>

          {/* Wrist Joint (Servo J3) */}
          <g id="wristJoint" className="transition-all duration-200 ease-out">
            <circle cx={targetWrist.x} cy={targetWrist.y} r="10" fill="#ffffff" stroke="#0f766e" strokeWidth="2" />
            <circle cx={targetWrist.x} cy={targetWrist.y} r="4" fill="#0f766e" />
          </g>

          {/* Spoon Assembly (Rotates around wrist axis) */}
          <g
            id="spoonAssembly"
            className="transition-all duration-200 ease-out"
            style={{
              transformOrigin: `${targetWrist.x}px ${targetWrist.y}px`,
              transform: `rotate(${rotation}deg)`,
            }}
          >
            {/* Spoon Shank */}
            <line
              x1={targetWrist.x}
              y1={targetWrist.y}
              x2={targetWrist.x + L3}
              y2={targetWrist.y}
              stroke="url(#spoonSteel)"
              strokeWidth="5"
              strokeLinecap="round"
            />

            {/* Spoon Bowl */}
            <path
              d={`M ${targetWrist.x + L3} ${targetWrist.y - 5} 
                  Q ${targetWrist.x + L3 + 24} ${targetWrist.y - 8} ${targetWrist.x + L3 + 30} ${targetWrist.y} 
                  Q ${targetWrist.x + L3 + 24} ${targetWrist.y + 8} ${targetWrist.x + L3} ${targetWrist.y + 5} Z`}
              fill="#cbd5e1"
              stroke="#64748b"
              strokeWidth="1.5"
            />

            {/* Food Morsel on Spoon */}
            <ellipse
              cx={targetWrist.x + L3 + 14}
              cy={targetWrist.y}
              rx="5"
              ry="2.5"
              fill="#ea580c"
            />

            {/* Spoon Rotation Angle Arc */}
            <circle
              cx={targetWrist.x}
              cy={targetWrist.y}
              r="20"
              fill="none"
              stroke="#0d9488"
              strokeWidth="1"
              strokeDasharray="2 2"
              opacity="0.5"
            />
          </g>

          {/* Active Direction Arrow / Label */}
          {activeDirection && !emergencyStopped && (
            <g transform={`translate(${targetWrist.x}, ${targetWrist.y - 32})`}>
              <rect x="-32" y="-12" width="64" height="20" rx="3" fill="#1e293b" />
              <text x="0" y="2" fill="#ffffff" fontSize="9" fontFamily="monospace" fontWeight="bold" textAnchor="middle">
                {activeDirection.toUpperCase()}
              </text>
            </g>
          )}

          {/* Emergency Stop Visual Flash */}
          {emergencyStopped && (
            <g transform="translate(290, 190)">
              <rect x="-110" y="-24" width="220" height="48" rx="6" fill="#fee2e2" stroke="#dc2626" strokeWidth="2" />
              <text x="0" y="-3" fill="#b91c1c" fontSize="12" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
                STOP ACTIVE
              </text>
              <text x="0" y="13" fill="#7f1d1d" fontSize="9" fontFamily="monospace" textAnchor="middle">
                MOTORS HALTED
              </text>
            </g>
          )}
        </svg>

        {/* Boundary Alert Overlay */}
        {isAtLimit && !emergencyStopped && (
          <div className="absolute top-3 right-3 flex items-center space-x-1.5 px-2.5 py-1 rounded bg-amber-50 border border-amber-300 text-amber-800 text-xs shadow-sm">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
            <span className="font-mono text-[11px] font-medium">Boundary Limit Reached</span>
          </div>
        )}

        {/* Compact Workspace Position HUD Bar (Light Theme) */}
        <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
          <div className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 shadow-xs">
            <span className="text-slate-400 mr-1">X:</span>
            <span className="font-bold text-slate-900">{x} mm</span>
          </div>
          <div className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 shadow-xs">
            <span className="text-slate-400 mr-1">Y:</span>
            <span className="font-bold text-slate-900">{y} mm</span>
          </div>
          <div className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 shadow-xs">
            <span className="text-slate-400 mr-1">ANGLE:</span>
            <span className="font-bold text-teal-700">{rotation > 0 ? `+${rotation}` : rotation}°</span>
          </div>
          <div className="px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 shadow-xs">
            <span className="text-slate-400 mr-1">SPEED:</span>
            <span className="font-bold uppercase text-slate-800">{speedMode}</span>
          </div>
        </div>

      </div>

      {/* Joint Summary Bar */}
      <div className="mt-3 pt-2 grid grid-cols-3 gap-2 text-xs text-slate-600">
        <div className="p-2 rounded bg-slate-50 border border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Shoulder (J1):</span>
          <span className="font-mono font-semibold text-slate-800">{shoulderAngleDeg}°</span>
        </div>
        <div className="p-2 rounded bg-slate-50 border border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Elbow (J2):</span>
          <span className="font-mono font-semibold text-slate-800">{elbowAngleDeg}°</span>
        </div>
        <div className="p-2 rounded bg-slate-50 border border-slate-100 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">Spoon Roll (J3):</span>
          <span className="font-mono font-semibold text-teal-700">{rotation}°</span>
        </div>
      </div>

    </div>
  );
}
