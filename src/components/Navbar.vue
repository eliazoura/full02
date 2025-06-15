<template>
  <MDBNavbar expand="lg" container-fluid dark bg="dark" class="navbar-custom">
    <MDBNavbarBrand href="/">
      <div class="brand-container">
        <div class="brand-icon">⚡</div>
        <span class="brand-text">DevStack Pro</span>
      </div>
    </MDBNavbarBrand>

    <MDBNavbarToggler @click="collapse = !collapse" target="#navbarNav">
      <MDBIcon fas icon="bars" />
    </MDBNavbarToggler>

    <MDBCollapse id="navbarNav" v-model="collapse">
      <MDBNavbarNav class="me-auto">
        <MDBNavbarItem>
          <MDBNavbarLink 
            @click="$router.push('/')" 
            :class="{ active: $route.name === 'Home' }"
            class="nav-link-custom"
          >
            Accueil
          </MDBNavbarLink>
        </MDBNavbarItem>
        <MDBNavbarItem>
          <MDBNavbarLink 
            @click="$router.push('/services')" 
            :class="{ active: $route.name === 'Services' }"
            class="nav-link-custom"
          >
            Services
          </MDBNavbarLink>
        </MDBNavbarItem>
        <MDBNavbarItem>
          <MDBNavbarLink 
            @click="$router.push('/portfolio')" 
            :class="{ active: $route.name === 'Portfolio' }"
            class="nav-link-custom"
          >
            Portfolio
          </MDBNavbarLink>
        </MDBNavbarItem>
      </MDBNavbarNav>

      <MDBNavbarNav class="ms-auto d-flex align-items-center">
        <MDBNavbarItem v-if="!authStore.isAuthenticated">
          <MDBBtn 
            color="primary" 
            outline
            @click="showLoginModal = true"
            class="auth-btn me-2"
          >
            <MDBIcon fas icon="sign-in-alt" class="me-1" />
            Connexion
          </MDBBtn>
        </MDBNavbarItem>
        
        <MDBNavbarItem v-else class="user-menu">
          <MDBDropdown>
            <MDBDropdownToggle tag="a" class="nav-link dropdown-toggle user-dropdown">
              <MDBIcon fas icon="user-circle" class="me-1" />
              {{ authStore.user?.name }}
            </MDBDropdownToggle>
            <MDBDropdownMenu>
              <MDBDropdownItem>
                <MDBIcon fas icon="user" class="me-2" />
                Profil
              </MDBDropdownItem>
              <MDBDropdownItem>
                <MDBIcon fas icon="cog" class="me-2" />
                Paramètres
              </MDBDropdownItem>
              <hr class="dropdown-divider" />
              <MDBDropdownItem @click="logout">
                <MDBIcon fas icon="sign-out-alt" class="me-2" />
                Déconnexion
              </MDBDropdownItem>
            </MDBDropdownMenu>
          </MDBDropdown>
        </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>

    <!-- Modal de Connexion -->
    <LoginModal v-model="showLoginModal" />
  </MDBNavbar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  MDBNavbar, 
  MDBNavbarBrand, 
  MDBNavbarToggler, 
  MDBNavbarNav, 
  MDBNavbarItem, 
  MDBCollapse,
  MDBBtn,
  MDBIcon,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdb-vue-ui-kit'
import LoginModal from './LoginModal.vue'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const collapse = ref(false)
const showLoginModal = ref(false)

const logout = () => {
  authStore.logout()
  router.push('/')
}
</script>

<style scoped>
.navbar-custom {
  backdrop-filter: blur(10px);
  background: rgba(13, 27, 42, 0.95) !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.brand-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.brand-icon {
  font-size: 1.5rem;
  background: linear-gradient(45deg, #1976D2, #42A5F5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-text {
  font-weight: 700;
  font-size: 1.25rem;
  background: linear-gradient(45deg, #ffffff, #e3f2fd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav-link-custom {
  position: relative;
  color: rgba(255, 255, 255, 0.8) !important;
  font-weight: 500;
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 0.5rem 1rem !important;
}

.nav-link-custom:hover {
  color: #42A5F5 !important;
  transform: translateY(-1px);
}

.nav-link-custom.active {
  color: #1976D2 !important;
}

.nav-link-custom::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(45deg, #1976D2, #42A5F5);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link-custom:hover::after,
.nav-link-custom.active::after {
  width: 80%;
}

.auth-btn {
  border-radius: 50px;
  padding: 0.5rem 1.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid #1976D2;
}

.auth-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.3);
}

.user-dropdown {
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 500;
  text-decoration: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.user-dropdown:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #42A5F5 !important;
}

@media (max-width: 991px) {
  .navbar-custom {
    padding: 0.5rem 1rem;
  }
  
  .auth-btn {
    width: 100%;
    margin-top: 1rem;
  }
}
</style>