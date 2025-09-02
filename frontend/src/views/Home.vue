<template>
  <main class="container">
    <header class="header">
      <h1>Chefio</h1>
      <p class="tagline">Find recipes from ingredients you have at home.</p>
    </header>

    <IngredientInput @search="onSearch" />
    <CategoryChips :categories="categories" :selected="category" @select="onCategorySelect" />

    <section class="recipes">
      <h2>Recipes</h2>

      <div v-if="loading" class="loading">Loading recipes...</div>
      <div v-else>
        <RecipeList :recipes="filteredRecipes" @select="selectRecipe" />
        <div v-if="!filteredRecipes.length" class="empty">No recipes found.</div>
      </div>

      <div v-if="error" class="error">Error: {{ error }}</div>
    </section>

    <RecipeDetail v-if="selectedRecipe" :recipe="selectedRecipe" @close="selectedRecipe = null" />
  </main>
</template>

<script>
import IngredientInput from '../components/IngredientInput.vue'
import RecipeList from '../components/RecipeList.vue'
import RecipeDetail from '../components/RecipeDetail.vue'
import CategoryChips from '../components/CategoryChips.vue'

export default {
  name: 'Home',
  components: { IngredientInput, RecipeList, RecipeDetail, CategoryChips },
  data(){ return { recipes: [], query:'', category:'', categories:[], loading:false, error:null, selectedRecipe:null } },
  computed: {
    filteredRecipes(){
      if (!this.query) return this.recipes
      const q = this.query.toLowerCase()
      return this.recipes.filter(r => r.title.toLowerCase().includes(q) || r.ingredients.some(i=>i.toLowerCase().includes(q)))
    }
  },
  methods: {
    fetchRecipes(){
      this.loading = true
      const params = new URLSearchParams()
      if (this.query) params.set('q', this.query)
      if (this.category) params.set('category', this.category)
      const url = '/api/recipes' + (params.toString() ? `?${params.toString()}` : '')
      fetch(url, { cache:'no-store' })
        .then(r => { if(!r.ok) throw new Error(r.status); return r.json() })
        .then(data => this.recipes = data)
        .catch(err => { this.error = err.message })
        .finally(()=> this.loading = false)
    },
    onSearch(q){ this.query = (q||'').trim(); this.updateRouteQuery(); this.fetchRecipes() },
    onCategorySelect(cat){ this.category = cat; this.updateRouteQuery(); this.fetchRecipes() },
    fetchCategories(){ fetch('/api/recipes/categories').then(r=>r.json()).then(c=> this.categories = c).catch(()=>{}) },
    selectRecipe(r){ this.selectedRecipe = r },
    updateRouteQuery(){
      const qp = {}
      if (this.query) qp.q = this.query
      if (this.category) qp.category = this.category
      this.$router.replace({ query: qp }).catch(()=>{})
    },
    loadFromRoute(){
      const q = this.$route.query.q || ''
      const cat = this.$route.query.category || ''
      this.query = q
      this.category = cat
    }
   },
  mounted(){ this.loadFromRoute(); this.fetchCategories(); this.fetchRecipes(); }
}
</script>

<style scoped>
/* copy container/header/recipes styles from your App.vue (so looks same) */
.container { max-width:1400px; width:min(1200px,96%); margin:18px auto; background:var(--card); padding:1.5rem; border-radius:12px; box-shadow:var(--shadow); box-sizing:border-box; }
.header { text-align:center; margin-bottom:.75rem; }
</style>