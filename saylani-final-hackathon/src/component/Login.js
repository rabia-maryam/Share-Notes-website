import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import logo from "../assets/syalani logo bigger.png";
import './Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
 const { register, handleSubmit } = useForm();
 const [passwordVisible, setPasswordVisible] = useState(false);
 const navigate = useNavigate()

 const toggleVisibility = () => {
     setPasswordVisible(!passwordVisible);
 };

 const onSubmit = async (data)=>{
    console.log(data)
    try {
        const response = await axios.post('http://localhost:5000/user/loginverify', data);
        console.log(response)
        if (response.status === 200) {
            alert(response.data.message);
            console.log(response, response.data.user);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            navigate('/');
        }
    } catch (err) {
        if (err.response) {
            if (err.response.status === 404) {
                console.log(err)
                alert(`User not found. Please Register Yourself First and try logging in`);
            } else if (err.response.status === 401) {
                alert('Incorrect Password');
            } else if (err.response.status === 500) {
                alert('There is an issue on the backend side, Please try again');
            } else {
                alert('Unknown error occurred');
            }
        } else {
            alert('Unable to connect to the server. Please try again later.');
        }
    }
 }
  return (
   <>
     <div className="register-main">
                <img src={logo} alt="Logo" />
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className='form'>
                        <h4>Login Form</h4>
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
                        <input type="submit" className="input-btn"  value='Login'/>
                    </form>
                </div>
            </div>
   </>
  )
}

export default Login