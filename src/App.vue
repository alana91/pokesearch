<template>
  <div id="app">
    <b-navbar toggleable="md" :sticky="true" variant="danger" type="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand>PokéSearch</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/pokemon">Pokémon</b-nav-item>
          <b-nav-item to="/moves">Moves</b-nav-item>
          <b-nav-item to="/berries">Berries</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view class="view"></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  }
};
</script>
