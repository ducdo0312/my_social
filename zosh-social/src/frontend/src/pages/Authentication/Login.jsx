import React, {useState} from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, TextField } from '@mui/material';
import * as Yup from "yup"
import { useDispatch } from 'react-redux';
import { loginUserAction } from '../../Redux/Auth/auth.action';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const initialValues ={email:"", password:""};
  const dispatch=useDispatch();
  const navigate = useNavigate();


  const handleSubmit=(values) =>{
    console.log('handle submit',values)
    dispatch(loginUserAction(values));
  };
  return (
    <>

      <Formik onSubmit = {handleSubmit} 
        // validationSchema={validationSchema} 
        initialValues={initialValues}>
        <Form className ="space-y-5">
          <div className='space-y-5'>
            <div>
              <Field 
                as = {TextField} 
                name="email" 
                placeholder = "Email" 
                type = "email" 
                variant = "outlined" 
                fullWidth />
                <ErrorMessage 
                  name = "email" 
                  component={"div"} 
                  className='text-red-500'></ErrorMessage>
                
            </div>
            <div>
              <Field 
                as = {TextField} 
                name="password" 
                placeholder = "Password" 
                type = "password" 
                variant = "outlined" 
                fullWidth />
                <ErrorMessage 
                  name = "password" 
                  component="div"
                  className='text-red-500'></ErrorMessage>
                
            </div>
          </div>
          <Button sx = {{padding: ".8rem 0rem"}} fullWidth type='submit' variant ="contained" color='primary'>Login</Button>
        </Form>
      </Formik>
      <div className='flex gap-2 items-center justify-center pt-5'>
        <p>You don't have account?</p>
        <Button onClick={()=>navigate("../register")}>Register</Button>
      </div>
    </>
  )
}

export default Login