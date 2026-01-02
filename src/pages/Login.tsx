import { Input, Button } from 'antd'
import { useFormik } from 'formik'

import logo from '../assets/logo.png'
import fastcart from '../assets/fastcart.png'

const Login = () => {

  const { handleSubmit, handleChange, resetForm, values} = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    onSubmit: (values) => {
      
    }
  })


  return (
    <div className="flex min-h-screen">

      <div className="w-[680px] bg-[#0B2545] flex flex-col justify-center p-[30px] text-white">
        <h1 className="text-3xl font-semibold mb-4">Welcome to admin panel</h1>
        <div className="flex items-center gap-5">
          <img className="h-[100px]" src={logo} alt="logo" />
          <img className="mt-4" src={fastcart} alt="fastcart" />
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-8">
        <div className="flex flex-col gap-6 w-[400px]">
          <h1 className="text-2xl font-semibold text-gray-700">Log in</h1>

          <Input
            name='email'
            placeholder="Email"
            size="large"
            value={values.email}
            onChange={handleChange}
          />

          <Input.Password
            name='password'
            placeholder="Password"
            size="large"
            value={values.password}
            onChange={handleChange}
          />

          <div className="flex justify-between items-center">
            <button className="text-blue-600 hover:underline">Forgot password?</button>
          </div>

          <Button type="primary" size="large">
            Log in
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
