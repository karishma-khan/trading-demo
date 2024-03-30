<template>
  <v-app>
    <v-main>
      <div class="main flex">
        <common-sidenav v-if="!isMobile"></common-sidenav>
        <div class="grow">
          <common-top-nav :isMobile="isMobile"></common-top-nav>
          <div style="overflow: auto;height: calc(80vh);">
            <Nuxt
              id="main"
            />

          </div>
        </div>
      </div>
    </v-main>
  </v-app>
</template>
<script>
export default {
  data()
  {
    return{
      isMobile:false
    }
  },
  methods:{
    checkScreenSize(){
      this.isMobile = window.innerWidth < 1028;
    }
  },
  mounted() {
    this.checkScreenSize();
        window.addEventListener('resize', this.checkScreenSize);
  },

};
</script>
