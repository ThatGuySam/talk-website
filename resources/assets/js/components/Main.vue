<template>
  <div class="container-fluid postion-relative px-0" :style="theme.mainContainer">
    <div v-if="bgImage" class="main-bg faded-mask-bottom" style="height: 150vh; opacity: 0.3;">
      <img :src="bgImage.src" class="w-100 h-100 object-cover" :style="{ mixBlendMode: bgImage.blend }"/>
    </div>
    <div class="container">
      <div class="row align-items-center" style="min-height: 100vh;">
        <div class="col-12 w-100">
          <div class="hero-wrapper d-flex align-items-center p-5" style="min-height: 450px;">
            <div
              ref="string_seed_input"
              class="string-seed-input hero-content display-3 font-weight-bold"
              contenteditable="true"
              placeholder="Hi! What's your name?"
              :style="{ color: theme.mainTextColor }"
            ></div>
          </div>
          {{ seedA }}
          {{ seedB }}
          {{ seedC }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import is from 'is_js'
  import yiq from 'yiq'

  import ColorSchemes from '../helpers/colorSchemes'
  import FaIcons from '../helpers/faIcons'
  import { imageIds } from '../helpers/options'
  import { shuffleFromSeed, pullFromSeed } from '../helpers/shuffling'

  import Carousel from './Carousel.vue'

  let timeout = 500
  let timer = null

  export default {
    components: {
      Carousel
    },
    data: function () {
      return {
        seedA: null,
        seedB: null,
        seedC: null,
      }
    },
    computed: {
      hasSeeds () {
        return [this.seedA, this.seedB, this.seedC].every(seed => is.number(seed))
      },
      colorScheme () {
        const seed = this.seedA
        if (seed === null) return

        const scheme = pullFromSeed(this.seedA, ColorSchemes).colors

        return shuffleFromSeed({
          seedNumber: this.seedC,
          list: scheme
        })
      },
      bgImage () {
        if (!this.hasSeeds || this.seedA % 3) return

        const imageId = pullFromSeed(this.seedA, imageIds)

        const imageUrl = `https://source.unsplash.com/${imageId}/1600x900`

        return {
          src: imageUrl,
          blend: pullFromSeed(this.seedC, ['lighten', 'color-burn', 'none'])
        }
      }, 
      theme () {
        return {
          root: {
            '--body-background-color': this.hasSeeds ? this.colorScheme[0].value : 'transparent',
          },
          mainContainer: {
            color: this.hasSeeds ? yiq(this.colorScheme[0].value) : 'inherit',
            // backgroundColor: this.hasSeeds ? this.colorScheme[0].value : 'transparent',
            // ...this.bgImageStyle
          }
        }
      }
    },
    methods: {
      generateNumber (input) {
        return input
          .split('')
          .map((character) => {
            return character.charCodeAt(0)
          })
          .join('')
      },
      generateNumbers (text) {
        const seedNumber = this.generateNumber(text)
        const length = seedNumber.length
        const numberAOffset = Math.round(length * 0.2)
        const numberA = length + seedNumber.slice(numberAOffset, numberAOffset + 2)
        const numberB = length + seedNumber.substr(length - 2)
        const numberC = length + seedNumber.slice(Math.round(length * 0.8), Math.round(length * 0.8) + 2)
        
        return [Number(numberA) + 11, Number(numberB) + 13, Number(numberC) + 15]
      },
    },
    mounted () {

      // Set up input listener
      this.$refs.string_seed_input.addEventListener('input', event => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          // Get text from stage
          const text = event.target.innerText || event.target.textContent

          // Reset
          this.seedA = null
          this.seedB = null
          this.seedC = null

          // If there's no text then stop
          if (!text.length) return

          // Load in numbers
          const [ seedA, seedB, seedC ] = this.generateNumbers(text)
          
          this.seedA = seedA
          this.seedB = seedB
          this.seedC = seedC

        }, timeout)
      })

    },
    watch: {
      theme: function (theme) {
        // Sync root css variables
        for (const key in theme.root) {
          document.documentElement.style.setProperty(key, theme.root[key])
        }
      }
    }
  }
</script>
