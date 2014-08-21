var todo_tmpl = [
  "<%_.each(tasks, function(element, index, list){ %>",
    "<li data-taskid=\"<%= element._id %>\"><p><img src=\"images/vh8dRvC.png\" id=\"check\"><span><%= element.task %></span><input style=\"display: none\" type=\"text\" class=\"edit\" name=\"task\" placeholder=\"<%=element.task%>\"><img src=\"images/C9u1sfv.png\" id=\"X\"</p></li>",



    "<%});%>",
].join("\n");
