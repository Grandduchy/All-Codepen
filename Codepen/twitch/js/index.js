$(document).ready(function() {
  var add;
  function getData(Streamer) {
    $.ajax({
    type:"GET",
    dataType:"jsonp",
      url:"https://api.twitch.tv/kraken/streams/"+ Streamer,
    success:function(twitch) {
      if (twitch.stream === null) {//goes to offline
        $("#offline_in").append("<div class = on_in of_in><img class = 'center img-responsive border_offline' src='http://www.pieglobal.com/wp-content/uploads/2015/10/placeholder-user.png' /><h4 class = 'center name'><a href='https://www.twitch.tv/" + Streamer + "  '>" + Streamer + "</a></h4><h5>Offline</h5></div>")
      }
      else if (twitch.error === "Unprocessable Entity") {
        $("#offline_in").append("<div class = on_in of_in><img class = 'center img-responsive border_offline' src='http://www.pieglobal.com/wp-content/uploads/2015/10/placeholder-user.png' /><h4 class = 'center name'><a href='https://www.twitch.tv/" + Streamer + "  '>" + Streamer + "</a></h4><h5>Unavailable</h5></div>")
      }
      else if (twitch.hasOwnProperty("_links")) {//goes to online
        $("#online_in").append("<div class = 'on_in'><img class='center img-responsive border' src=" + twitch.stream.channel.logo +" /><h4 class = 'center name'><a target = '_blank'href = '" +twitch.stream.channel.url +  "'>" + twitch.stream.channel.display_name + "</a></h4><h5>"+twitch.stream.channel.status+"</h5><h6> Playing : "+twitch.stream.channel.game+"</h6></div>");
        
      }
      else {
        alert("Error : "+twitch.error +"\n"+ twitch.message +"\n\nError Code : " +twitch.status);
      }
    },//success
    error:function() {
      alert("Was not able to retrive twitch data.");
    }//error
  });//ajax
  }//getData
  getData("B0aty");
  getData("MrNoSleep");
  getData("Ice_Poseidon");
  getData("WitWix");
  getData("Trihex");
  getData("Sodapoppin");
  getData("Brunofin");
  getData("FreeCodeCamp");
  
  
  $("#plus").click(function() {
    add = $("#enter").val();
    getData(add);
  });
  
  
});