<template>
  <div class="card-columns" :style="containerStyle">

    <div
      v-for="(card, index) in cards"
      :key="index"
      :class="card.className"
      :style="card.style"
    >
      <img v-if="card.imgTop.src" class="card-img-top" :src="card.imgTop.src" alt="Card image cap" :style="card.imgTop.style">
      <div class="card-body">
        <h5 v-if="card.title.content" class="card-title heading-style">{{ card.title.content }}</h5>
        <p v-if="card.text" class="card-text">{{ card.text }}</p>
        <button v-if="card.button" class="btn btn-primary">{{ card.button }}</button>
      </div>
    </div>

  </div>

</template>

<script>
  import yiq from 'yiq'

  import store from '../helpers/store'
  import ColorSchemes from '../helpers/colorSchemes'
  import { animations } from '../helpers/options'
  import { shuffleFromSeed, pullFromSeed } from '../helpers/shuffling'
  
  import commonMixins from '../mixins/common'

  export default {
    mixins: [ commonMixins ],
    props: {
      list: Array,
      seedNumbers: Array
    },
    data() {
      return {
        
      }
    },
    computed: {
      gridSpacing () {
        return pullFromSeed(this.state.seed.c, ['3rem', '2rem', '1rem'])
      },
      containerStyle () {
        return {
          columnCount: this.hasSeeds ? pullFromSeed(this.state.seed.b, [1, 2, 3, 4]) : null,
          columnGap: this.hasSeeds ? this.gridSpacing : null
        }
      },
      cards () {
        return this.list.map((item, index) => {
          return this.buildCardDetails(index)
        })
      }
    },
    methods: {
      buildCardDetails (index) {
        // console.log('this.colorScheme', this.colorScheme)

        const cardColorScheme = shuffleFromSeed({
          seedNumber: index + this.state.seed.a,
          list: this.colorScheme
        })

        return {
          style: {
            color: this.hasSeeds ? yiq(cardColorScheme[1].value) : null,
            background: this.hasSeeds ? cardColorScheme[1].value : null,
            borderColor: this.hasSeeds ? cardColorScheme[2].value : null,
            borderWidth: this.hasSeeds ? pullFromSeed(this.state.seed.c, ['10px', '1px', '0']) : null,
            borderRadius: this.hasSeeds ? pullFromSeed(this.state.seed.a, ['15px', '5px', '0']) : null,
            marginBottom: this.hasSeeds ? this.gridSpacing : null,
            animationDelay: `${(index * pullFromSeed(this.state.seed.a, [50, 75, 100]))}ms`
          },
          className: [
            'card',
            'overflow-hidden',
            'animated',
            this.hasSeeds ? pullFromSeed(this.state.seed.a, animations) : null,
          ].join(' '),
          imgTop: {
            src: !(index % 2) ? 'https://source.unsplash.com/2AoJ9TnuDIg/1600x900' : null,
            style: {
              mixBlendMode: yiq(cardColorScheme[1].value, { white: 'lighten', black: 'multiply'})//pullFromSeed(this.state.seed.c, ['lighten', 'color-burn', 'none'])
            }
          },
          title: {
            content: index % 2 ? 'Title' : null,
          },
          text: index % 3 ? 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' : null,
          button: !(index % 4) ? 'Go' : null
        }
      }
    },
    mounted() {
      
    },
  }
</script>
