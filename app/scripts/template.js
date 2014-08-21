var todo_tmpl = [
  "<%_.each(tasks, function(element, index, list){ %>",
    "<li class=\"active\" data-taskid=\"<%= element._id %>\"><p>",
    "<img src=\"images/vh8dRvC.png\" class=\"check\">",
    "<span><%= element.task %></span><img src=\"images/C9u1sfv.png\" class=\"X\">",


    "<input style=\"display: none\" type=\"text\" class=\"edit active\" name=\"editTask\" placeholder=\"<%=element.task%>\"><button style=\"display: none\">Update</button>",


        "</p>",

      "</li>",

    "<%});%>",
].join("\n");


// style=\"display: none\"
