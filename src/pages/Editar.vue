<template>
  <q-page class="flex flex-center">
    <q-card square bordered class="q-pa-xl shadow-1 airportList">
      <h4 class="q-ml-md" style="margin: 0px;">Editar</h4>

      <div class="q-pa-md q-mt-lg">
        <div class="row col-md-10 offset-md-2 wholeAirports">
          <div class="col-md-2 mapAirports">
            <q-input outlined v-model="nome" label="Nome" />
          </div>
          <div class="col-md-2 mapAirports">
            <q-input outlined v-model="icao" label="ICAO" />
          </div>
          <div class="col-md-2 mapAirports">
            <q-input outlined v-model="iata" label="IATA" />
          </div>
          <div class="col-md-2 mapAirports">
            <q-input outlined v-model="cidade" label="Cidade" />
          </div>
          <div class="col-md-2 mapAirports">
            <q-input outlined v-model="pais" label="País" />
          </div>
        </div>
      </div>

      <q-card-section>
        <q-btn class="q-mt-lg q-mr-lg" label="Voltar" @click="voltarParaLista()" />
        <q-btn color="primary" class="q-mt-lg" label="Cadastrar" @click="atualizar()" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  props: {
    airport: Object
  },
  data () {
    return {
      nome: '',
      icao: '',
      iata: '',
      cidade: '',
      pais: '',
      apiUrl: 'http://localhost:3000/aeroportos'
    }
  },
  methods: {
    atualizar () {
      if (this.nome === '' || this.icao === '' || this.iata === '' || this.cidade === '' || this.pais === '') {
        this.$q.notify({
          type: 'create-user-error',
          icon: 'error',
          progress: true,
          color: 'red',
          textColor: 'white',
          message: 'Todos os campos precisam estar preenchidos!'
        })
      } else {
        const payloadUpdateAirport = {
          nome: this.nome,
          icao: this.icao,
          iata: this.iata,
          cidade: this.cidade,
          pais: this.pais
        }

        this.$axios.put(`${this.apiUrl}/${this.airport.id}`, payloadUpdateAirport).then(() => {
          this.$q.notify({
            type: 'create-user-success',
            icon: 'check',
            progress: true,
            color: 'primary',
            textColor: 'white',
            message: 'Aeroporto atualizado com sucesso!'
          })
        }).catch(() => {
          this.$q.notify({
            type: 'negative',
            icon: 'error',
            message: 'Ocorreu um erro. Tente novamente.'
          })
        })
      }
    },
    voltarParaLista () {
      this.$emit('updatePropLista', 'lista')
    }
  },
  mounted () {
    console.log('oi')
    console.log(this.airport)
    this.nome = this.airport.nome
    this.icao = this.airport.icao
    this.iata = this.airport.iata
    this.cidade = this.airport.cidade
    this.pais = this.airport.pais
  }
}
</script>
