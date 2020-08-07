<template>
  <div>
    <NavBar />
    <Nuxt />
    <Footer />
  </div>
</template>
<script>
import NavBar from "~/components/NavBar.vue"
import Footer from "~/components/Footer.vue"
export default {
  component: {
    NavBar
  }
  
}
</script>

<style>

</style>
