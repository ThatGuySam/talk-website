<template>
  <div class="container-fluid postion-relative px-0">
    <div v-if="bgImage" class="main-bg faded-mask-bottom" style="height: 150vh; opacity: 0.3;">
      <img :src="bgImage.src" class="w-100 h-100 object-cover" :style="{ mixBlendMode: bgImage.blend }"/>
    </div>
    <div class="container">
      <div class="row align-items-center" :style="theme.heroContainer">
        <div class="col-12 w-100">
          <div class="hero-wrapper d-flex align-items-center p-5" style="min-height: 450px;">
            <div
              ref="string_seed_input"
              class="string-seed-input heading-style hero-content display-4 w-100"
              contenteditable="true"
              placeholder="Hi! What's your name?"
              :style="{ color: theme.mainTextColor }"
            ></div>
          </div>
          {{ state.seed.a }}
          {{ state.seed.b }}
          {{ state.seed.c }}
        </div>
      </div>

      <div class="row align-items-center">
        <div class="col-12 w-100">
          <Grid
            v-if="hasSeeds"
            :list="[1,2,3,4,5,6,7,8,9,10]"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import is from 'is_js'
  import yiq from 'yiq'

  import store from '../helpers/store'
  import ColorSchemes from '../helpers/colorSchemes'
  import FaIcons from '../helpers/faIcons'
  import { imageIds, fonts, headingFonts, headingFontWeights } from '../helpers/options'
  import { shuffleFromSeed, pullFromSeed } from '../helpers/shuffling'

  import commonMixins from '../mixins/common'

  import Grid from './Grid.vue'

  let timeout = 500
  let timer = null

  export default {
    mixins: [ commonMixins ],
    components: {
      Grid
    },
    data: function () {
      return {
        
      }
    },
    computed: {
      bgImage () {
        if (!this.hasSeeds || this.state.seed.a % 3) return

        const imageId = pullFromSeed(this.state.seed.a, imageIds)

        const imageUrl = `https://source.unsplash.com/${imageId}/1600x900`

        return {
          src: imageUrl,
          blend: pullFromSeed(this.state.seed.c, ['lighten', 'color-burn', 'none'])
        }
      },
      theme () {
        console.log('this.colorScheme', this.colorScheme)
        return {
          root: {
            '--body-background-color': this.hasSeeds ? this.colorScheme[0].value : 'transparent',
            '--body-font': this.hasSeeds ? pullFromSeed(this.state.seed.c, fonts) : 'titling-gothic-fb, sans-serif',
            '--heading-font': this.hasSeeds ? pullFromSeed(this.state.seed.b, headingFonts) : 'titling-gothic-fb, sans-serif',
            '--heading-font-weight': this.hasSeeds ? pullFromSeed(this.state.seed.a, headingFontWeights) : 800,
          },
          heroContainer: {
            color: this.hasSeeds ? yiq(this.colorScheme[0].value) : 'inherit',
            minHeight: '80vh'
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
      updateHistoryState (text) {
        console.log('text', text)
        if (is.empty(text)) {
          history.replaceState(null, null, '/')
          return
        }
        history.replaceState(null, null, text)
      },
      getTextFromUrl () {
        const path = window.location.pathname.split('/')
        return decodeURI(path[1])
      },
      seedText (text) {
        // Reset
        store.clearSeedAction()

        // If there's no text then stop
        if (!text.length) return

        // Load in numbers
        const [ seedA, seedB, seedC ] = this.generateNumbers(text)

        store.setSeedAction({
          a: seedA,
          b: seedB,
          c: seedC
        })
      }
    },
    mounted () {

      const textFromUrl = this.getTextFromUrl()
      
      if (is.not.empty(textFromUrl)) {
        this.$refs.string_seed_input.innerHTML = textFromUrl
        this.seedText(textFromUrl)
      }

      // Set up input listener
      this.$refs.string_seed_input.addEventListener('input', event => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          // Get text from stage
          const text = event.target.innerText || event.target.textContent

          this.updateHistoryState(text)

          this.seedText(text)

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
