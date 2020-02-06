var app = new Vue({
  mounted() {
    axios
      .get("http://194.58.107.110:3000/items/nikita")
      .then(response => (this.tasks = response.data)); //тут указано, запиши нам массив указывавем имя массива вдата
  },

  el: "#app",
  data: {
    show: false,
    tasks: [],
    description: "",
    close: false,
    deleteToDo: "",
    editTask: false
  },

  methods: {
    shouTasks: function() {
      this.show = !this.show;
    },

    doneTask: function(id, status) {
      axios.put(`http://194.58.107.110:3000/items/${id}`, { done: !status });
    },

    submitTask: function() {
      axios
        .post(`http://194.58.107.110:3000/items/`, {
          name: "nikita",
          description: this.description,
          done: false
        })
        .then(response => this.tasks.push(response.data));
    },

    deleTask: function() {
      axios
        .delete(`http://194.58.107.110:3000/items/${this.deleteToDo}`)
        .then(responce => {
          let i = 0;
          for (task of this.tasks) {
            if (task._id === responce.data._id) {
              this.tasks.splice(i, 1);
            }
            i++;
          }
          this.deleteToDo = "";
          this.close = !this.close;
        });
    },

    closeModal: function(id) {
      this.close = !this.close;
      this.deleteToDo = id;
    },

    edetClose: function(id) {
      this.editTask = !this.editTask;
    },

    editText: function(id) {
      axios.put(`http://194.58.107.110:3000/items/${id}`);
    }
  }
});
