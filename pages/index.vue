<template>
  <div class="p-4 terminalPage">
    <div v-if="newBool" class="w-screen h-screen fixed top-0 left-0 bg-[#00000099] z-40">
      <common-add-stock-modal :stock="tradeStock " @close="newBool=false"></common-add-stock-modal>
    </div>
    <div class="relative m-6">
      <input type="text" class="px-4" @input="searchStocks" v-model="searchStocksText" placeholder="Search stock to add to watchlist">
      <i class="fa-solid fa-magnifying-glass arrow"></i>
      <div class="stockDataBox z-1" v-if="searchedStockList!=[] && searchStocksText != ''">
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
      <candle-stick-chart v-if="chartReady" :stock="selectedStock!=undefined?selectedStock:watchlist[0]"></candle-stick-chart>
      <div v-else class="h-[821px] flex justify-between items-center"> ...Loading</div>
      <div :style="!selectedStock ? '' : 'visibility: hidden;'">{{ watchlist[0] }} stock is selected by default. Select stock from watchlist for preview.</div>
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
          <td style="text-align: center;"><i class="fa-solid fa-plus cursor-pointer" @click="buyStocks(item)"></i></td>
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
      selectedStock:undefined,
      newBool:false,
      tradeStock:null,
      chartReady:false
    }
  },
  computed:{
    ...mapGetters({
      stocks:"getStocks",
      watchlist:"getWatchList"
    })
  },
  methods:{
    buyStocks(item){
      this.tradeStock = item
      this.newBool = true;
    },
    async handleSelectedStock(item){
      this.chartReady = false
      this.selectedStock = item
      await this.$store.dispatch('getStockData',item)
      this.chartReady = true
    },
    searchStocks()
    {
      this.searchedStockList = this.stocks.filter((e) => 
        {
          return e.toUpperCase().indexOf(this.searchStocksText.toUpperCase()) > -1
        }
      )
    },
    async addToWatchlist(val)
    {
      await this.$store.dispatch('addWatchlistStock',val)
      if(!this.selectedStock && !this.chartReady)
      {
        await this.$store.dispatch('getStockData',this.watchlist[0])
        this.chartReady = true
      }
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
</style>
