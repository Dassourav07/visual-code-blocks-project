import React, { useState } from "react";
import CatSprite from "./CatSprite";

const PreviewArea = ({ sprites, selectedSprite, setSelectedSprite, setSprites }) => {
  const [draggingId, setDraggingId] = useState(null);

  const handleMouseDown = (e, id) => {
    setDraggingId(id);
    e.stopPropagation();
  };

  const handleMouseUp = () => {
    setDraggingId(null);
  };

  const handleMouseMove = (e) => {
    if (draggingId != null) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setSprites(prev =>
        prev.map(s =>
          s.id === draggingId ? { ...s, x, y } : s
        )
      );
    }
  };

  return (
    <div
      className="relative bg-gray-100 rounded h-full w-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {sprites.map(s => (
        <div
          key={s.id}
          onMouseDown={(e) => handleMouseDown(e, s.id)}
          onClick={() => setSelectedSprite(s.id)}
          style={{
            position: 'absolute',
            left: s.x,
            top: s.y,
            transform: `translate(-50%, -50%) rotate(${s.angle}deg)`,
            zIndex: 10
          }}
          className={`cursor-pointer flex flex-col items-center
            ${s.isColliding ? 'border-4 border-yellow-400' : ''}`}
        >
          {s.message && (
            <div className="mb-1 px-2 py-0.5 bg-red-500 text-white text-xs rounded shadow">
              {s.message}
            </div>
          )}
          <div className="w-24 h-24 bg-orange-400 rounded-full flex items-center justify-center">
            <CatSprite />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PreviewArea;

