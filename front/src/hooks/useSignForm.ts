import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

import { useAuthStore } from "@/hooks/useSessionStore"
import type { LoginInput } from "@/hooks/useSessionStore"

export interface SignFormData extends LoginInput {
  rememberMe: boolean
}

export function useSignForm() {
  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const [showPassword, setShowPassword] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignFormData>({
    defaultValues: { rememberMe: false },
  })

  const rememberMe = watch("rememberMe")

  const onSubmit = async (formData: SignFormData) => {
    const success = await login(
      { email: formData.email, password: formData.password },
      formData.rememberMe
    )

    if (success) {
      navigate("/dashboard")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((v) => !v)
  }

  return {
    showPassword,
    rememberMe,
    register,
    handleSubmit,
    setValue,
    errors,
    isSubmitting,
    togglePasswordVisibility,
    onSubmit,
  }
}
