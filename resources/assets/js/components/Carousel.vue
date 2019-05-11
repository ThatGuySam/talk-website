<template>
  <div class="swiper-container" ref="carousel">
    <div class="swiper-wrapper">
      <!-- It is important to set "left" style prop on every slide -->
      <div class="swiper-slide"
        v-for="(slide, index) in virtualData.slides"
        :key="index"
        :style="{left: `${virtualData.offset}px`}"
      >{{slide}}</div>
    </div>
  </div>
</template>

<script>
  // import is from 'is_js'
  import Swiper from 'swiper/dist/js/swiper.esm.bundle'

  const colors = [
    
  ]

  export default {
    data() {
      return {
        // dummy slides data
        slides: (function () {
          var slides = [];
          for (var i = 0; i < 600; i += 1) {
            slides.push('Slide ' + (i + 1))
          }
          return slides;
        }()),
        // virtual data
        virtualData: {
          slides: [],
        },
      }
    },
    mounted() {
      const swiper = new Swiper(this.$refs.carousel, {
        // ...
        virtual: {
          slides: this.slides,
          renderExternal: (data) => {
            // assign virtual slides data
            this.virtualData = data
          },
        },
      })
    },
  }
</script>
