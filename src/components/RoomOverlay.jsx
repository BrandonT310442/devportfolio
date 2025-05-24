import React from "react";
import "./RoomOverlay.css";

// Button positions as percentages (left, top) for each item
const BUTTONS = [
  { name: "Xbox Controller", left: "20%", top: "77%", color: "#7c7c7c" }, // gray
  { name: "Pikachu Mug", left: "63%", top: "74%", color: "#ffe066" }, // yellow
  { name: "Rubik's Cube", left: "74%", top: "67%", color: "#e74c3c" }, // red
  { name: "Raptors Jersey", left: "80%", top: "38%", color: "#b71c1c" }, // dark red
  { name: "Baseball", left: "80%", top: "65%", color: "#fff" }, // white
  { name: "Toronto Banner", left: "27%", top: "15%", color: "#1976d2" } // blue
];

const RoomOverlay = ({ onButtonClick }) => (
  <div className="room-overlay">
    {BUTTONS.map((btn, idx) => (
      <button
        key={btn.name}
        className="room-glow-btn"
        style={{
          left: btn.left,
          top: btn.top,
          '--btn-color': btn.color,
          boxShadow: `0 0 8px 2px ${btn.color}`
        }}
        onClick={() => onButtonClick && onButtonClick(btn.name)}
        title={btn.name}
        aria-label={btn.name}
      >
        <span className="glow-dot" style={{ background: btn.color, color: btn.color }} />
      </button>
    ))}
  </div>
);

export default RoomOverlay;