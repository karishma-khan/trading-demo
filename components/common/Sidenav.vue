<template>
    <div class="sidenav w-[250px]">
        <div class="flex p-6 items-center">
            <i style="font-size: 35px;color:#00DC82" class="fa-solid fa-user-secret mr-6"></i>
        </div>
        <div class="mt-6">
            <div v-for="item,idx in items" :key="idx" :class=" selected == item.id ? 'bg-[#2a2d31]' : '' " class="my-2 px-6 py-2 flex items-center cursor-pointer" @click="handleNavigate(item)">
                <i :class="item.icon" style="color:#718294" class="mr-2"></i> 
                <span style="font-size: 15px;font-weight: 200;">
                    {{ item.name }}
                </span>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            selected:this.$route.name == 'index' ? 0 : 1,
            items:[
                {
                    id:0,
                    name:"Terminal",
                    icon:"fa-solid fa-house",
                    slug:'/'
                },
                {
                    id:1,
                    name:"Performance",
                    icon:"fa-brands fa-slack",
                    slug:'/performance'
                }
            ]
        }
    },
    methods:{
        handleNavigate(item){
            this.selected = item.id
            window.location.href = (item.slug)
        }
    }
}
</script>