console.log('The Iron Yard Rocks');

$(document).ready(function () {
  myTodo.init();
});

var myTodo = {

  init: function () {
    this.initStyling();
    this.initEvents();
  },

  initStyling: function () {
    myTodo.getTasks();
  },

  initEvents: function () {

    $('.make_list').on('submit', function (event) {
      event.preventDefault();
      console.log('submit');
      var newTask = {
        task: $(".task").val(),

      }
      myTodo.createTask(newTask);

    });

    $('.form_container').on('click', '#X', function () {
      var taskId = $(this).closest('li').data('taskid');
      console.log(taskId);

      myTodo.deleteTask(taskId);

    });

    $('.form_container').on('click', '#check', function () {
      console.log('click');
      $(this).closest('p').toggleClass('done');

    });

    $('.form_container').on('dblclick', 'span', function () {
      console.log("double click");
      $(this).addClass("hide");
      $(this).children("span").addClass("edit");
    });



  },

  render: function (template, data, $target) {

    var markup = _.template(template, data);

    $target.html(markup);
  },

    url: "http://tiy-fee-rest.herokuapp.com/collections/willstodo",

    getTasks: function () {
      $.ajax({
      url: myTodo.url,
      type: 'GET',
      success: function (response) {
        var tasks = window.tasks = response;

        myTodo.render(todo_tmpl, tasks, $(".todo_list"));
        }
      });
    },

    createTask: function (newTask) {

       $.ajax({
        url: myTodo.url,
        data: newTask,
        type: 'POST',
        success: function (response) {
          myTodo.getTasks();
        }
      });
    },


    deleteTask: function (taskId) {

      $.ajax({
      url: myTodo.url + "/" + taskId,
      type: 'DELETE',
      success: function () {
          myTodo.getTasks();
        }
    });

    },


    updateTask: function (taskId, updatedTask) {

      $.ajax({
      url: myTodo.url + "/" + taskId,
      type: "PUT",
      data: updatedTask,
      success: function (response) {
        // something goes here
        console.log(response);
        myTodo.getTasks();
      }
    });



    }

};
