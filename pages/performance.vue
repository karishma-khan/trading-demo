<template>
    <div v-if="loading">Loading</div>
    <div v-else class="p-4 text-xs">
        <div class="flex items-center">
            <i @click="isToggleOn = !isToggleOn" class="fa-solid text-3xl mr-4" :class="isToggleOn ? 'fa-toggle-on text-[#00DC82]' : 'fa-toggle-off text-red'"></i>
            {{ isToggleOn ? 'Absolute Graph' : 'Percentage Graph' }}
        </div>
        <performance-chart v-if="isToggleOn" dataToPlot="getAbsolutePerformance"></performance-chart>
        <percentage-performance-chart v-else dataToPlot="getAbsolutePerformance"></percentage-performance-chart>
        <div class="mt-12 text-xl">
            Month Wise Breakup
        </div>
        <performance-table :months="months" :totalPnl="totalPnl" :perMonthData="perMonthData"></performance-table>
      <overall-performance></overall-performance>
    </div>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
    data(){
        return{
            months:["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec","Total"],
            loading:true,
            isToggleOn:true
        }
    },
    computed:{
        ...mapGetters({
            totalPnl: 'getNetPnl',
            performanceData:'getPerformance',
            perMonthData:'getMonthlyPerfomance',
            absData:'getAbsolutePerformance',
        })
    },
    methods:{
    },
    async mounted(){
        await this.$store.dispatch('getPerformance')
        this.loading = false
    }
}
</script>