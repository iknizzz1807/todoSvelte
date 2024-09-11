// Handle form submission for POST request
import type { Actions } from "./$types";
import type { PageServerLoad } from "./$types";

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const task_name = formData.get("task_name") as string;
    const task_description = formData.get("task_description") as string;
    const item = { task_name, task_description };
    // console.log(item);
    try {
      const response = await fetch(
        "https://ikniz.pockethost.io//api/collections/todo/records/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(item),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await response.json();
      return { success: true, data: result };
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error: "Please fill in the form" };
    }
  },
};

export const load = (async ({ fetch }) => {
  let taskList: any = null;
  let error: string | null = null;
  try {
    const response = await fetch(
      "https://ikniz.pockethost.io/api/collections/todo/records?skipTotal=1"
    );
    if (response.ok) {
      taskList = await response.json();
    } else {
      error = `Error: ${response.status}`;
    }
  } catch (err) {
    error = `Error: ${(err as Error).message}`;
  }
  return {
    taskList: taskList ? taskList.items : [],
    error,
  };
}) satisfies PageServerLoad;
