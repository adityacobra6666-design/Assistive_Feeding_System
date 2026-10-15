import React from 'react';
import {
  History,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  RotateCw,
  OctagonAlert,
  RotateCcw as ResetIcon,
  CheckCircle2
} from 'lucide-react';

export default function MovementHistory({ history = [], onClearHistory }) {
  const getCommandIcon = (type, direction) => {
    switch (direction) {
      case 'up':
        return <ArrowUp className="w-3.5 h-3.5 text-slate-600" />;
      case 'down':
        return <ArrowDown className="w-3.5 h-3.5 text-slate-600" />;
      case 'left':
        return <ArrowLeft className="w-3.5 h-3.5 text-slate-600" />;
      case 'right':
        return <ArrowRight className="w-3.5 h-3.5 text-slate-600" />;
      case 'rotate_left':
        return <RotateCcw className="w-3.5 h-3.5 text-teal-700" />;
      case 'rotate_right':
        return <RotateCw className="w-3.5 h-3.5 text-teal-700" />;
      case 'stop':
        return <OctagonAlert className="w-3.5 h-3.5 text-red-600" />;
      case 'reset':
        return <ResetIcon className="w-3.5 h-3.5 text-blue-600" />;
      default:
        return <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />;
    }
  };

  // Keep latest 8 items
  const recentEntries = history.slice(0, 8);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <History className="w-4 h-4 text-slate-600" />
          <h4 className="text-xs font-semibold text-slate-800 tracking-wide uppercase">
            Recent Movement History
          </h4>
          <span className="text-[11px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono">
            {recentEntries.length}
          </span>
        </div>

        <button
          onClick={onClearHistory}
          disabled={recentEntries.length === 0}
          className={`text-[11px] flex items-center space-x-1 transition-colors ${
            recentEntries.length === 0
              ? 'text-slate-400 cursor-not-allowed'
              : 'text-slate-500 hover:text-red-600'
          }`}
          title="Clear Activity Log"
        >
          <Trash2 className="w-3 h-3" />
          <span>Clear</span>
        </button>
      </div>

      {/* List */}
      <div className="space-y-1.5">
        {recentEntries.length === 0 ? (
          <div className="py-6 text-center text-slate-400 text-xs">
            No movements recorded yet. Issue commands to see real-time log.
          </div>
        ) : (
          recentEntries.map((entry) => (
            <div
              key={entry.id}
              className={`px-3 py-2 rounded-lg border text-xs flex items-center justify-between transition-colors ${
                entry.isEmergency
                  ? 'bg-red-50 border-red-200 text-red-800'
                  : entry.isReset
                  ? 'bg-blue-50 border-blue-200 text-blue-800'
                  : 'bg-slate-50/70 border-slate-200/80 text-slate-700 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div className="p-1 rounded bg-white border border-slate-200 shrink-0">
                  {getCommandIcon(entry.type, entry.direction)}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-slate-800">{entry.command}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{entry.timestamp}</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-500">
                    X: {entry.x}mm, Y: {entry.y}mm | Angle: {entry.rotation}°
                  </div>
                </div>
              </div>

              <span
                className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${
                  entry.isEmergency
                    ? 'bg-red-100 text-red-700 border-red-200'
                    : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}
              >
                {entry.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
