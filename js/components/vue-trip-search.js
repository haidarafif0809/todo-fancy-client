Vue.component('app-search-trip',{
  template: `
    <div class="row" style="margin-bottom: 30px">
      <div class="col-md-12 ">
        <h4> Search Tikcet Info </h4>
        <div class="card">
          <div class="card-body row">
            <div class="row">
              <div class="form-group col-md-3">
                <label>Dari </label>
                <select class="form-control" v-model="search.departure">
                  <option :value="air.airport_code" v-for="air in airports">({{ air.airport_code }}) {{ air.airport_name }}</option>
                </select>
              </div>
              <div class="form-group col-md-3">
                <label>Ke</label>
                <select class="form-control" v-model="search.arrived">
                  <option :value="air.airport_code" v-for="air in airports">({{ air.airport_code }}) {{ air.airport_name }}</option>
                </select>
              </div>
              <div class="form-group col-md-2">
                <label>Pergi </label>
                <input type="date" class="form-control" v-model="search.date">
              </div>
              <div class="form-group col-md-2">
                <label>Pulang</label>
                <input type="date" v-model="search.ret_date" class="form-control">
              </div>
              <div class="form-group col-md-2">
                <button  class="btn btn-warning btn-block" @click="searchFlight" style="height: 100%; ">Cari </button>
              </div>
            </div>
          </div>
        </div>
        <h5 v-if="loading"> Getting Data .. </h5>
        <h5 v-if="flights.departures.length">Departures</h5>
        <table class="table " v-if="flights.departures.length">
          <thead>
            <th> Pesawat </th>
            <th> Pergi </th>
            <th> Tiba </th>
            <th> Transit </th>
            <th> Harga </th>
            <th> Action </th>
          </thead>
          <tbody>
            <tr v-for="flight in flights.departures">
              <td>{{ flight.airlines_name }}</td>
              <td>{{ flight.simple_departure_time }}</td>
              <td>{{ flight.simple_arrival_time }}</td>
              <td>{{ flight.stop }}</td>
              <td>{{ flight.price_value }}</td>
              <td><button class="btn btn-primary" @click="saveFlight(flight)">Save</button></td>
            </tr>
          </tbody>
        </table>
        <h5 v-if="flights.returns.length">Returns</h5>
        <table class="table " v-if="flights.returns.length">
          <thead>
            <th> Pesawat </th>
            <th> Pergi </th>
            <th> Tiba </th>
            <th> Transit </th>
            <th> Harga </th>
            <th> Action </th>
          </thead>
          <tbody>
            <tr v-for="flight in flights.returns">
              <td>{{ flight.airlines_name }}</td>
              <td>{{ flight.simple_departure_time }}</td>
              <td>{{ flight.simple_arrival_time }}</td>
              <td>{{ flight.stop }}</td>
              <td>{{ flight.price_value }}</td>
              <td><button class="btn btn-primary" @click="saveFlight(flight)">Save</button></td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-primary" @click="clearSearch" v-if="flights.departures.length"> Clear </button>
      </div>
    </div>
  `,
    data () {
      return {
        airports: [],
        search: {
          departure: null,
          arrived: null,
          date: null,
          ret_date: null
        },
        flights: {
          departures: [],
          returns: []
         },
        loading: false
      }
    },
    mounted: function(){
      this.fetchAirports()
    },
    methods: {
       clearSearch (flight) {
         this.flights.departures = [];
         this.flights.returns = [];
       },
       saveFlight (flight) {
         this.$emit('save-flight',flight)
       },
      fetchAirports () {
        const app = this
        request.get('/api/tikets/airports').then(res => {
          app.airports = res.data.all_airport.airport;
        }).catch(err => console.log(err))
      },
      searchFlight () {
        const app = this
        app.loading = true;
        request.post('/api/tikets/search', this.search).then(res => {
          app.flights.departures = res.data.departures.result;
          app.flights.returns = res.data.returns.result;
          app.loading = false
        }).catch(err => console.log(err))
      },
    }
})

