import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useContext } from "react";
import userAxiosPublic from "../Hook/userAxiosPublic";
import SocialLogin from "../SocialLogin/SocialLogin";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const Register = () => {
  const axiosPublic = userAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const formData = new FormData();
    formData.append('image', data.photoURL[0]);

    try {
      const res = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (res.data.success) {
        const imageUrl = res.data.data.display_url;

        createUser(data.email, data.password)
          .then(result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            navigate('/')
            updateUserProfile(data.name, imageUrl)
              .then(() => {
                const userInfo = {
                  name: data.name,
                  email: data.email,
                  password: data.password,
                  photoURL: imageUrl,
                  role: data.role
                };
                axiosPublic.post('/users', userInfo)
                  .then(res => {
                    if (res.data.insertedId) {
                      console.log('user added to the database');
                      reset();
                      Swal.fire({
                        position: "top-center",
                        icon: "success",
                        title: "User created successfully",
                        showConfirmButton: false,
                        timer: 1700
                      });
                      navigate('/');
                    }
                  })
                  .catch(error => {
                    console.error('Error adding user to the database', error);
                  });
              })
              .catch(error => {
                console.error('Error updating user profile', error);
              });
          })
          .catch(error => {
            console.error('Error creating user', error);
          });
      } else {
        console.error('Image upload failed', res.data);
      }
    } catch (error) {
      console.error('Error uploading image', error);
    }
  };

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register now</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. <br /> In deleniti eaque aut repudiandae et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" {...register("name", { required: true })} name="name" placeholder="Enter your name" className="input input-bordered" />
                {errors.name && <span className="text-red-700">Name is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
                {errors.email && <span className="text-red-700">Email is required</span>}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long"
                    },
                    maxLength: {
                      value: 20,
                      message: "Password cannot exceed 20 characters"
                    },
                    validate: {
                      hasLowerAndUpper: value =>
                        /[a-z]/.test(value) && /[A-Z]/.test(value) || "Password must contain at least one lowercase and one uppercase letter",
                      hasSpecialChar: value =>
                        /[!*"'?,.`~[{()}{}{^%$#@!~()_+]/.test(value) || "Password must contain at least one special character",
                      hasDigit: value =>
                        /[0-9]/.test(value) || "Password must contain at least one digit"
                    }
                  })}
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                />
                {errors.password && (
                  <span className="text-red-700">{errors.password.message}</span>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Category</span>
                </div>
                <select defaultValue="default" {...register("role", { required: true })} className="select select-bordered w-full">
                  <option disabled value="default">
                    Select the role
                  </option>
                  <option value="worker">Worker</option>
                  <option value="taskCreator">TaskCreator</option>
                </select> 
                {errors.email && <span className="text-red-700">role is required</span>}
              </label>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input type="file" {...register("photoURL", { required: true })} className="" />
                {errors.photoURL && <span className="text-red-700">Photo is required</span>}
              </div>

              <div className="form-control mt-6">
                <input type="submit" value='Register' className="btn btn-primary" />
              </div>
            </form>
            <SocialLogin></SocialLogin>

            <p className='lg:pl-8 pb-5'>Already have an account? Please <Link to='/login' className="hover:underline text-blue-600">login</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
