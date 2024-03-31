<template>
    <div>
        <div ref="chart"></div>
    </div>
  </template>
  
<script>
import {mapGetters} from "vuex";
export default {
props:['stock'],
data()
{
    return{
        data:null,
        processedData:[]
    }
},
computed:{
    ...mapGetters({
        stockData:"getStockData",
    })
},
methods:{
    processData(){
        if(this.stockData.timestamp)
        {
            for(let i = 0 ; i < this.stockData.timestamp.length ; i++ )
            {
                let temp = []
                temp.push(i);
                temp.push(this.stockData.open[i]);
                temp.push(this.stockData.high[i]);
                temp.push(this.stockData.low[i]);
                temp.push(this.stockData.close[i]);
                this.processedData.push(temp)
            }
        }
    },
    configureChart(){
        Highcharts.stockChart(this.$refs.chart, {
        chart: {
            backgroundColor: 'black' // Set background color to black
        },
        rangeSelector: {
            enabled: false 
        },
        navigator: {
            enabled: false 
        },
        scrollbar: {
            enabled: false
        },
        exporting: {
            enabled: false 
        },
        title: {
            text: `${this.stock} Candlestick Chart`,
            style: {
            color: 'white'
            }
        },
        series: [{
            color: 'green',
            lineColor: 'grey',
            type: 'candlestick',
            name: 'Stock Price',
            data: this.processedData
        }]
    });
    }
},
async updated(){
    await this.processData()
    this.configureChart()
},

async mounted() {
    await this.processData()
    this.configureChart()
}
};
</script>

<style scoped>
/* Add styles if needed */
</style>
  