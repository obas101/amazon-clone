<template>
  <main>
    <div class="container-fluid c-section">
      <div class="row">
        <div class="col-sm-3"></div>
        <div class="col-sm-6">
          <div class="a-spacing-top-medium"></div>
          <h2 style="text-align: center">Add a New Owner</h2>
          <form>
            <!-- Name Input-->
            <div class="a-spacing-top-medium"></div>
            <label>Name</label>
            <input
              class="a-input-text"
              style="width: 100%"
              v-model="name"
            />

            <!--About owner-->
            <div class="a-spacing-top-medium">
              <label>About Yourself or company</label>
              <textarea
                v-model="about"
                placeholder="Provide a detailed description of yourself or company..."
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
            <hr>
            <div class="a-spacing-top-large">
              <span class="a-button-register">
                <span class="a-button inner">
                  <span class="a-button-text" @click="onAddOwner">
                    Add Owner
                  </span>
                </span>
              </span>
            </div>
          </form>

          <!-- info display -->
          <div class="a-spacing-top-medium"></div>
          <ul class="list-group-item">
            <li v-for="owner in owners" :key="owner._id">
              {{ owner.name }}
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
      let response = await $axios.$get("http://localhost:3000/api/owners");
      return {
        owners: response.owners
      };
    } catch (error) {
      console.log(error);
    }
  },

  data() {
    return {
      name: "",
      selectedFile: null,
      fileName: "",
      about: ""
    };
  },
  methods: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0];
      this.fileName = event.target.files[0].name;
    },
    async onAddOwner() {
      try {
        let data = new FormData();
        data.append("name", this.name);
        data.append("about", this.about);
        data.append("photo", this.selectedFile, this.selectedFile.name);
        console.log(data);
       
        let response = await this.$axios.$post(
          "http://localhost:3000/api/owners",
          data
        );
        this.owners.push({name: this.name});
        console.log(this.owners)
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>