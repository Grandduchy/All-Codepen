$(document).ready(function() {
  function equalize (num) {
    var Obj = new BigEval();
    var result = Obj.exec(num);
    return result;
  }
  var result = "", totalresult = "",
      otherresult="",liminator,counter=0,ln = 0;
  $(".num").click(function() { //Numbers
    if ($(this).attr("value") === "0") {
          if ($(".p").text() == 0 && $(".p").text().length == 1) {//check if its only 0
      return;
     }
    }
    ln++;
    if (result.length >13) {
      result = "";
      totalresult="";
      otherresult = "";
      counter = 0;
      alert("Number limit reached.")
    }
    
    result += $(this).attr("value");
    otherresult = result;
    if (totalresult == "") {
      liminator = "0"
    }
    else {
      liminator = totalresult;
    }
    $(".calcu").html("<p class = 'p2'>" + liminator + "</p>");
    $(".input").html("<p class = 'p'>" + result + "</p>");
    
    
  });//.num end
  
  $(".opp").click(function() { //Operators
    if ($(".p").text() == 0 && $(".p").text().length == 1) {
      return;
    }
    else if (/[0123456789]$/.test($(".p").text() )  === false) { //check if the last is a numb
      return;
    }
    if (counter !== 0 ) {
    result += $(this).attr("value");
    otherresult = result;
      totalresult  = totalresult + $(this).attr("value");
    $(".calcu").html("<p class = 'p2'>" + totalresult + "</p>");
    $(".input").html("<p class = 'p'>" + result + "</p>");
    result = "";
      counter = 0;
      return;
    } 
        result += $(this).attr("value");
    otherresult = result;
    totalresult += otherresult; 
    $(".calcu").html("<p class = 'p2'>" + totalresult + "</p>");
    $(".input").html("<p class = 'p'>" + result + "</p>");
    result = "";
    
  }); //Opp end
  
  $("#clear").click(function() {//AC
    result = "";
    totalresult="";
    otherresult = "";
    $(".input").html("<p class = 'p'>0</p>");
    $(".calcu").html("<p class = 'p2'>0</p>");
    counter= 0;
  }) //AC end
  
  $("#decimal").click(function() {//Decimal
     if (/[123456789]$/.test($(".p").text() )  === false) { 
      return;
    }
    
    result += $(this).attr("value");
    $(".input").html("<p class = 'p'>" + result + "</p>");
  })

   $("#back").click(function() {//back
              if ($(".p").text() == 0 && $(".p").text().length == 1) {
      return;
              }
     
     if (result.length !== 0) {
            result = result.split("").slice(0,result.length-1).join("");
     $(".input").html("<p class = 'p'>" + result + "</p>");
       return;
     }
     
     if (totalresult.length !== 1) {
      totalresult = totalresult.split("").slice(0,result.length -1).join(""); 
       $(".calcu").html("<p class = 'p2'>" + totalresult + "</p>");
       $(".input").html("<p class = 'p'></p>")
     }
     else {
           result = "";
    totalresult="";
    otherresult = "";
    $(".input").html("<p class = 'p'>0</p>");
    $(".calcu").html("<p class = 'p2'>0</p>");
    counter= 0;
       return;
     }

   })//back
   
   $("#equal").click(function() {
     if (result.charAt(result.length-1) == ("÷"||"*"||"-"||"+")) {
       return;
     }
         if ($(".p").text() == 0 && $(".p").text().length == 1) {
      return;
    }
     if (/\.$/.test(result)) {
        result = result.split("").splice(0,result.length-1).join("");
       $(".input").html("<p class = 'p'>" + result + "</p>");
     }
     if (/[\*÷\-\+]$/.test(result)) {
       return;
     };
     if (ln == 0) {
       return;
     }
     ln = 0;
     totalresult += $(".input").text();
     totalresult = totalresult.replace(/÷/gi,"/");
     var answer = equalize(totalresult);
     totalresult = totalresult.replace(/\//gi,"÷");
     answer = answer.replace(/\//gi,"÷");
     result = answer
     $(".calcu").html("<p class = 'p2'>" + totalresult +"="+answer+ "</p>");
     $(".input").html("<p class = 'p'>" + answer + "</p>")
     totalresult = answer;
     otherresult = "";
     counter++;
   });
});