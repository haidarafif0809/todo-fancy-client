Vue.component('todo-form',{
  template: `
            <div class="col-md-3 ">
              <div class="form-group">
                <label>Title</label>
                <input type="text" v-model="todo.title" class="form-control" >
              </div>
              <div class="form-group">
                <label>Due Date</label>
                <input type="text" v-model="todo.dueDate" class="form-control" >
              </div>
              <div class="form-group">
                <label>Description</label>
                <input type="text"  v-model="todo.description" class="form-control" >
              </div>
              <button @click="submitTodo" class="btn btn-primary btn-block"v-if="!edit">Submit</button>
              <button  class="btn btn-warning btn-block" v-if="edit" @click="updateTodo">Submit Edit</button>
              <button  class="btn btn-danger btn-block"v-if="edit" @click="cancelEdit">Cancel</button>
            </div>
  `,
  props: ['todo','edit'],
  methods: {
    updateTodo: function(){
      const app = this;
      request.put(`/api/todos/${this.todo._id}`,this.todo, {headers: {token : localStorage.token}})
        .then(res => {
          app.clearForm();
          app.edit = false;
          app.$emit('create-todo')
          
        }).catch(err => console.log(err));
    },
    submitTodo: function(){
      const app = this;
      request.post('/api/todos',this.todo, {headers: {token : localStorage.token}})
        .then(res => {
          app.clearForm();
          app.$emit('create-todo')
          
        }).catch(err => console.log(err));
    },
    cancelEdit: function(){
      this.edit = false;
      this.clearForm()
    },
    clearForm: function(){
      this.todo.title = '';
      this.todo.description = '';
      this.todo.dueDate = '';
    },
  }

})

Vue.component('todo-list',{
  template: `
              <div class="list-group ">
                <div  class="list-group-item list-group-item-action flex-column align-items-start " v-for="todo in todos">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{ todo.title }}</h5>
                  </div>
                    <small >{{ new Date(todo.dueDate).toDateString() }}</small>
                  <p class="mb-1">{{ todo.description }}</p>
                  <div>
                  <button class="btn btn-danger btn-sm" @click="backTodo(todo._id)" v-if="todo.status >= 1"> Back </button>
                  <button class="btn btn-danger btn-sm" disabled="" v-else> Back </button>
                  <button class="btn btn-warning btn-sm" @click="nextTodo(todo._id)" v-if="todo.status <= 1"> Next </button>
                  <button class="btn btn-warning btn-sm" disabled="" v-else> Next </button>
                  </div>

                  <div style="margin-top: 5px" >
                  <button class="btn btn-danger btn-sm" @click="deleteTodo(todo._id)" > Delete </button>
                  <button class="btn btn-success btn-sm" @click="updateTodo(todo._id)" > Update </button>
                  </div>
                </div>
              </div>
  `,
  props: ['todos'],
  methods: {
    nextTodo: function(_id){
      const app = this;
      request.get(`/api/todos/${_id}/complete`, {headers: {token : localStorage.token}})
        .then(res => {
          console.log(res.data)
          app.$emit('move-todo')
        }).catch(err => console.log(err));
    },
    backTodo: function(_id){
      const app = this;
      request.get(`/api/todos/${_id}/uncomplete`, {headers: {token : localStorage.token}})
        .then(res => {
          console.log(res.data)
          app.$emit('move-todo')
        }).catch(err => console.log(err));
    },
    deleteTodo: function(_id){
      const app = this;
      request.delete(`/api/todos/${_id}`, {headers: {token : localStorage.token}})
        .then(res => {
          console.log(res.data)
          app.$emit('move-todo')
        }).catch(err => console.log(err));
    },
    updateTodo: function(_id){
      const app = this;
      app.$emit('update-todo',{ _id: _id });
    },
  }


})
