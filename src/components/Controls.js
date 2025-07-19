import React from 'react';
import { Play, Plus } from 'lucide-react';

const Controls = ({ play, isPlaying, addSprite}) => (
  <div className="flex justify-between p-4 bg-white border-b">
    <div className="flex gap-2">
      <button onClick={play} disabled={isPlaying}
        className="bg-green-500 text-white px-4 py-2 text-sm rounded flex items-center gap-1 hover:bg-green-600">
        <Play size={16} /> {isPlaying ? 'Playing...' : 'Play'}
      </button>
      <button onClick={addSprite}
        className="bg-blue-500 text-white px-4 py-2 text-sm rounded flex items-center gap-1 hover:bg-blue-600">
        <Plus size={16} /> Add Sprite
      </button>
    </div>
    <span className="text-xs text-gray-500">Swap animations on collision</span>
  </div>
);
export default Controls;
