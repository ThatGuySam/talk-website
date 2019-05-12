import is from 'is_js'

import store from '../helpers/store'
import ColorSchemes from '../helpers/colorSchemes'
import {shuffleFromSeed, pullFromSeed} from '../helpers/shuffling'

export default {
    data () {
        return {
            state: store.state
        }
    },
    computed: {
        hasSeeds () {
            return [
                this.state.seed.a,
                this.state.seed.b,
                this.state.seed.c
            ].every((seed) => is.number(seed))
        },
        colorScheme () {
            const seed = this.state.seed.a
            if (seed === null) return

            const scheme = pullFromSeed(this.state.seed.a, ColorSchemes).colors

            return shuffleFromSeed({
                seedNumber: this.state.seed.c,
                list: scheme
            })
        },
    }
}