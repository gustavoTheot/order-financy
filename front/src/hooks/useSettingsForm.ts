import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useMutation } from "@apollo/client/react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import { useAuthStore } from "@/hooks/useSessionStore"
import { UPDATE_USER } from "@/lib/graphql/mutation/User"

export interface SettingsFormData {
  name: string
  email: string
}

interface UpdateUserData {
  updateUser: {
    id: string
    name: string
    email: string
  }
}

export function useSettingsForm() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const [updateUserMutation] = useMutation<UpdateUserData>(UPDATE_USER)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormData>({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  })

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        email: user.email,
      })
    }
  }, [user, reset])

  const onSubmit = async (formData: SettingsFormData) => {
    if (!user?.id) return

    try {
      const { data } = await updateUserMutation({
        variables: {
          id: user.id,
          data: {
            name: formData.name,
            email: formData.email,
          },
        },
      })

      if (data?.updateUser) {
        useAuthStore.setState((state) => ({
          user: state.user
            ? {
                ...state.user,
                name: data.updateUser.name,
                email: data.updateUser.email,
              }
            : null,
        }))

        toast.success("Perfil atualizado com sucesso!")
      }
    } catch (err: any) {
      toast.error(err?.message || "Erro ao atualizar dados do perfil.")
    }
  }

  const handleLogout = () => {
    logout()
    navigate("/sign")
  }

  const getInitials = (name?: string) => {
    if (!name) return "CT"
    const parts = name.trim().split(" ")
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }

  return {
    user,
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    handleLogout,
    getInitials,
  }
}
