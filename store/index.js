export const state = () => ({
    stocks:[],
    watchList:[],
    stockData:[],
    performance:null,
    netPnl:null,
    monthlyPerformance:null,
    absPerformance:[],
    percentagePerformance:[],
    error:''
  });

export const mutations = {
    set_error(state,value){
        state.error = value
    },
    set_stocks(state, value) {
        state.stocks = value.symbols;
    },
    set_stock_data(state, value) {
        state.stockData = value;
    },
    addWatchlist(state, value) {
        if(state.watchList.filter(e => e == value).length == 0)
        state.watchList.push(value)
    },
    removeWatchlist(state, value){
        state.watchList = state.watchList.filter((e) => e != value)
    },
    set_performance(state, value){
        let month ={}
        let pnl = 0
        let abs = []
        for(let i =0; i< value?.timestamp.length;i++)
            {
                let currMonth = new Date(value?.timestamp[i])
                currMonth = currMonth.getMonth()
                pnl += value?.pnl[i]
                console.log('uff',value?.pnl[i]);
                abs.push(value?.pnl[i])
                if(!(currMonth in month))
                    month[currMonth] = 0
                month[currMonth] = month[currMonth] + value?.pnl[i]
                // console.log(performanceData.pnl[i],month[currMonth],parseInt(month[currMonth])+parseInt(performanceData.pnl[i]));
            }
            console.log(month);
            console.log('frpm muta',abs);
        state.performance = value
        state.monthlyPerformance = month
        state.absPerformance = abs
        state.netPnl = pnl
    },
    set_percentage_performace(state)
    {
        let per = []
        for(let i =0; i< state.performance?.timestamp.length;i++)
        {
            per.push((state.performance?.pnl[i] / state.netPnl) * 100)
        }
        state.percentagePerformance = per
    }
};

export const actions = {
    async generate_stocks({commit})
    {
        try {
            let resp = await this.$axios.get('http://91.203.134.157:5000/symbol-master')
            commit("set_stocks",(resp.data))
        } catch (error) {
            console.log(error);
            commit("set_error",error)
        }
    },
    async getStockData({commit}, stock){
        try {
            let resp = await this.$axios.get(`http://91.203.134.157:5000/historic-data?symbol=${stock}`)
            commit("set_stock_data",(resp.data))
        } catch (error) {
            console.log(error);
            commit("set_error",error)
        }
    },
    async addWatchlistStock({commit},payload)
    {
        commit("addWatchlist",payload)
    },

    async removeWatchlistStock({commit}, payload)
    {
        commit("removeWatchlist",payload)
    },

    async getPerformance({commit}, payload){
        try {
            let resp = await this.$axios.get(`http://91.203.134.157:5000/performance`)
            await commit("set_performance",(resp.data))
            commit("set_percentage_performace")
        } catch (error) {
            console.log(error);
            commit("set_error",error)
        }
    }
}

export const getters = {
    getStocks: (state) =>  state.stocks,
    getStockData: (state) =>  {console.log("get stock data",state.stockData); return state.stockData;},
    getWatchList: (state) => state.watchList,
    getPerformance: (state) => state.performance,
    getMonthlyPerfomance: (state) => state.monthlyPerformance,
    getAbsolutePerformance: (state) => state.absPerformance,
    getNetPnl: (state) => state.netPnl,
    getPercentagePerformance: (state) => state.percentagePerformance,
    getError: (state) => state.error,
};