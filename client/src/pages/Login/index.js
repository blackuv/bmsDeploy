import React from 'react'
import { Form, Button, Input, message } from "antd";
import {Link, useNavigate} from "react-router-dom"
import { LoginUser } from "../../api/users"

function Login() {
    const navigate = useNavigate();
    const onFinish = async (values) =>{
        try {
            const response = await LoginUser(values);
            if(response.success){
                //success
                message.success(response.message);
                localStorage.setItem("token", response.data);
                navigate("/");//it will navigate to home page after login
            }else{
                //error
                message.error(response.message);
            }
        } catch (error) {
            console.log(error);
            message.error(error.message);
        }
    }
  return (
    <>
    <main className='App-header'>
        <h1>Login to Book My Show</h1>
        <section className='mw-500 text-center px-3'>
            <Form layout='vertical' onFinish={onFinish}>
                <Form.Item 
                label="Email" 
                htmlFor='email' 
                name="email" 
                className='d-block'
                rules={[
                    {require:true, message:"Email is required"},
                    {type:"email", message:"Enter a valid email"}]}>
                    <Input id="email" type="text" placeholder='Enter your Email'/>
                </Form.Item>
                <Form.Item 
                label="Password" 
                htmlFor='password' 
                name="password" 
                className='d-block'
                rules={[{require:true, message:"Password is required"}]}>
                    <Input id="password" type="password" placeholder='Enter your Password'/>
                </Form.Item>
                <Form.Item className='d-block'>
                    <Button 
                    type="primary" 
                    block htmlType="submit" 
                    style={{fontSize:"1rem", fontWeight:"600"}}
                    >Login</Button>
                </Form.Item>
            </Form>
            <div>
                <p>New User ? <Link to="/register">Register</Link></p>
                <p>Forgot Password? <Link to="/forget">Click Here</Link></p>
            </div>
        </section>
    </main>
    </>
  )
}

export default Login