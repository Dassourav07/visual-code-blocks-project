import React from "react"; 
import Icon from "./Icon";

export default function Sidebar({ onDragStart, onReset }) {
  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">

      <div className="font-bold"> {"Events"} </div>

      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>

      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When this sprite clicked"}
      </div>

      <div className="font-bold"> {"Motion"} </div>

      <div
        draggable
        onDragStart={e =>
          onDragStart(e, {
            id: 'move-steps',
            label: 'Move ____ steps',
            params: [{ name: 'steps', type: 'number', default: 10 }]
          })
        }
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-move"
      >
        {"Move 10 steps"}
      </div>

      <div
        draggable
        onDragStart={e =>
          onDragStart(e, {
            id: 'turn-degrees',
            label: 'Turn ____ degrees',
            params: [{ name: 'degrees', type: 'number', default: 15 }]
          })
        }
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-move"
      >
        {"Turn "}
        <Icon name="undo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </div>

      <div
        draggable
        onDragStart={e =>
          onDragStart(e, {
            id: 'turn-degrees',
            label: 'Turn ____ degrees',
            params: [{ name: 'degrees', type: 'number', default: 15 }]
          })
        }
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-move"
      >
        {"Turn "}
        <Icon name="redo" size={15} className="text-white mx-2" />
        {"15 degrees"}
      </div>

      <div
        draggable
        onDragStart={e =>
          onDragStart(e, {
            id: 'go-to-xy',
            label: 'Go to x: ____ y: ____',
            params: [
              { name: 'x', type: 'number', default: 0 },
              { name: 'y', type: 'number', default: 0 }
            ]
          })
        }
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-move"
      >
        {"Go to x: ____ y: ____"}
      </div>

      <div
        draggable
        onDragStart={e =>
          onDragStart(e, {
            id: 'repeat',
            label: 'Repeat',
            params: []
          })
        }
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-move"
      >
        {"Repeat"}
      </div>

      <div className="font-bold"> {"Looks"} </div>

      <div
        draggable
        onDragStart={e =>
          onDragStart(e, {
            id: 'say-for-seconds',
            label: 'Say ____ for ____ seconds',
            params: [
              { name: 'message', type: 'text', default: 'Hello!' },
              { name: 'seconds', type: 'number', default: 2 }
            ]
          })
        }
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-move"
      >
        {"Say ____ for ____ seconds"}
      </div>

      <div
        draggable
        onDragStart={e =>
          onDragStart(e, {
            id: 'think-for-seconds',
            label: 'Think ____ for ____ seconds',
            params: [
              { name: 'message', type: 'text', default: 'Hmm...' },
              { name: 'seconds', type: 'number', default: 2 }
            ]
          })
        }
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-move"
      >
        {"Think ____ for ____ seconds"}
      </div>

      {/* Reset button at bottom */}
      <button
        onClick={onReset}
        className="w-full bg-red-500 text-white p-2 mt-4 rounded text-sm hover:opacity-90"
      >
        Reset Sprites
      </button>
    </div>
  );
}

