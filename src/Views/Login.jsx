/* eslint-disable react/no-unknown-property */
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLoginMutation, usePrefetch } from '../Services/apiSlice.jsx';
import FormToast from '../Helpers/FormToast.jsx';
import Spinner from '../Components/Spinner.jsx';
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const [login, { isLoading, isSuccess, data }] = useLoginMutation();
  const prefetchSidebar = usePrefetch('sidebar');
  const prefetchPairs = usePrefetch('currency_pairs');

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem('Token', data.token);
      localStorage.setItem('Email', data.email);
      navigate('/');
    }
  }, [isSuccess, navigate, data]);

  useEffect(() => {
    const Token = localStorage.getItem('Token');
    if (Token) {
      navigate('/', { state: 'Already_logged in' });
    }
  }, [navigate]);

  const schema = yup.object({
    Email: yup.string().required('No email provided.'),
    Password: yup
      .string()
      .required()
      .min(8, 'Password Must be 8 characters or more')
      .matches(/[a-z]+/, 'Password must have One lowercase character')
      .matches(/[A-Z]+/, 'Password must have One uppercase character')
      .matches(/[@$!%*#?&]+/, 'Password must have One special character')
      .matches(/\d+/, 'Password must have One number'),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  FormToast(errors);

  const onSubmit = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong! Try again later...');
    }
  };

  return (
    <div className='bg-white dark:bg-body'>
      <div>
        <div className='lg:flex'>
          {/* side screen */}
          <div
            className=' bg-[#F3F5F8] flex-1 h-screen '
            id='login_side_screen'
          >
            <header className='h-full relative'>
              <div className='flex h-full justify-between'>
                <div className='w-40'>
                  <motion.div
                    initial={{ x: -300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 1 }}
                    className='side_bluebar p-5 h-full '
                  ></motion.div>

                  <motion.div
                    className='box hidden lg:flex'
                    initial={{ x: -300, opacity: 1 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0, duration: 1 }}
                  >
                    <div className='hover-point'></div>
                    <div className='hover-point'></div>
                    <div className='hover-point'></div>
                    <div className='hover-point'></div>
                    <div className='hover-point'></div>
                    <div className='hover-point'></div>
                    <div className='hover-point'></div>
                    <div className='hover-point'></div>
                    <div className='box-contents'></div>
                  </motion.div>
                </div>

                <div className='w-[50%] py-20 pe-20 hidden md:flex items-center'>
                  <motion.figure
                    initial={{ x: 300, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0, duration: 1 }}
                    className='relative mx-auto max-w-md lg:mx-0 '
                  >
                    <div className='flex animate-pulse  text-yellow-500 '>
                      <div className='flex gap-1'>
                        <svg
                          aria-hidden='true'
                          viewBox='0 0 20 20'
                          className='h-5 w-5 fill-current'
                        >
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                        </svg>
                        <svg
                          aria-hidden='true'
                          viewBox='0 0 20 20'
                          className='h-5 w-5 fill-current'
                        >
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                        </svg>
                        <svg
                          aria-hidden='true'
                          viewBox='0 0 20 20'
                          className='h-5 w-5 fill-current'
                        >
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                        </svg>
                        <svg
                          aria-hidden='true'
                          viewBox='0 0 20 20'
                          className='h-5 w-5 fill-current'
                        >
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                        </svg>
                        <svg
                          aria-hidden='true'
                          viewBox='0 0 20 20'
                          className='h-5 w-5 fill-current'
                        >
                          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'></path>
                        </svg>
                      </div>
                    </div>
                    <blockquote className='mt-2'>
                      <h1 className=' my-7 font-bold text-slate-900 sm:text-5xl'>
                        Get lost in the world of Crypto.
                      </h1>
                      <p className='font-display text-xl font-medium text-slate-900'>
                        “This method of designing icons is genius. I wish I had
                        known this method a lot sooner.”
                      </p>
                    </blockquote>
                    <figcaption className='mt-2 text-sm text-slate-500'>
                      <strong className="font-semibold text-blue-600 before:content-['—_']">
                        Stacey Solomon
                      </strong>
                      , Founder at Retail Park
                    </figcaption>
                  </motion.figure>
                </div>
              </div>
            </header>
          </div>
          {/* login form */}
          <div className='lg:w-[50%] xl:max-w-screen-sm bg-white flex lg:justify-center'>
            <div className='m-5 md:w-[40%] lg:h-screen lg:w-[37%] flex items-center lg:m-0 lg:p-12 xl:p-24 p-8 rounded-3xl lg:rounded-none drop-shadow-2xl md:drop-shadow-none bg-white xl:max-w-2xl vertical-center'>
              <motion.div
                className='w-[100%]'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 1.2 }}
              >
                <div className='text-center'>
                  <div className='mb-12'>
                    <img
                      className='mx-auto drop-shadow-2xl'
                      src='/img/logo_only.svg'
                      alt=''
                    />
                  </div>
                  <h1 className='font-extrabold md:font-bold mb-2 text-black'>
                    Welcome back! ✌️
                  </h1>
                  <span className='text-gray-400'>
                    Please enter your details to login.
                  </span>
                </div>
                <div className='mt-12'>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                      <div className='font-semibold mb-2 '>
                        <span className='text-black'> Email Address</span>
                      </div>
                      <input
                        onKeyUpCapture={() => {
                          prefetchSidebar();
                          prefetchPairs();
                        }}
                        type='Email'
                        aria-invalid={errors.Email ? 'true' : 'false'}
                        {...register('Email')}
                        className={`w-full rounded-lg text-lg py-2 px-3 ${
                          errors.Email
                            ? 'animate__animated animate__shakeX border-red-500'
                            : 'border-zinc-300'
                        }`}
                        placeholder='Enter email address...'
                      />
                    </div>
                    <div className='mt-6'>
                      <div className='flex justify-between items-center'>
                        <div className=' font-semibold mb-2'>
                          <span className='text-black'> Password</span>
                        </div>
                      </div>
                      <input
                        type='Password'
                        aria-invalid={errors.Password ? 'true' : 'false'}
                        {...register('Password')}
                        className={`w-full text-lg py-2 px-3 mb-3  rounded-lg ${
                          errors.Password
                            ? 'animate__animated animate__shakeX border-red-500'
                            : 'border-zinc-300'
                        }`}
                        placeholder='Enter your password'
                      />
                    </div>
                    <div className='mt-5'>
                      <button
                        disabled={isLoading}
                        type='submit'
                        id='login-btn'
                        className='p-4 w-full rounded-lg  text-white
                          font-semibold font-display focus:outline-none focus:shadow-outline
                          drop-shadow-lg hover:scale-[1.05] transition-all ease-in-out'
                      >
                        {isLoading ? <Spinner /> : 'Login'}
                      </button>
                      {/* hidden link to enable rediret without page reload */}
                      <Link className='hidden' to='/dashboard'>
                        Dashboard
                      </Link>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
