# 🚀 Workflow Builder UI

![Workflow Builder Banner](https://via.placeholder.com/1200x400/2563EB/ffffff?text=Workflow+Builder+UI)

> A powerful, interactive, and modular frontend application for building complex workflow trees. Designed with React, clean CSS, and a focus on UX.

[![React](https://img.shields.io/badge/React-19.2.0-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-success)]()

---

## 📖 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📸 Screenshots](#-screenshots)
- [🚀 Getting Started](#-getting-started)
- [💡 Usage Guide](#-usage-guide)
- [📂 Project Structure](#-project-structure)
- [🧩 core Logic](#-core-logic)

---

## ✨ Features

### 🎨 Visual Workflow Canvas
- **Dynamic Tree Visualization**: Visualize complex workflows with a clean, vertical tree layout.
- **Responsive Design**: Adapts beautifully to different screen sizes.
- **Custom CSS Animations**: Smooth transitions for adding/removing nodes.

### ⚡ Interactive Elements
- **Add Nodes**: Easily insert **Action** or **Branch** nodes at any point.
- **Smart Branching**: Create 'True/False' logic paths with a single click.
- **Context-Sensitive Menus**: Intuitive modal for adding new steps.

### 🧠 State Management
- **Undo/Redo**: Full history support to safely experiment with changes.
- **Save/Load**: Persist your workflows to LocalStorage (and auto-logs JSON to console).
- **Smart Deletion**: Deleting a node automatically reconnects parents to children to preserve flow continuity.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Pure CSS3 with CSS Variables (No external UI libraries)
- **Icons**: SVG Icons (Zero dependency)
- **State Management**: React `useReducer` & `Context API`

---

## 📸 Screenshots

| **Dashboard View** | **Node Interaction** |
|:---:|:---:|
| ![Dashboard Placeholder](https://via.placeholder.com/400x300/e0e0e0/333333?text=Dashboard+UI) | ![Interaction Placeholder](https://via.placeholder.com/400x300/e0e0e0/333333?text=Add+Node+Modal) |
| *The main canvas showing a complex workflow tree.* | *Context-sensitive modal to add Actions or Branches.* |

> *Note: Replace the headers above with actual screenshots of your application located in `src/assets/screenshots`.*

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/workflow-builder-ui.git
   cd workflow-builder-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in Browser**
   Navigate to `http://localhost:5173` to see the app in action.

---

## 💡 Usage Guide

1. **Adding a Node**: Click the small `+` button on any connecting line to open the insertion menu. Choose between **Action**, **Branch**, or **End**.
2. **Editing Labels**: Click on any node's text label to rename it inplace. Press `Enter` to save.
3. **Deleting a Node**: Hover over a node (except Start) and click the `Trash` icon.
    - *Pro Tip*: The child nodes will automatically attach to the parent!
4. **Undo/Redo**: Use the toolbar buttons at the top right to revert or re-apply changes.
5. **Saving**: Click "Save Workflow" to store your progress.

---

## 📂 Project Structure

```bash
src/
├── assets/             # Static assets (images, icons)
├── components/
│   ├── Canvas/
│   │   └── Canvas.jsx         # Main workflow rendering area
│   ├── Node/
│   │   ├── NodeTypes/         # Individual node implementations
│   │   │   ├── ActionNode.jsx
│   │   │   ├── BranchNode.jsx
│   │   │   ├── StartNode.jsx
│   │   │   └── EndNode.jsx
│   │   ├── AddNodeModal.jsx   # "Context-sensitive" insertion menu
│   │   ├── NodeCard.jsx       # The visual UI card for each node
│   │   └── Node.jsx           # Recursive node wrapper
│   ├── Tutorial/              # Onboarding guide
│   └── Header.jsx             # App navigation
├── context/
│   └── WorkflowContext.jsx    # Global State (Reducers, Actions, Logic)
├── pages/
│   ├── Builder.jsx            # Main editor view
│   └── Dashboard.jsx          # Project management view
├── styles/
│   └── variables.css          # Design tokens (Colors, Spacing)
├── constants.js               # Config, Node Types, Initial Data
├── App.jsx                    # Routing configuration
└── main.jsx                   # Entry point
```

---

## 🧩 Core Logic

### Data Model
The workflow is represented as a flat dictionary of nodes for O(1) access updates, linked via `children` arrays.

```json
"node_123": {
  "id": "node_123",
  "type": "action",
  "label": "Send Email",
  "children": ["node_456"]
}
```

### Reconnection Logic
When a node is deleted, the reducer identifies its parent and repoints the parent's `children` array to the deleted node's children, ensuring the tree never breaks.

---

Made with ❤️ by Swastika
