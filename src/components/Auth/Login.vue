<template>
  <div>
    <v-app>
      <div style="width:100%; height:100%">
        <img class="bgimg-1" src="../img/login-bg-new.png" 
            style="
              opacity: 1.0;
              background-position: center;
              background-repeat: no-repeat;
              object-fit: cover;
          ">
      
        <div class="quote">
            "MANAGEMENT IS DOING THINGS RIGHT,<br>
            BUT LEADERSHIP IS DOING RIGHT THINGS"
        </div>

        </div>

        <div class="login-form" style="margin-left:60%; width:320px;">
          <span class="image1"><img src="../img/eboard.png" style="width:40%; height:20%; margin-left:5%;"></span>
          <span class="image2"><img src="../img/stl.png" style="width:40%; height: 20%; margin-left:10%"></span>

        <h4>Login to your account: </h4>
        <hr>
          <form class="login" @submit.prevent="login">
            <p style="text-align:center; color:red; font-weight:bold;">{{ error }}</p>
              <div v-if="passExpiry == 1" @click="expiredDiv = !expiredDiv" class="form-group">
                <v-btn class="">Click to recover password.</v-btn>
              </div>
              <div class="form-group">
                  <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-paper-plane"></i></span>
                      <input type="text" class="form-control" name="userName" id="userName" placeholder="Username" v-model="input.userName" />
                  </div>
              </div>
              <div class="form-group">
                  <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                      <input type="password" class="form-control" name="userPassword" id="userPassword" placeholder="Password" v-model="input.userPassword" />
                  </div>
              </div>
              <div class="form-group">
                  <div class="input-group">
                      <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                      <input class="form-control" name="companyCode" id="companyCode" placeholder="Company Code" v-model="input.companyCode" />
                  </div>
              </div>    
              <div class="form-group">
                  <!-- <button type="submit" class="btn btn-danger" style="color:#fff; margin-bottom:15px;" v-on:click="sendData()">Log In</button> -->
                  <button type="submit" class="btn btn-danger" style="color:#fff; margin-bottom:10px;">Log In</button>
              </div>    
              <div class="forgot" v-on:click="pword = !pword" style="cursor:pointer;" onMouseOver="this.style.color='#000'" onMouseOut="this.style.color='red'">
                  <p>Forgot Password?</p>
              </div>
          </form>
        </div>

        <div class="forgot-password" v-if="pword" style="width:300px; margin-left:37%; height:auto; top:36%; background-color:#f5f5f5; position:absolute; padding:1.5%;">
          <h4>Forgot Password?</h4>
          <p v-if="forgotSuccess == 1" style="font-weight:bold; color:green;">{{ message }}</p>
          <p v-else style="font-weight:bold; color:red;">{{ message }}</p>
          <form @submit.prevent="forgetPassword">
            <div class="form-group">
              <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-paper-plane"></i></span>
                  <input type="text" class="form-control" name="uname" id="uname" placeholder="Username or Email" v-model="uname" />
              </div>  
            </div>
            <div class="form-group">
              <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                  <input class="form-control" name="compCode" id="compCode" placeholder="Company Code" v-model="compCode" />
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-danger" @click="pword = !pword; clear();" style="float:left;">Cancel</button>
              <button type="submit" class="btn btn-danger" style="float:right;">Submit</button>
            </div>
          </form>
        </div>

        <div class="expired-password" v-if="expiredDiv" style="width:300px; margin-left:37%; height:auto; top:36%; background-color:#f5f5f5; position:absolute; padding:1.5%;">
          <h4>Expired Password?</h4>
          <p v-if="expiredSuccess == 1" style="font-weight:bold; color:green;">{{ expiredMessage }}</p>
          <p v-else style="font-weight:bold; color:red;">{{ expiredMessage }}</p>
          <form @submit.prevent="expiredPassword">
            <div class="form-group">
              <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                  <input type="password" class="form-control" name="oldPass" id="oldPass" placeholder="Old Password" v-model="oldPass" />                 
              </div>  
            </div>
            <div class="form-group">
              <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                  <input type="password" class="form-control" name="newPass" id="newPass" placeholder="New Password" v-model="newPass" />                 
              </div>  
            </div>
            <div class="form-group">
              <div class="input-group">
                  <span class="input-group-addon"><i class="fa fa-lock"></i></span>
                  <input type="password" class="form-control" name="confirmPass" id="confirmPass" placeholder="Confirm Password" v-model="confirmPass" />
              </div>
            </div>
            <div class="form-group">
              <button class="btn btn-danger" @click="expiredDiv = !expiredDiv; clearExpired();" style="float:left;">Cancel</button>
              <button class="btn btn-danger" type="submit" style="float:right;">Submit</button>
            </div>
          </form>
        </div>
    </v-app>
  </div>
</template>


<script>
import axios from 'axios';
import UserData from '../repository/UserData';

  export default {
    name: 'Login',

    data(){
      return {
        ip: "",
        input:{
          companyCode: "",
          userName : "",
          userPassword : "",
        },
        uname: "",
        compCode: "",
        message: "",
        error: "", 
        passExpiry: "",
        oldPass: "",
        newPass: "",
        confirmPass: "",
        expiredMessage: "",
        cCode: "",
        forgotSuccess: "",
        expiredSuccess: "",
        pword: false,       
        expiredDiv: false
      }
    },

    mounted(){
       axios({ method: "GET", "url": "https://httpbin.org/ip" })
        .then(result => {
            this.ip = result.data.origin;
        }, error => {
            console.error(error);
        });
      },

    methods: {
      // login: function () {
      //     const formData = new FormData();
      //     formData.append('companyCode', this.input.companyCode);
      //     formData.append('model', "requestUserLogin");
      //     formData.append('mobileVersion', "11.4.1");
      //     formData.append('deviceName', "ipad air 2");
      //     formData.append('deviceToken', "b41dfaf1ba018196d5068a0ecc3bde33f83c94131ecf71d053260b944da14612");
      //     formData.append('userName', this.input.userName);
      //     formData.append('userPassword', this.input.userPassword);
      //     formData.append('eboardVersion', "2.5.7"); 
          
      //     let userName = this.input.userName;
      //     UserData.setUserName(userName);

      //     let userPassword = this.input.userPassword;
      //     UserData.setUserPassword(userPassword);

      //     let companyCode = this.input.companyCode;
      //     UserData.setCompanyCode(companyCode);

      //     this.$store.dispatch('login', {formData})
      //       .then(() => {
      //         this.$router.push("/dashboard");
      //       })
      //       .catch( error => {
      //         console.error(error);
      //     });    
      // },

        login() {
          const formData = new FormData();
          formData.append('companyCode', this.input.companyCode);
          formData.append('model', "requestUserLogin");
          formData.append('mobileVersion', "11.4.1");
          formData.append('deviceName', "ipad air 2");
          formData.append('deviceToken', "b41dfaf1ba018196d5068a0ecc3bde33f83c94131ecf71d053260b944da14612");
          formData.append('userName', this.input.userName);
          formData.append('userPassword', this.input.userPassword);
          formData.append('eboardVersion', "2.5.7"); 
           
          let userName = this.input.userName;
          UserData.setUserName(userName);

          let userPassword = this.input.userPassword;
          UserData.setUserPassword(userPassword);

          let companyCode = this.input.companyCode;
          UserData.setCompanyCode(companyCode);

          axios.post(UserData.getBaseUrl(), formData)
            .then(result => {
              this.response = result.data;
              this.passExpiry = this.response.passwordExpiry;
                if(this.response.success == 1){
                  this.$store.commit("setAuthentication", true);
                    let token = this.response.accessToken;
                    UserData.setAccessToken(token); 
                      let userId = this.response.userId;
                      UserData.setUserId(userId);
                        let companyId = this.response.companyDetail.companyId;
                        UserData.setCompanyId(companyId);
                        this.companyDetail = (JSON.parse(JSON.stringify(this.response.companyDetail)));
                        this.companyTitle = this.companyDetail.companyName;
                        UserData.setCompanyName(this.companyTitle);
                          this.$router.replace({ name: "dashboard" });
                          this.$router.push("/dashboard");  
                }
                else{
                  this.error = this.response.message;
                }
          }, error => {
              console.error(error);
          });    
      },

      // login(){
      //     if(this.input.userName != "" && this.input.userPassword != "" && this.input.companyCode != " "){
      //     axios.get("../assets/json-APIs/requestUserLogin.json", this.input)
         
      //     .then(response => {
      //         console.log(this.input.userName),
      //         console.log(this.input.userPassword),
      //         console.log(this.input.companyCode),
      //         console.log(response);
      //     })
      //     .catch(error => {
      //         console.log(error);
      //         }) 


      //    }
      //     else{
      //       this.error = "Fill in all credentials";
      //       console.log("Fill in all credentials");
      //     }
      //   },

        clear(){
          this.compCode = "";
          this.uname = "";
          // this.message = "";
        },

        forgetPassword(){
          const formData = new FormData;
          formData.append('model', 'forgetPassword');
          formData.append('userName', this.uname);
          formData.append('companyCode', this.compCode);

          axios.post(UserData.getBaseUrl(), formData)
            .then(response => {
              this.forgetPasswordArr = response.data;
              this.message = this.forgetPasswordArr.message;
              this.forgotSuccess = this.forgetPasswordArr.success;
              this.clear();
            })
        },

        clearExpired(){
          this.oldPass = '';
          this.newPass = '';
          this.confirmPass = '';
        },

        expiredPassword(){
          const formData = new FormData;
          formData.append('oldPassword', this.oldPass);
          formData.append('newPassword', this.newPass);
          formData.append('confirmPassword', this.confirmPass);
          formData.append('companyCode', UserData.getCompanyCode());
          // formData.append('companyCode', "viz");
          formData.append('userName', UserData.getUserName());
          formData.append('model', 'changePassword');
          formData.append('passwordExpiry', 0);

          axios.post(UserData.getBaseUrl(), formData)
            .then(response => {
              this.expiredPasswordArr = response.data;
              this.expiredMessage = this.expiredPasswordArr.message;
              this.expiredSuccess = this.expiredPasswordArr.success;
              this.clearExpired();
            })
        },

        reloadPage(){
          window.location.reload();
        }, 
      },             
    }
</script>

<style scoped>
  .success-message {
    color: green;
  }

  body, html {
    height: 100%;
    margin: 0;
    font: 400 15px/1.8 "Lato", sans-serif;
    color: #777;
    position: relative;
  }

  .caption {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    text-align: center;
    color: #000;
  }

  .quote {
    position: absolute;
    left: 0;
    top: 34%;
    width: 50%;
    color: #fff;
    margin-left: 11%;
    margin-right:2%;
    font-size:28px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .footer-text{
    position: absolute;
    left:63%;
    top: 75%;
    width: auto;
    color: #fff;
    margin-left: 3%;
    font-size:15px;
    font-family: Arial, Helvetica, sans-serif;
    letter-spacing: 2px;
  }
  
  .caption span.border {
    background-color: #111;
    color: #fff;
    padding: 18px;
    font-size: 25px;
    letter-spacing: 10px;
  }
  
  h3 {
    letter-spacing: 5px;
    text-transform: uppercase;
    font: 20px "Lato", sans-serif;
    color: #111;
  }

 .login-form{
    position: absolute;
    height:auto;
    background: #f5f5f5;
    border-radius: 5px;
    top:29%;
  }

  .login-form h4{
    text-align: center;
  }

  .login-form .form-group{
    width:80%;
    margin-left:10%;
    margin-top:7%;
  }

   .login-form .form-group .btn{
    float: right;
    width: 100%;
  }

  .login-form .fa-paper-plane {
    width:18px;
  }

  .login-form .fa-lock{
    width: 18px;
  }

  .login-form .forgot{
    float: right;
    color: red;
    margin-right:30%;
    margin-top: 3%;
    margin-bottom: 2%;
    text-align: center;
  }

  .input-group-addon {
    background: #CACFD2;
    width: 25px;
    padding-top: 4px;
    text-align: center;
    border-top-left-radius: 7px;
    border-bottom-left-radius: 7px;
  }
 
</style>