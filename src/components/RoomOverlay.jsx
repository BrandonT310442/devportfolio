import React, { useState } from "react";
import "./RoomOverlay.css";
import FuturisticOverlay from "./FuturisticOverlay";

// Item descriptions and positions
const ITEMS = [
  { name: "Xbox Controller", left: "20%", top: "77%", color: "#5a5a5a" }, // muted gray
  { name: "Pikachu Mug", left: "63%", top: "74%", color: "#d4b830" }, // muted yellow
  { name: "Rubik's Cube", left: "74%", top: "67%", color: "#b8392e" }, // muted red
  { name: "Raptors Jersey", left: "80%", top: "15%", color: "#8b1a1a" }, // muted dark red
  { name: "Baseball", left: "82%", top: "68%", color: "#c4c4c4" }, // muted white/light gray
  { name: "Toronto Banner", left: "27%", top: "17%", color: "#2e5a8b" } // muted blue
];

// Item descriptions
const ITEM_DESCRIPTIONS = {
  "Xbox Controller": {
    title: "Gaming Setup",
    description: "My gaming corner where I unwind with favorite titles and explore virtual worlds.",
    details: ["Favorite games: Halo, FIFA, NBA 2K", "Platform: Xbox Series X", "Gaming as a way to relax and connect with friends"]
  },
  "Pikachu Mug": {
    title: "Pokémon Collection",
    description: "A cherished piece from my Pokémon merchandise collection, representing my love for the franchise.",
    details: ["Favorite Pokémon: Pikachu", "Collector since childhood", "Symbol of nostalgia and fun"]
  },
  "Rubik's Cube": {
    title: "Problem Solving",
    description: "A symbol of my passion for puzzles and algorithmic thinking.",
    details: ["Personal best solve time", "Learning algorithms", "Mental exercise and challenge"]
  },
  "Raptors Jersey": {
    title: "Basketball Fan",
    description: "Proud supporter of the Toronto Raptors and basketball enthusiast.",
    details: ["Season highlights", "Favorite players", "Championship memories"]
  },
  "Baseball": {
    title: "Sports Collection",
    description: "Part of my sports memorabilia, representing my love for athletics.",
    details: ["Blue Jays fan", "Summer game tradition", "Playing recreational baseball"]
  },
  "Toronto Banner": {
    title: "City Pride",
    description: "Representing my connection to Toronto and its vibrant culture.",
    details: ["City exploration", "Local events", "Community involvement"]
  }
};

const RoomOverlay = ({ onButtonClick }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
    // Removed alert functionality
    if (onButtonClick) onButtonClick(itemName);
  };

  return (
    <>
      <div className="room-overlay">
        {ITEMS.map((btn, idx) => (
      <button
        key={btn.name}
        className="room-glow-btn"
        style={{
          left: btn.left,
          top: btn.top,
          '--btn-color': btn.color
        }}
        onClick={() => handleItemClick(btn.name)}
        title={btn.name}
        aria-label={btn.name}
      >
        <span className="glow-dot" style={{ background: btn.color, color: btn.color }} />
      </button>
    ))}
      </div>
      {selectedItem && (
        <FuturisticOverlay
          isVisible={true}
          onClose={() => setSelectedItem(null)}
          type="item-detail"
          content={ITEM_DESCRIPTIONS[selectedItem]}
        />
      )}
    </>
  );
};

export default RoomOverlay;