<template>
  <aside class="sidebar">
    <ul>
      <li v-for="menu in menus" :key="menu.id">
        <router-link :to="menu.link" style="color: white">
          <i :class="`fa fa-${menu.icon}`"></i> {{ menu.name }}
        </router-link>
      </li>
    </ul>
  </aside>
</template>

<script>
import axios from "axios"; // Import Axios

export default {
  data() {
    return {
      menus: [],
    };
  },
  async created() {
    try {
      const response = await axios.get("http://127.0.0.1:5000/api/menus"); //menu url backend api
      this.menus = response.data;
    } catch (error) {
      console.error("Error fetching menus:", error);
    }
  },
};
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 90vh;
  background: #5682af;
  color: white;
  padding: 15px;
  position: relative;
  top: 0;
  left: 0;
  overflow-y: auto;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 10px;
  margin: 5px 0;
}

router-link {
  color: white !important;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: background-color 0.3s ease;
}

router-link:hover {
  background-color: #34495e;
  border-radius: 5px;
}

i {
  margin-right: 10px;
}
</style>
