<template>
  <div class="listingPage">
    <div class="container-fluid">
      <div class="row">
        <div class="col-xl-2 col-lg-3 md-4 col-sm-4">
          <!-- leftside bar -->
        </div>
        <!-- main content -->

        <div class="col-xl-10 col-lg-9 md-8 col-sm-8">
          <FeaturedProduct />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FeaturedProduct from "~/components/FeaturedProduct.vue";
export default {
  component: { FeaturedProduct },
};
</script>

<style></style>``
