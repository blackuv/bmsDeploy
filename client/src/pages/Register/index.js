import React from 'react'
import { Form, Button, Input, message, Radio} from "antd"
import {Link} from "react-router-dom"
import { RegisterUser } from "../../api/users"

function Register() {
    const onFinish = async (values) =>{
        try {
            const response = await RegisterUser(values);
            if(response.success){
                //success
                message.success(response.message);
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
            <h1>Register to Book My Show</h1>
            <section className='mw-500 text-center px-3'>
                <Form layout='vertical' onFinish={onFinish}>
                <Form.Item 
                    label="Name" 
                    htmlFor='name' 
                    name="name" 
                    className='d-block'
                    rules={[{require:true, message:"Name is required"}]}>
                        <Input id="name" type="text" placeholder='Enter your Name'/>
                    </Form.Item>
                    <Form.Item 
                    label="Email" 
                    htmlFor='email' 
                    name="email" 
                    className='d-block'
                    rules={[{require:true, message:"Email is required"},
                        {type:"email", message:"Enter a valid email"}
                    ]}>
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
                        >Register</Button>
                    </Form.Item>
                    <Form.Item
                label="Register as a Partner"
                htmlFor="role"
                name="role"
                className="d-block text-center"
                initialValue={false}
                rules={[{ required: true, message: "Please select an option" }]}
              >
                <div className="d-flex justify-content-start">
                  <Radio.Group name="radiogroup" className="flex-start">
                    <Radio value={"partner"}>Yes</Radio>
                    <Radio value={"user"}>No</Radio>
                  </Radio.Group>
                </div>
              </Form.Item>
                </Form>
                <div>
                    <p>All ready a User ? <Link to="/login">Login</Link></p>
                </div>
            </section>
        </main>
        </>
      )
}

export default Register