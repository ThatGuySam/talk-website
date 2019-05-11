<template>
  <div class="swiper-container" ref="carousel">
    <div class="swiper-wrapper">
      <!-- It is important to set "left" style prop on every slide -->
      <div class="swiper-slide"
        v-for="(slide, index) in virtualData.slides"
        :key="index"
        :style="{
          left: `${virtualData.offset}px`,
          backgroundColor: slide.bgColor,
        }"
      >
        <div class="slide-wrapper d-flex align-items-center p-5" style="min-height: 450px;">
          <div class="slide-text display-3 font-weight-bold" :style="{ color: slide.textColor }">
            {{slide.content}}
            <i
              v-for="(icon, index) in slide.icons"
              :key="index"
              :class="`${icon.value} px-2`"
              :style="{ color: icon.color }"
            />
          </div>
        </div>
      </div>
      <!-- Add Arrows -->
      <div class="swiper-button-next"></div>
      <div class="swiper-button-prev"></div>
    </div>
  </div>
</template>

<script>
  // import is from 'is_js'
  import Swiper from 'swiper/dist/js/swiper.esm.bundle'

  import Colors from '../helpers/colors'
  import FaIcons from '../helpers/faIcons'
  import { shuffleFromSeed } from '../helpers/shuffling'

  let swiper

  const buildSlide = function (i) {
    const shuffledColors = shuffleFromSeed({
      seedNumber: i + 10,
      list: Colors
    })

    const shuffledIcons = shuffleFromSeed({
      seedNumber: i + 20,
      list: FaIcons
    })

    return {
      content: (i + 1),
      index: i,
      bgColor: shuffledColors[6].value,
      textColor: shuffledColors[1].value,
      icons: [
        {
          color: shuffledColors[2].value,
          value: shuffledIcons[2].value,
        },
        {
          color: shuffledColors[3].value,
          value: shuffledIcons[3].value,
        },
        {
          color: shuffledColors[4].value,
          value: shuffledIcons[4].value,
        },
      ]
    }
  }

  export default {
    data() {
      return {
        slides: (function () {
          return [
            buildSlide(0)
          ]
        }()),
        // virtual data
        virtualData: {
          slides: [],
        },
      }
    },
    methods: {
      pushSlide (i) {
        const slide = buildSlide(i)
        this.slides.push(slide)
      }
    },
    mounted() {
      swiper = new Swiper(this.$refs.carousel, {
        speed: 750,
        // autoplay: {
        //   delay: 750,
        //   disableOnInteraction: false,
        // },
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
        },
        virtual: {
          slides: this.slides,
          renderExternal: (data) => {
            // assign virtual slides data
            this.virtualData = data
          },
        },
      })

      // swiper.virtual.appendSlide('Slide 3');

      let i = 1
      setInterval(() => {
        this.pushSlide(i)
        swiper.slideTo(i)
        i += 1
      }, 1500)
      
    },
  }
</script>
