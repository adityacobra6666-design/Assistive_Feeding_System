import React from 'react';
import {
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  RotateCw,
  OctagonAlert,
  RotateCcw as ResetIcon,
  Gauge,
  Keyboard,
  Play
} from 'lucide-react';

export default function MovementControls({
  onMove,
  onRotate,
  onEmergencyStop,
  onReset,
  speedMode,
  setSpeedMode,
  emergencyStopped,
  activeDirection,
  x,
  y,
  rotation,
  limits,
  onRunScoopCycle,
  isAutonomousRunning
}) {
  const speedConfigs = {
    slow: { label: 'Slow', step: 5, rotStep: 5, desc: '5mm / 5°' },
    normal: { label: 'Normal', step: 15, rotStep: 15, desc: '15mm / 15°' },
    fast: { label: 'Fast', step: 30, rotStep: 30, desc: '30mm / 30°' },
  };

  const currentConfig = speedConfigs[speedMode];

  // Boundaries checks
  const canMoveUp = y + currentConfig.step <= limits.maxY && !emergencyStopped;
  const canMoveDown = y - currentConfig.step >= limits.minY && !emergencyStopped;
  const canMoveLeft = x - currentConfig.step >= limits.minX && !emergencyStopped;
  const canMoveRight = x + currentConfig.step <= limits.maxX && !emergencyStopped;
  const canRotateLeft = rotation - currentConfig.rotStep >= limits.minRot && !emergencyStopped;
  const canRotateRight = rotation + currentConfig.rotStep <= limits.maxRot && !emergencyStopped;

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-4">
      
      {/* Top Header: Title & Speed Selector */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
        <div>
          <h3 className="text-xs font-semibold text-slate-800 tracking-wide uppercase">
            Movement Controller
          </h3>
          <p className="text-[11px] text-slate-500">Directional translation & spoon orientation</p>
        </div>

        {/* Speed Selector */}
        <div className="flex items-center space-x-1 p-0.5 rounded-md bg-slate-100 border border-slate-200 text-xs">
          {['slow', 'normal', 'fast'].map((mode) => (
            <button
              key={mode}
              onClick={() => setSpeedMode(mode)}
              className={`px-2 py-0.5 rounded text-[11px] font-medium capitalize transition-colors ${
                speedMode === mode
                  ? 'bg-white text-teal-800 font-semibold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Emergency Stop Notice Banner */}
      {emergencyStopped && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <OctagonAlert className="w-4 h-4 text-red-600 shrink-0" />
            <span className="font-semibold">Movement Halted (Emergency Stop Engaged)</span>
          </div>
          <button
            onClick={onReset}
            className="px-2.5 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-medium text-[11px] transition-colors"
          >
            Reset
          </button>
        </div>
      )}

      {/* Directional D-Pad Section */}
      <div className="flex flex-col items-center justify-center p-3 rounded-lg bg-slate-50 border border-slate-200/80">
        <div className="text-[11px] font-mono text-slate-500 mb-2 uppercase tracking-wide">
          Directional Control ({currentConfig.step}mm)
        </div>

        <div className="grid grid-cols-3 gap-2 w-44 h-44">
          <div />
          {/* UP */}
          <button
            onClick={() => onMove('up', 0, currentConfig.step)}
            disabled={!canMoveUp}
            className={`btn-tactile flex flex-col items-center justify-center rounded-lg border font-semibold transition-all ${
              activeDirection === 'up'
                ? 'bg-teal-700 text-white border-teal-800'
                : canMoveUp
                ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
            }`}
            title="Move Arm Up (Arrow Up)"
          >
            <ArrowUp className="w-5 h-5" />
            <span className="text-[9px] font-mono mt-0.5">UP</span>
          </button>
          <div />

          {/* LEFT */}
          <button
            onClick={() => onMove('left', -currentConfig.step, 0)}
            disabled={!canMoveLeft}
            className={`btn-tactile flex flex-col items-center justify-center rounded-lg border font-semibold transition-all ${
              activeDirection === 'left'
                ? 'bg-teal-700 text-white border-teal-800'
                : canMoveLeft
                ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
            }`}
            title="Move Arm Left (Arrow Left)"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-[9px] font-mono mt-0.5">LEFT</span>
          </button>

          {/* Center Coordinates Badge */}
          <div className="flex flex-col items-center justify-center rounded-lg bg-slate-200/60 border border-slate-200 p-1">
            <span className="text-[9px] text-slate-500 font-mono">X, Y</span>
            <span className="text-[11px] font-mono font-bold text-slate-800">{x}</span>
            <span className="text-[11px] font-mono font-bold text-slate-800">{y}</span>
          </div>

          {/* RIGHT */}
          <button
            onClick={() => onMove('right', currentConfig.step, 0)}
            disabled={!canMoveRight}
            className={`btn-tactile flex flex-col items-center justify-center rounded-lg border font-semibold transition-all ${
              activeDirection === 'right'
                ? 'bg-teal-700 text-white border-teal-800'
                : canMoveRight
                ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
            }`}
            title="Move Arm Right (Arrow Right)"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="text-[9px] font-mono mt-0.5">RIGHT</span>
          </button>

          <div />
          {/* DOWN */}
          <button
            onClick={() => onMove('down', 0, -currentConfig.step)}
            disabled={!canMoveDown}
            className={`btn-tactile flex flex-col items-center justify-center rounded-lg border font-semibold transition-all ${
              activeDirection === 'down'
                ? 'bg-teal-700 text-white border-teal-800'
                : canMoveDown
                ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
            }`}
            title="Move Arm Down (Arrow Down)"
          >
            <ArrowDown className="w-5 h-5" />
            <span className="text-[9px] font-mono mt-0.5">DOWN</span>
          </button>
          <div />
        </div>
      </div>

      {/* Spoon Rotation Controls */}
      <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
        <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-2 uppercase">
          <span>Spoon Rotation</span>
          <span className="font-semibold text-teal-800">{rotation}° ({currentConfig.rotStep}°/step)</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => onRotate('rotate_left', -currentConfig.rotStep)}
            disabled={!canRotateLeft}
            className={`btn-tactile flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
              activeDirection === 'rotate_left'
                ? 'bg-teal-700 text-white border-teal-800'
                : canRotateLeft
                ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
            }`}
            title="Rotate Left (Q)"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>ROTATE LEFT (Q)</span>
          </button>

          <button
            onClick={() => onRotate('rotate_right', currentConfig.rotStep)}
            disabled={!canRotateRight}
            className={`btn-tactile flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
              activeDirection === 'rotate_right'
                ? 'bg-teal-700 text-white border-teal-800'
                : canRotateRight
                ? 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
                : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
            }`}
            title="Rotate Right (E)"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>ROTATE RIGHT (E)</span>
          </button>
        </div>
      </div>

      {/* Primary Action Buttons */}
      <div className="space-y-2 pt-1">
        {/* Reset Position Button */}
        <button
          onClick={onReset}
          className="btn-tactile w-full py-2 px-3 rounded-lg bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 text-xs font-semibold flex items-center justify-center space-x-2 transition-all shadow-xs"
        >
          <ResetIcon className="w-3.5 h-3.5 text-slate-500" />
          <span>RESET POSITION</span>
        </button>

        {/* Prominent Red STOP Button */}
        <button
          onClick={onEmergencyStop}
          className="btn-tactile w-full py-3 px-4 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold flex items-center justify-center space-x-2 shadow-xs transition-colors"
          title="Emergency Stop (Spacebar)"
        >
          <OctagonAlert className="w-4 h-4 text-white" />
          <span className="tracking-wide uppercase">STOP / EMERGENCY STOP</span>
        </button>
      </div>

      {/* Optional Automated Scoop Test Button */}
      <div className="flex items-center justify-between pt-1 border-t border-slate-100">
        <span className="text-[11px] text-slate-500">Autonomous Test Cycle:</span>
        <button
          onClick={onRunScoopCycle}
          disabled={isAutonomousRunning || emergencyStopped}
          className={`px-2.5 py-1 rounded text-[11px] font-medium flex items-center space-x-1.5 border transition-all ${
            isAutonomousRunning
              ? 'bg-teal-50 text-teal-800 border-teal-300'
              : emergencyStopped
              ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
          }`}
        >
          <Play className="w-3 h-3 text-teal-600" />
          <span>{isAutonomousRunning ? 'Running Cycle...' : 'Run Demo Cycle'}</span>
        </button>
      </div>

      {/* Keyboard Shortcuts Hint Bar */}
      <div className="text-[11px] text-slate-500 font-mono bg-slate-50 p-2 rounded border border-slate-200/60 flex items-center justify-between">
        <span className="flex items-center space-x-1">
          <Keyboard className="w-3.5 h-3.5 text-slate-400" />
          <span>Shortcuts:</span>
        </span>
        <span>Arrows: Move | Q/E: Rotate | Space: Stop</span>
      </div>

    </div>
  );
}
