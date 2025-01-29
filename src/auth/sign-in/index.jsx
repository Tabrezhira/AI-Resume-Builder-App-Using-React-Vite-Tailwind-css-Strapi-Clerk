import { SignIn } from '@clerk/clerk-react'
import React from 'react'

function SignInPage() {
  return (
    <div className=' h-[100vh] flex justify-center items-center'>
      <SignIn/>
    </div>

  )
}

export default SignInPage