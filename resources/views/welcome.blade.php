<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>chat app</title>
</head>
<style>
    * {
        margin: 0;
        padding: 0;
        border-radius: 20px;
    }

    body {
        background: #e9eaea;
        font-family: roboto;
        user-select: none;
    }

    .container {
        width: 450px;
        margin: 30px auto;
        position: relative;
        overflow: hidden;
        height: 460px;
        /* Account for tabs and forms */
    }

    .signup-login-wrapper {
        width: 900px;
        /* Double the container width for horizontal sliding */
        position: relative;
        display: flex;
        transition: transform 0.3s ease-in-out;
    }

    .signup-form,
    .login-form {
        width: 450px;
        border-radius: 0;
        /* Match the container width */
        padding: 40px;
        box-sizing: border-box;
        height: 400px;
        background: #fff;
        flex-shrink: 0;
    }

    .tabs {
        display: flex;
        height: 60px;
    }

    .signup,
    .login {
        width: 50%;
        border-radius: 0;
        background: #fff;
        text-align: center;
        line-height: 60px;
        cursor: pointer;
        text-transform: uppercase;
    }

    input {
        width: 100%;
        padding: 20px;
        box-sizing: border-box;
        margin-bottom: 25px;
        border: 2px solid #e9eaea;
        color: #3e3e40;
        font-size: 14px;
        outline: none;
        transform: all 0.5s ease;
    }

    input:focus {
        border: 2px solid #34b3a0;
    }

    .btn {
        border: none;
        width: 100%;
        background: #34b3a0;
        height: 60px;
        text-align: center;
        line-height: 60px;
        text-transform: uppercase;
        color: #fff;
        font-weight: bold;
        letter-spacing: 1px;
        cursor: pointer;
        margin-bottom: 30px;
    }

    span a {
        text-decoration: none;
        color: #000;
    }

    ::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        color: #3e3e40;
        font-family: roboto;
    }

    ::-moz-placeholder {
        /* Firefox 19+ */
        color: #3e3e40;
        font-family: roboto;
    }

    :-ms-input-placeholder {
        /* IE 10+ */
        color: #3e3e40;
        font-family: roboto;
    }

    :-moz-placeholder {
        /* Firefox 18- */
        color: #3e3e40;
        font-family: roboto;
    }

    .error {
        margin-top: -20px;
        margin-left: 10px;
        color: red;
        font-size: 12px;
        margin-bottom: 10px;
    }
</style>

<body>
    <div class="container">

        <div class="tabs">
            <div class="signup">Sign Up</div>
            <div class="login">Log In</div>
        </div>

        <div class="signup-login-wrapper">
            <div class="signup-form">
                <form action="{{ route('register') }}" method="POST">
                    @csrf
                    <input type="text" placeholder="Name" name="name" value="{{ old('name') }}"> 
                    @error('name')<p class="error">{{ $message }}</p>@enderror
                    <input type="email" placeholder="Email" name="email" value="{{ old('email') }}">
                    @error('email')<p class="error">{{ $message }}</p>@enderror
                    <input type="password" placeholder="Password" name="password" value="{{ old('password') }}">
                    @error('password')<p class="error">{{ $message }}</p>@enderror
                    <button type="submit" class="btn">Sign Up</button>
                </form>
            </div>

            <div class="login-form">
                <form action="{{ route('login') }}" method="POST">
                    @csrf
                    <input type="email" placeholder="Email" name="email" value="{{ old('email') }}">
                    @error('email')<p class="error">{{ $message }}</p>@enderror
                    <input type="password" placeholder="Password" name="password" value="{{ old('password') }}">
                    @error('password')<p class="error">{{ $message }}</p>@enderror
                    <button type="submit" class="btn">Log In</button>
                </form>
            </div>
        </div>

    </div>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js"
        integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script>
        $(".login-form").css("left", "450px"); // Position login-form off-screen to the right

        $(".login").click(function() {
            $(".signup-login-wrapper").animate({
                left: "-450px"
            }, 300); // Slide left to show login-form
            $(".signup").animate({
                backgroundColor: "#e9eaea"
            }, 300); // Dim inactive tab
            $(".login").animate({
                backgroundColor: "#fff"
            }, 300); // Highlight active tab
        });

        $(".signup").click(function() {
            $(".signup-login-wrapper").animate({
                left: "0px"
            }, 300); // Slide right to show signup-form
            $(".login").animate({
                backgroundColor: "#e9eaea"
            }, 300); // Dim inactive tab
            $(".signup").animate({
                backgroundColor: "#fff"
            }, 300); // Highlight active tab
        });

        $(".btn").click(function() {
            $(".input").val("");
        });
    </script>
</body>

</html>
