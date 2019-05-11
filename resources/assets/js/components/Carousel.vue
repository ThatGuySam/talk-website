<template>
  <div class="swiper-container" ref="carousel">
    <div class="swiper-wrapper">
      <!-- It is important to set "left" style prop on every slide -->
      <div class="swiper-slide"
        v-for="(slide, index) in virtualData.slides"
        :key="index"
        :style="{
          left: `${virtualData.offset}px`,
          background: getBackgroundColor(slide.index),
        }"
      >
        <div class="slide-wrapper d-flex align-items-center p-5" style="min-height: 450px;">
          <div class="slide-text display-3 font-weight-bold" :style="{ color: getTextColor(slide.index) }">{{slide.content}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import is from 'is_js'
  import Swiper from 'swiper/dist/js/swiper.esm.bundle'

  import Colors from '../helpers/colors'
  

  export default {
    data() {
      return {
        // dummy slides data
        slides: (function () {
          var slides = [];
          for (var i = 0; i < 10; i += 1) {
            slides.push({
              content: 'Slide ' + (i + 1),
              index: i
            })
          }
          return slides
        }()),
        // virtual data
        virtualData: {
          slides: [],
        },
      }
    },
    methods: {
      getBackgroundColor (index) {
        return Colors[index].value
      },
      getTextColor (index) {
        return Colors[index+1].value
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
