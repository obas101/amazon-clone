<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-section">
            <div class="a-spacing-top-medium"></div>
            <h2 style="text-align: center">Update {{ product.title }}</h2>
            <form>
              <!--Category Dropdown-->
              <div class="a-spacing-top-medium">
                <label>Category</label>
                <select class="a-select-option" v-model="categoryID">
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
                <select class="a-select-option" v-model="ownerID">
                  <option
                    v-for="owner in owners"
                    value="category._id"
                    :key="owner._id"
                    >{{ owner.name }}</option
                  >
                </select>
              </div>

              <!--Title-->
              <div class="a-spacing-top-medium">
                <label>Title</label>
                <input
                  v-model="title"
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  :placeholder="product.title"
                />
              </div>

              <!--Price -->
              <div class="a-spacing-top-medium">
                <label>Price</label>
                <input
                  v-model="price"
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  :placeholder="product.price"
                />
              </div>

              <!--stockQuantity -->
              <div class="a-spacing-top-medium">
                <label>Stock Quantity</label>
                <input
                  v-model="stockQuantity"
                  type="text"
                  class="a-input-text"
                  style="width: 100%"
                  :placeholder="product.stockQuantity"
                />
              </div>

              <!--Descripion-->
              <div class="a-spacing-top-medium">
                <label>Description</label>
                <textarea
                  v-model="description"
                  style="width: 100%"
                  :placeholder="product.description"
                ></textarea>
              </div>

              <!--Photo upload -->
              <div class="a-spacing-top-medium">
                <label>Add Photo</label>
                <div class="a-row">
                  <label class="choosefile-button">
                    <i class="fal fa-plus"></i>
                    <input type="file" @change="onFileSelected" />
                    <p style="margin-top: -70px">{{ fileName }}</p>
                  </label>
                </div>
              </div>

              <!--Button-->
              <hr />
              <div class="a-spacing-top-large">
                <span class="a-button-register">
                  <span class="a-button inner">
                    <span class="a-button-text" @click="onUpdateProduct">
                      Update Product
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
  async asyncData({ $axios, params }) {
    try {
      let categories = $axios.$get("http://localhost:3000/api/categories");
      let owners = $axios.$get("http://localhost:3000/api/owners");
      let product = $axios.$get(
        `http://localhost:3000/api/products/${params.id}`
      );

      const [catResponse, ownResponse, proResponse] = await Promise.all([
        categories,
        owners,
        product
      ]);
      console.log(proResponse);

      return {
        categories: catResponse.categories,
        owners: ownResponse.owners,
        product: proResponse.product
      };
    } catch (error) {
      console.log(error);
    }
  },
  data() {
    return {
      categoryID: null,
      ownerID: null,
      title: "",
      price: "",
      description: "",
      selectedFile: null,
      fileName: "",
      stockQuantity: ""
    };
  },

  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.fileName = event.target.files[0].name;
    },

    async onUpdateProduct() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("description", this.description);
      data.append("stockQuantity", this.stockQuantity);
      data.append("price", this.price);
      data.append("photo", this.selectedFile, this.selectedFile.name);
      data.append("categoryID", this.categoryID);
      data.append("ownerID", this.ownerID);

      let result = await this.$axios.$put(
        `http://localhost:3000/api/products/${this.$route.params.id}`,
        data
      );

      this.$router.push("/");
    }
  }
};
</script>
