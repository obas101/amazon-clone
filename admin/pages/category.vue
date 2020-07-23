<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-spacing-top-medium"></div>
          <h2 style="text-align: center">Add a New Category</h2>
          <form>
            <div class="a-spacing-top-medium"></div>
            <label>Type</label>
            <input
              class="a-input-text"
              style="width: 100%"
              v-model="type"
              type="text"
            />

            <!--Button-->
            <hr />
            <div class="a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button inner">
                  <span class="a-button-text" @click="onAddCategory">
                    Add Category
                  </span>
                </span>
              </span>
            </div>
          </form>
          <div class="a-spacing-top-medium"></div>
          <ul class="list-group-item">
            <li v-for="category in categories" :key="category._id">
              {{ category.type }}
            </li>
          </ul>
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
            let response = await $axios.$get("http://localhost:3000/api/categories");
            return { 
                categories: response.categories
                };
        } catch (error) {
            console.log(error)
        }
    },
    data() {
      return  {
          type: ""
      }
    },
    methods: {
       async onAddCategory() {
            try {
                let data = { type: this.type};
                let response = await this.$axios.$post("http://localhost:3000/api/categories", data);

                this.categories.push(data);
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>
