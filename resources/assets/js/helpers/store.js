export default {
  // debug: true,
  state: {
    seed: {
      a: null,
      b: null,
      c: null
    }
  },
  setSeedAction (newValue) {
    // if (this.debug) console.log('setMessageAction triggered with', newValue)
    this.state.seed = newValue
  },
  clearSeedAction () {
    // if (this.debug) console.log('clearMessageAction triggered')
    this.state.seed = {
      a: null,
      b: null,
      c: null
    }
  }
}

