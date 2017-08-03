//https://www.mediawiki.org/wiki/API:Main_page
$(document).ready(function() {
   var link,search,count = 0;
  function getSearch () {
    link = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + search + "&format=json";
      $.ajax({
        url: link,
        dataType: 'jsonp',
        type: "POST",
        success: function(data) {
                      function display () {
                for (var x = 0;x<=data[1].length -1;x++) {
               $("#jkl").append("<div class = 'search_result'> <a target = '_blank'href='" + data[3][x] + "'><h2>" + data[1][x] + "</h2></a><br> <p>" + data[2][x] + "</p>        </div>");
                }//for
             }
          
          if (count == 0) {
          setTimeout(function() {
            $("#jkl").html("<h4 class='searchtopic'>Search results for "+ search+"</h4>");
            $(".searchtopic").addClass("border");
            count++;
           
             display();

          },4000)//timeout
          };//if

           if (count != 0) {
             $("#jkl").html("<h4 class='searchtopic'>Search results for "+ search+"</h4>");
            $(".searchtopic").addClass("border");
             display();
              }//if
        },//success
        error:function() {
        alert("Was not able to obtain Data.");
      }//error
     });//ajax 
    return false;
 }//getSearch
  
  $("#search").click(function() {
    search = $("#enter").val()
    if (search == "") {
      alert("Enter text to search.");
      return false;
    }
    if (count == 0) {
      $("#main").addClass("animate");
    }
    getSearch();
  });
  
  
  
  $("#question").click(function() {
    alert("The Wikipedia Viewer is a way to browse Wikipedia in a stylish way.\n\n Simply search any topic or article that interests you, and articles from Wikipedia returns. \n\n Afterwards choose what you are looking for to be redircted to the article.");
  });//question
  
});