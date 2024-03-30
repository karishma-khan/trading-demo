<template>
    <div style="color: #00DC82;" class="topnav p-3 pl-6">
        <i class="fa-solid fa-terminal mr-2"></i>
        {{ name }}
    </div>
</template>
<script>
export default {
    data()
    {
        return{
            name:this.$route.name == 'index' ? 'Terminal' : 'Performance'
        }
    },
}
</script>