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
  <style scoped>
  .mybtn{
    border: 1px solid #00DC82;
  }

  .mybtn:disabled{
    border: 1px solid #F3F3F4;
    color: #F3F3F4;
  }
  .v-dialog__content.v-dialog__content--active{
    padding-top: 10%;
  }
  .v-text-field fieldset,
  .v-text-field .v-input__control,
  .v-text-field .v-input__slot {
    /* border-radius: 10px !important; */
    font-weight: 400;
  }
  
  .v-dialog__content {
    align-items: initial;
    height: initial;
    max-height: 100%;
  }
  
  .v-dialog {
    margin: 200px !important;
  }
  
  .link {
    /* border-bottom: 2px solid #767676; */
  }
  
  .v-text-field {
    padding-top: 0px;
    margin-top: 0px;
    font-weight: 200 !important;
    cursor: pointer;
  }
  
  
  .icon {
    float: right; 
    color: lightgrey;
  }
  
  .icon:hover {
    color: rgb(86, 86, 86);
  }
  
  .share_head{
    color: rgba(0, 0, 0, 0.80);
    text-align: center;
    font-family: Nunito Sans;
    font-size: 24px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.036px;
  }
  .copy_link{
    color: rgba(0, 0, 0, 0.70);
    font-family: Nunito Sans;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.02px;
  }
  .social_icon{
    height: 52px;
    width: 52px;
  }
  .copy_box{
    width: 70%;
    margin: auto;
  }
  .link{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .link_box{
    border-radius: 4px;
    background: #F3F3F4; 
    height: 56px;
    align-items: center;
  }
  
  @media screen and (max-width: 540px) {
    .copy_box{
    width: 95%;
    margin: auto;
  }
  }
  </style>