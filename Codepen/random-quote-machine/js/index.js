var cont = "True wisdom comes to each of us when we realize how little we understand about life, ourselves, and the world around us.".replace(/\s+/gi, "%20");
var auth = "Socrates".replace(/\s+/gi, "%20");
function Range(Min, Max) {
  return Math.floor(Math.random() * (Max - Min + 1)) + Min;
}
$(document).ready(function () {
  $("#twitt").attr("href",  "https://twitter.com/intent/tweet?text="+ cont + "%0A" + "-" + auth);
  $("button").mouseenter(function() {
    $(this).fadeTo('fast',0.5);
  });
  $("button").mouseleave(function() {
    $(this).fadeTo('350', 1);
  })
 $("#quote").click(function() {
   x = Range(0,30);
   $.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=30", function(a) {
     $("#enter").html("<span style='font-size:24px; color:white'>" + a[x].content + "</span>" + "<p style='color:white'>— " + a[x].title + "</p>");
     
        cont = a[x].content.replace(/\s+/gi, '%20');
     //cont = cont.replace(/<\/?[^>]+(>|$)/g, "");
     cont = cont.replace(/(<\/?p>)|(<\/?strong>)|(<\/?em>)/,"");
     auth = a[x].title.replace(/\s+/gi, '%20');
       $("#twitt").attr("href",  "https://twitter.com/intent/tweet?text="+ cont + "%0A" + "-" + auth);
    });
 });
  /*https://twitter.com/intent/tweet?text=
*/
})