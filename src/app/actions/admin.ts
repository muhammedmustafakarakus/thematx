"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// --- LESSONS (Calendar) ---

export async function getLessons() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .order("lesson_date", { ascending: true })
    .order("start_time", { ascending: true });

  if (error) {
    console.error("Error fetching lessons:", error);
    return [];
  }
  return data;
}

export async function createLesson(formData: FormData) {
  const supabase = await createClient();
  
  const title = formData.get("title") as string;
  const instructor_name = formData.get("instructor_name") as string;
  const lesson_type = formData.get("lesson_type") as string;
  const lesson_date = formData.get("lesson_date") as string;
  const start_time = formData.get("start_time") as string;
  const end_time = formData.get("end_time") as string;
  const meet_url = formData.get("meet_url") as string;
  const priceStr = formData.get("price") as string;
  const price = priceStr ? parseFloat(priceStr) : 0;

  const { error } = await supabase.from("lessons").insert({
    title,
    instructor_name,
    lesson_type,
    lesson_date,
    start_time,
    end_time,
    meet_url,
    price
  });

  if (error) {
    console.error("Error creating lesson:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/admin/takvim");
  revalidatePath("/student");
  return { success: true };
}

export async function deleteLesson(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("lessons").delete().eq("id", id);
  if (error) {
    return { success: false, error: error.message };
  }
  revalidatePath("/admin/takvim");
  revalidatePath("/student");
  return { success: true };
}

// --- RECORDINGS (VOD) ---

export async function getRecordings() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("recordings")
    .select("*")
    .order("recording_date", { ascending: false });

  if (error) {
    console.error("Error fetching recordings:", error);
    return [];
  }
  return data;
}

export async function createRecording(formData: FormData) {
  const supabase = await createClient();
  
  const title = formData.get("title") as string;
  const instructor_name = formData.get("instructor_name") as string;
  const recording_type = formData.get("recording_type") as string;
  const recording_date = formData.get("recording_date") as string;
  const duration_mins = parseInt(formData.get("duration_mins") as string);
  const video_url = formData.get("video_url") as string;
  const thumbnail_url = formData.get("thumbnail_url") as string || "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=600&auto=format&fit=crop";

  const { error } = await supabase.from("recordings").insert({
    title,
    instructor_name,
    recording_type,
    recording_date,
    duration_mins,
    video_url,
    thumbnail_url
  });

  if (error) {
    console.error("Error creating recording:", error);
    return { success: false, error: error.message };
  }

  revalidatePath("/student/kayitlar");
  return { success: true };
}

// --- NEXT LESSON (For Student Dashboard Countdown) ---

export async function getNextLesson() {
  const supabase = await createClient();
  const today = new Date().toISOString().split('T')[0];
  
  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .gte("lesson_date", today)
    .order("lesson_date", { ascending: true })
    .order("start_time", { ascending: true })
    .limit(1)
    .single();

  if (error) {
    // If no rows found, it's fine.
    return null;
  }
  return data;
}

// --- ANNOUNCEMENTS ---
export async function getAnnouncements() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('announcements').select('*').order('created_at', { ascending: false });
  if (error) { console.error('Error fetching announcements:', error); return []; }
  return data;
}

export async function createAnnouncement(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const is_active = formData.get('is_active') === 'true';
  const { error } = await supabase.from('announcements').insert({ title, content, is_active });
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/duyurular');
  revalidatePath('/');
  return { success: true };
}

export async function deleteAnnouncement(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('announcements').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/duyurular');
  revalidatePath('/');
  return { success: true };
}

export async function getActiveAnnouncements() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('announcements').select('*').eq('is_active', true).order('created_at', { ascending: false });
  if (error) return [];
  return data;
}

// --- ADMIN STATS ---
export async function getAdminStats() {
  const supabase = await createClient();
  const { count: studentCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'student');
  const { count: lessonCount } = await supabase.from('lessons').select('*', { count: 'exact', head: true });
  const { count: recordingCount } = await supabase.from('recordings').select('*', { count: 'exact', head: true });
  return {
    students: studentCount || 0,
    lessons: lessonCount || 0,
    recordings: recordingCount || 0,
  };
}

// --- CAMPS ---
export async function getCamps() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('camps').select('*').order('created_at', { ascending: false });
  if (error) { console.error('Error fetching camps:', error); return []; }
  return data;
}

export async function createCamp(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const date_range = formData.get('date_range') as string;
  const duration = formData.get('duration') as string;
  const location = formData.get('location') as string;
  const price = formData.get('price') as string;
  const video_url = formData.get('video_url') as string;
  const capacity_total = parseInt(formData.get('capacity_total') as string) || 20;
  const capacity_registered = parseInt(formData.get('capacity_registered') as string) || 0;
  
  // create slug from title
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  const { error } = await supabase.from('camps').insert({ 
    slug, title, description, date_range, duration, location, price, video_url, capacity_total, capacity_registered 
  });
  
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/kamplar');
  revalidatePath('/kamplar');
  return { success: true };
}

export async function deleteCamp(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from('camps').delete().eq('id', id);
  if (error) return { success: false, error: error.message };
  revalidatePath('/admin/kamplar');
  revalidatePath('/kamplar');
  return { success: true };
}

export async function getCampBySlug(slug: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('camps').select('*').eq('slug', slug).single();
  if (error) return null;
  return data;
}
