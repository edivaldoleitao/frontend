import { useState } from "react";
import { createUserSpecificationService } from "../services/createUserSpecificationService";
import type { UserSpecification } from "../types/type";

export function useCreateUserSpecification() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<any>(null);

  async function createSpecification(data: UserSpecification) {
    setLoading(true);
    setError(null);
    try {
      const res = await createUserSpecificationService(data);
      setResponse(res);
      return res;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return {
    createSpecification,
    loading,
    error,
    response,
  };
}
