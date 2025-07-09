import { useEffect, useState } from "react";
import { getUserSpecificationService } from "../services/getUserSpecificationService";
import type { UserSpecification } from "../types/type";

export function useUserSpecification(userId?: number) {
  const [specification, setSpecification] = useState<UserSpecification | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (userId === undefined || userId === null) return;

    const fetchSpecification = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserSpecificationService(userId);
        setSpecification(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecification();
  }, [userId]);

  return {
    specification,
    loading,
    error,
  };
}
