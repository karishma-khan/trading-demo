<template>
    <div :style="ltp>50 ? 'color:green' : 'color:red'">
            {{ ltp }}
    </div>
</template>
<script>
import { connectWebSocket, disconnectWebSocket } from '~/plugins/websocket';
export default {
    props:{ 
        stockName: {
            type: String,
            required: true
        }
    },
    data()
    {
        return{
            ltp:99
        }
    },
    mounted()
    {
        if(this.stockName)
      connectWebSocket(this.stockName, this.updateLtp)
    },
    methods:{
        updateLtp(ltp){
            this.ltp = ltp.ltp
        }
    }
}
</script>