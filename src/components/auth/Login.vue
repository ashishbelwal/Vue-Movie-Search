<template>
  <div class="container">
      <div class="row">
          <div class="col-md-12 center">
              <div class="login">
                <div class="loginInfo">
                    <img src="@/assets/images/magassians-logo.png" alt="">
                    <h1>Movie Search Assignment</h1>
                </div>
                <!-- /.loginInfo -->
                <div class="loginForm">
                    <form  @submit.prevent>
                        <h3>Sign In</h3>
                        
                        <div class="form-group">
                            <input type="email"  
                            v-model="input.email" 
                            class="form-control form-control-lg loginInput" 
                            placeholder="Enter email Id" 
                            @input="closeError()"
                            />
                        </div>

                        <div class="form-group">
                            <input type="password" 
                            v-model="input.password" 
                            class="form-control form-control-lg passwordInput" 
                            placeholder="Enter Password" 
                            @input="closeError()"
                            />
                        </div>

                        <button 
                        type="submit" 
                        class="btn"  
                        v-on:click="login()">
                        Sign In</button>
                    </form>
                    
                </div>
                <!-- /.loginForm -->
            </div>
            
          </div>
          
      </div>

      <!-- Alert/Error Message -->
            
        <div class="error" v-if="error"> 
            <span v-on:click="closeError()">x</span> 
            {{error}}
        </div>
        <div class="success" v-if="success"> 
            <span v-on:click="closeSuccess()">x</span> 
            {{success}}
        </div>
  </div>
</template>

<script>
import router from '../../router'
import axios from 'axios'
export default {
  name: 'Login',
  
  data() {
        return {
            input: {
                email: "",
                password: ""
            },
            error : "",
            success: ""
        }
    },
    mounted() {
    this.$nextTick(function () {
      if(localStorage.getItem("userId")){
          router.push({ path: '/home' })
      }
    })
  },
  
    
    methods: {
        // close error box 
        closeError(){
            this.error = "";
        },
        // close error success 
        closeSuccess(){
            this.success = "";
        },
        // validate email 
        validateEmail(email) {
            return String(email)
            .toLowerCase()
            .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        },
        // validate email and password
        validate(){
            
            if(this.input.email != "" && this.input.password != "") {
                if(this.validateEmail(this.input.email)){
                    if(this.input.password.length > 5){
                        return true
                    }
                    else{
                    console.log("Password Length is less then 6")
                    this.error = "Password Length must be grater than 6"
                    return false
                }
                }
                else{
                    console.log("Email id is not valid");
                    this.error = "Email id is not valid";
                    return false
                }
            }
            else{
                console.log("Please enter email and password")
                this.error = "User email id or password is missing"
                return false
            }
        },
        // login 
        login() {
            
            if(this.validate()) {
                axios
                    .get('https://jsonplaceholder.typicode.com/users')
                    .then(resp => {
                        resp.data.map((item) => {
                            if(item.email == this.input.email){
                                this.success = "Welcome " + item.name;
                                localStorage.setItem('userId', item.id)
                                router.push({ path: '/home' })
                                
                            }
                            else{
                                this.error = "Sorry! We could not find the user. Try Sincere@april.biz"
                            }
                        })
                    })
                    .catch(err => {
                        this.error = err
                    });
                
            } 
        }
    }
  
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .center{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100vh;
    }
    .login{
        position: relative;
        max-width: 1000px;
        max-height: 540px;
        width:100%;
        height: 100%;
        padding: 25px;
        background-color: #ecf0f3;
        box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
        border-radius: 12px;
        overflow: hidden;
        display: flex;
        justify-content: space-evenly;
        align-items:center;
    }
    .loginInfo{
        display: flex;
        justify-content: center;
        align-items:center;
        flex-direction: column;
        width: 50%;
    }
    .loginForm{
        display: flex;
        justify-content: center;
        align-items:center;
        flex-direction: column;
        width: 50%;
    }
    .loginInfo h1{
        font-weight: 600;
        font-size: 28px;
        text-transform: uppercase;
    }
    .loginInfo img{
        max-width: 150px;
        width: 100%;
        margin-bottom: 40px;
    }
    .loginForm h3{
        font-weight: 600;
        margin-bottom: 60px;
    }
    input{
        width: 280px;
        height: 40px;
        margin: 4px 0;
        padding-left: 25px;
        font-size: 13px;
        letter-spacing: 0.15px;
        border: none;
        outline: none;
        font-family: "Montserrat", sans-serif;
        background-color: #ecf0f3;
        transition: 0.25s ease;
        border-radius: 8px;
        box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
        transition: 0.3s;
    }
    input:hover, input:focus{
        background-color: #ecf0f3;
        box-shadow: 2px 2px 4px #d1d9e6, -2px -2px 4px #f9f9f9;
        outline: none;
    }
    .loginInput{
        margin-bottom: 30px;
    }
    button{
        width: 180px;
        height: 50px;
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
        box-shadow: 2px 2px 4px #d1d9e6, -2px -2px 4px #f9f9f9;
    }
    button:hover, button:focus{
        background-color: #2c3e50;
        box-shadow: 2px 2px 4px #d1d9e6, -2px -2px 4px #f9f9f9;
        outline: none;
        color: #ecf0f3
        
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
    @media screen and (max-width: 768px){
        .login{
            flex-direction: column;
        }
        .loginInfo img{
            width: 100px;
            margin: 30px
        }
        .loginForm h3{
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .loginInput{
            margin-bottom: 20px;
        }
        button{
            margin-top: 20px;
        }


    }
    @media screen and (max-width: 550px){
        .loginInfo img{
            width: 80px;
            margin: 30px;
            margin-bottom: 20px; 
        }
        .loginInfo h1{
            font-size: 16px;
        }
        .loginForm h3{
            margin-top: 0px;
            margin-bottom: 30px;
        }
    }
</style>
