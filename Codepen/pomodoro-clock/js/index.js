$(document).ready(function() {
  var breaks = 5,session = 25, on_off = true,
      timer, end = 00,total_session = 25,
      on = false, total_breaks = 5;
  /*Buttons */
  
  function display () {
    if (on) {
      $("#name").html("<h3 class = 'color' id = 'name'>Break</h3>");
    }
    else {
      $("#name").html("<h3 class = 'color' id = 'name'>Session</h3>");
    }
    $("#p_bre").html("<p class = 'side' id = 'p_bre'>"+total_breaks+"</p>");//buttons
    $("#p_ses").html("<p class = 'side' id = 'p_bre'>"+total_session+"</p>");//buttons
    if (end.toString().length == 1) {
      $("#timer").html("<h2 id = 'timer'>"+session+":0"+end+"</h2");
    }
    else {
    $("#timer").html("<h2 id = 'timer'>"+session+":"+end+"</h2");
    }
  }
  $("button:not(.in_clock)").click(function() {
    clearInterval(timer);
  });
  $("#bk_minus").click(function() {
    if (breaks <= 1 ) {
      breaks = 1;
      end = 00;
      return;
    }
    else {
      total_breaks = breaks;
      end = 00;
      breaks--;
      display();
    }
  })//minus
  $("#bk_plus").click(function() {
   if (breaks.length >= 3) {
     breaks = 5;
     end = 00;
     return;
   }
    total_breaks = breaks;
    breaks++;
    display();
  });//plus
  $("#se_minus").click(function() {
    if (session <= 1 ) {
      session = 1;
      end = 00;
      return;
    }
    end = 00;
    session--;
    total_session = session;
    display();
  });//minus
  $("#se_plus").click(function() {
    if (session.length >= 3) {
      session = 25;
      end = 00;
      return;
    }
    session++;
    total_session = session;
    display();
  });
  /*Buttons End */
  $("#in_clock").dblclick(function() {
    return;
  });
  $("#in_clock").click(function() {
    if (on_off) {//on_off determines if it is to be paused or not.
      on_off = false;
        timer = setInterval(function() {
        if (end == 0 && session != 0) {
          end = 59;
          session--;
        }
       if (end == 0 && session == 0) {
          end = 59;
          session = 0;
       }
       if (session <= 0 && end <= 1) {//kills 00:00
         if (breaks !== 0 && on == false) {// on session, goes to break
           on = true;
           session = breaks;
           display();
         }
         else if (breaks !== 0 && on == true) {//on break, goes to session
           on = false;
           session = total_session;
           display();
         }
         else {
         clearInterval(timer);
         }
       }//end, 00:00
       end--;
       display();
    },1000);
    timer;
    }//if
    else {
      clearInterval(timer);
      on_off = true;
    }
  });
});