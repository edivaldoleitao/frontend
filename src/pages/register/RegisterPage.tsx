

import React from 'react'
import AuthLayout from '../../components/layouts/AuthLayout/AuthLayout'
import Register from '../../features/register/components/RegisterForm'

const RegisterPage = () => {
  return (
    <AuthLayout>
        <Register />
    </AuthLayout>
  )
}

export default RegisterPage