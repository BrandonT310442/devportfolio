import React, { useState } from "react";
import "./RoomOverlay.css";
import FuturisticOverlay from "./FuturisticOverlay";

// Item descriptions and positions
const ITEMS = [
  { name: "Xbox Controller", left: "20%", top: "77%", color: "#00FF00" }, // muted gray
  { name: "Pikachu Mug", left: "63%", top: "74%", color: "#0096FF" }, // muted yellow
  { name: "Rubik's Cube", left: "74%", top: "67%", color: "#FF00FF" }, // muted red
  { name: "Raptors Jersey", left: "80%", top: "15%", color: "#FF0000" }, // muted dark red
  { name: "Baseball", left: "82%", top: "68%", color: "#c4c4c4" }, // muted white/light gray
  { name: "UofT Banner", left: "27%", top: "17%", color: "#FFFF00" } // muted blue
];

// Item descriptions
const ITEM_DESCRIPTIONS = {
  "Xbox Controller": {
    title: "Xbox",
    description: "This is my Xbox, my favorite gaming console. I love playing with friends, and some of my favourite games are NBA 2K, Madden, Forza Horizon, and Fortnite. It's my go-to for fun and excitement.",
  },
  "Pikachu Mug": {
    title: "Pokémon Collection",
    description: " Pokémon was my first game and started my love for gaming. This Pikachu mug reminds me of catching my first Pokémon, exploring new regions, and battling friends. Fun fact: I'm level 40 in Pokémon GO and still hunting for rare Pokémon! ",
  },
  "Rubik's Cube": {
    title: "Rubik's Cube",
    description: "This Rubik's Cube shows how much I love puzzles and problem-solving. I enjoy breaking down patterns and finding the right moves to solve it fast. I can even solve it in under 20 seconds! It’s a fun challenge that keeps my mind sharp.",
  },
  "Raptors Jersey": {
    title: "Scottie Barnes Raptors Jersey",
    description: "My Scottie Barnes Raptors jersey represents my love for basketball, a sport I played all through high school. The Raptors have always been a favorite team of mine, and one of my most memorable moments was watching them win the 2019 NBA Championship.",
  },
  "Baseball": {
    title: "Baseball",
    description: "Baseball is my second favorite sport and has been a big part of my life since grade 6. I’ve played it for years and still love going to Blue Jays games every season. I even have a collection of over 30 Blue Jays bobbleheads at home!",
  },
  "UofT Banner": {
    title: "UofT Banner",
    description: " I’ve lived in Toronto my whole life, and being from this city has shaped who I am. Now, I’m proud to be studying Computer Science at the University of Toronto. This banner represents my connection to the city’s culture, my hometown pride, and the exciting path I’m on as a UofT student.",
  }
};

const RoomOverlay = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
  };

  return (
    <>
      <div className="room-overlay">
        {ITEMS.map((btn) => (
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