<script>
  import axios from 'axios';
  import { onMount } from 'svelte';
  export let userId;
  
  let apiCall
  // this is intentionally made incorrect implementation.
  // so this one runs only onMount
  // but the test is passing which must be failing. because this implementation
  // is not working on browser as expected
  onMount(() => {
    console.log('loading user', userId)
    apiCall = axios.get(`/users/${userId}`);
  })

  // this is the implementation to make this work on browser.
  // $: {
  //   console.log('loading user', userId)
  //   apiCall = axios.get(`/users/${userId}`);
  // }
  
  </script>
  <div data-testid="activation-page">
    <h1>User Page</h1>
    {#if apiCall}
    {#await apiCall}
      <span>Loading</span>
    {:then response}
      <span>Success</span>
    {:catch apiError}
      <span>Fail</span>
    {/await}
    {/if}
  </div>
  