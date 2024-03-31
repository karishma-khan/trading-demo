<template>
    <div class="grid md:grid-cols-3 grid-cols-1 grid-flow-row mt-12">
        <div class="flex justify-between p-3 mx-3 overall">
            <div>Gross Pnl</div>
            <div class="text-[#00DC82]">{{ (totalPnl).toFixed(2) }}</div>
        </div>
        <div class="flex justify-between p-3 mx-3 overall">
            <div>Gross Investment</div>
            <div class="text-[#00DC82]">1000</div>
        </div>
        <div class="flex justify-between p-3 mx-3 overall">
            <div>Gross ROI</div>
            <div class="text-[#00DC82]">{{ ((totalPnl/1000)*100).toFixed(2) }}</div>
        </div>
        <div class="flex justify-between p-3 mx-3 overall">
            <div>Max Pofit</div>
            <div class="text-[#00DC82]">{{ maxPnl }}</div>
        </div>
        <div class="flex justify-between p-3 mx-3 overall">
            <div>Max loss</div>
            <div class="text-[red]">{{ minPnl }}</div>
        </div>
        <div class="flex justify-between p-3 mx-3 overall">
            <div>Max Days</div>
            <div class="text-[#00DC82]">{{ maxDays }}</div>
        </div>
        <div class="flex justify-between p-3 mx-3 overall">
            <div>Min Days</div>
            <div class="text-[red]">{{ minDays }}</div>
        </div>
      </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    computed:{
        ...mapGetters({
            totalPnl: 'getNetPnl',
            minPnl:'getMinPnl',
            maxPnl:'getMaxPnl',
            minDays:'getMinDays',
            maxDays:'getMaxDays',
        })
    },
}
</script>