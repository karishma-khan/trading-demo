<template>
    <div ref="modalContainer" class="py-10 md:py-0 absolute top-[50vh] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-[690px] h-auto rounded bg-[#282e34] text-center font-nunito text-white">
        <div class="text-right p-2">
            <i @click="$emit('close')" class="fa-solid fa-xmark cursor-pointer"></i>
        </div>
        <h2 class="text-[#00DC82] text-2xl">
            {{ buy ? 'Buy' : 'Sell' }} Stock
        </h2>
        <div class="p-4 text-left">
            <div class="flex py-3">
                <div class="grow w-1/2">Stock Name</div>
                <div class="grow w-1/2">
                    {{ stock }}
                </div>
            </div>
            <div class="flex py-3">
                <div class="grow w-1/2">Total Quantity</div>
                <div class="grow w-1/2">
                    <input type="number" name="" v-model="quan" id="" min="1"></input>
                </div>
            </div>
            <div class="flex py-3">
                <div class="grow w-1/2">Buy / Sell</div>
                <div class="grow w-1/2">
                    <i @click="buy = !buy" class="fa-solid text-3xl" :class="buy ? 'fa-toggle-on text-[#00DC82]' : 'fa-toggle-off text-red'"></i>
                </div>
            </div>
        </div>
        <div :class="validate()?'invisible':'visible'" style="color: red;"> Quantity can't be less than 1 </div>
        <button :disabled="!validate()" class="mybtn my-2 rounded-md px-2.5 py-1.5 text-sm font-semibold text-[#00DC82] shadow-sm" @click="execute()">Execute Trade</button>
    </div>
  </template>
  <script>
  // import share from "@/data/share.json"
  export default {
    data() {
    return {
      open:0,
      quan:1,
      buy:true,
    }
    },
    props: [
      'stock'
    ],
    mounted() {
      document.addEventListener('click', this.handleOutsideClick);
    },
    methods: {
        validate(){
            console.log('validating');
            return this.quan && this.quan >= 1 
        },
        execute(){
            this.$emit("close");
            this.$toasted.show(`${this.buy ? 'Buy' :'Sell'} request of ${this.quan} stocks successful !!`, {
                duration: 2000 
            })
        },
        async handleOutsideClick(event) {
            if (this.open > 0) {
                console.log('in 1');
                const modalContainer = await this.$refs.modalContainer;
                    // await console.log('clicked',event.target,modalContainer,modalContainer.contains(event.target),this.open);
                    if (!modalContainer?.contains(event?.target)) {
                        console.log('in 2 ');
                        this.$emit("close");
                    }
            }
            this.open++;
        },
    },
  }
  </script>