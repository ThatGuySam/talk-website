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
    },
    data () {
      return {
        to: ''
      }
    },
    computed: {
      params () {
        return this.to
      }
    },
    mounted () {
      
    },
    methods: {
      setLocal () {
        // fields.forEach((key) => {
        //   local.fields = {
        //     ...local.fields,
        //     [key]: this[key]
        //   }
        // })
      },
      getLocal () {
        // fields.forEach((key) => {
        //   const fields = local.fields
        //   // If this field is empty then stop
        //   if (is.not.propertyDefined(fields, key)) return
        //   this[key] = local.fields[key]
        // })
      },
    }
  }
</script>
