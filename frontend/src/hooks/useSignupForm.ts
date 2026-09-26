import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { useAuthStore } from "@/hooks/useSessionStore"
import type { RegisterInput } from "@/hooks/useSessionStore"

export type SignupFormData = RegisterInput

export function useSignupForm() {
  const navigate = useNavigate()
  const signup = useAuthStore((state) => state.signup)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>()

  const onSubmit = async (formData: SignupFormData) => {
    const success = await signup(formData)

    if (success) {
      navigate("/dashboard")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((v) => !v)
  }

  return {
    showPassword,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    togglePasswordVisibility,
    onSubmit,
  }
}
