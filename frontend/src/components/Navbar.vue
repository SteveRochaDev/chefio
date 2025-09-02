<template>
  <nav class="nav">
    <div class="nav-inner">
      <div class="left">
        <router-link to="/" class="brand">Chefio</router-link>
        <div class="tag">Find recipes from ingredients</div>
      </div>

      <div class="right">
        <template v-if="user">
          <span class="user">Hello, {{ user.name || user.email }}</span>
          <button class="btn primary" @click="$emit('logout')">Logout</button>
        </template>
        <template v-else>
          <router-link to="/login" class="btn ghost">Login</router-link>
          <router-link to="/register" class="btn primary">Register</router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  props: { user: { type: Object, default: null } }
}
</script>

<style scoped>
/* full-width bar with centered inner content */
.nav {
  width: 100%;
  background: #ffffff;
  border-bottom: 1px solid rgba(16,24,40,0.04);
  box-shadow: 0 2px 10px rgba(16,24,40,0.04);
  position: sticky;
  top: 0;
  z-index: 40;
}
.nav-inner {
  max-width: 1000px;
  margin: 0 auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
  padding:12px 20px;
  box-sizing: border-box;
}

/* branding */
.brand { font-weight:800; font-size:1.25rem; color:#111827; }
.tag { font-size:0.85rem; color:rgba(17,24,39,0.6); }

/* actions */
.right { display:flex; align-items:center; gap:8px; }
.user { color:#111827; font-weight:500; margin-right:6px; }

/* buttons: clean, subtle primary */
.btn {
  padding:8px 12px;
  border-radius:8px;
  border:1px solid transparent;
  background: transparent;
  color: #111827;
  cursor:pointer;
  font-weight:600;
  text-decoration: none; /* ensure no underline on link buttons */
}
.btn.primary {
  background: #ff6b6b;
  color:#fff;
  border-color: rgba(255,107,107,0.14);
}
.btn.ghost {
  background: transparent;
  border:1px solid rgba(16,24,40,0.06);
  color: #111827;
}

/* ensure router-link brand has no underline */
.nav-inner a { text-decoration: none; color: inherit; }

@media (max-width:600px){
  .nav-inner { padding:10px 12px; }
  .tag { display:none; }
}
</style>
