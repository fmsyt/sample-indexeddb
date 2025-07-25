import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Dexie.js example" },
    { name: "description", content: "Simple Dexie.js implementation" },
  ];
}

export default function Home() {
  return <Welcome />;
}
