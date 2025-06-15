<template>
  <div class="services-page">
    <!-- Hero Section -->
    <section class="services-hero">
      <MDBContainer fluid>
        <div class="hero-content text-center">
          <h1 class="hero-title">Mes Services</h1>
          <p class="hero-description">
            Solutions complètes de développement web pour transformer vos idées en réalité digitale
          </p>
        </div>
      </MDBContainer>
    </section>

    <!-- Services Grid -->
    <section class="services-grid">
      <MDBContainer fluid>
        <MDBRow class="g-4">
          <MDBCol lg="4" md="6" v-for="(service, index) in services" :key="index">
            <div class="service-card-detailed" :style="{ animationDelay: `${index * 0.1}s` }">
              <div class="service-header">
                <div class="service-icon" :style="{ background: service.gradient }">
                  <MDBIcon :fas="service.iconType === 'fas'" :fab="service.iconType === 'fab'" :icon="service.icon" />
                </div>
                <h3 class="service-title">{{ service.title }}</h3>
                <p class="service-price">{{ service.price }}</p>
              </div>
              
              <div class="service-body">
                <p class="service-description">{{ service.description }}</p>
                
                <div class="service-features">
                  <h5 class="features-title">Inclus :</h5>
                  <ul class="features-list">
                    <li v-for="feature in service.features" :key="feature">
                      <MDBIcon fas icon="check-circle" class="me-2" />
                      {{ feature }}
                    </li>
                  </ul>
                </div>
                
                <div class="service-technologies">
                  <h5 class="tech-title">Technologies :</h5>
                  <div class="tech-tags">
                    <span class="tech-tag" v-for="tech in service.technologies" :key="tech">
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
              
              <div class="service-footer">
                <MDBBtn color="primary" class="service-btn w-100">
                  <MDBIcon fas icon="paper-plane" class="me-2" />
                  Demander un devis
                </MDBBtn>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

    <!-- Process Section -->
    <section class="process-section">
      <MDBContainer fluid>
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Mon Processus de Développement</h2>
          <p class="section-subtitle">Une approche méthodique pour des résultats optimaux</p>
        </div>
        
        <div class="process-timeline">
          <div class="process-step" v-for="(step, index) in processSteps" :key="index" :style="{ animationDelay: `${index * 0.2}s` }">
            <div class="step-icon">
              <MDBIcon fas :icon="step.icon" />
            </div>
            <div class="step-content">
              <h4 class="step-title">{{ step.title }}</h4>
              <p class="step-description">{{ step.description }}</p>
              <ul class="step-details">
                <li v-for="detail in step.details" :key="detail">{{ detail }}</li>
              </ul>
            </div>
            <div class="step-number">{{ index + 1 }}</div>
          </div>
        </div>
      </MDBContainer>
    </section>

    <!-- Pricing Section -->
    <section class="pricing-section">
      <MDBContainer fluid>
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Tarification Transparente</h2>
          <p class="section-subtitle">Des prix adaptés à tous les budgets</p>
        </div>
        
        <MDBRow class="justify-content-center">
          <MDBCol lg="4" md="6" v-for="(plan, index) in pricingPlans" :key="index">
            <div class="pricing-card" :class="{ popular: plan.popular }" :style="{ animationDelay: `${index * 0.15}s` }">
              <div class="pricing-header">
                <div v-if="plan.popular" class="popular-badge">Le plus populaire</div>
                <h3 class="plan-name">{{ plan.name }}</h3>
                <div class="plan-price">
                  <span class="price-amount">{{ plan.price }}</span>
                  <span class="price-period">{{ plan.period }}</span>
                </div>
                <p class="plan-description">{{ plan.description }}</p>
              </div>
              
              <div class="pricing-body">
                <ul class="plan-features">
                  <li v-for="feature in plan.features" :key="feature" :class="{ disabled: feature.disabled }">
                    <MDBIcon fas :icon="feature.disabled ? 'times' : 'check'" class="me-2" />
                    {{ feature.text || feature }}
                  </li>
                </ul>
              </div>
              
              <div class="pricing-footer">
                <MDBBtn :color="plan.popular ? 'primary' : 'outline-primary'" class="w-100 pricing-btn">
                  <MDBIcon fas icon="rocket" class="me-2" />
                  {{ plan.buttonText }}
                </MDBBtn>
              </div>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section">
      <MDBContainer fluid>
        <div class="section-header text-center mb-5">
          <h2 class="section-title">Questions Fréquentes</h2>
          <p class="section-subtitle">Tout ce que vous devez savoir sur mes services</p>
        </div>
        
        <MDBRow class="justify-content-center">
          <MDBCol lg="8">
            <MDBAccordion v-model="activeAccordion" multiple flush class="faq-accordion">
              <MDBAccordionItem 
                v-for="(faq, index) in faqs" 
                :key="index" 
                :headerTitle="faq.question"
                :collapseId="`faq-${index}`"
                class="faq-item"
              >
                <template #body>
                  <p class="faq-answer">{{ faq.answer }}</p>
                </template>
              </MDBAccordionItem>
            </MDBAccordion>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <MDBContainer fluid>
        <div class="cta-content text-center">
          <h2 class="cta-title">Prêt à démarrer votre projet ?</h2>
          <p class="cta-description">
            Contactez-moi pour discuter de vos besoins et obtenir un devis personnalisé gratuit.
          </p>
          <div class="cta-actions">
            <MDBBtn color="primary" size="lg" class="me-3">
              <MDBIcon fas icon="comments" class="me-2" />
              Consultation gratuite
            </MDBBtn>
            <MDBBtn color="outline-light" size="lg">
              <MDBIcon fas icon="file-alt" class="me-2" />
              Devis en ligne
            </MDBBtn>
          </div>
        </div>
      </MDBContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBAccordion,
  MDBAccordionItem
} from 'mdb-vue-ui-kit'

const activeAccordion = ref(['faq-0'])

const services = [
  {
    title: 'Site Web Vitrine',
    icon: 'window-maximize',
    iconType: 'fas',
    price: 'À partir de 800€',
    gradient: 'linear-gradient(45deg, #1976D2, #42A5F5)',
    description: 'Site web professionnel pour présenter votre activité avec un design moderne et responsive.',
    features: [
      'Design responsive et moderne',
      'Optimisation SEO de base',
      'Formulaire de contact',
      'Intégration réseaux sociaux',
      'Hébergement 1 an inclus',
      'Support 3 mois'
    ],
    technologies: ['Vue.js', 'CSS3', 'HTML5', 'Netlify']
  },
  {
    title: 'Application Web',
    icon: 'laptop-code',
    iconType: 'fas',
    price: 'À partir de 2500€',
    gradient: 'linear-gradient(45deg, #FF6F00, #FF8F00)',
    description: 'Application web complète avec interface utilisateur avancée et fonctionnalités sur mesure.',
    features: [
      'Interface utilisateur avancée',
      'Authentification utilisateurs',
      'Base de données intégrée',
      'API REST personnalisée',
      'Dashboard administrateur',
      'Déploiement cloud',
      'Maintenance 6 mois'
    ],
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Express']
  },
  {
    title: 'E-Commerce',
    icon: 'shopping-cart',
    iconType: 'fas',
    price: 'À partir de 3500€',
    gradient: 'linear-gradient(45deg, #4CAF50, #66BB6A)',
    description: 'Boutique en ligne complète avec gestion des produits, commandes et paiements sécurisés.',
    features: [
      'Catalogue produits complet',
      'Panier et processus de commande',
      'Paiement sécurisé (Stripe)',
      'Gestion des stocks',
      'Panel administrateur',
      'Analytics et rapports',
      'Support technique 12 mois'
    ],
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Stripe', 'AWS']
  },
  {
    title: 'API Backend',
    icon: 'server',
    iconType: 'fas',
    price: 'À partir de 1500€',
    gradient: 'linear-gradient(45deg, #9C27B0, #BA68C8)',
    description: 'API robuste et scalable pour alimenter vos applications mobiles ou web.',
    features: [
      'API RESTful complète',
      'Documentation automatique',
      'Authentification JWT',
      'Validation des données',
      'Rate limiting',
      'Monitoring et logs',
      'Tests unitaires inclus'
    ],
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger']
  },
  {
    title: 'Migration & Refactoring',
    icon: 'sync-alt',
    iconType: 'fas',
    price: 'Sur devis',
    gradient: 'linear-gradient(45deg, #FF5722, #FF7043)',
    description: 'Migration de votre application existante vers des technologies modernes.',
    features: [
      'Audit technique complet',
      'Plan de migration détaillé',
      'Refactoring progressif',
      'Tests de régression',
      'Formation équipe',
      'Documentation technique',
      'Support post-migration'
    ],
    technologies: ['Vue.js', 'React', 'Node.js', 'TypeScript']
  },
  {
    title: 'Maintenance & Support',
    icon: 'tools',
    iconType: 'fas',
    price: '150€/mois',
    gradient: 'linear-gradient(45deg, #607D8B, #78909C)',
    description: 'Maintenance continue et support technique pour vos applications web.',
    features: [
      'Mises à jour de sécurité',
      'Corrections de bugs',
      'Optimisations performance',
      'Sauvegardes automatiques',
      'Monitoring 24/7',
      'Support prioritaire',
      'Rapport mensuel'
    ],
    technologies: ['Monitoring', 'CI/CD', 'Docker', 'Cloud']
  }
]

const processSteps = [
  {
    icon: 'comments',
    title: 'Analyse & Consultation',
    description: 'Nous discutons de vos besoins, objectifs et contraintes pour définir le cahier des charges.',
    details: [
      'Entretien découverte approfondi',
      'Analyse de la concurrence',
      'Définition des fonctionnalités',
      'Estimation du budget et délais'
    ]
  },
  {
    icon: 'drafting-compass',
    title: 'Conception & Design',
    description: 'Création des maquettes et de l\'architecture technique de votre projet.',
    details: [
      'Wireframes et prototypes',
      'Design UI/UX responsive',
      'Architecture technique',
      'Validation avec le client'
    ]
  },
  {
    icon: 'code',
    title: 'Développement',
    description: 'Développement de votre application avec les meilleures pratiques et technologies modernes.',
    details: [
      'Code propre et documenté',
      'Tests unitaires et d\'intégration',
      'Revues de code régulières',
      'Démos hebdomadaires'
    ]
  },
  {
    icon: 'rocket',
    title: 'Déploiement & Livraison',
    description: 'Mise en ligne de votre application avec tous les outils de monitoring et de maintenance.',
    details: [
      'Déploiement sécurisé',
      'Tests en production',
      'Formation utilisateur',
      'Documentation technique'
    ]
  }
]

const pricingPlans = [
  {
    name: 'Starter',
    price: '500€',
    period: 'projet',
    description: 'Parfait pour les petites entreprises et startups',
    features: [
      'Site vitrine responsive',
      'Jusqu\'à 5 pages',
      'Formulaire de contact',
      'Optimisation SEO de base',
      'Hébergement 6 mois',
      { text: 'E-commerce', disabled: true },
      { text: 'Backend personnalisé', disabled: true }
    ],
    buttonText: 'Commencer'
  },
  {
    name: 'Professional',
    price: '1500€',
    period: 'projet',
    description: 'Solution complète pour les entreprises établies',
    popular: true,
    features: [
      'Application web complète',
      'Pages illimitées',
      'Authentification utilisateurs',
      'Base de données',
      'API personnalisée',
      'Dashboard admin',
      'Support 3 mois'
    ],
    buttonText: 'Choisir Pro'
  },
  {
    name: 'Enterprise',
    price: 'Sur devis',
    period: '',
    description: 'Solutions sur mesure pour les grandes entreprises',
    features: [
      'Architecture scalable',
      'Intégrations tierces',
      'Haute disponibilité',
      'Sécurité renforcée',
      'Support prioritaire',
      'Formation équipe',
      'SLA garantie'
    ],
    buttonText: 'Nous contacter'
  }
]

const faqs = [
  {
    question: 'Quels sont vos délais de développement ?',
    answer: 'Les délais varient selon la complexité du projet. Un site vitrine prend généralement 2-3 semaines, une application web 6-12 semaines, et un e-commerce 8-16 semaines. Je fournis toujours un planning détaillé après l\'analyse de vos besoins.'
  },
  {
    question: 'Proposez-vous la maintenance après livraison ?',
    answer: 'Oui, je propose différents forfaits de maintenance incluant les mises à jour de sécurité, corrections de bugs, optimisations et support technique. La maintenance est essentielle pour maintenir votre application performante et sécurisée.'
  },
  {
    question: 'Travaillez-vous avec des technologies spécifiques ?',
    answer: 'Je me spécialise dans l\'écosystème JavaScript moderne : Vue.js, React, Node.js, Express, MongoDB, PostgreSQL. Je choisis toujours les technologies les plus adaptées à vos besoins et contraintes.'
  },
  {
    question: 'Comment se déroule le processus de paiement ?',
    answer: 'Le paiement s\'effectue généralement en plusieurs fois : 30% à la commande, 40% à mi-parcours, et 30% à la livraison. Pour les gros projets, nous pouvons établir un échéancier personnalisé.'
  },
  {
    question: 'Fournissez-vous la formation aux utilisateurs ?',
    answer: 'Absolument ! Je propose des sessions de formation pour vous permettre de gérer votre site ou application en autonomie. La formation peut être individuelle ou en groupe, selon vos préférences.'
  },
  {
    question: 'Que se passe-t-il si je ne suis pas satisfait ?',
    answer: 'Votre satisfaction est ma priorité. Je propose des révisions illimitées pendant la phase de développement et une garantie satisfaction. Nous travaillons ensemble jusqu\'à ce que le résultat corresponde exactement à vos attentes.'
  }
]
</script>

<style scoped>
.services-page {
  padding-top: 80px;
}

/* Services Hero */
.services-hero {
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
  margin: 0 auto;
  opacity: 0.9;
  animation: fadeInUp 1s ease 0.2s both;
}

/* Services Grid */
.services-grid {
  padding: 6rem 0;
  background: #f8f9fa;
}

.service-card-detailed {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease both;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.service-card-detailed:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.service-header {
  padding: 2rem 2rem 1rem;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
}

.service-icon {
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

.service-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1976D2;
  margin-bottom: 0.5rem;
}

.service-price {
  font-size: 1.25rem;
  font-weight: 600;
  color: #FF6F00;
  margin-bottom: 1rem;
}

.service-body {
  padding: 1.5rem 2rem;
  flex: 1;
}

.service-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.features-title,
.tech-title {
  font-size: 1rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 1rem;
}

.features-list {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}

.features-list li {
  padding: 0.5rem 0;
  color: #666;
  display: flex;
  align-items: center;
}

.features-list .fa-check-circle {
  color: #4CAF50;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-tag {
  background: #e3f2fd;
  color: #1976D2;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
}

.service-footer {
  padding: 1.5rem 2rem 2rem;
}

.service-btn {
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

/* Process Section */
.process-section {
  padding: 6rem 0;
  background: white;
}

.process-timeline {
  max-width: 800px;
  margin: 0 auto;
}

.process-step {
  display: flex;
  align-items: flex-start;
  gap: 2rem;
  padding: 2rem 0;
  border-left: 3px solid #e0e0e0;
  margin-left: 2rem;
  position: relative;
  animation: fadeInLeft 1s ease both;
}

.process-step:last-child {
  border-left: none;
}

.step-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(45deg, #1976D2, #42A5F5);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  margin-left: -32px;
  position: relative;
  z-index: 2;
}

.step-content {
  flex: 1;
}

.step-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1976D2;
  margin-bottom: 1rem;
}

.step-description {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.step-details {
  list-style: none;
  padding: 0;
}

.step-details li {
  padding: 0.25rem 0;
  color: #888;
  font-size: 0.9rem;
}

.step-details li:before {
  content: '▸';
  color: #1976D2;
  margin-right: 0.5rem;
}

.step-number {
  width: 40px;
  height: 40px;
  background: #f0f0f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #1976D2;
  font-size: 1.2rem;
}

/* Pricing Section */
.pricing-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #f1f3f4 0%, #e8eaf6 100%);
}

.pricing-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  animation: fadeInUp 1s ease both;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.pricing-card.popular {
  transform: scale(1.05);
  border: 2px solid #1976D2;
  box-shadow: 0 20px 60px rgba(25, 118, 210, 0.2);
}

.pricing-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.pricing-card.popular:hover {
  transform: scale(1.05) translateY(-10px);
}

.popular-badge {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(45deg, #1976D2, #42A5F5);
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}

.pricing-header {
  padding: 2rem 2rem 1rem;
  text-align: center;
  border-bottom: 1px solid #f0f0f0;
}

.plan-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1976D2;
  margin-bottom: 1rem;
}

.plan-price {
  margin-bottom: 1rem;
}

.price-amount {
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
}

.price-period {
  font-size: 1rem;
  color: #666;
  margin-left: 0.5rem;
}

.plan-description {
  color: #666;
  line-height: 1.6;
}

.pricing-body {
  padding: 1.5rem 2rem;
  flex: 1;
}

.plan-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.plan-features li {
  padding: 0.75rem 0;
  color: #666;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
}

.plan-features li:last-child {
  border-bottom: none;
}

.plan-features li.disabled {
  opacity: 0.5;
}

.plan-features .fa-check {
  color: #4CAF50;
}

.plan-features .fa-times {
  color: #f44336;
}

.pricing-footer {
  padding: 1.5rem 2rem 2rem;
}

.pricing-btn {
  border-radius: 50px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

/* FAQ Section */
.faq-section {
  padding: 6rem 0;
  background: white;
}

.faq-accordion {
  background: transparent;
}

.faq-item {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  margin-bottom: 1rem;
  overflow: hidden;
}

.faq-answer {
  color: #666;
  line-height: 1.6;
  margin: 0;
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
  margin: 0.5rem;
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

/* Responsive */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .section-title {
    font-size: 2rem;
  }
  
  .pricing-card.popular {
    transform: none;
    margin-bottom: 2rem;
  }
  
  .process-step {
    flex-direction: column;
    text-align: center;
    margin-left: 0;
    border-left: none;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 3rem;
  }
  
  .step-icon {
    margin-left: 0;
    margin-bottom: 1rem;
  }
  
  .step-number {
    order: -1;
    margin-bottom: 1rem;
  }
  
  .cta-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  
  .cta-actions .btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>