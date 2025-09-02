<template>
  <div class="chips">
    <button
      v-for="cat in ['All', ...categories]"
      :key="cat"
      :class="['chip', { active: selected === cat || (cat==='All' && !selected) }]"
      @click="$emit('select', cat === 'All' ? '' : cat)">
      {{ cat }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'CategoryChips',
  props: { categories: { type: Array, default: ()=>[] }, selected: { type: String, default: '' } }
}
</script>

<style scoped>
.chips { display:flex; gap:8px; flex-wrap:wrap; margin:12px 0 }
.chip { padding:8px 12px; border-radius:999px; background: #fff; border:1px solid rgba(16,24,40,0.06); cursor:pointer; font-weight:600 }
.chip.active { background: #ff6b6b; color:#fff; border-color: rgba(255,107,107,0.16) }
@media (max-width:600px){ .chips{ overflow:auto; padding-bottom:6px } .chip{ flex:0 0 auto } }
</style>
