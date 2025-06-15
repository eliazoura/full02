<template>
  <div class="portfolio-page">
    <!-- Hero Section -->
    <section class="portfolio-hero">
      <MDBContainer fluid>
        <div class="hero-content text-center">
          <h1 class="hero-title">Mon Portfolio</h1>
          <p class="hero-description">
            Découvrez mes réalisations et projets développés avec passion et expertise
          </p>
          
          <!-- Filter Buttons -->
          <div class="filter-buttons">
            <MDBBtn 
              v-for="filter in filters" 
              :key="filter.key"
              :color="activeFilter === filter.key ? 'primary' : 'outline-primary'"
              @click="setFilter(filter.key)"
              class="filter-btn"
            >
              <MDBIcon :fas="filter.iconType === 'fas'" :fab="filter.iconType === 'fab'" :icon="filter.icon" class="me-2" />
              {{ filter.label }}
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
    </section>

    <!-- Portfolio Grid -->
    <section class="portfolio-grid">
      <MDBContainer fluid>
        <div class="projects-container">
          <TransitionGroup name="portfolio" tag="div" class="projects-grid">
            <div 
              v-for="project in filteredProjects" 
              :key="project.id"
              class="project-card"
              @click="openProjectModal(project)"
            >
              <div class="project-image">
                <img :src="project.image" :alt="project.title" />
                <div class="project-overlay">
                  <div class="project-actions">
                    <MDBBtn color="primary" floating size="sm" class="me-2" @click.stop="openProjectModal(project)">
                      <MDBIcon fas icon="eye" />
                    </MDBBtn>
                    <MDBBtn color="secondary" floating size="sm" v-if="project.githubUrl" @click.stop="openLink(project.githubUrl)">
                      <MDBIcon fab icon="github" />
                    </MDBBtn>
                    <MDBBtn color="success" floating size="sm" v-if="project.liveUrl" @click.stop="openLink(project.liveUrl)">
                      <MDBIcon fas icon="external-link-alt" />
                    </MDBBtn>
                  </div>
                </div>
              </div>
              
              <div class="project-content">
                <div class="project-category">{{ project.category }}</div>
                <h3 class="project-title">{{ project.title }}</h3>
                <p class="project-description">{{ project.shortDescription }}</p>
                
                <div class="project-tech">
                  <span v-for="tech in project.technologies.slice(0, 3)" :key="tech" class="tech-badge">
                    {{ tech }}
                  </span>
                  <span v-if="project.technologies.length > 3" class="tech-more">
                    +{{ project.technologies.length - 3 }}
                  </span>
                </div>
                
                <div class="project-meta">
                  <span class="project-date">
                    <MDBIcon fas icon="calendar" class="me-1" />
                    {{ formatDate(project.date) }}
                  </span>
                  <span class="project-status" :class="project.status">
                    <MDBIcon fas :icon="getStatusIcon(project.status)" class="me-1" />
                    {{ getStatusLabel(project.status) }}
                  </span>
                </div>
              </div>
            </div>
          </TransitionGroup>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredProjects.length === 0" class="empty-state">
          <MDBIcon fas icon="folder-open" class="empty-icon" />
          <h3>Aucun projet trouvé</h3>
          <p>Essayez de changer le filtre pour voir d'autres projets.</p>
        </div>
      </MDBContainer>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <MDBContainer fluid>
        <MDBRow class="text-center">
          <MDBCol lg="3" md="6" v-for="(stat, index) in stats" :key="index">
            <div class="stat-card" :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="stat-icon" :style="{ background: stat.gradient }">
                <MDBIcon fas :icon="stat.icon" />
              </div>
              <div class="stat-number">{{ stat.number }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

    <!-- Technologies Section -->
    <section class="technologies-section">
      <MDBContainer fluid>
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Technologies Utilisées</h2>
          <p class="section-subtitle">Les outils et frameworks que j'utilise dans mes projets</p>
        </div>
        
        <div class="tech-cloud">
          <div 
            v-for="(tech, index) in allTechnologies" 
            :key="tech.name"
            class="tech-item"
            :style="{ 
              fontSize: `${tech.size}rem`,
              animationDelay: `${index * 0.1}s`,
              color: tech.color
            }"
          >
            {{ tech.name }}
          </div>
        </div>
      </MDBContainer>
    </section>

    <!-- Project Modal -->
    <MDBModal
      id="projectModal"
      tabindex="-1"
      v-model="showProjectModal"
      size="xl"
      class="project-modal"
    >
      <div class="modal-dialog">
        <div v-if="selectedProject">
          <MDBModalHeader>
            <MDBModalTitle>{{ selectedProject.title }}</MDBModalTitle>
            <MDBBtn color="none" class="btn-close" @click="showProjectModal = false"></MDBBtn>
          </MDBModalHeader>
          
          <MDBModalBody>
            <div class="modal-project-content">
              <div class="project-images">
                <img :src="selectedProject.image" :alt="selectedProject.title" class="main-image" />
                <div v-if="selectedProject.gallery" class="image-gallery">
                  <img 
                    v-for="(img, index) in selectedProject.gallery" 
                    :key="index"
                    :src="img" 
                    class="gallery-thumb"
                    @click="selectedProject.image = img"
                  />
                </div>
              </div>
              
              <div class="project-details">
                <div class="project-category-large">{{ selectedProject.category }}</div>
                <p class="project-description-full">{{ selectedProject.fullDescription }}</p>
                
                <div class="project-features">
                  <h5>Fonctionnalités principales :</h5>
                  <ul>
                    <li v-for="feature in selectedProject.features" :key="feature">
                      <MDBIcon fas icon="check" class="me-2" />
                      {{ feature }}
                    </li>
                  </ul>
                </div>
                
                <div class="project-tech-full">
                  <h5>Technologies utilisées :</h5>
                  <div class="tech-badges">
                    <span v-for="tech in selectedProject.technologies" :key="tech" class="tech-badge-large">
                      {{ tech }}
                    </span>
                  </div>
                </div>
                
                <div class="project-links">
                  <MDBBtn v-if="selectedProject.liveUrl" color="primary" @click="openLink(selectedProject.liveUrl)">
                    <MDBIcon fas icon="external-link-alt" class="me-2" />
                    Voir le site
                  </MDBBtn>
                  <MDBBtn v-if="selectedProject.githubUrl" color="dark" @click="openLink(selectedProject.githubUrl)">
                    <MDBIcon fab icon="github" class="me-2" />
                    Code source
                  </MDBBtn>
                </div>
              </div>
            </div>
          </MDBModalBody>
        </div>
      </div>
    </MDBModal>

    <!-- CTA Section -->
    <section class="cta-section">
      <MDBContainer fluid>
        <div class="cta-content text-center">
          <h2 class="cta-title">Vous avez un projet en tête ?</h2>
          <p class="cta-description">
            Discutons ensemble de votre vision et créons quelque chose d'extraordinaire.
          </p>
          <MDBBtn color="primary" size="lg">
            <MDBIcon fas icon="paper-plane" class="me-2" />
            Démarrer un projet
          </MDBBtn>
        </div>
      </MDBContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody
} from 'mdb-vue-ui-kit'

const activeFilter = ref('all')
const showProjectModal = ref(false)
const selectedProject = ref(null)

const filters = [
  { key: 'all', label: 'Tous', icon: 'th', iconType: 'fas' },
  { key: 'web', label: 'Applications Web', icon: 'laptop-code', iconType: 'fas' },
  { key: 'ecommerce', label: 'E-Commerce', icon: 'shopping-cart', iconType: 'fas' },
  { key: 'api', label: 'API/Backend', icon: 'server', iconType: 'fas' },
  { key: 'mobile', label: 'Mobile', icon: 'mobile-alt', iconType: 'fas' }
]

const projects = [
  {
    id: 1,
    title: 'Plateforme E-Learning Moderne',
    shortDescription: 'Plateforme d\'apprentissage en ligne avec suivi des progrès',
    fullDescription: 'Plateforme complète d\'e-learning permettant aux utilisateurs de suivre des cours en ligne, avec système de badges, quiz interactifs, et tableau de bord personnalisé pour suivre les progrès.',
    category: 'Application Web',
    type: 'web',
    image: 'https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Socket.io', 'Stripe'],
    features: [
      'Système d\'authentification complet',
      'Cours vidéo avec progression',
      'Quiz interactifs et évaluations',
      'Tableau de bord étudiant/professeur',
      'Paiements sécurisés',
      'Chat en temps réel'
    ],
    date: '2024-01-15',
    status: 'completed',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com'
  },
  {
    id: 2,
    title: 'Dashboard Analytics Temps Réel',
    shortDescription: 'Tableau de bord analytique avec visualisations dynamiques',
    fullDescription: 'Tableau de bord complet pour visualiser les données analytiques en temps réel avec graphiques interactifs, KPIs personnalisables et alertes automatiques.',
    category: 'Application Web',
    type: 'web',
    image: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL', 'Redis'],
    features: [
      'Visualisations interactives',
      'Filtres et segments avancés',
      'Alertes personnalisables',
      'Export de données',
      'Mode sombre/clair',
      'Responsive design'
    ],
    date: '2023-12-10',
    status: 'completed',
    liveUrl: 'https://example.com'
  },
  {
    id: 3,
    title: 'Boutique E-Commerce Premium',
    shortDescription: 'Site e-commerce haut de gamme avec expérience utilisateur optimisée',
    fullDescription: 'Boutique en ligne complète avec catalogue produits avancé, panier intelligent, système de recommandations et interface d\'administration complète.',
    category: 'E-Commerce',
    type: 'ecommerce',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Vue.js', 'Nuxt.js', 'Strapi', 'Stripe', 'Algolia'],
    features: [
      'Catalogue produits avec filtres',
      'Panier et checkout optimisé',
      'Système de recommandations',
      'Gestion des stocks',
      'Paiements sécurisés',
      'Panel administrateur'
    ],
    date: '2023-11-20',
    status: 'completed',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com'
  },
  {
    id: 4,
    title: 'API REST Microservices',
    shortDescription: 'Architecture microservices scalable pour application mobile',
    fullDescription: 'API robuste construite avec une architecture microservices, incluant authentification JWT, rate limiting, monitoring et documentation automatique.',
    category: 'API/Backend',
    type: 'api',
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Node.js', 'Express', 'Docker', 'MongoDB', 'Redis', 'JWT'],
    features: [
      'Architecture microservices',
      'Authentification JWT',
      'Rate limiting avancé',
      'Documentation Swagger',
      'Tests automatisés',
      'Monitoring et logs'
    ],
    date: '2023-10-05',
    status: 'completed',
    githubUrl: 'https://github.com'
  },
  {
    id: 5,
    title: 'Application Mobile Fitness',
    shortDescription: 'App mobile de suivi fitness avec coach IA',
    fullDescription: 'Application mobile complète pour le suivi fitness avec programmes personnalisés, coach virtuel IA et communauté d\'entraide.',
    category: 'Mobile',
    type: 'mobile',
    image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['React Native', 'Node.js', 'TensorFlow', 'MongoDB', 'Firebase'],
    features: [
      'Suivi des exercices',
      'Coach IA personnalisé',
      'Programmes d\'entraînement',
      'Communauté sociale',
      'Notifications push',
      'Synchronisation wearables'
    ],
    date: '2024-02-28',
    status: 'in-progress',
    liveUrl: 'https://example.com'
  },
  {
    id: 6,
    title: 'Plateforme de Gestion Immobilière',
    shortDescription: 'Solution complète pour agences immobilières',
    fullDescription: 'Plateforme complète de gestion immobilière avec CRM intégré, gestion des biens, rendez-vous et documents.',
    category: 'Application Web',
    type: 'web',
    image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
    technologies: ['Vue.js', 'Laravel', 'MySQL', 'AWS', 'Pusher'],
    features: [
      'CRM complet',
      'Gestion des biens',
      'Planning des visites',
      'Génération de documents',
      'Notifications temps réel',
      'Interface mobile'
    ],
    date: '2023-09-15',
    status: 'completed',
    liveUrl: 'https://example.com'
  }
]

const stats = [
  {
    number: '25+',
    label: 'Projets Réalisés',
    icon: 'rocket',
    gradient: 'linear-gradient(45deg, #1976D2, #42A5F5)'
  },
  {
    number: '15+',
    label: 'Clients Satisfaits',
    icon: 'users',
    gradient: 'linear-gradient(45deg, #4CAF50, #66BB6A)'
  },
  {
    number: '3+',
    label: 'Années d\'Expérience',
    icon: 'clock',
    gradient: 'linear-gradient(45deg, #FF9800, #FFB74D)'
  },
  {
    number: '12+',
    label: 'Technologies Maîtrisées',
    icon: 'code',
    gradient: 'linear-gradient(45deg, #9C27B0, #BA68C8)'
  }
]

const allTechnologies = [
  { name: 'Vue.js', size: 1.8, color: '#4FC08D' },
  { name: 'React', size: 1.6, color: '#61DAFB' },
  { name: 'Node.js', size: 1.9, color: '#339933' },
  { name: 'TypeScript', size: 1.4, color: '#3178C6' },
  { name: 'MongoDB', size: 1.3, color: '#47A248' },
  { name: 'Express', size: 1.2, color: '#000000' },
  { name: 'Docker', size: 1.5, color: '#2496ED' },
  { name: 'AWS', size: 1.1, color: '#FF9900' },
  { name: 'PostgreSQL', size: 1.0, color: '#336791' },
  { name: 'Redis', size: 0.9, color: '#DC382D' },
  { name: 'GraphQL', size: 1.1, color: '#E10098' },
  { name: 'Socket.io', size: 0.8, color: '#010101' },
  { name: 'Stripe', size: 1.0, color: '#635BFF' },
  { name: 'Firebase', size: 1.2, color: '#FFCA28' },
  { name: 'Nuxt.js', size: 1.3, color: '#00DC82' }
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects
  }
  return projects.filter(project => project.type === activeFilter.value)
})

const setFilter = (filter: string) => {
  activeFilter.value = filter
}

const openProjectModal = (project: any) => {
  selectedProject.value = project
  showProjectModal.value = true
}

const openLink = (url: string) => {
  window.open(url, '_blank')
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed': return 'check-circle'
    case 'in-progress': return 'clock'
    case 'planning': return 'calendar'
    default: return 'circle'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'completed': return 'Terminé'
    case 'in-progress': return 'En cours'
    case 'planning': return 'Planifié'
    default: return 'Statut inconnu'
  }
}
</script>

<style scoped>
.portfolio-page {
  padding-top: 80px;
}

/* Portfolio Hero */
.portfolio-hero {
  background: linear-gradient(135deg, #1976D2 0%, #1565C0 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  animation: fadeInUp 1s ease;
}

.hero-description {
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  opacity: 0.9;
  animation: fadeInUp 1s ease 0.2s both;
}

.filter-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  animation: fadeInUp 1s ease 0.4s both;
}

.filter-btn {
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  font-weight: 500;
  transition: all 0.3s ease;
  white-space: nowrap;
}

/* Portfolio Grid */
.portfolio-grid {
  padding: 6rem 0;
  background: #f8f9fa;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.project-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  animation: fadeInUp 1s ease;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.project-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.1);
}

.project-overlay {
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

.project-card:hover .project-overlay {
  opacity: 1;
}

.project-actions {
  display: flex;
  gap: 1rem;
}

.project-content {
  padding: 1.5rem;
}

.project-category {
  color: #1976D2;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #333;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}

.project-description {
  color: #666;
  line-height: 1.5;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-badge {
  background: #e3f2fd;
  color: #1976D2;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.tech-more {
  background: #f5f5f5;
  color: #666;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}

.project-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8rem;
  color: #888;
}

.project-status.completed {
  color: #4CAF50;
}

.project-status.in-progress {
  color: #FF9800;
}

.project-status.planning {
  color: #2196F3;
}

/* Portfolio Transitions */
.portfolio-enter-active,
.portfolio-leave-active {
  transition: all 0.5s ease;
}

.portfolio-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.portfolio-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.portfolio-move {
  transition: transform 0.5s ease;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.empty-icon {
  font-size: 4rem;
  color: #ddd;
  margin-bottom: 1rem;
}

/* Stats Section */
.stats-section {
  padding: 4rem 0;
  background: white;
}

.stat-card {
  text-align: center;
  padding: 2rem;
  animation: fadeInUp 1s ease both;
}

.stat-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  font-size: 2rem;
  color: white;
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1976D2;
  margin-bottom: 0.5rem;
}

.stat-label {
  color: #666;
  font-weight: 500;
}

/* Technologies Section */
.technologies-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f1f3f4 0%, #e8eaf6 100%);
}

.tech-cloud {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

.tech-item {
  font-weight: 600;
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease both;
  cursor: default;
}

.tech-item:hover {
  transform: scale(1.1);
}

/* Project Modal */
.project-modal .modal-dialog {
  max-width: 1200px;
}

.modal-project-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.project-images {
  position: sticky;
  top: 1rem;
}

.main-image {
  width: 100%;
  border-radius: 12px;
  margin-bottom: 1rem;
}

.image-gallery {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.gallery-thumb {
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.gallery-thumb:hover {
  opacity: 1;
}

.project-category-large {
  color: #1976D2;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1rem;
}

.project-description-full {
  color: #666;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.project-features h5,
.project-tech-full h5 {
  color: #333;
  font-weight: 600;
  margin-bottom: 1rem;
}

.project-features ul {
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;
}

.project-features li {
  padding: 0.5rem 0;
  color: #666;
  display: flex;
  align-items: center;
}

.project-features .fa-check {
  color: #4CAF50;
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.tech-badge-large {
  background: #e3f2fd;
  color: #1976D2;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
}

.project-links {
  display: flex;
  gap: 1rem;
}

.project-links .btn {
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
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

.cta-section .btn {
  border-radius: 50px;
  padding: 1rem 2rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cta-section .btn:hover {
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

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .filter-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .filter-btn {
    width: 200px;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
  
  .modal-project-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .project-images {
    position: static;
  }
  
  .tech-cloud {
    gap: 1rem;
  }
  
  .tech-item {
    font-size: 1rem !important;
  }
  
  .project-links {
    flex-direction: column;
  }
  
  .project-links .btn {
    width: 100%;
  }
}
</style>