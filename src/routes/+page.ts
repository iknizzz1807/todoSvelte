// GET request and POST request via API
import type { PageLoad } from "./$types";

export const load = (async ({ fetch }) => {
  let taskList: any = null;
  let error: string | null = null;
  try {
    const response = await fetch(
      "https://ikniz.pockethost.io/api/collections/todo/records?skipTotal=1"
    );
    if (response.ok) {
      taskList = await response.json();
      console.log(taskList.items);
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
}) satisfies PageLoad;
