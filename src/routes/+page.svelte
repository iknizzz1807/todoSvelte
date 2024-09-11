<script lang="ts">
  import type { PageData } from "./$types";
  import { enhance } from "$app/forms";
  export let data: PageData;
  export let form;

  export async function deleteItem(id: string) {
    data.taskList = data.taskList.filter((item: any) => item.id != id);
    await fetch(
      `https://ikniz.pockethost.io/api/collections/todo/records/${id}`,
      {
        method: "DELETE",
      }
    );
  }
</script>

<form
  method="POST"
  style="display: flex; flex-direction: column; align-items: flex-start; gap: 10px; margin-left: 24px"
  use:enhance
>
  <div>
    <input name="task_name" type="text" placeholder="Name of task" />
  </div>
  <div>
    <input name="task_description" type="text" placeholder="Task description" />
  </div>
  <button style="cursor: pointer;">Submit</button>
</form>
<p style="color: red;">{form?.error || ""}</p>
{#if data.error}
  <p style="color: red;">{data.error}</p>
{:else if !data}
  <p>Loading...</p>
{:else}
  <h2>Tasks available:</h2>
  <ol>
    {#each data.taskList as task}
      <li>
        <p>Task name: {task.task_name}</p>
        <p>Task description: {task.task_description}</p>
        <button on:click={() => deleteItem(task.id)}>Delete</button>
      </li>
    {/each}
  </ol>
{/if}
