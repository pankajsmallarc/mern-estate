import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { error, loading } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart())
      const res = await axios.post('http://localhost:4000/api/auth/signin', formData);
      if (res.data.success == false) {
        dispatch(signInFailure(res.data.message));
        return
      }
      dispatch(signInSuccess(res.data))
      navigate('/');

    } catch (error) {
      dispatch(signInFailure(error.message))
    };
  }
  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          className="border p-3 rounded-lg"
          type="email"
          placeholder="Email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          className="border p-3 rounded-lg"
          type="password"
          placeholder="Password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading....' : 'Sign In'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don't have an account? </p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
