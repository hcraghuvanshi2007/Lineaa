# Linea | The Art of Minimalist Luxury 🏰💎

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20Firebase-blue?style=for-the-badge&logo=firebase)](https://avancaa.in)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

**Linea** is a high-end minimalist jewelry boutique designed to offer a cinematic commerce experience. Built with React and performance-first architecture, it blends modern technology with luxury brand aesthetics.

---

## ✨ Cinematic Brand Experience

Linea isn't just a shop; it's a mood.
- **Ambient Mood Player**: A persistent, 52-second macro-zoomed cinematic loop synced with curated ambient audio.
- **Micro-Animations**: Fluid transitions using CSS Modules and standard React state management.
- **Dynamic Design**: A glassmorphic, responsive UI that adapts to every device.

## 🛠️ Technical Excellence (Capstone SOP)

This project was built to meet and exceed production-grade requirements:

### 🚀 Performance Optimization
- **Lazy Loading**: Route-based code splitting using `React.lazy` and `Suspense` for lightning-fast initial loads.
- **Memoization**: Optimized rendering using `React.memo` and `useMemo` in high-frequency components like the `ProductGrid`.
- **Dynamic Pagination**: Scalable "Load More" system to handle large inventories without memory bloat.

### 🛡️ Reliability & Resilience
- **Global Error Boundary**: Comprehensive fallback UI to catch and handle runtime exceptions gracefully.
- **Image Healing Logic**: A custom resilience bridge that dynamically resolves broken Firestore asset references using a master product ID registry.

### 📦 Modern Architecture
- **Vanilla CSS Modules**: Modular, scoped styling for high maintainability.
- **Firebase Backend**: Real-time Authentication, Firestore persistence for Orders & Wishlists, and high-availability Hosting.

---

## 🏗️ Getting Started

### Prerequisites
- Node.js (v18+)
- Firebase Account

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/hcraghuvanshi2007/Linea.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup Environment:
   Create a `.env` file with your Firebase credentials.

4. Start development:
   ```bash
   npm run dev
   ```

### Deployment
The project is optimized for **Firebase Hosting**:
```bash
npm run build
firebase deploy
```

---

## 🎨 Design Philosophy
Linea uses a curated, neutral palette designed to let the products take center stage:
- **Primary**: `hsl(187, 62%, 34%)` - Sage Green
- **Surface**: `hsl(0, 0%, 100%)` - Pure Ivory
- **Background**: `hsl(40, 20%, 98%)` - Warm Bone

---

## 🤝 Contributing
Interested in expanding the Linea world? Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License
Handcrafted by **Himanchal Raghuvanshi**. All rights reserved.

---
*Visit the live boutique at [avancaa.in](https://avancaa.in)* 💍🏰
