import { useState } from "react"
import type { CriarUsuarioRequest, CriarUsuarioResponse } from "../types/register"
import { criarUsuario } from "../services/resgisterService"

export function useCriarUsuario() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const criar = async (usuario: CriarUsuarioRequest): Promise<CriarUsuarioResponse | null> => {
    setLoading(true)
    setError(null)

    try {
      const response = await criarUsuario(usuario)
      return response
    } catch (err: any) {
      setError(err.message || "Erro ao criar usuário")
      return null
    } finally {
      setLoading(false)
    }
  }

  return {
    criarUsuario: criar,
    loading,
    error,
  }
}
