import { LoaderFunction, redirect } from "remix";

export const loader: LoaderFunction = async () => {
  let response = redirect("/app/home");
  return response;
};

export default function Index() {
  return <></>;
}
