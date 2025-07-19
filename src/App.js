
import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar';
import MidArea from './components/MidArea';
import Controls from './components/Controls';
import PreviewArea from './components/PreviewArea';
import SpriteList from './components/SpriteList';
import useCollisionDetection from './hooks/useCollisionDetection';


const App = () => {
  const [sprites, setSprites] = useState([
    {
      id: 1,
      name: 'Sprite 1',
      x: 100,
      y: 100,
      angle: 0,
      animations: [],
      message: '',
      messageTimer: 0
    }
  ]);
  const [selectedSprite, setSelectedSprite] = useState(1);
  const [draggedBlock, setDraggedBlock] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const cancelPlayRef = useRef(false);

  useCollisionDetection(sprites, setSprites);

  const addSprite = () => {
    const newId = Math.max(...sprites.map(s => s.id)) + 1;
    setSprites(prev => [
      ...prev,
      {
        id: newId,
        name: `Sprite ${newId}`,
        x: 100 + newId * 40,
        y: 100,
        angle: 0,
        animations: [],
        message: '',
        messageTimer: 0
      }
    ]);
    setSelectedSprite(newId);
  };

  const deleteSprite = () => {
    setSprites(prev => prev.filter(s => s.id !== selectedSprite));
    const remaining = sprites.find(s => s.id !== selectedSprite);
    if (remaining) setSelectedSprite(remaining.id);
  };

  const handleResetSprites = async () => {
    cancelPlayRef.current = true;
    setIsPlaying(false);
    await new Promise(res => setTimeout(res, 100));
    setSprites([
      {
        id: 1,
        name: 'Sprite 1',
        x: 100,
        y: 100,
        angle: 0,
        animations: [],
        message: '',
        messageTimer: 0
      }
    ]);
    setSelectedSprite(1);
  };

  const handleDragStart = (e, block) => {
    e.dataTransfer.effectAllowed = 'copy';
    setDraggedBlock(block);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (!draggedBlock) return;
    const newBlock = {
      ...draggedBlock,
      instanceId: Date.now(),
      params: Array.isArray(draggedBlock.params)
        ? draggedBlock.params.reduce((acc, p) => ({ ...acc, [p.name]: p.default }), {})
        : {}
    };
    setSprites(prev =>
      prev.map(s =>
        s.id === selectedSprite
          ? { ...s, animations: [...s.animations, newBlock] }
          : s
      )
    );
    setDraggedBlock(null);
  };

  const updateParam = (blockIdx, paramName, value) => {
    setSprites(prev =>
      prev.map(s => {
        if (s.id !== selectedSprite) return s;
        const updated = [...s.animations];
        if (updated[blockIdx]?.params) {
          updated[blockIdx].params[paramName] = isNaN(value) ? value : Number(value);
        }
        return { ...s, animations: updated };
      })
    );
  };

  const removeBlock = (blockIdx) => {
    setSprites(prev =>
      prev.map(s =>
        s.id === selectedSprite
          ? { ...s, animations: s.animations.filter((_, i) => i !== blockIdx) }
          : s
      )
    );
  };

  const handleAddRepeatBlock = () => {
    const repeatBlock = {
      id: 'repeat',
      label: 'Repeat all continuously',
      params: {},
      instanceId: Date.now()
    };
    setSprites(prev =>
      prev.map(s =>
        s.id === selectedSprite
          ? { ...s, animations: [...s.animations, repeatBlock] }
          : s
      )
    );
  };

  const executeBlock = async (spriteId, block) => {
    setSprites(prev =>
      prev.map(s => {
        if (s.id !== spriteId) return s;
        let { x, y, angle } = s;
        switch (block.id) {
          case 'move-steps':
            const rad = angle * Math.PI / 180;
            x += Math.cos(rad) * (block.params.steps || 10);
            y += Math.sin(rad) * (block.params.steps || 10);
            return { ...s, x, y };
          case 'turn-degrees':
            angle += block.params.degrees || 90;
            return { ...s, angle };
          case 'go-to-xy':
            return { ...s, x: block.params.x + 300, y: block.params.y + 200 };
          case 'say-for-seconds':
          case 'think-for-seconds':
            const seconds = block.params.seconds || 2;
            setTimeout(() =>
              setSprites(p =>
                p.map(sp => (sp.id === spriteId ? { ...sp, message: '' } : sp))
              ), seconds * 1000);
            return { ...s, message: block.params.message };
          default:
            return s;
        }
      })
    );
  };

  const playAnimations = async () => {
    if (isPlaying) return;
    setIsPlaying(true);
    cancelPlayRef.current = false;

    const spriteLoops = sprites.map(async (sprite) => {
      const hasRepeat = sprite.animations.some(b => b.id === 'repeat');
      const blocksToPlay = sprite.animations.filter(b => b.id !== 'repeat');
      if (hasRepeat) {
        while (!cancelPlayRef.current) {
          for (const block of blocksToPlay) {
            await executeBlock(sprite.id, block);
            await new Promise(res => setTimeout(res, 400));
            if (cancelPlayRef.current) break;
          }
        }
      } else {
        for (const block of blocksToPlay) {
          await executeBlock(sprite.id, block);
          await new Promise(res => setTimeout(res, 400));
          if (cancelPlayRef.current) break;
        }
      }
    });

    await Promise.all(spriteLoops);
    setIsPlaying(false);
  };

  const currentSprite = sprites.find(s => s.id === selectedSprite);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-blue-200">

      {/* Header */}
      <header className="text-center py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-2xl font-bold shadow-xl rounded-b-3xl">
        🧩 Visual Code Blocks Lab
      </header>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className="w-64 m-3 p-4 bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl border-t-4 border-indigo-400 flex flex-col">
          <h2 className="text-lg font-semibold mb-2 text-indigo-700">Blocks</h2>
          <div className="flex-1 overflow-y-auto">
            <Sidebar
              onDragStart={handleDragStart}
              onReset={handleResetSprites}
              onAddRepeat={handleAddRepeatBlock}
            />
          </div>
        </div>

        {/* SpriteList */}
        <div className="w-52 m-3 p-4 bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl border-t-4 border-purple-400 flex flex-col">
          <h2 className="text-lg font-semibold mb-2 text-purple-700">Sprites</h2>
          <div className="flex-1 overflow-y-auto">
            <SpriteList
              sprites={sprites}
              selectedSprite={selectedSprite}
              setSelectedSprite={setSelectedSprite}
              deleteSprite={deleteSprite}
            />
          </div>
        </div>

        {/* Main area */}
        <div className="flex-1 flex flex-col m-3">

          {/* Controls */}
          <div className="p-4 mb-3 bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl border-t-4 border-cyan-400">
            <Controls
              play={playAnimations}
              isPlaying={isPlaying}
              addSprite={addSprite}
            />
          </div>

          <div className="flex flex-1 gap-3">

            {/* MidArea */}
            <div className="flex-1 p-4 bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl border-t-4 border-indigo-400 overflow-auto">
              <h2 className="text-lg font-semibold mb-2 text-indigo-700">Code Area</h2>
              <MidArea
                sprite={currentSprite}
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                updateParam={updateParam}
                removeBlock={removeBlock}
              />
            </div>

            {/* PreviewArea */}
            <div className="flex-1 relative p-4 bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl border-t-4 border-teal-400 overflow-hidden">
              <h2 className="text-lg font-semibold mb-2 text-teal-700">Stage</h2>
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 z-20">
              </div>
              <PreviewArea
                sprites={sprites}
                selectedSprite={selectedSprite}
                setSelectedSprite={setSelectedSprite}
                setSprites={setSprites}
              />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
