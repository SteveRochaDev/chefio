<template>
  <div class="overlay">
    <div class="modal">
      <h3>{{ mode === 'login' ? 'Login' : 'Register' }}</h3>
      <form @submit.prevent="submit">
        <div v-if="mode === 'register'" class="row">
          <input v-model="name" placeholder="Name" />
        </div>
        <div class="row"><input v-model="email" type="email" placeholder="Email" required /></div>
        <div class="row"><input v-model="password" type="password" placeholder="Password" required /></div>
        <div class="actions">
          <button type="submit">{{ mode === 'login' ? 'Login' : 'Register' }}</button>
          <button type="button" class="muted" @click="$emit('close')">Cancel</button>
        </div>
        <div v-if="error" class="error">{{ error }}</div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthModal',
  props: { mode: { type: String, default: 'login' } },
  data() { return { email:'', password:'', name:'', error:null, loading:false } },
  methods: {
    submit(){
      this.error = null; this.loading = true
      const url = this.mode === 'login' ? '/api/login' : '/api/register'
      fetch(url, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({ name:this.name, email:this.email, password:this.password }) })
        .then(r=>r.json())
        .then(data=>{
          if (data.error) throw new Error(data.error)
          this.$emit('authenticated', data)
          this.$emit('close')
        })
        .catch(err=>{ this.error = err.message })
        .finally(()=> this.loading = false)
    }
  }
}
</script>

<style scoped>
.overlay{ position:fixed; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(0,0,0,0.35) }
.modal{ background:#fff; padding:16px; border-radius:8px; width:320px }
.row input{ width:100%; padding:8px 10px; margin:6px 0; border-radius:6px; border:1px solid #e5e7eb }
.actions{ display:flex; gap:8px; justify-content:flex-end; margin-top:8px }
.actions .muted{ background:#6b7280 }
.error{ color:#b91c1c; margin-top:8px }
</style>
