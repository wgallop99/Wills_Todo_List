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
        active: true,

      }
      myTodo.createTask(newTask);
      $('.task').val('');

    });

    $('.form_container').on('click', '.X', function () {
      var taskId = $(this).closest('li').data('taskid');
      console.log(taskId);
      myTodo.deleteTask(taskId);

    });

    $('.form_container').on('click', '.check', function () {
      console.log('click');
      $(this).closest('p').toggleClass('done');
      $(this).closest('li').toggleClass('checked');

    });

    $('.form_container').on('dblclick', 'li', function () {
      console.log("double click");
      $(this).children('p').children('input').show();
      $(this).children('p').children('button').show();
      $(this).children('p').children('span').hide();
    });

    $('.todo_list').on('click', 'button', function (event) {
      event.preventDefault();
      console.log('update');
      var taskId = $(this).parent('p').parent('li').data("taskid");
        var updatedTask = {
          task: $(this).parent('p').find('.edit').val(),
          active: true,
        };
        myTodo.updatedTask(taskId, updatedTask);

    $(this).parent('input').addClass("hide");

    });

    $('.bottom-bar').on('click', '#completed', function(event){
      event.preventDefault();
      console.log('click');
      $('.todo_list').children('.checked').removeClass('active').removeClass('hide');
      $('.todo_list').children('.active').addClass('hide');
    });
    $('.bottom-bar').on('click', '#active', function(event){
      event.preventDefault();
      $('.todo_list').children('.checked').addClass('hide');
      $('.todo_list').children('.active').removeClass('hide');

    });

    $('.bottom-bar').on('click', '#all', function(event) {
      event.preventDefault();
      $('.todo_list').children('li').removeClass('hide');
    });

    // $('.bottom-bar').on('click', 'button', function (event) {
    //   event.preventDefault();
    // //   if()
    // //
    // // });

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


    updatedTask: function (taskId, updatedTask) {

      $.ajax({
      url: myTodo.url + "/" + taskId,
      type: "PUT",
      data: updatedTask,
      success: function (response) {
        console.log(response);
        myTodo.getTasks();
      }
    });

    }

};

// <input type=\"text\" class=\"edit\" name=\"task\" placeholder=\"<%=element.task%>\">
