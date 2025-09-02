<template>
  <div class="app-root">
    <Navbar :user="user" @logout="logout" />
    <router-view @authenticated="onAuthenticated" />
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: { Navbar, Footer },
  data(){ return { user: null } },
  methods: {
    onAuthenticated(payload){
      this.user = payload.user || null
      try { localStorage.setItem('chefio_token', payload.token) } catch {}
    },
    logout(){
      this.user = null
      try { localStorage.removeItem('chefio_token') } catch {}
    }
  },
  mounted(){
    const token = localStorage.getItem('chefio_token')
    if (token) this.user = { name: 'Saved User', email: 'user@example.com' }
  }
}
</script>

<style scoped>
/* keep your existing :root and layout styles from current App.vue */
:root{ --bg: linear-gradient(180deg,#fbfbff 0%, #f7f9fc 100%); --card:#fff; --accent:#ff6b6b; --muted:#6b7280; --shadow:0 8px 24px rgba(16,24,40,0.06) }
.app-root { display:flex; flex-direction:column; min-height:100vh; padding:0; background:var(--bg); }
</style>