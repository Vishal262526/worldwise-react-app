import { useSearchParams } from "react-router-dom";

export const useUrlPosition = () => {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const long = searchParams.get("long");

  return [lat, long];
};
