import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from "../assets/syalani logo bigger.png";
import './Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
 const { register, handleSubmit } = useForm();
 const [passwordVisible, setPasswordVisible] = useState(false);
 const navigate = useNavigate()

 const toggleVisibility = () => {
     setPasswordVisible(!passwordVisible);
 };

 const onSubmit = async (data)=>{
    console.log(data)

    const userData = data 
    console.log(userData);

    try {
        await axios.post('http://localhost:5000/user/registerpost', userData);
        alert('Registration success');
        navigate('/login');
    } catch (err) {
        alert("Can't register");
        console.log(err);
    }
 }
  return (
   <>
     <div className="register-main">
                <img src={logo} alt="Logo" />
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className='form'>
                        <h4>Register Form</h4>
                        <input
                            type="text"
                            placeholder="Username"
                            className="inputs"
                            {...register('name', { required: true })}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="inputs"
                            {...register('email', { required: true })}
                        />
                        <div style={{ position: 'relative', width: '100%' }}>
                            <input
                                type={passwordVisible ? 'text' : 'password'}
                                placeholder="Password"
                                className="inputs"
                                {...register('password', { required: true })}
                            />
                            <span
                                onClick={toggleVisibility}
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    right: '10px',
                                    transform: 'translateY(-50%)',
                                    cursor: 'pointer',
                                    color: '#aaa',
                                }}
                            >
                                {passwordVisible ? (
                                    <i className="fas fa-eye-slash" />
                                ) : (
                                    <i className="fas fa-eye" />
                                )}
                            </span>
                        </div>
                        <input type="submit" className="input-btn" />
                    </form>
                </div>
            </div>
   </>
  )
}

export default Register