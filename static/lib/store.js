document.write('<scr' + 'ipt type="text/javascript" src="'+'../lib/vue.js'+'"></scr' + 'ipt>');
document.write('<scr' + 'ipt type="text/javascript" src="'+'https://unpkg.com/vuex.js'+'"></scr' + 'ipt>');
Vue.use(Vuex);
const store = new Vuex.Store({
    // 定义状态
    state: {
      author: 'db',
      wt:{
        name:"bigbo"
      }
    },
    mutations:{
        newAuthor(state,msg){
            state.author = msg
        }
    },
    actions:{

    }
  })
  
  export default store