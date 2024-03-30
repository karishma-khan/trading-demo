<template>
    <div v-if="!isMobile" class="topnav p-3 pl-6 text-[#00DC82]">
        <i class="fa-solid fa-terminal mr-2"></i>
        {{ name }}
    </div>
    <div v-else class="relative topnav p-3 pl-6 text-[#00DC82] flex justify-between">
        <div>
            <i style="font-size: 35px;color:#00DC82" class="fa-solid fa-user-secret mr-12"></i>
            <i class="fa-solid fa-terminal mr-2"></i>
            {{ name }}
        </div>
        <div class="flex items-end">
            <i @click="toggleMenu" class="fa-solid fa-bars text-2xl"></i>
        </div>
        <div v-if="isMenuOpen" class="menuBox">
            <div class="p-2 px-4 menuItem" @click="handleRoute('/')">Terminal</div>
            <div class="p-2 px-4 menuItem" @click="handleRoute('/performance')">Performance</div>
        </div>
    </div>
</template>
<script>
export default {
    props:['isMobile'],
    data()
    {
        return{
            name:this.$route.name == 'index' ? 'Terminal' : 'Performance',
            isMenuOpen:false,
        }
    },
    methods:{
        toggleMenu(){
            this.isMenuOpen = !this.isMenuOpen
        },
        handleOutsideClick(event){
            if (!this.$el.contains(event.target)) {
                this.isMenuOpen = false
            }
        },
        handleRoute(item){
            window.location.href = (item)
        }
    },
    mounted(){

        document.addEventListener('click', this.handleOutsideClick);
    }
}
</script>
<style>
.menuBox{
    position: absolute;
    background-color: #282e34;
    right: 0;
    bottom: -80px;
    z-index: 20
}

.menuItem:hover{
    background-color: #535556;
}
</style>