<template>
  <div class="container">
    <div class="row align-items-center" style="min-height: 100vh;">
      <div class="col-12 w-100">
        <Carousel />
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
