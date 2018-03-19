new Vue({
  el: '#vue-app',
  data: {
    isLogin: false,
    todos: [],
    todosNotProgress: [],
    todosOnProgress: [],
    todosFinish: [],
    isEdit: false,
    todo: {
      title: '',
      description: '',
      dueDate: '',
    }
  },
  created: function(){
    this.checkIsLogin();
    if(this.isLogin){
      this.getTodos();
    }

  },
  methods: {
    checkIsLogin: function(){
      const token = localStorage.token;
      if (token != undefined) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    editTodo: function(payload){
      let todo = this.todos.findIndex(todo => todo._id == payload._id);
      todo = this.todos.slice(todo, todo + 1);
      this.todo = {
        _id: todo[0]._id,
        title: todo[0].title,
        description: todo[0].description,
        dueDate: todo[0].dueDate,
      };
      this.isEdit = true;
    },
    changeStatusLogin: function(){
        this.isLogin = true;
    },
    getTodos: function(){
      const app = this;
      app.isEdit = false;
      request.get('/api/todos',{headers: {token : localStorage.token}})
        .then(res => {
          app.todos = res.data.data;
          app.todosNotProgress =  [];
          app.todosOnProgress =  [];
          app.todosFinish =  [];

          app.todos.forEach(todo => {
            if(todo.status == 0) app.todosNotProgress.push(todo)
            if(todo.status == 1) app.todosOnProgress.push(todo)
            if(todo.status == 2) app.todosFinish.push(todo)
          })
          
        }).catch(err => console.log(err));
    },
    
  }

})
