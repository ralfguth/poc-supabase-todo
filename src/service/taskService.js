import supabase from "./supabaseClient";

const getTasks = async (userId) => {
  let { data, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId);
  if (error) throw error;
  return data;
};

const addTask = async (task) => {
  let { data, error } = await supabase.from("tasks").insert([task]);
  if (error) throw error;
  return data;
};

const updateTask = async (taskId, updates) => {
  let { data, error } = await supabase
    .from("tasks")
    .update(updates)
    .eq("id", taskId);
  if (error) throw error;
  return data;
};

const deleteTask = async (taskId) => {
  let { error } = await supabase.from("tasks").delete().eq("id", taskId);
  if (error) throw error;
};

export default {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};
