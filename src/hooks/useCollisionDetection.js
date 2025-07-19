import { useEffect, useRef } from 'react';

const useCollisionDetection = (sprites, setSprites) => {
  const collidedPairsRef = useRef(new Set());
  const spritesRef = useRef(sprites);

  // keep ref updated
  useEffect(() => {
    spritesRef.current = sprites;
  }, [sprites]);

  useEffect(() => {
    const detectAndSwap = () => {
      const currentSprites = spritesRef.current;
      if (!currentSprites) return;

      currentSprites.forEach((sprite1, i) => {
        currentSprites.forEach((sprite2, j) => {
          if (i !== j) {
            const pairKey = [sprite1.id, sprite2.id].sort().join('-');
            const dx = sprite1.x - sprite2.x;
            const dy = sprite1.y - sprite2.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const threshold = 50;

            if (distance < threshold) {
              if (!collidedPairsRef.current.has(pairKey)) {
                // mark as collided early to avoid rapid duplicate swaps
                collidedPairsRef.current.add(pairKey);

                setSprites(prevSprites => {
                  const idx1 = prevSprites.findIndex(s => s.id === sprite1.id);
                  const idx2 = prevSprites.findIndex(s => s.id === sprite2.id);
                  if (idx1 === -1 || idx2 === -1) return prevSprites;

                  // deep copy animations to avoid stale refs
                  const newSprites = [...prevSprites];
                  const anim1 = [...newSprites[idx1].animations];
                  const anim2 = [...newSprites[idx2].animations];

                  newSprites[idx1] = {
                    ...newSprites[idx1],
                    animations: anim2,
                    message: '💥 Collision!'
                  };
                  newSprites[idx2] = {
                    ...newSprites[idx2],
                    animations: anim1,
                    message: '💥 Collision!'
                  };

                  // clear message after 1 second
                  setTimeout(() => {
                    setSprites(latest =>
                      latest.map(s =>
                        s.id === sprite1.id || s.id === sprite2.id
                          ? { ...s, message: '' }
                          : s
                      )
                    );
                  }, 1000);

                  return newSprites;
                });
              }
            } else {
              collidedPairsRef.current.delete(pairKey);
            }
          }
        });
      });
    };

    const interval = setInterval(detectAndSwap, 300);
    return () => clearInterval(interval);
  }, [setSprites]);
};

export default useCollisionDetection;

