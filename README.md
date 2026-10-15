# Assistive Feeding System — Robotic Spoon Control

> **Assistive Feeding System • Innovative Design Project (IDP 2.0)**  
> A software-controlled, table-mounted assistive robotic feeding arm simulation engineered for individuals with restricted hand and upper-extremity mobility.

---

## 📌 Product Overview

This project provides an intuitive, movement-focused control interface for a table-mounted robotic feeding arm. It enables individuals with limited hand mobility to independently control spoon position (Up, Down, Left, Right) and rotation.

- **Current Status:** Software Simulation Active (Physical hardware integration with ESP32 planned for Stage 2).
- **Interface Style:** Light, calm, clinical engineering aesthetic inspired by assistive technology products.

---

## 🎛️ Main Features

1. **Live Arm Kinematics Simulation:**
   - Real-time 2-link planar inverse kinematics mapping user translations into shoulder ($J_1$) and elbow ($J_2$) angles.
   - Visible table clamp, arm links, joints, spoon, and food plate.
   - Bounded safe movement workspace ($X$: 20–280mm, $Y$: 10–200mm, Rotation: $-90^\circ$ to $+90^\circ$).
   - Active trajectory history trail.

2. **Movement Controller:**
   - Tactile D-pad for UP, DOWN, LEFT, RIGHT translations.
   - ROTATE LEFT and ROTATE RIGHT buttons for spoon angle adjustments.
   - Speed selection: **Slow** ($5\text{mm}$), **Normal** ($15\text{mm}$), and **Fast** ($30\text{mm}$).
   - **RESET POSITION:** Restores calibrated default coordinates ($X=140\text{mm}, Y=90\text{mm}, \theta=0^\circ$).
   - **STOP / EMERGENCY STOP:** Immediate movement halt and command lock.

3. **Compact Telemetry & Activity Log:**
   - Slim status bar: System state, hardware connection status, last command, total commands, and live coordinates.
   - Compact recent movement history log with timestamp, command name, and Clear History option.

4. **Keyboard Controls:**
   - Arrow keys (`↑`, `↓`, `←`, `→`): Directional translation (page scroll prevented).
   - `Q` / `E`: Rotate spoon counter-clockwise / clockwise.
   - `Spacebar`: Emergency stop.
   - `R` / `H`: Reset to default home position.

---

## 🚀 Running the Project

The development server is strictly configured for port **8087**:

```bash
# 1. Install dependencies
npm install

# 2. Start Vite server on port 8087
npm run dev

# 3. Open in browser
http://localhost:8087
```
