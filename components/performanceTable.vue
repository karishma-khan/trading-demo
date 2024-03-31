<template>
    <table style="width: 100%;" class="table-auto mt-4 block sm:table">
        <tr>
          <th>Year</th>
          <th v-for="item,idx in months" :key="idx">{{ item }}</th>
        </tr>
        
        <tr>
          <td>2023</td>
          <td class="text-[#00DC82]" v-for="item,idx in perMonthData" :key="idx">
            {{ Math.floor(item) }}
          </td>
          <td class="text-[#00DC82]">{{ Math.floor(totalPnl) }}</td>
        </tr>
      </table>
</template>
<script>
export default {
    props:['months', 'perMonthData', 'totalPnl']
}
</script>