<template>
  <div class="search">
    <div class="searchQuery" >
          <!-- search input form-->
          <form role="search"  
          v-on:submit.prevent="submitSearch">
            <input type="text" 
            name="search" 
            id="search" 
            placeholder="Enter movie name..."
            v-model="searchQuery" 
            @keyup="submitSearch"
            >

            <span v-show="searchQuery" 
            class="removeInput" 
            @click="removeSearchQuery">x</span>

          </form>
        </div>
        <!-- search dropdown -->
        <div class="searchOptions" v-if="searchResult">
          <ul>
            <li 
            v-for="option in searchResult" 
            :key="option.id"
            v-on:click="addToRecentSearch(option.Title,option.imdbID)"
            >
              {{option.Title}}
            </li>
          </ul>
          <ul>
            <p style="background: #fff;
                      margin-top: 0;
                      padding: 10px;"
              v-if="recentSearch.length > 0">
            Recent Searches</p>
            <li 
            v-for="option in recentSearch" 
            :key="option.id"
            v-on:click = "goToMovie(id)"
            >
              {{option.data}}
            </li>
          </ul>
        </div>
         <!-- Alert/Error Message -->
        <div class="error" v-if="error"> 
            <span v-on:click="closeError()">x</span> 
            {{error}}
        </div>
        
  </div>
</template>

<script>
import axios from 'axios'
import router from '../router';

export default {
  name: 'Search',
  components: {
  },
  data(){
    return{
      searchQuery : "",
      isResult : false,
      searchResult : null,
      recentSearch: [],
      inputFocus: false,
      error: ""
    }
  },
  mounted() {
    this.$nextTick(function () {      
      if(localStorage.getItem("recentSearch")){
         this.recentSearch = JSON.parse(localStorage.getItem("recentSearch"))
      }
    })
  },
  methods: {
    // close error 
     closeError(){
        this.error = "";
    },
    // close success 
    closeSuccess(){
        this.success = "";
    },
    // remove focus from input 
    removeFocus(){
      this.inputFocus = false;
    },
    // navigate to movie detail page 
    goToMovie(id) {
      router.push('/movie/' + id)
    },
    // maintain recent search history 
    addToRecentSearch(item, id){
      let addItem = false;
      let searchObj = {}
      if(this.recentSearch.length > 0){
        for(let i = 0; i<this.recentSearch.length; i++){
          if(this.recentSearch[i].id == item.id){
            addItem = false
            break;
          }
          else{
            addItem = true
          }
        }
      }
      else{
        searchObj.id = id;
        searchObj.data = item
        this.recentSearch.push(searchObj)
        localStorage.setItem("recentSearch",JSON.stringify(this.recentSearch))
        router.push('/movie')
      }
      if(addItem == true){
        searchObj.id = id;
        searchObj.data = item
        this.recentSearch.unshift(searchObj)
        addItem = false
      }
      if(this.recentSearch.length > 5){
        this.recentSearch.length = 5;
        localStorage.setItem("recentSearch",JSON.stringify(this.recentSearch))
        this.goToMovie(id)
      }
      localStorage.setItem("recentSearch",JSON.stringify(this.recentSearch))
        this.goToMovie(id)
    },

    // remove search result
    removeSearchQuery: function() {
      this.searchQuery = '';
      this.isResult = false;
      this.searchResult = null
      this.closeError()
    },
    // generate search result
    submitSearch: function() {
      const key = process.env.VUE_APP_OMDB_API_KEY;
      axios.request(
        {
          method: 'GET',
          url: 'http://www.omdbapi.com/?',
          params: {apikey: key, s:  this.searchQuery},
          
        }
      )
      .then( (response) => {
        this.isResult = true;
        this.searchResult = response.data.Search;
      })
      .catch(err => {
          this.error = err
      });
    }
    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  input{
    max-width: 90%;
    width: 90%;
    height: 80px;
    margin: 4px 0;
    padding-left: 25px;
    font-size: 18px;
    letter-spacing: 0.15px;
    border: none;
    outline: none;
    font-family: "Montserrat", sans-serif;
    background-color: #ecf0f3;
    transition: 0.25s ease;
    border-radius: 8px;
    box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
    margin-top: 40px;
  }
  .searchQuery{
    position: relative;
  }
  .removeInput{
    position: absolute;
    right: 90px;
    top: 65px;
    background: #000;
    padding: 1px 9px;
    color: #fff;
    border-radius: 50%;
    font-weight: 700;
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
    cursor: pointer;
  }

  .searchOptions{
    box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
      max-width: 90%;
      margin: 0 auto;
      border-radius: 18px;
      margin-top: 0;
      padding: 0;
      z-index: 2;
      overflow: scroll;
      max-height: 50vh;
  }
  .searchOptions ul {
    list-style-type: none;
    padding: 16px 0;
    margin: 0;
  }
  .searchOptions ul li{
    padding: 10px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
  }
  .searchOptions ul li:hover{
    background: #ffffff6e;
  }
  .welcome{
    box-shadow: none;
      max-width: 88%;
      margin: 0 auto;
      padding: 12px;
      border-radius: 18px;
    transition: 0.3s;
  }

  .logout{
    position: absolute;
    right: 110px;
    top: 30px;
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
    .searchQuery input{
      margin-top: 20px;
    }
    .removeInput {
      position: absolute;
      right: 30px;
      top: 50px;
      
  }
  }
</style>
