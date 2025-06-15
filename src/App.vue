<template>
  <div id="app">
    <Navbar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import Navbar from './components/Navbar.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  // Vérifier le token au démarrage de l'application
  authStore.verifyToken()
})
</script>

<style>
/* Global Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #ffffff;
}

#app {
  min-height: 100vh;
}

.main-content {
  padding-top: 76px; /* Height of fixed navbar */
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.75rem; }
h4 { font-size: 1.5rem; }
h5 { font-size: 1.25rem; }
h6 { font-size: 1rem; }

p {
  margin-bottom: 1rem;
  line-height: 1.6;
}

/* Links */
a {
  color: #1976D2;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #1565C0;
}

/* Buttons */
.btn {
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background: linear-gradient(45deg, #1976D2, #42A5F5);
  border: none;
}

.btn-primary:hover {
  background: linear-gradient(45deg, #1565C0, #1976D2);
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.3);
}

/* Cards */
.card {
  border: none;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 40px rgba(0, 0, 0, 0.15);
}

/* Sections */
.section {
  padding: 6rem 0;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1976D2;
  text-align: center;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #666;
  text-align: center;
  max-width: 600px;
  margin: 0 auto 3rem;
}

/* Animations */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 53%, 80%, 100% {
    transform: translate3d(0, 0, 0);
  }
  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }
  70% {
    transform: translate3d(0, -15px, 0);
  }
  90% {
    transform: translate3d(0, -4px, 0);
  }
}

/* Utility Classes */
.text-gradient {
  background: linear-gradient(45deg, #1976D2, #42A5F5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.shadow-soft {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.shadow-medium {
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.shadow-strong {
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .main-content {
    padding-top: 70px;
  }
  
  h1 { font-size: 2rem; }
  h2 { font-size: 1.75rem; }
  h3 { font-size: 1.5rem; }
  
  .section {
    padding: 4rem 0;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .section-subtitle {
    font-size: 1.1rem;
  }
}

/* Scrollbar Styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #1976D2, #42A5F5);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #1565C0, #1976D2);
}

/* Selection */
::selection {
  background: rgba(25, 118, 210, 0.2);
  color: #1976D2;
}

::-moz-selection {
  background: rgba(25, 118, 210, 0.2);
  color: #1976D2;
}
</style>