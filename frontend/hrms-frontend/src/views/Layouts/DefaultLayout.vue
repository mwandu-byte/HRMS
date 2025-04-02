<template>
  <div class="layout">
    <header class="header">SJUT|HRMS</header>
    <div class="content-wrapper">
      <SidebarMenu />
      <main class="p-4">
        <!-- <router-view /> -->
      </main>
    </div>
    <footer class="footer">SJUT|HRMS</footer>
  </div>
</template>

<script>
import SidebarMenu from "@/components/SidebarMenu.vue";

export default {
  name: "DefaultLayout",
  components: { SidebarMenu },
};
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.header {
  background-color: purple;
  color: white;
  padding: 20px;
  top: 0;
  text-align: left;
  font-weight: bold;
  height: 100hv;
}

.content-wrapper {
  display: flex;
  flex: 1;
}

main {
  flex: 1;
  padding: 20px;
}

.footer {
  background-color: purple;
  color: white;
  padding: 16px;
  text-align: center;
}
</style>
