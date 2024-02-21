import { redirect } from "next/navigation";
import { supabase } from "utils";

async function getData(id: string) {
  const { data } = await supabase
    .from("url")
    .select("url")
    .eq("id", id)
    .single();
  return data;
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  if (data?.url) redirect(data.url);
  else redirect("/404");
}
