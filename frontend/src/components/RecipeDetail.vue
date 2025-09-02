<template>
  <div class="overlay" @click.self="$emit('close')">
    <div class="detail">
      <button class="close" @click="$emit('close')" aria-label="Fechar">✕</button>
      <header>
        <h2>{{ recipe.title }}</h2>
        <p class="meta">{{ recipe.cuisine }} • {{ recipe.difficulty }} • {{ recipe.time }}m</p>
      </header>

      <section class="section">
        <h3>Ingredients</h3>
        <ul>
          <li v-for="(i, idx) in recipe.ingredients" :key="idx">{{ i }}</li>
        </ul>
      </section>

      <section class="section">
        <h3>Instructions</h3>
        <p v-if="recipe.instructions">{{ recipe.instructions }}</p>
        <p v-else class="muted">No instructions available — use this area to add steps later.</p>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecipeDetail',
  emits: ['close'],
  props: { recipe: { type: Object, required: true } }
}
</script>

<style scoped>
.overlay { position: fixed; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(2,6,23,0.5); z-index:60; padding: 24px; }
.detail { background: #fff; width: min(900px, 96%); max-height: 90vh; overflow:auto; border-radius:12px; padding:20px; position:relative; box-shadow: 0 30px 80px rgba(2,6,23,0.3); }
.close { position:absolute; top:12px; right:12px; background:transparent; border:none; font-size:18px; cursor:pointer; }
.meta { color: var(--muted); margin-top:6px; }
.section { margin-top:16px; }
.section h3 { margin:0 0 8px 0; }
.muted { color: #6b7280; }
.detail ul { padding-left:1.1rem; margin:0; }
</style>