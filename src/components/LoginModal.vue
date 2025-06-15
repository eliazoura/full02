<template>
  <MDBModal
    id="loginModal"
    tabindex="-1"
    v-model="localShow"
    @update:model-value="updateShow"
    class="modal-custom"
  >
    <MDBModalDialog class="modal-dialog-custom">
      <div class="modal-content-custom">
        <MDBModalHeader class="modal-header-custom">
          <MDBModalTitle class="modal-title-custom">
            <MDBIcon :fas="!isRegister" icon="sign-in-alt" class="me-2" v-if="!isRegister" />
            <MDBIcon fas icon="user-plus" class="me-2" v-else />
            {{ isRegister ? 'Créer un compte' : 'Connexion' }}
          </MDBModalTitle>
          <MDBBtn
            color="none"
            class="btn-close btn-close-custom"
            @click="closeModal"
          ></MDBBtn>
        </MDBModalHeader>

        <MDBModalBody class="modal-body-custom">
          <form @submit.prevent="handleSubmit" class="auth-form">
            <!-- Nom (uniquement pour l'inscription) -->
            )
            <MDBInput
              v-if="isRegister"
              label="Nom complet"
              v-model="form.name"
              type="text"
              class="mb-4 input-custom"
              :class="{ 'is-invalid': errors.name }"
              required
            />
            <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>

            <!-- Email -->
            <MDBInput
              label="Adresse email"
              v-model="form.email"
              type="email"
              class="mb-4 input-custom"
              :class="{ 'is-invalid': errors.email }"
              required
            />
            <div v-if="errors.email" class="invalid-feedback">{{ errors.email }}</div>

            <!-- Mot de passe -->
            <MDBInput
              label="Mot de passe"
              v-model="form.password"
              type="password"
              class="mb-4 input-custom"
              :class="{ 'is-invalid': errors.password }"
              required
            />
            <div v-if="errors.password" class="invalid-feedback">{{ errors.password }}</div>

            <!-- Confirmation mot de passe (uniquement pour l'inscription) -->
            )
            <MDBInput
              v-if="isRegister"
              label="Confirmer le mot de passe"
              v-model="form.confirmPassword"
              type="password"
              class="mb-4 input-custom"
              :class="{ 'is-invalid': errors.confirmPassword }"
              required
            />
            <div v-if="errors.confirmPassword" class="invalid-feedback">{{ errors.confirmPassword }}</div>

            <!-- Message d'erreur global -->
            <div v-if="errorMessage" class="alert alert-danger alert-custom">
              <MDBIcon fas icon="exclamation-triangle" class="me-2" />
              {{ errorMessage }}
            </div>

            <!-- Message de succès -->
            <div v-if="successMessage" class="alert alert-success alert-custom">
              <MDBIcon fas icon="check-circle" class="me-2" />
              {{ successMessage }}
            </div>

            <!-- Bouton de soumission -->
            <MDBBtn
              type="submit"
              color="primary"
              class="w-100 mb-3 submit-btn"
              :disabled="loading"
            >
              <MDBSpinner v-if="loading" size="sm" class="me-2" />
              <MDBIcon v-else :fas="!isRegister" :icon="isRegister ? 'user-plus' : 'sign-in-alt'" class="me-2" />
              {{ isRegister ? 'Créer le compte' : 'Se connecter' }}
            </MDBBtn>

            <!-- Lien pour basculer entre connexion et inscription -->
            <div class="text-center">
              <button
                type="button"
                @click="toggleMode"
                class="btn btn-link toggle-btn"
              >
                {{ isRegister ? 'Déjà un compte ? Se connecter' : 'Pas de compte ? S\'inscrire' }}
              </button>
            </div>
          </form>

          <!-- Informations de démonstration -->
          <div class="demo-info mt-4">
            <h6 class="demo-title">Comptes de démonstration :</h6>
            <div class="demo-accounts">
              <div class="demo-account">
                <span class="demo-label">Admin :</span>
                <code>admin@example.com / admin123</code>
              </div>
              <div class="demo-account">
                <span class="demo-label">Utilisateur :</span>
                <code>user@example.com / user123</code>
              </div>
            </div>
          </div>
        </MDBModalBody>
      </div>
    </MDBModalDialog>
  </MDBModal>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue'
import {
  MDBModal,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBBtn,
  MDBInput,
  MDBIcon,
  MDBSpinner
} from 'mdb-vue-ui-kit'
import { useAuthStore } from '../stores/auth'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const authStore = useAuthStore()
const isRegister = ref(false)
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const localShow = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const updateShow = (value: boolean) => {
  emit('update:modelValue', value)
}

const closeModal = () => {
  localShow.value = false
  resetForm()
}

const resetForm = () => {
  Object.keys(form).forEach(key => {
    form[key as keyof typeof form] = ''
  })
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
  errorMessage.value = ''
  successMessage.value = ''
  isRegister.value = false
}

const validateForm = () => {
  let isValid = true
  
  // Reset errors
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })

  // Validation email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = 'Veuillez entrer une adresse email valide'
    isValid = false
  }

  // Validation mot de passe
  if (form.password.length < 6) {
    errors.password = 'Le mot de passe doit contenir au moins 6 caractères'
    isValid = false
  }

  // Validation nom (inscription uniquement)
  if (isRegister.value && form.name.length < 2) {
    errors.name = 'Le nom doit contenir au moins 2 caractères'
    isValid = false
  }

  // Validation confirmation mot de passe (inscription uniquement)
  if (isRegister.value && form.password !== form.confirmPassword) {
    errors.confirmPassword = 'Les mots de passe ne correspondent pas'
    isValid = false
  }

  return isValid
}

const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    let result
    if (isRegister.value) {
      result = await authStore.register(form.email, form.password, form.name)
    } else {
      result = await authStore.login(form.email, form.password)
    }

    if (result.success) {
      successMessage.value = result.message
      setTimeout(() => {
        closeModal()
      }, 1500)
    } else {
      errorMessage.value = result.message
    }
  } catch (error) {
    errorMessage.value = 'Une erreur inattendue s\'est produite'
  } finally {
    loading.value = false
  }
}

const toggleMode = () => {
  isRegister.value = !isRegister.value
  errorMessage.value = ''
  successMessage.value = ''
  Object.keys(errors).forEach(key => {
    errors[key as keyof typeof errors] = ''
  })
}

// Reset form when modal closes
watch(() => props.modelValue, (newValue) => {
  if (!newValue) {
    setTimeout(resetForm, 300) // Délai pour l'animation de fermeture
  }
})
</script>

<style scoped>
.modal-custom .modal-dialog {
  max-width: 480px;
}

.modal-dialog-custom {
  margin: 2rem auto;
}

.modal-content-custom {
  border: none;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  overflow: hidden;
}

.modal-header-custom {
  background: linear-gradient(135deg, #1976D2 0%, #42A5F5 100%);
  color: white;
  border: none;
  padding: 1.5rem;
}

.modal-title-custom {
  font-weight: 700;
  font-size: 1.25rem;
  margin: 0;
}

.btn-close-custom {
  filter: invert(1);
  opacity: 0.8;
}

.btn-close-custom:hover {
  opacity: 1;
}

.modal-body-custom {
  padding: 2rem;
}

.auth-form {
  margin-bottom: 1rem;
}

.input-custom {
  margin-bottom: 1rem;
}

.input-custom input {
  border-radius: 12px;
  border: 2px solid #e0e0e0;
  padding: 0.75rem 1rem;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.8);
}

.input-custom input:focus {
  border-color: #1976D2;
  box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
  background: #ffffff;
}

.submit-btn {
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  background: linear-gradient(135deg, #1976D2 0%, #42A5F5 100%);
  border: none;
  transition: all 0.3s ease;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(25, 118, 210, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.toggle-btn {
  color: #1976D2;
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  color: #1565C0;
  text-decoration: underline;
}

.alert-custom {
  border-radius: 12px;
  border: none;
  font-weight: 500;
}

.demo-info {
  background: rgba(25, 118, 210, 0.05);
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(25, 118, 210, 0.1);
}

.demo-title {
  color: #1976D2;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.demo-accounts {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.demo-account {
  font-size: 0.8rem;
  color: #666;
}

.demo-label {
  font-weight: 600;
  color: #1976D2;
  margin-right: 0.5rem;
}

.demo-account code {
  background: rgba(25, 118, 210, 0.1);
  color: #1976D2;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.75rem;
}

@media (max-width: 576px) {
  .modal-dialog-custom {
    margin: 1rem;
  }
  
  .modal-body-custom {
    padding: 1.5rem;
  }
}
</style>