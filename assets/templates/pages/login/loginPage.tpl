<!-- Login form -->
<div class="login-box">
  <div class="login-logo">
    <a target="home"><b>Comunic</b></a>
  </div>
  <div class="login-box-body">

    <!-- Login message -->
    <p class="login-box-msg">Login to your Comunic account.</p>

    <!-- Optionnal messages target -->
    <div id="loginMessagesTarget"></div>

    <form id="loginForm" action="javascript:(function(){})();">
      <div class="form-group has-feedback">
        <input type="email" class="form-control" placeholder="Email" id="usermail" />
        <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
      </div>
      <div class="form-group has-feedback">
        <input type="password" class="form-control" placeholder="Password" id="userpassword" />
        <span class="glyphicon glyphicon-lock form-control-feedback"></span>
      </div>
      <div class="row">
        <div class="col-xs-8">
          <div class="checkbox icheck">
            <label>
              <input type="checkbox" id="rememberLogin" /> Remember Me
            </label>
          </div>
        </div>
        <!-- /.col -->
        <div class="col-xs-4">
          <button type="submit" class="btn btn-primary btn-block btn-flat btn-login">Sign In</button>
        </div>
        <!-- /.col -->
      </div>
    </form>
  </div>
  <!-- /.login-box-body -->
</div>
