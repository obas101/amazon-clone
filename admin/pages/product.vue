<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Add a New Product</h2>
            <form>
              <!--Category Dropdown-->
              <div class="a-spacing-top-medium">
                <label>Category</label>
                <select class="a-select-option">
                  <option
                    v-for="category in categories"
                    value="category._id"
                    :key="category._id"
                    >{{ category.type }}</option
                  >
                </select>
              </div>

              <!--Owner Dropdown-->
              <div class="a-spacing-top-medium">
                <label>Owner</label>
                <select class="a-select-option">
                  <option
                    v-for="owner in owners"
                    value="category._id"
                    :key="owner._id"
                    >{{ owner.name }}</option
                  >
                </select>
              </div>

              <!--Title Dropdown-->
              <div class="a-spacing-top-medium">
                <label>Title</label>
                <input type="text" class="a-input-text" style="width: 100%" />
              </div>

              <!--Price Dropdown-->
              <div class="a-spacing-top-medium">
                <label>Price</label>
                <input type="text" class="a-input-text" style="width: 100%" />
              </div>

              <!--Descripion-->
              <div class="a-spacing-top-medium">
                <label>Description</label>
                <textarea
                  placeholder="Provide a detailed description of product..."
                  style="width: 100%"
                ></textarea>
              </div>

              <!--Photo upload -->
              <div class="a-spacing-top-medium">
                <label>Add Photo</label>
                <div class="a-row">
                  <label class="choosefile-button">
                    <i class="fal fa-plus"></i>
                    <p style="margin-top: -70px">Name of the</p>
                  </label>
                </div>
              </div>

              <!--Button-->
              <hr />
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button inner">
                    <span class="a-button-text">
                      Add Product
                    </span>
                  </span>
                </span>
              </div>
            </form>
          </div>
        </div>
        <div class="col-sm-3"></div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      let categories = $axios.$get("http://localhost:3000/api/categories");
      let owners = $axios.$get("http://localhost:3000/api/owners");

      const [catResponse, ownResponse] = await Promise.all([
        categories,
        owners
      ]);

      return {
        categories: catResponse.categories,
        owners: ownResponse.owners
      };
    } catch (error) {
      console.log(error);
    }
  }
};
</script>
