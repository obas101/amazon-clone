<template>
  <main>
    <div class="a-spacing-large"></div>
    <div class="container-fluid browsing-history">
      <div class="row">
        <div class="col-sm-8 col-8">
          <h1 class="a-size-large a-spacing-none a-text-normal">
            All Products
          </h1>
          <div class="a-spacing-large"></div>
          <!-- buttons -->
          <a href="#" class="a-button-buy-again">Add a New Product</a>
          <a href="#" class="a-button-history margin-right-10"
            >Add a New Category</a
          >
          <a href="#" class="a-button-history margin-right-10"
            >Add a New Owner</a
          >
          <!-- listing page -->
        </div>
      </div>
    </div>

    <div class="a-spacing-large"></div>

    <div class="container-fluid browsing-history">
      <div class="row">
        <div class="col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 br bb" v-for="product in products" :key="product._id">
          <div class="history-box">
            <!-- Product image -->

            <a href="#" class="a-link-normal">
              <img :src="product.photo" class="img-fluid" />
            </a>
            <!-- Product title -->

            <div class="a-spacing-top-base asin-title">
              <span class="a-text-normal">
                <div class="p13n-sc-truncated">{{product.title}}</div>
              </span>
            </div>
            <!-- Product rating -->

            <div class="a-row">
              <a href="#">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
              </a>
              <span class="a-letter-space"></span>
              <span class="a-color-tertiary a-size-small asin-reviews"
                >3433</span
              >
            </div>

            <!-- Product price -->
            <div class="a-row">
              <span class="a-size-base a-color-price">
                <span class="p13n-sc-price">&#8358;{{product.price}}</span>
              </span>
            </div>
            <!-- Product button-->
            <div class="a-row">
              <a href="#" class="a-button-history margin-right-10">Update</a>
              <a href="#" class="a-button-history margin-right-10">Delete</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  //asyncData helps to fetch data while nuxt is still loading

 async asyncData({ $axios }) {
    try {
      let response = await $axios.$get("http://localhost:3000/api/products");
      return {
        products: response.products
      };
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
<style></style>
