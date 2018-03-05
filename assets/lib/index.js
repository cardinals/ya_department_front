$("#header_box").load("../pages/header_box.html #header_box");
//axios默认设置cookie
axios.defaults.withCredentials = true;	
new Vue({
    el: '#app',
    data: function () {
        return {
        }
    },
    methods: {

    },

})