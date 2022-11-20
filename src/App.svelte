<script>
  import { Router, Route, Link} from 'svelte-navigator';
  import UserPage from './UserPage.svelte';
</script>
<Router>
  <Link to="/">Home</Link>
  <Link to="/user/123">User 123</Link>
  <Link to="/user/456">User 456</Link>

  <Route path="/user/:userId" let:params>
    <UserPage userId={params.userId} />
  </Route>
</Router>