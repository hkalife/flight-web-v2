<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated style="height: 50px">
      <q-toolbar>
        <q-toolbar-title>
          Flight Web
        </q-toolbar-title>

        <q-tabs v-model="tab">
          <q-tab name="listar" label="Ver lista" />
          <q-tab name="adicionar" label="Adicionar" />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
      tab: 'listar'
    }
  },
  watch: {
    tab: function () {
      console.log(this.tab)
      if (this.tab === 'listar') {
        this.$router.push('/')
      } else {
        this.$router.push('adicionar')
      }
    }
  }
}
</script>
