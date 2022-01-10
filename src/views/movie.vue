<template>
  <div class="movieIndex">
    <div class="container">
      <div class="row">
        <button class="logout" v-on:click="logout()">Logout</button>
        <img src="@/assets/images/magassians-logo.png" alt="" class="bgImg">
        <div class="welcome noData moviePage">
           <div class="imgMovie">
               <img v-bind:src="movieDetails.Poster" alt="">
                
           </div>
           <div class="movieDetails">
              <h1>{{ movieDetails.Title }}  </h1>
              <h4>Directed By : {{ movieDetails.Director }}</h4>
              <h4>Written By : {{ movieDetails.Writer }}</h4>
              <h4> Stars : {{ movieDetails.Actors }} </h4> 
              <p>{{ movieDetails.Plot }}</p>
           </div>

        </div>
         <!-- Alert/Error Message -->
        <div class="error" v-if="error"> 
            <span v-on:click="closeError()">x</span> 
            {{error}}
        </div>
      </div>
      <!-- /.row -->
    </div>
    <!-- /.container -->
  </div>
</template>

<script>
import router from '../router';
import axios from 'axios'
export default {
  name: 'Movie',
  props: ['id'],
  components: {
    
  },
  data(){
    return{
      username : "",
      movieDetails: {},
      error:""
      
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
      const key = process.env.VUE_APP_OMDB_API_KEY;
      console.log(key)
      axios.request(
        {
          method: 'GET',
          url: 'http://www.omdbapi.com/?',
          params: {apikey: key, i:  this.$route.params.id},
          
        }
      )
      .then( (response) => {
        this.movieDetails = response.data
      })
      .catch(err => {
          this.error = err
      });
    })
  },
  
  methods: {
    // close error box
    closeError(){
        this.error = "";
    },
    // close success box 
    closeSuccess(){
        this.success = "";
    },
    // logout 
    logout(){
      localStorage.removeItem("userId")
      router.push({ path: '/' })
    }

  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .moviePage{
    display: flex;
    justify-content: center;
    padding: 70px!important;
  }
  .error{
    position: absolute;
    bottom: 8vh;
    color: red;
    background: #fff;
    margin: 0 auto;
    left: 50%;
    transform: translate(-50%);
    padding: 25px 70px;
    background-color: #ecf0f3;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    border-radius: 12px;
  }
  .success{
    position: absolute;
    bottom: 8vh;
    color: green;
    background: #fff;
    margin: 0 auto;
    left: 50%;
    transform: translate(-50%);
    padding: 25px 70px;
    background-color: #ecf0f3;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    border-radius: 12px;
  }
  .error span, .success span{
    position: absolute;
    right: -11px;
    top: -12px;
    background: #000;
    padding: 1px 9px;
    color: #fff;
    border-radius: 50%;
    font-weight: 700;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    cursor: pointer;
  }
  .noData{
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    max-width: 70%;
    /* margin: 0 auto; */
    padding: 126px;
    border-radius: 18px;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
 .row{
    background: #ecf0f3;
  }
  .bgImg{
    opacity: 0.1;
    position: absolute;
    z-index: 0;
    filter: grayscale(1) invert(1);
    width: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  .moviePage .imgMovie{
      width: 40%;
  }
  .moviePage .movieDetails{
      width: 60%;
      padding-left: 50px;
  }
  .moviePage img{
      /* width: 100%; */
      margin-bottom: 20px;
  }
  .movieIndex{
    background-color: #ecf0f3;
    color: #181818;
    width: 100%;
    height: 100vh;
    display: flex;
    text-align: left;
      
  }
  .movieIndex h1{
    font-size: 40px;
    font-weight: 600!important;
  }
  .movieIndex h4{
      font-size: 16px;
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
  @media screen and (max-width: 991px){
    .moviePage[data-v-22cccd86] {
      display: flex;
      justify-content: center;
      padding: 20px!important;
      flex-direction: column;
      box-shadow: none!important;
    }
    .noData{
      position: relative;
      transform: none;
      left: 0;
      width: 100%;
      max-width: 87%;
    }
    .moviePage .imgMovie[data-v-22cccd86] {
      width: 100%;
      margin-top: 70px;
    }
    .moviePage .movieDetails[data-v-22cccd86] {
      width: 100%;
      padding-left: 0px;
    }

    .movieIndex h1[data-v-22cccd86] {
      font-size: 40px;
      font-weight: 600!important;
      margin: 0;
    }
    .logout{
      right: 20px;
      top: -10px;
    }

  }
</style>
