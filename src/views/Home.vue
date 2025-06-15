<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-background">
        <div class="floating-elements">
          <div class="floating-element" v-for="n in 15" :key="n"></div>
        </div>
      </div>
      <MDBContainer fluid class="hero-content">
        <MDBRow class="align-items-center min-vh-100">
          <MDBCol lg="6" class="hero-text">
            <div class="hero-badge mb-4">
              <MDBIcon fas icon="code" class="me-2" />
              Développeur Full Stack
            </div>
            <h1 class="hero-title mb-4">
              Créons ensemble votre
              <span class="highlight-text">vision digitale</span>
            </h1>
            <p class="hero-description mb-5">
              Expert en développement web moderne avec Vue.js, Node.js, et les dernières technologies. 
              Je transforme vos idées en applications web performantes et élégantes.
            </p>
            <div class="hero-actions">
              <MDBBtn color="primary" size="lg" class="hero-btn me-3" @click="scrollToSection('services')">
                <MDBIcon fas icon="rocket" class="me-2" />
                Découvrir mes services
              </MDBBtn>
              <MDBBtn color="outline-primary" size="lg" class="hero-btn-outline" @click="scrollToSection('portfolio')">
                <MDBIcon fas icon="eye" class="me-2" />
                Voir le portfolio
              </MDBBtn>
            </div>
          </MDBCol>
          <MDBCol lg="6" class="hero-visual">
            <div class="code-animation">
              <div class="code-window">
                <div class="code-header">
                  <div class="window-controls">
                    <span class="dot red"></span>
                    <span class="dot yellow"></span>
                    <span class="dot green"></span>
                  </div>
                  <span class="window-title">DevStack Pro</span>
                </div>
                <div class="code-content">
                  <div class="code-line" v-for="(line, index) in codeLines" :key="index" :class="{ active: index <= activeLineIndex }">
                    <span class="line-number">{{ index + 1 }}</span>
                    <span class="code-text" v-html="line"></span>
                  </div>
                </div>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

    <!-- Technologies Section -->
    <section class="technologies-section" id="technologies">
      <MDBContainer fluid>
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Technologies Maîtrisées</h2>
          <p class="section-subtitle">Stack technologique moderne pour des solutions performantes</p>
        </div>
        
        <MDBRow class="g-4">
          <MDBCol lg="3" md="6" v-for="(tech, index) in technologies" :key="index">
            <div class="tech-card" :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="tech-icon" :style="{ background: tech.gradient }">
                <i :class="tech.icon"></i>
              </div>
              <h5 class="tech-name">{{ tech.name }}</h5>
              <p class="tech-description">{{ tech.description }}</p>
              <div class="tech-level">
                <div class="level-bar">
                  <div class="level-progress" :style="{ width: tech.level + '%' }"></div>
                </div>
                <span class="level-text">{{ tech.level }}%</span>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

    <!-- Services Preview -->
    <section class="services-preview" id="services">
      <MDBContainer fluid>
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Mes Services</h2>
          <p class="section-subtitle">Solutions complètes pour votre présence digitale</p>
        </div>
        
        <MDBRow class="g-4">
          <MDBCol lg="4" md="6" v-for="(service, index) in services" :key="index">
            <div class="service-card" :style="{ animationDelay: `${index * 0.2}s` }">
              <div class="service-icon">
                <MDBIcon :fas="service.iconType === 'fas'" :fab="service.iconType === 'fab'" :icon="service.icon" />
              </div>
              <h4 class="service-title">{{ service.title }}</h4>
              <p class="service-description">{{ service.description }}</p>
              <ul class="service-features">
                <li v-for="feature in service.features" :key="feature">
                  <MDBIcon fas icon="check" class="me-2" />
                  {{ feature }}
                </li>
              </ul>
              <MDBBtn color="primary" outline class="service-btn">
                En savoir plus
                <MDBIcon fas icon="arrow-right" class="ms-2" />
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

    <!-- Portfolio Preview -->
    <section class="portfolio-preview" id="portfolio">
      <MDBContainer fluid>
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Projets Récents</h2>
          <p class="section-subtitle">Découvrez mes dernières réalisations</p>
        </div>
        
        <MDBRow class="g-4">
          <MDBCol lg="4" md="6" v-for="(project, index) in portfolioItems" :key="index">
            <div class="portfolio-card" :style="{ animationDelay: `${index * 0.15}s` }">
              <div class="portfolio-image">
                <img :src="project.image" :alt="project.title" class="img-fluid" />
                <div class="portfolio-overlay">
                  <div class="portfolio-actions">
                    <MDBBtn color="primary" floating class="me-2">
                      <MDBIcon fas icon="eye" />
                    </MDBBtn>
                    <MDBBtn color="secondary" floating>
                      <MDBIcon fab icon="github" />
                    </MDBBtn>
                  </div>
                </div>
              </div>
              <div class="portfolio-content">
                <h5 class="portfolio-title">{{ project.title }}</h5>
                <p class="portfolio-description">{{ project.description }}</p>
                <div class="portfolio-tags">
                  <span class="tag" v-for="tag in project.tags" :key="tag">{{ tag }}</span>
                </div>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
        
        <div class="text-center mt-5">
          <MDBBtn color="primary" size="lg" @click="$router.push('/portfolio')">
            <MDBIcon fas icon="folder-open" class="me-2" />
            Voir tous les projets
          </MDBBtn>
        </div>
      </MDBContainer>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <MDBContainer fluid>
        <div class="cta-content text-center">
          <h2 class="cta-title mb-4">Prêt à démarrer votre projet ?</h2>
          <p class="cta-description mb-5">
            Contactez-moi dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé.
          </p>
          <div class="cta-actions">
            <MDBBtn color="primary" size="lg" class="me-3">
              <MDBIcon fas icon="paper-plane" class="me-2" />
              Me contacter
            </MDBBtn>
            <MDBBtn color="outline-light" size="lg">
              <MDBIcon fas icon="phone" class="me-2" />
              Programmer un appel
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon
} from 'mdb-vue-ui-kit'

const activeLineIndex = ref(-1)

const codeLines = [
  '<span class="keyword">const</span> <span class="variable">developer</span> = {',
  '  <span class="property">name</span>: <span class="string">"DevStack Pro"</span>,',
  '  <span class="property">skills</span>: [<span class="string">"Vue.js"</span>, <span class="string">"Node.js"</span>],',
  '  <span class="property">passion</span>: <span class="string">"Code & Innovation"</span>,',
  '  <span class="method">createAwesome</span>() {',
  '    <span class="keyword">return</span> <span class="string">"Amazing Web Apps"</span>;',
  '  }',
  '};'
]

const technologies = [
  {
    name: 'Vue.js',
    icon: 'fab fa-vuejs',
    description: 'Framework progressif pour interfaces utilisateur modernes',
    level: 95,
    gradient: 'linear-gradient(45deg, #4FC08D, #41B883)'
  },
  {
    name: 'Node.js',
    icon: 'fab fa-node-js',
    description: 'Runtime JavaScript côté serveur haute performance',
    level: 90,
    gradient: 'linear-gradient(45deg, #339933, #68A063)'
  },
  {
    name: 'MongoDB',
    icon: 'fas fa-database',
    description: 'Base de données NoSQL flexible et scalable',
    level: 85,
    gradient: 'linear-gradient(45deg, #47A248, #4DB33D)'
  },
  {
    name: 'TypeScript',
    icon: 'fab fa-js-square',
    description: 'JavaScript typé pour des applications robustes',
    level: 88,
    gradient: 'linear-gradient(45deg, #3178C6, #235A97)'
  }
]

const services = [
  {
    title: 'Développement Frontend',
    icon: 'palette',
    iconType: 'fas',
    description: 'Interfaces utilisateur modernes et responsives avec Vue.js, React, et les dernières technologies.',
    features: ['Design responsive', 'Performance optimisée', 'UX/UI moderne', 'PWA']
  },
  {
    title: 'Développement Backend',
    icon: 'server',
    iconType: 'fas',
    description: 'APIs robustes et scalables avec Node.js, Express, et bases de données modernes.',
    features: ['APIs RESTful', 'Sécurité avancée', 'Performance', 'Scalabilité']
  },
  {
    title: 'Solutions Full Stack',
    icon: 'layer-group',
    iconType: 'fas',
    description: 'Applications web complètes de A à Z avec architecture moderne et déploiement cloud.',
    features: ['Architecture moderne', 'Déploiement cloud', 'Maintenance', 'Support']
  }
]

const portfolioItems = [
  {
    title: 'E-Commerce Platform',
    description: 'Plateforme e-commerce moderne avec Vue.js et Node.js',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe']
  },
  {
    title: 'Dashboard Analytics',
    description: 'Tableau de bord analytique en temps réel',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['React', 'D3.js', 'Express', 'Socket.io']
  },
  {
    title: 'Mobile App Backend',
    description: 'API robuste pour application mobile',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    tags: ['Node.js', 'PostgreSQL', 'Redis', 'Docker']
  }
]

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const animateCode = () => {
  let index = 0
  const interval = setInterval(() => {
    if (index < codeLines.length) {
      activeLineIndex.value = index
      index++
    } else {
      clearInterval(interval)
      setTimeout(() => {
        activeLineIndex.value = -1
        setTimeout(animateCode, 1000)
      }, 2000)
    }
  }, 500)
}

onMounted(() => {
  setTimeout(animateCode, 1000)
})
</script>

<style scoped>
.home-page {
  overflow-x: hidden;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0D1B2A 0%, #1B263B 50%, #415A77 100%);
  color: white;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
}

.floating-elements {
  position: absolute;
  width: 100%;
  height: 100%;
}

.floating-element {
  position: absolute;
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  animation: float 8s infinite linear;
}

.floating-element:nth-child(odd) {
  background: rgba(66, 165, 245, 0.2);
  animation-duration: 12s;
}

.floating-element:nth-child(1) { top: 20%; left: 10%; animation-delay: 0s; }
.floating-element:nth-child(2) { top: 80%; left: 20%; animation-delay: 2s; }
.floating-element:nth-child(3) { top: 40%; left: 80%; animation-delay: 4s; }
.floating-element:nth-child(4) { top: 60%; left: 60%; animation-delay: 1s; }
.floating-element:nth-child(5) { top: 30%; left: 90%; animation-delay: 3s; }

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 2rem;
}

.hero-badge {
  display: inline-block;
  background: rgba(66, 165, 245, 0.2);
  color: #42A5F5;
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-weight: 600;
  font-size: 0.9rem;
  border: 1px solid rgba(66, 165, 245, 0.3);
  animation: fadeInUp 1s ease 0.2s both;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 1.5rem;
  animation: fadeInUp 1s ease 0.4s both;
}

.highlight-text {
  background: linear-gradient(45deg, #42A5F5, #1976D2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-description {
  font-size: 1.25rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.8);
  animation: fadeInUp 1s ease 0.6s both;
}

.hero-actions {
  animation: fadeInUp 1s ease 0.8s both;
}

.hero-btn {
  border-radius: 50px;
  padding: 1rem 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.hero-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(25, 118, 210, 0.4);
}

.hero-btn-outline {
  border: 2px solid #42A5F5;
  color: #42A5F5;
  border-radius: 50px;
  padding: 1rem 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.hero-btn-outline:hover {
  background: #42A5F5;
  color: white;
  transform: translateY(-3px);
  box-shadow: 0 15px 40px rgba(66, 165, 245, 0.4);
}

/* Code Animation */
.code-animation {
  animation: fadeInRight 1s ease 1s both;
}

.code-window {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.code-header {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.window-controls {
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red { background: #ff5f57; }
.dot.yellow { background: #ffbd2e; }
.dot.green { background: #28ca42; }

.window-title {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

.code-content {
  padding: 1.5rem;
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 0.9rem;
}

.code-line {
  display: flex;
  align-items: center;
  padding: 0.25rem 0;
  opacity: 0.3;
  transition: all 0.5s ease;
}

.code-line.active {
  opacity: 1;
  transform: translateX(0);
}

.line-number {
  color: rgba(255, 255, 255, 0.4);
  margin-right: 1rem;
  min-width: 20px;
  text-align: right;
}

.code-text .keyword { color: #ff6b6b; }
.code-text .variable { color: #4ecdc4; }
.code-text .property { color: #45b7d1; }
.code-text .string { color: #96ceb4; }
.code-text .method { color: #feca57; }

/* Sections */
.technologies-section,
.services-preview,
.portfolio-preview {
  padding: 6rem 0;
  position: relative;
}

.technologies-section {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.services-preview {
  background: #ffffff;
}

.portfolio-preview {
  background: linear-gradient(135deg, #f1f3f4 0%, #e8eaf6 100%);
}

.section-header {
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1976D2;
  margin-bottom: 1rem;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

/* Tech Cards */
.tech-card {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease both;
}

.tech-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.tech-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: white;
}

.tech-name {
  font-weight: 700;
  color: #1976D2;
  margin-bottom: 1rem;
}

.tech-description {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.tech-level {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.level-bar {
  flex: 1;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
}

.level-progress {
  height: 100%;
  background: linear-gradient(45deg, #1976D2, #42A5F5);
  border-radius: 3px;
  transition: width 1s ease;
}

.level-text {
  font-weight: 600;
  color: #1976D2;
  font-size: 0.9rem;
}

/* Service Cards */
.service-card {
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease both;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.service-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(45deg, #1976D2, #42A5F5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  color: white;
}

.service-title {
  font-weight: 700;
  color: #1976D2;
  margin-bottom: 1rem;
}

.service-description {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.service-features {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
  text-align: left;
  flex: 1;
}

.service-features li {
  padding: 0.5rem 0;
  color: #666;
  display: flex;
  align-items: center;
}

.service-features .fa-check {
  color: #4CAF50;
}

.service-btn {
  border-radius: 50px;
  padding: 0.75rem 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
  margin-top: auto;
}

/* Portfolio Cards */
.portfolio-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease both;
}

.portfolio-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.portfolio-image {
  position: relative;
  overflow: hidden;
  height: 200px;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.portfolio-card:hover .portfolio-image img {
  transform: scale(1.1);
}

.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(25, 118, 210, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.portfolio-card:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-actions {
  display: flex;
  gap: 1rem;
}

.portfolio-content {
  padding: 1.5rem;
}

.portfolio-title {
  font-weight: 700;
  color: #1976D2;
  margin-bottom: 0.5rem;
}

.portfolio-description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.portfolio-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #e3f2fd;
  color: #1976D2;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #1976D2 0%, #1565C0 100%);
  color: white;
  padding: 6rem 0;
  text-align: center;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.cta-description {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  margin: 0 auto 2rem;
}

.cta-actions .btn {
  border-radius: 50px;
  padding: 1rem 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-actions .btn:hover {
  transform: translateY(-3px);
}

/* Animations */
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

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-description {
    font-size: 1.1rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .hero-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .hero-btn,
  .hero-btn-outline {
    width: 100%;
  }
  
  .cta-actions {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }
  
  .cta-actions .btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>