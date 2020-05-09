<template>
    <div>
        暂不支持此功能
    </div>
</template>


<script>
export default {
    data() {
        return {
            orderid: ''
        }
    },


    created() {
        this.getparam(),
        this.insertorder()
    },

    methods: {
        getparam() {
            let hour = new Date().getHours();
            let min = new Date().getMinutes();
            let second = new Date().getSeconds();
            let time = hour.toString() + min.toString() + second.toString() + JSON.parse(localStorage.getItem("user"));
            this.orderid = time;
            console.log(this.orderid);
            
        },
        insertorder() {
            this.axios.get(this.$Api.insertorder + JSON.stringify(this.$route.query.orders) + "&id=" + JSON.parse(localStorage.getItem("user")) + "&price=" + this.$route.query.price + "&devcost=" + this.$route.query.devcost + "&orderid=" + this.orderid);
            this.$store.commit("clearshopcart", this.$route.query.shopid);
        }
    },
}
</script>


<style lang="scss" scoped>

</style>