<template>
    <div>
        <div id="container"></div>
    </div>
  </template>
  
<script>
import {mapGetters} from "vuex";
export default {
props:['dataToPlot'],
data()
{
    return{
        data:null,
        processedData:[]
    }
},
computed:{
    ...mapGetters({
        stockData:"getAbsolutePerformance",
    })
},
methods:{
    configureChart(){
        // console.log('data perf',this.dataToPlot);
        Highcharts.chart('container', {
            chart: {
                backgroundColor: 'black' // Set background color to black
            },
            title: {
                text: 'Absolute Performance' // Add title text here
            },
            yAxis: {
                title: {
                    text: 'Number of Employees'
                }
            },

            xAxis: {
                visible: false // Set xAxis visibility to false
            },


        exporting: {
            enabled: false 
        },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: false
                    },
                }
            },

            series: [{
                data: this.stockData,
                showInLegend: false,
                color: '#00DC82'
            },],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

            });
    }
},
async mounted() {
    this.configureChart()
    // console.log('all good?',this.stockData);
}
};
</script>

<style scoped>
/* Add styles if needed */
</style>
  