import { useContext, useEffect, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
// import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Swal from 'sweetalert2';
import { AuthContext } from '../AuthProvider/AuthProvider';
import SocialLogin from '../SocialLogin/SocialLogin';
// import SocialLogin from '../../SocialLogin/SocialLogin';


const Login = () => {
  const {signIn} = useContext(AuthContext);
  const navigate = useNavigate();
  const  location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const [disable, setDisable] = useState(true);
    const handleLogin = event =>{
      console.log('hello')
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const  value = {email, password};
        console.log(value);

        signIn(email,password)
        .then(result =>{
          const user = result.user;
          console.log(user); 
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Login success",
            showConfirmButton: false,
            timer: 1100
          });
          navigate(from, {replace: true});

        })
        .catch(error =>{
          console.error(error)
          Swal.fire({
            position: "top-center",
            icon: "error",
            title: "Invalid user and password",
            showConfirmButton: false,
            timer: 1100
          });
          
        })
    }
    useEffect(()=>{
        loadCaptchaEnginge(6); 
    },[])

    const handleValidateCaptcha = (e) => {
      const user_captcha_value = e.target.value;
      if(validateCaptcha(user_captcha_value)){
        setDisable(false);
      }
      else{
        setDisable(true)
      }
    }

    return (
      <div className=''>

          <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
          </div>
          <div className="card  md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" name="password" className="input input-bordered" required />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                <LoadCanvasTemplate />
                </label>
                <input onBlur={handleValidateCaptcha}  type="text" placeholder="type the text above" name="captcha" className="input input-bordered" required />
                <p  className='btn btn-outline btn-xs mt-2'>Validate</p>
               
              </div>
              <div className="form-control mt-6">

                <input disabled={disable} className="btn btn-primary" type="submit" value='Login' />
              </div>
            </form>
            <div><SocialLogin></SocialLogin></div>
            <p to='/signUp' className='pl-8 pb-5  '>You do not have an account Please <Link to='/register' className='text-blue-600 hover:underline'>Register</Link></p>
          </div>
        </div>
      </div>
      </div>
    );
};

export default Login;