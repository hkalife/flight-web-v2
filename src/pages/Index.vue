<template>
  <q-page class="flex flex-center">
    <q-card v-if="currentPage === 'lista'" square bordered class="q-pa-xl shadow-1 airportList">
      <q-card-actions class="q-pb-lg row justify-center" style="justify-content: space-between;">
        <h4 class="q-ml-md" style="margin: 0px;">Listar</h4>
        <q-btn color="primary" label="Adicionar" @click="currentPage = 'adicionar'"/>
      </q-card-actions>

      <div class="q-pa-md">
        <div class="row col-md-10 offset-md-2 wholeAirports">
          <div class="col-md-2 mapAirports" v-for="airport in currentAirports" :key="airport.id">
            <q-card class="airportCard">
              <q-card-section>
                <div class="text-h6 text-center">{{ airport.nome }}</div>
              </q-card-section>

              <q-separator />

              <q-card-section>
                <div class="text-p text-center">ICAO: {{ airport.icao }}</div>
                <div class="text-p text-center">IATA: {{ airport.iata }}</div>
                <div class="text-p text-center">Cidade: {{ airport.cidade }}</div>
                <div class="text-p text-center">País: {{ airport.pais }}</div>
              </q-card-section>

              <q-separator />

              <q-card-section>
                <q-btn color="red" glossy label="Excluir" @click="deleteAirport(airport.id)" />
                <q-btn color="white" text-color="black" label="Editar" @click="irParaEdicao(airport)" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-card>

    <Adicionar v-if="currentPage === 'adicionar'" @updatePropLista="updatePropLista" />
    <Editar v-if="currentPage === 'editar'" @updatePropLista="updatePropLista" :airport="aeroportoParaEdicao" />
  </q-page>
</template>

<script>
import Adicionar from './Adicionar.vue'
import Editar from './Editar.vue'

export default {
  name: 'PageIndex',
  data () {
    return {
      currentAirports: [],
      apiUrl: 'http://localhost:3000/aeroportos',
      currentPage: 'lista',
      aeroportoParaEdicao: {}
    }
  },
  components: {
    Adicionar,
    Editar
  },
  methods: {
    fetchAirports () {
      this.$axios.get(this.apiUrl).then(response => {
        this.currentAirports = response.data
        console.log(this.currentAirports)
      }).catch(err => {
        console.log(err)
      })
    },
    deleteAirport (id) {
      const deleteUrl = `${this.apiUrl}/${id}`
      this.$axios.delete(deleteUrl).then(() => {
        this.$q.notify({
          type: 'create-user-success',
          icon: 'check',
          progress: true,
          color: 'primary',
          textColor: 'white',
          message: 'Aeroporto deletado com sucesso!'
        })
        this.fetchAirports()
      }).catch(() => {
        this.$q.notify({
          type: 'negative',
          icon: 'error',
          message: 'Ocorreu um erro. Tente novamente.'
        })
      })
    },
    updatePropLista (valorPage) {
      this.currentPage = valorPage
    },
    irParaEdicao (aeroporto) {
      this.aeroportoParaEdicao = aeroporto
      this.currentPage = 'editar'
    }
  },
  mounted () {
    this.fetchAirports()
  }
}
</script>

<style>
.airportList {
  width: 80%;
}

.airportCard {
  width: 200px;
}

.mapAirports {
  margin: 10px;
  text-align: -webkit-center;
}

.wholeAirports {
  display: flex;
  justify-content: center;
  justify-content: space-evenly;
}
</style>
