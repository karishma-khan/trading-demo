<template>
  <v-app>
    <v-main>
      <div class="main flex">
        <common-sidenav></common-sidenav>
        <div class="grow">
          <common-top-nav></common-top-nav>
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
};
</script>
