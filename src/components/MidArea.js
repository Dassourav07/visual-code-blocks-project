import React from "react";
import { Trash2 } from 'lucide-react';

export default function MidArea({ sprite, onDrop, onDragOver, updateParam, removeBlock }) {
  return (
    <div className="flex-1 h-full overflow-auto p-4">
      <h3 className="mb-2 font-semibold">Scripts for {sprite?.name}</h3>
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        className="bg-white border rounded p-24 min-h-[200px]"
      >
        {sprite?.animations.map((b, idx) => (
          <div key={b.instanceId} className="bg-gray-100 p-3 mb-2 rounded text-xs">
            {b.label}
            <button
              onClick={() => removeBlock(idx)}
              className="ml-2 text-red-500"
            >
              <Trash2 size={12} />
            </button>
            {Object.entries(b.params).map(([k, v]) => (
              <input
                key={k}
                value={v}
                onChange={e => updateParam(idx, k, e.target.value)}
                className="ml-2 border px-1 rounded w-14 text-xs"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
