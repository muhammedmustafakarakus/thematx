import React from "react";
import TakvimClient from "./TakvimClient";
import { getLessons, getRecordings } from "@/app/actions/admin";

export const metadata = {
  title: "Takvim & Ders Yönetimi | Admin",
};

export default async function AdminTakvimPage() {
  const lessons = await getLessons();
  const recordings = await getRecordings();

  return <TakvimClient initialLessons={lessons} initialRecordings={recordings} />;
}
