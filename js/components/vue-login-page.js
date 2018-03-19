
Vue.component('app-login',{
  template: `
          <div class="row" style="margin-top: 20px;" id="fb-button">
            <div class="col-md-4 offset-md-4">
    <div class="fb-login-button" data-max-rows="1" data-size="large"  data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" onlogin="checkLoginState()"data-use-continue-as="false"></div>
            </div>
          </div>
  `,
  data : function(){
    return {
    }
  },
  methods: {
  }

})
