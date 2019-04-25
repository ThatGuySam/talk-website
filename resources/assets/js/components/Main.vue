<template>
  <div>Main</div>
</template>

<script>
  import is from 'is_js'
  import { local } from 'brownies'

  export default {
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
      // If fields is not set up yet initialize it
      if (is.not.object(local.fields)) {
        local.fields = {}
      } else {
        // Get fields
        this.getLocal()
      }
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
