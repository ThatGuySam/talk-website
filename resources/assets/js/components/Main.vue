<template>
  <div class="container-fluid px-0">
    <div class="container">
      <div class="row align-items-center" style="min-height: 100vh;">
        <div class="col-12 w-100">
          <div class="hero-wrapper d-flex align-items-center p-5" style="min-height: 450px;">
            <div class="string-seed-input hero-content display-3 font-weight-bold" contenteditable="true" placeholder="Type anything"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import is from 'is_js'
  import Carousel from './Carousel.vue'

  export default {
    components: {
      Carousel
    }
  }
</script>
