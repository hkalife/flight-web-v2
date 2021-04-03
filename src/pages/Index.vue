<template>
  <q-page class="flex flex-center">
    <q-card square bordered class="q-pa-xl shadow-1 airportList">
      <h4 class="q-ml-md">Listar</h4>

      <div class="q-pa-md">
        <div class="row col-md-10 offset-md-2 wholeAirports">
          <div class="col-md-2 mapAirports" v-for="airport in currentAirports" :key="airport.id">
            <q-card class="airportCard">
              <q-card-section>
                <div class="text-h6 text-center">{{ airport.nome }}</div>
              </q-card-section>

              <q-separator />

              <q-card-section>
                <div class="text-p text-center">ICAO: {{ airport.ICAO }}</div>
                <div class="text-p text-center">IATA: {{ airport.iata }}</div>
                <div class="text-p text-center">Cidade: {{ airport.cidade }}</div>
                <div class="text-p text-center">País: {{ airport.pais }}</div>
              </q-card-section>

              <q-separator />

              <q-card-section>
                <q-btn color="red" glossy label="Excluir" @click="deleteAirport(airport.id)" />
                <q-btn color="white" text-color="black" label="Editar" />
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      currentAirports: [],
      apiUrl: 'http://localhost:3000/aeroportos'
    }
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
        this.fetchAirports()
      }).catch(err => {
        console.log(err)
      })
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
