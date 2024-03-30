<template>
  <div class="p-4 terminalPage">
    <div class="relative m-6">
      <input type="text" class="px-4" @input="searchStocks" v-model="searchStocksText" placeholder="Search stock to add to watchlist">
      <i class="fa-solid fa-magnifying-glass arrow"></i>
      <div class="stockDataBox" v-if="searchedStockList!=[] && searchStocksText != ''">
        <div v-for="stock,idx in searchedStockList" :key="idx" @click="addToWatchlist(stock)" class="p-4 stockItem cursor-pointer z-1">
          {{ stock }}
        </div>
      </div>
    </div>
    <div class="flex items-center justify-center">
      <div v-if="watchlist.length == 0" class="mt-28 noStocks"> 
        No Stocks added in watchlist 
      </div>
    </div>
    <div v-if="watchlist.length != 0">
      <candle-stick-chart :stock="selectedStock!=undefined?selectedStock:watchlist[0]"></candle-stick-chart>
      <div v-if="!selectedStock">{{ watchlist[0] }} stock is selected by default. Select graph from watchlist for preview.</div>
      <table style="width: 100%;" class="table-auto mt-12">
        <tr>
          <th>Asset</th>
          <th>Current Price</th>
          <th></th>
          <th></th>
        </tr>
        
        <tr v-for="(item,idx) in watchlist" :key="idx" @click="handleSelectedStock(item)">
          <td>{{ item }}</td>
          <td>
            <watchlist-tile :stockName="item"></watchlist-tile>
          </td>
          <td style="text-align: center;"><i class="fa-solid fa-plus cursor-pointer"></i></td>
          <td style="text-align: center;"><i class="fa-solid fa-trash cursor-pointer" @click="removeFromWatchlist(item)"></i></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import { disconnectWebSocket } from '~/plugins/websocket';
import {mapGetters} from "vuex";
export default {
  name: 'IndexPage',
  data()
  {
    return{
      searchStocksText:'',
      searchedStockList:[],
      isStocksOpen:false,
      selectedStock:undefined
    }
  },
  computed:{
    ...mapGetters({
      stocks:"getStocks",
      watchlist:"getWatchList"
    })
  },
  methods:{
    handleSelectedStock(item){
      this.selectedStock = item
    },
    searchStocks()
    {
      this.searchedStockList = this.stocks.filter((e) => 
        {
          return e.toUpperCase().indexOf(this.searchStocksText.toUpperCase()) > -1
        }
      )
    },
    addToWatchlist(val)
    {
      this.$store.dispatch('addWatchlistStock',val)
      this.searchStocksText = ''
    },
    removeFromWatchlist(val)
    {
      this.$store.dispatch('removeWatchlistStock',val)
      disconnectWebSocket(val)
    },
  },
  mounted()
  {
    this.$store.dispatch('generate_stocks')
  }
}
</script>

<style scoped>

input{
  background-color: #24292e;
  width: 100%;
  height: 38px;
  border-radius: 4px;
  font-weight:100;
}

.arrow{
  position: absolute;
  right: 9px;
  top: 10px;
}

.stockDataBox{
  position:absolute;
  background-color: #2e3134;
  width: 100%;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  max-height: 250px;
  overflow: auto;
}

.stockItem:hover{
  background-color: #24292e;
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

th, table{
  border: 1px solid #dddddd;
}

td, th {
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #18181a;
}

tr:nth-child(odd) {
  background-color: #1f1f21;
}
</style>
