<template>
<div class="container">
      <div class="row">
        <div class="index">
          <button class="logout" v-on:click="logout()">Logout</button>
          <div class="welcome" >
              <h1>Welcome <br> <span>{{username}}</span>  </h1>
              <p>What movie would you like to watch!</p>
          </div>
          <Search style="z-index: 2; background: #ecf0f3;"/>
        </div>
        
      </div>
    </div>
  
</template>

<script>
import router from '../router';
import axios from 'axios'
import Search from '../components/search.vue'
export default {
  name: 'Index',
  components: {
    Search
    
  },
  data(){
    return{
      username : "",
      
    }
  },
  mounted() {
    this.$nextTick(function () {
      if(localStorage.getItem("userId")){
         let id = localStorage.getItem("userId");
        let url = 'https://jsonplaceholder.typicode.com/users/' + id;
        axios
        .get(url)
        .then(resp => {
          this.username = resp.data.name;
        })
      }
      else{
         router.push({ path: '/' })
      }
      
    })
  },
  
  methods: {
    logout(){
      localStorage.removeItem("userId")
      localStorage.removeItem("recentSearch")
      router.push({ path: '/' })
    },
    goToMovie() {
      console.log("go to movies")
      router.push('/movie')
    },

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.index{
  background-color: #ecf0f3;
    color: #181818;
    width: 100%;
    height: 100vh;
    display: flex;
    padding-top: 100px;
    flex-direction: column;
    
}

.index .bgImg{
  opacity: 0.1;
    position: absolute;
    z-index: 0;
    filter: grayscale(1) invert(1);
    width: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
.index h1{
  font-weight: 300;
  font-size: 30px;
  margin-bottom: 10px;
}
.index h1 span{
  font-weight: 600;
  font-size: 70px;
}
.logout{
  position: absolute;
  top: -40px;
  right: 14px;
  width: 104px;
  height: 40px;
  border-radius: 25px;
  margin-top: 50px;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 1.15px;
  background-color: #ecf0f3;
  color: #2c3e50;
  box-shadow: 8px 8px 16px #d1d9e6, -8px -8px 16px #f9f9f9;
  border: none;
  outline: none;
}
button:hover, button:focus{
    background-color: #2c3e50;
    box-shadow: 2px 2px 4px #d1d9e6, -2px -2px 4px #f9f9f9;
    outline: none;
    color: #ecf0f3
    
}
@media screen and (max-width: 768px){
  .logout{
    right: 20px;
    top: -10px;
  }
  .index h1{
    font-weight: 300;
    font-size: 30px;
    margin-bottom: 10px;
    margin-top: 0;
  }
  .index h1 span {
    font-weight: 500;
    font-size: 40px;
}
}
</style>
