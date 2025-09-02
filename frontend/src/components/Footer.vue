<template>
  <footer class="footer">
    <div class="footer-inner">
      <div>© {{ year }} Chefio — Find recipes from ingredients you have at home.</div>
    </div>
  </footer>
</template>

<script>
export default { name:'Footer', data(){ return { year:new Date().getFullYear() } } }
</script>

<style scoped>
.footer {
  width:100%;
  background: #ffffff;
  border-top: 1px solid rgba(16,24,40,0.04);
  box-shadow: 0 -2px 10px rgba(16,24,40,0.02);
}
.footer-inner {
  max-width: 1000px;
  margin: 0 auto;
  padding: 14px 20px;
  text-align:center;
  color:#6b7280;
}
</style>
