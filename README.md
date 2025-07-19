# 🧩 Visual Code Blocks Lab project
An Visual Code, React + Tailwind CSS block-coding playground inspired by Scratch — built to demonstrate motion and looks animations, drag-and-drop coding, multiple sprite support, and a hero feature: collision-based animation swap.


🚀 Features
✅ Motion Animations

Move ___ steps

Turn ___ degrees

Go to x: ___ y: ___

Repeat animation

✅ Looks Animations

Say ___ for ___ seconds

Think ___ for ___ seconds

✅ Drag & Drop

Build scripts visually, similar to Scratch

✅ Multiple Sprites

Add, delete, and control multiple sprites

Each sprite has its own animations

✅ Play All

Play animations of all sprites together

✨ Hero Feature: Collision-Based Animation Swap

Sprites detect collision and swap animations dynamically, adding interactivity and realism

🛠 Tech Stack
React (JavaScript)

Tailwind CSS (modern responsive design & 3D-like gradients, shadows)

Custom hooks (useCollisionDetection)

Deployed on Netlify

📦 Folder Structure
📦 Folder Structure
bash
Copy
Edit
src/
├── components/
│   ├── BlockPanel.js         # Motion & Looks blocks
│   ├── SpriteCanvas.js       # Canvas to display sprites
│   ├── Sprite.js            # Single sprite rendering
│   ├── SpriteList.js        # List & management of sprites
│   ├── CodeArea.js         # Drag-and-drop code editor
│   └── Controls.js          # Play/Add/Reset buttons
├── hooks/
│   └── useCollisionDetection.js  # Hero feature logic
├── App.js                   # Main app logic & layout
├── index.js                 # Entry point
├── styles.css               # Tailwind CSS imports
└── tailwind.config.js       # Tailwind configuration
📄 Challenge Instructions (Implemented)
✅ Motion animations, drag-and-drop interface
✅ Looks animations
✅ Multiple sprites with independent scripts
✅ Play button: animate all sprites together
✅ Hero feature: animation swap on collision
✅ Tailwind CSS for modern UI
✅ Netlify deployment

📦 Installation
git clone https://github.com/Dassourav07/visual-code-blocks-project.git
cd visual-code-blocks-lab
npm install
npm start
Open http://localhost:3000 in your browser.

🌍 Deployment
This project is deployed on Netlify:
🔗 View Live App

To deploy:

Push code to your GitHub repository

Connect Netlify to the repository

Netlify automatically builds & deploys on push

✨ UI & Design
Ultra-modern 3D card effect using Tailwind CSS: bg-white/40, backdrop-blur-md, rounded corners, shadows, gradients

Bright gradient header: from-indigo-500 via-purple-500 to-pink-500

Fully responsive & interactive

📢 Hero Feature: Collision-Based Animation Swap
Before Collision
![Image1.png](image.png)
![Image2.png](image.png)
After Collision
![Image3.png](image.png)

When two sprites collide:

Their move animations automatically swap

Example: Sprite 1 moves +10 steps, Sprite 2 moves -10 steps → after collision, they switch directions

This adds life & interactivity beyond basic Scratch animations.


