//Return user to ./
import { useRouter } from "next/router";

export default function Profile() {
  const router = useRouter();

  if (router.isReady) {
    router.push("/");
  }
}
