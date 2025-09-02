<template>
  <div class="ingredient-input">
    <input v-model="text" @keyup.enter="submit" placeholder="Search by ingredient or title" />
    <button class="primary" @click="submit">Search</button>
    <button v-if="text" @click="clear" class="clear">Clear</button>
  </div>
</template>

<script>
export default {
  name: 'IngredientInput',
  data() {
    return { text: '' }
  },
  methods: {
    submit() {
      this.$emit('search', this.text)
    },
    clear() {
      this.text = ''
      this.$emit('search', '')
    }
  }
}
</script>

<style scoped>
.ingredient-input { display:flex; gap:10px; align-items:center; margin: .75rem 0; }
.ingredient-input input { flex:1; padding:10px 12px; border-radius:10px; border:1px solid #e6e9ee; background: #f8fafc }
.ingredient-input .primary { padding:10px 14px; border-radius:10px; border:none; background:var(--accent); color:#fff; cursor:pointer }
.ingredient-input .clear { background:transparent; border:1px solid #e6e9ee; padding:10px 12px; border-radius:10px; cursor:pointer }
@media (max-width:600px){ .ingredient-input { flex-direction:column; align-items:stretch } }
</style>
