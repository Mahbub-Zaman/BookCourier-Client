import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ["all-users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
    enabled: !!user?.email, // only fetch when user exists
  });

  const role = data?.find(u => u.email === user?.email)?.role || "user";

  return { role, roleLoading: isLoading };
};

export default useRole;




