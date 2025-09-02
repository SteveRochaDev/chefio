<template>
  <article class="recipe-card" role="button" tabindex="0" @click="$emit('select', recipe)" @keydown.enter="$emit('select', recipe)">
    <h3>{{ recipe.title }}</h3>
    <p class="meta">{{ recipe.cuisine }} • {{ recipe.difficulty }} • {{ recipe.time }}m</p>
    <p class="ingredients">{{ recipe.ingredients.join(', ') }}</p>
  </article>
</template>

<script>
export default {
  name: 'RecipeCard',
  emits: ['select'],
  props: { recipe: { type: Object, required: true } }
}
</script>

<style scoped>
.recipe-card {
  background: #fff;
  padding: 18px;                 /* slightly larger padding */
  border-radius: 12px;           /* a bit more rounded */
  box-shadow: 0 10px 24px rgba(16,24,40,0.06);
  border-left: 4px solid rgba(255,107,107,0.18);
  transition: transform .12s ease, box-shadow .12s ease;
  cursor: pointer; /* interactive */
}
.recipe-card:focus { outline: 3px solid rgba(255,107,107,0.12); transform: translateY(-4px); }
.recipe-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 18px 40px rgba(16,24,40,0.08);
}
.recipe-card h3 {
  margin: 0 0 8px 0;
  font-size: 1.15rem;            /* slightly larger title */
  color: #0f172a;
}
.recipe-card .meta {
  color: #6b7280;
  font-size: 0.9rem;
  margin: 0 0 10px 0;
}
.recipe-card .ingredients {
  color: #374151;
  font-size: 0.95rem;
  margin: 0;
}
</style>
