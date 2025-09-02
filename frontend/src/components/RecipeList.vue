<template>
  <div class="recipe-list">
    <RecipeCard v-for="r in recipes" :key="r.id" :recipe="r" @select="$emit('select', $event)" />
  </div>
</template>

<script>
import RecipeCard from './RecipeCard.vue'
export default {
  name: 'RecipeList',
  components: { RecipeCard },
  emits: ['select'],
  props: { recipes: { type: Array, default: () => [] } }
}
</script>

<style scoped>
.recipe-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 18px;
  margin-top: 12px;
}
</style>
