export const state = () => ({
    stocks:[],
    watchList:[],
    stockData:[],
  });

export const mutations = {
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
        }
    },
    async getStockData({commit}, stock){
        try {
            let resp = await this.$axios.get(`http://91.203.134.157:5000/historic-data?symbol=${stock}`)
            commit("set_stock_data",(resp.data))
        } catch (error) {
            console.log(error);
        }
    },
    async addWatchlistStock({commit},payload)
    {
        commit("addWatchlist",payload)
    },

    async removeWatchlistStock({commit}, payload)
    {
        commit("removeWatchlist",payload)
    }
}

export const getters = {
    getStocks: (state) =>  state.stocks,
    getStockData: (state) =>  {console.log("get stock data",state.stockData); return state.stockData;},
    getWatchList: (state) => state.watchList
};