<template>
  <q-page class="flex flex-center">
    <q-card square bordered class="q-pa-xl shadow-1 airportList">
      <h4 class="q-ml-md" style="margin: 0px;">Adicionar</h4>

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
        <q-btn color="primary" class="q-mt-lg" label="Cadastrar" @click="validarEEnviar()" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
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
    validarEEnviar () {
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
        const payloadCreateAirport = {
          nome: this.nome,
          icao: this.icao,
          iata: this.iata,
          cidade: this.cidade,
          pais: this.pais
        }

        this.$axios.post(this.apiUrl, payloadCreateAirport).then(() => {
          this.$q.notify({
            type: 'create-user-success',
            icon: 'check',
            progress: true,
            color: 'primary',
            textColor: 'white',
            message: 'Aeroporto criado com sucesso!'
          })
          this.voltarParaLista()
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
    this.nome = ''
    this.icao = ''
    this.iata = ''
    this.cidade = ''
    this.pais = ''
  }
}
</script>
