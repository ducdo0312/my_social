import React, {useState} from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, TextField } from '@mui/material';
import * as Yup from "yup"

const Register = () => {
  const initialValues ={firstName:"", lastName:"",email:"", password:"", gender:""};
  const[ formValue, setFormValue] = useState();
  const validationSchema = {
    email: Yup.string().email("Invalid email").required("Email is required"), 
    password:Yup.string().min(6,"Password must be at least 6 characters").required("Password is Required")};
  const handleSubmit=(values) =>{
    values.gender = gender
    console.log('handle submit',values)
  };

  const[gender, setGender] =useState("");

  const handleChange = (event) => {
    setGender(event.target.value);
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
                name="firstName" 
                placeholder = "FirstName" 
                type = "text" 
                variant = "outlined" 
                fullWidth />
                <ErrorMessage 
                  name = "firstName" 
                  component={"div"} 
                  className='text-red-500'></ErrorMessage>
                
            </div>
            <div>
              <Field 
                as = {TextField} 
                name="lastname" 
                placeholder = "Lastname" 
                type = "lastname" 
                variant = "outlined" 
                fullWidth />
                <ErrorMessage 
                  name = "lastname" 
                  component={"div"} 
                  className='text-red-500'></ErrorMessage>
                
            </div>
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
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
            
              onChange={handleChange}
            >
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="male" control={<Radio />} label="Male" />
            </RadioGroup>
          </FormControl>
          <Button sx = {{padding: ".8rem 0rem"}} fullWidth type='submit' variant ="contained" color='primary'>Register</Button>
        </Form>
      </Formik>
    </>
  )
}

export default Register