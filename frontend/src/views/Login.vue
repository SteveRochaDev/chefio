<template>
  <div class="auth-page container">
    <h2>Login</h2>
    <form @submit.prevent="submit">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <div class="actions">
        <button type="submit" class="btn primary">Login</button>
        <router-link to="/register" class="btn ghost">Register</router-link>
      </div>
      <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
export default {
  emits: ['authenticated'],
  data(){ return { email:'', password:'', error:null } },
  methods: {
    submit(){
      this.error = null
      fetch('/api/login', { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ email:this.email, password:this.password }) })
        .then(r=>r.json())
        .then(data=>{
          if (data.error) throw new Error(data.error)
          this.$emit('authenticated', data)
          this.$router.push('/')
        })
        .catch(e=> this.error = e.message)
    }
  }
}
</script>

<style scoped>
.container{ max-width:640px; margin:24px auto; padding:18px; border-radius:10px; background:var(--card); box-shadow:var(--shadow) }
.auth-page input{ display:block; width:100%; padding:10px; margin:8px 0; border-radius:8px; border:1px solid #e6e9ee }
.actions{ display:flex; gap:8px; align-items:center; }
.error{ color:#b91c1c; margin-top:8px }

/* Button styles matching navbar */
.btn { padding:8px 12px; border-radius:8px; border:1px solid transparent; background:transparent; color:#111827; cursor:pointer; font-weight:600; text-decoration:none; display:inline-flex; align-items:center; justify-content:center }
.btn.primary { background: #ff6b6b; color:#fff; border-color: rgba(255,107,107,0.14); }
.btn.ghost { background: transparent; border:1px solid rgba(16,24,40,0.06); color: #111827; }

/* ensure links have no underline */
a { text-decoration: none; }
</style>