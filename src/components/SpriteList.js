// src/components/SpriteList.js
import React from 'react';
import { Trash2 } from 'lucide-react';

const SpriteList = ({ sprites, selectedSprite, setSelectedSprite, deleteSprite }) => (
  <div className="p-4 border-t border-gray-300">
    <h4 className="font-semibold mb-2">Sprites</h4>
    <div className="space-y-2">
      {sprites.map(sprite => (
        <div key={sprite.id} className="flex items-center justify-between">
          <button
            onClick={() => setSelectedSprite(sprite.id)}
            className={`flex-1 text-left p-2 rounded ${
              sprite.id === selectedSprite ? 'bg-blue-100' : 'bg-gray-100'
            }`}
          >
            {sprite.name}
          </button>
          <button
            onClick={() => deleteSprite(sprite.id)}
            className="ml-2 text-red-500 hover:text-red-700"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default SpriteList;
