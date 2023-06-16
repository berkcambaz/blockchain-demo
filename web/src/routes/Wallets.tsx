import { useParams } from "react-router-dom";

export default function WalletRoute() {
  const params = useParams<{ id: string }>();

  return (
    <>
      wallet
    </>
  )
}