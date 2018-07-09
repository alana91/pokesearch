<template>
  <div id="search">
      <b-alert variant="danger"
              dismissible
              :show="showDismissibleAlert"
              @dismissed="showDismissibleAlert=false">
            Oops! Something went wrong! Would you like to try again?
      </b-alert>
      <b-container class="mt-5 pt-5 mb-3" v-if="showLoader">
          <b-row class="justify-content-center">
              <div class="loader"></div>
          </b-row>
      </b-container>
      <b-form v-if="showForm" @submit="submit">
          <b-container class="mt-2 pt-5">
              <b-form-row class="justify-content-center">
                  <b-col md="4">
                      <h3 class="text-center">Search for {{ getSearchSubject() }}</h3>
                  </b-col>
              </b-form-row>
              <b-form-row class="justify-content-center mt-4">
                  <b-col v-if="getOptions()" md="4">
                      <b-form-select class="mb-2" novalidate v-model="form.selected" id="option-select" :options="getOptions()" :state="selectState"/>
                      <b-form-invalid-feedback class="mb-3" id="selectLiveFeedback">
                          Please select an option
                      </b-form-invalid-feedback>
                  </b-col>
              </b-form-row>
              <b-form-row class="justify-content-center">
                  <b-col md="4">
                      <b-form-input class="mb-2" novalidate v-model="form.searchText" id="searchText" type="text" :placeholder="placeholder" :state="searchTextState"></b-form-input>
                      <b-form-invalid-feedback id="textInputLiveFeedback">
                          Please type your search text
                      </b-form-invalid-feedback>
                  </b-col>
              </b-form-row>
              <b-form-row class="mt-4 justify-content-center">
                  <b-col lg="2" md="4">
                      <b-btn class="mb-3" :block="true" variant="success" type="submit">Submit</b-btn>
                  </b-col>
              </b-form-row>
          </b-container>
      </b-form>
      <b-container v-if="showResult" class="">
          <b-row class="justify-content-center mt-4 pt-4">
              <b-col md="7">
                  <b-card no-body header-bg-variant="info" header-text-variant="white" border-variant=info :header="cardTitle">
                      <b-table stacked :items="items"></b-table>
                  </b-card>
              </b-col>
          </b-row>
          <b-row class="mt-4 justify-content-center">
              <b-col lg="2" md="4">
                  <b-btn class="mb-3" :block="true" variant="secondary" @click="resetForm();showForm=true;showResult=false">Return</b-btn>
              </b-col>
          </b-row>
      </b-container>
  </div>
</template>

<script>
export default {
  name: "BasePage",
  data() {
    return {
      cardTitle: null,
      description: null,
      form: {
        searchText: "",
        selected: null
      },
      items: [{}],
      searchSubject: null,
      searchTextState: null,
      selectState: null,
      showDismissibleAlert: false,
      showLoader: false,
      showForm: true,
      showResult: false,
      options: null,
      placeholder: "Type your search",
      responseData: null
    };
  }
};
</script>

<style>
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
