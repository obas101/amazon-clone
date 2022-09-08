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
                <select class="a-select-option" v-model="categoryID">
                  <option
                    v-for="(category, index) in categories"
                    :value="category._id"
                    :key="index"
                  >
                    {{ category.type }}
                  </option>
                </select>
              </div>

              <!--Owner Dropdown-->
              <div class="a-spacing-top-medium">
                <label>Owner</label>
                <select class="a-select-option" v-model="ownerID">
                  <option
                    v-for="(owner, index) in owners"
                    :value="owner._id"
                    :key="index"
                  >
                    {{ owner.name }}
                  </option>
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
                />
              </div>

              <!--Descripion-->
              <div class="a-spacing-top-medium">
                <label>Description</label>
                <textarea
                  v-model="description"
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
                    <span class="a-button-text" @click="onAddProduct">
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
        owners,
      ]);

      return {
        categories: catResponse.categories,
        owners: ownResponse.owners,
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
      stockQuantity: "",
    };
  },

  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile);
      this.fileName = event.target.files[0].name;
    },

    async onAddProduct() {
      let data = new FormData();
      data.append("title", this.title);
      data.append("description", this.description);
      data.append("stockQuantity", this.stockQuantity);
      data.append("price", this.price);
      data.append("photo", this.selectedFile, this.selectedFile.name);
      data.append("categoryID", this.categoryID);
      data.append("ownerID", this.ownerID);

      let result = await this.$axios.$post(
        "http://localhost:3000/api/products",
        data
      );

      this.$router.push("/");
    },
  },
};
</script>
