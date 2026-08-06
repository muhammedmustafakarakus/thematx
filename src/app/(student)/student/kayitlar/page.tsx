import React from "react";
import RecordingsClient from "./RecordingsClient";
import { getRecordings } from "@/app/actions/admin";

export const metadata = {
  title: "Ders Kayıtları | Öğrenci Paneli",
};

export default async function StudentRecordingsPage() {
  const recordings = await getRecordings();

  return <RecordingsClient initialRecordings={recordings} />;
}
