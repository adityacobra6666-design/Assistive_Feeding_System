import React, { useState, useEffect, useCallback, useRef } from 'react';
import Navbar from './components/Navbar';
import RoboticArmVisualization from './components/RoboticArmVisualization';
import MovementControls from './components/MovementControls';
import SystemStatusPanel from './components/SystemStatusPanel';
import MovementHistory from './components/MovementHistory';
import HowItWorksView from './components/HowItWorksView';

export default function App() {
  const [activeTab, setActiveTab] = useState('control'); // 'control' | 'how-it-works'

  // Kinematic state
  const DEFAULT_X = 140;
  const DEFAULT_Y = 90;
  const DEFAULT_ROT = 0;

  const LIMITS = {
    minX: 20,
    maxX: 280,
    minY: 10,
    maxY: 200,
    minRot: -90,
    maxRot: 90,
  };

  const [x, setX] = useState(DEFAULT_X);
  const [y, setY] = useState(DEFAULT_Y);
  const [rotation, setRotation] = useState(DEFAULT_ROT);
  const [speedMode, setSpeedMode] = useState('normal'); // 'slow' | 'normal' | 'fast'
  const [emergencyStopped, setEmergencyStopped] = useState(false);
  const [activeDirection, setActiveDirection] = useState(null);
  const [currentOperation, setCurrentOperation] = useState('Idle');
  const [totalCommands, setTotalCommands] = useState(0);
  const [lastCommand, setLastCommand] = useState('Ready');
  const [isAutonomousRunning, setIsAutonomousRunning] = useState(false);

  // Trajectory trail history for visualizer (last 12 points)
  const [trajectoryHistory, setTrajectoryHistory] = useState([
    { x: DEFAULT_X, y: DEFAULT_Y }
  ]);

  // Movement activity log history (latest entries)
  const [history, setHistory] = useState([
    {
      id: 1,
      command: 'System Initialized',
      type: 'init',
      direction: 'reset',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      x: DEFAULT_X,
      y: DEFAULT_Y,
      rotation: DEFAULT_ROT,
      status: 'Ready',
      isReset: true
    }
  ]);

  const activeDirectionTimeoutRef = useRef(null);
  const operationTimeoutRef = useRef(null);
  const autonomousTimeoutsRef = useRef([]);

  // Trigger brief active direction highlight
  const flashActiveDirection = (dirName, opName) => {
    setActiveDirection(dirName);
    setCurrentOperation(opName);

    if (activeDirectionTimeoutRef.current) clearTimeout(activeDirectionTimeoutRef.current);
    if (operationTimeoutRef.current) clearTimeout(operationTimeoutRef.current);

    activeDirectionTimeoutRef.current = setTimeout(() => {
      setActiveDirection(null);
    }, 350);

    operationTimeoutRef.current = setTimeout(() => {
      setCurrentOperation((prev) => (prev === opName ? 'Idle' : prev));
    }, 1000);
  };

  // Append history record
  const logAction = (command, type, direction, newX, newY, newRot, status, isEmergency = false, isReset = false) => {
    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newEntry = {
      id: Date.now() + Math.random(),
      command,
      type,
      direction,
      timestamp: timeStr,
      x: newX,
      y: newY,
      rotation: newRot,
      status,
      isEmergency,
      isReset,
    };
    setHistory((prev) => [newEntry, ...prev.slice(0, 30)]);
    setLastCommand(command);
    setTotalCommands((prev) => prev + 1);
  };

  // Move handler
  const handleMove = useCallback((direction, dx, dy) => {
    if (emergencyStopped) return;

    setX((prevX) => {
      setY((prevY) => {
        const nextX = Math.max(LIMITS.minX, Math.min(LIMITS.maxX, prevX + dx));
        const nextY = Math.max(LIMITS.minY, Math.min(LIMITS.maxY, prevY + dy));

        const cmdTitle = `Move ${direction.charAt(0).toUpperCase() + direction.slice(1)}`;
        logAction(cmdTitle, 'move', direction, nextX, nextY, rotation, 'Executed');
        flashActiveDirection(direction, `Moving ${direction.toUpperCase()}`);

        setTrajectoryHistory((pts) => [...pts.slice(-10), { x: nextX, y: nextY }]);
        return nextY;
      });
      return Math.max(LIMITS.minX, Math.min(LIMITS.maxX, prevX + dx));
    });
  }, [emergencyStopped, rotation, speedMode]);

  // Rotate handler
  const handleRotate = useCallback((direction, dAngle) => {
    if (emergencyStopped) return;

    setRotation((prevRot) => {
      const nextRot = Math.max(LIMITS.minRot, Math.min(LIMITS.maxRot, prevRot + dAngle));
      const rotLabel = direction === 'rotate_left' ? 'Rotate Left' : 'Rotate Right';

      logAction(rotLabel, 'rotate', direction, x, y, nextRot, 'Executed');
      flashActiveDirection(direction, `Rotating Spoon`);

      return nextRot;
    });
  }, [emergencyStopped, x, y]);

  // Emergency Stop handler
  const handleEmergencyStop = useCallback(() => {
    autonomousTimeoutsRef.current.forEach(clearTimeout);
    autonomousTimeoutsRef.current = [];
    setIsAutonomousRunning(false);

    setEmergencyStopped(true);
    setCurrentOperation('Emergency Halted');
    setActiveDirection(null);

    logAction('Emergency Stop', 'stop', 'stop', x, y, rotation, 'Halted', true);
  }, [x, y, rotation]);

  // Reset handler
  const handleReset = useCallback(() => {
    autonomousTimeoutsRef.current.forEach(clearTimeout);
    autonomousTimeoutsRef.current = [];
    setIsAutonomousRunning(false);

    setEmergencyStopped(false);
    setX(DEFAULT_X);
    setY(DEFAULT_Y);
    setRotation(DEFAULT_ROT);
    setCurrentOperation('Idle');
    setActiveDirection(null);

    logAction('Reset Position', 'reset', 'reset', DEFAULT_X, DEFAULT_Y, DEFAULT_ROT, 'Default Restored', false, true);
    setTrajectoryHistory([{ x: DEFAULT_X, y: DEFAULT_Y }]);
  }, []);

  // Demo cycle sequence
  const handleRunScoopCycle = useCallback(() => {
    if (emergencyStopped || isAutonomousRunning) return;

    setIsAutonomousRunning(true);
    setCurrentOperation('Scoop Demo Running');
    logAction('Scoop Demo Started', 'auto', 'reset', x, y, rotation, 'Running');

    const steps = [
      { delay: 300, fn: () => { setX(210); setY(40); setRotation(-15); } },
      { delay: 1200, fn: () => { setX(225); setY(35); setRotation(20); } },
      { delay: 2100, fn: () => { setX(210); setY(95); setRotation(0); } },
      { delay: 3200, fn: () => { setX(255); setY(150); setRotation(10); } },
      { delay: 4600, fn: () => {
        setX(DEFAULT_X);
        setY(DEFAULT_Y);
        setRotation(DEFAULT_ROT);
        setIsAutonomousRunning(false);
        setCurrentOperation('Idle');
        logAction('Scoop Demo Complete', 'auto', 'reset', DEFAULT_X, DEFAULT_Y, DEFAULT_ROT, 'Complete');
      }}
    ];

    autonomousTimeoutsRef.current = steps.map((s) => setTimeout(s.fn, s.delay));
  }, [emergencyStopped, isAutonomousRunning, x, y, rotation]);

  // Keyboard Shortcuts Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

      const speedMap = {
        slow: { step: 5, rot: 5 },
        normal: { step: 15, rot: 15 },
        fast: { step: 30, rot: 30 },
      };
      const cur = speedMap[speedMode];

      switch (e.code) {
        case 'ArrowUp':
          e.preventDefault();
          handleMove('up', 0, cur.step);
          break;
        case 'ArrowDown':
          e.preventDefault();
          handleMove('down', 0, -cur.step);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          handleMove('left', -cur.step, 0);
          break;
        case 'ArrowRight':
          e.preventDefault();
          handleMove('right', cur.step, 0);
          break;
        case 'KeyQ':
          e.preventDefault();
          handleRotate('rotate_left', -cur.rot);
          break;
        case 'KeyE':
          e.preventDefault();
          handleRotate('rotate_right', cur.rot);
          break;
        case 'Space':
          e.preventDefault();
          handleEmergencyStop();
          break;
        case 'KeyR':
        case 'KeyH':
          e.preventDefault();
          handleReset();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleMove, handleRotate, handleEmergencyStop, handleReset, speedMode]);

  useEffect(() => {
    return () => {
      if (activeDirectionTimeoutRef.current) clearTimeout(activeDirectionTimeoutRef.current);
      if (operationTimeoutRef.current) clearTimeout(operationTimeoutRef.current);
      autonomousTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans">
      
      {/* Minimal Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        emergencyStopped={emergencyStopped}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5">
        
        {activeTab === 'how-it-works' ? (
          <HowItWorksView onBackToControl={() => setActiveTab('control')} />
        ) : (
          <div className="space-y-4">
            
            {/* Primary Workspace: Arm Simulation (Left) & Controls (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              
              {/* Left Side: Live Arm Simulation (7 cols) */}
              <div className="lg:col-span-7 flex flex-col">
                <RoboticArmVisualization
                  x={x}
                  y={y}
                  rotation={rotation}
                  activeDirection={activeDirection}
                  emergencyStopped={emergencyStopped}
                  limits={LIMITS}
                  speedMode={speedMode}
                  lastCommand={lastCommand}
                  trajectoryHistory={trajectoryHistory}
                />
              </div>

              {/* Right Side: Movement Controller (5 cols) */}
              <div className="lg:col-span-5 flex flex-col">
                <MovementControls
                  onMove={handleMove}
                  onRotate={handleRotate}
                  onEmergencyStop={handleEmergencyStop}
                  onReset={handleReset}
                  speedMode={speedMode}
                  setSpeedMode={setSpeedMode}
                  emergencyStopped={emergencyStopped}
                  activeDirection={activeDirection}
                  x={x}
                  y={y}
                  rotation={rotation}
                  limits={LIMITS}
                  onRunScoopCycle={handleRunScoopCycle}
                  isAutonomousRunning={isAutonomousRunning}
                />
              </div>

            </div>

            {/* Small Status Bar */}
            <SystemStatusPanel
              systemStatus={emergencyStopped ? 'Stopped' : 'Simulation Active'}
              connectionStatus="Not Connected"
              x={x}
              y={y}
              rotation={rotation}
              speedMode={speedMode}
              totalCommands={totalCommands}
              currentOperation={currentOperation}
              emergencyStopped={emergencyStopped}
              lastCommand={lastCommand}
            />

            {/* Recent Movement History (Compact, below workspace) */}
            <MovementHistory
              history={history}
              onClearHistory={() => setHistory([])}
            />

          </div>
        )}

      </main>

      {/* Compact Clean Footer */}
      <footer className="border-t border-slate-200 bg-white py-3 mt-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-700">Assistive Feeding System</span>
            <span>•</span>
            <span>Innovative Design Project (IDP 2.0)</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Software Simulation Workspace • Physical Hardware Integration Planned
          </div>
        </div>
      </footer>

    </div>
  );
}
