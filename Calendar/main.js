$(document).ready(function() {
	(function changeBackground(m) {
		if (m == undefined) {
			var date = new Date;
		date = Number(date.getDay());
		}
		switch(date) {
			case 0:
			$("body").css("background-image","url('http://i.imgur.com/R7Jq21T.gif')")
				break;
			case 1:
				$("body").css("background-image","url('http://i.imgur.com/ziv5GAK.gif')")
				break;
			case 2:
				$("body").css("background-image","url('http://i.imgur.com/aWkfKHH.gif')")
				break;
			case 3:
			console.log("hi");
				$("body").css("background-image","url('http://i.imgur.com/qw9VJb4.gif')")
				break;
			case 4:
				$("body").css("background-image","url('http://i.imgur.com/3zhrPjr.gif')")
				break;
			case 5:
				$("body").css("background-image","url('http://i.imgur.com/8GqeXI1.gif')")
				break;
			case 6:
				$("body").css("background-image","url('http://i.imgur.com/gbiDcAD.gif')")
				break;
			case 7:
				$("body").css("background-image","url('http://i.imgur.com/bQqVe0A.gif')")
				break;
			default: $("body").css("background-image","url('http://i.imgur.com/MLBg6Ug.gif')")
			break;
		}
		
	})()
	$(".calendar").append("<div class = 'add_delete'><button class = 'btn' id = 'close'>X</button><div class = 'add'></div><div class = 'delete'></div></div>");
	function add (day,month) {
		day = Number(day);
		if ( !(/\d/.test(day)) ) {
			
			throw new Error("dayNumber did not have a number to get the day, recieved "+typeof day+" with a value of "+day);
		}
		$(".add").html(`<form>
		<h3>Add Infomation</h3>
		<textarea style = 'color:black' rows = '5' cols='50' id = 'save_info'>Input information you want to save on calendar.\nOnly one item at a time.</textarea>
		<button class = "btn-primary" id = 'save_button'>Save</button>
		</form>`)
	}
	function deleteInfo () {
		$(".delete").html(`<form>
		<h3>Delete Infromation</h3>
		<h5>Note - Deletes all items in the day selected.</h5>
		<button class = "btn-danger" id = "delete_button">Delete</blutton>
		</form>`)
	}
	var current = {
		interface: false
	}
	var kol;
	$(".day").on("click", function () {// when the user clicks on a day, an interface will need to show.
		if ($(".add_delete").height() >=10 || current.interface === true) {//check if the interface is already there
			console.log(".add_delete is still present on page.");
			return;
		}else if ($(this).attr("data-day") === null || $(this).attr("data-day") === undefined) {// checks if the user clicked on a future day or previous days.
			return;
		}else {
			current.interface = true;
			current.day = $(this).find("h5").text();
			current.month = $(".title").find("h1").text().trim();
			$(".add_delete").css("display","block");
			$(".add_delete").addClass("add_delete_animation");
			setTimeout(()=> {
				$(".add").css("display","block");
				$(".delete").css("display","block");
				add(current.day);
				deleteInfo();
				stnd = $("#save_info").val();
			},2000)
		}
	})
	
	$(document).on("click","#close", function () {//when the user wants to close the window
		if (current.interface === true || $(".add_delete").height() >= 10) {// if interface is there
			$(".add_delete").removeClass("add_delete_animation");
			$(".add_delete").css("display","none");
			$(".add").css("display","none");
			$(".delete").css("display","none");
			current.interface = false;
		}else {
			throw new Error("expected interface to close instead there is an interface");
		}
	})
	
	$(document).on("click","#save_button",function() {// when the user wants to save some info he put.
		if (!current.day) {
			throw new Error("No day was selected to save");
		}else {
			current.description = $("#save_info").val();
			if (current.description !== stnd && current.description !=="" ) {
				$.post("http://localhost:8000",current);
			}else {
				return 0;
			}
		}
		
	})
	$(document).on("click","#delete_button", function () { //when the user clicks the button so the stuff in that day deletes
		if (!current.day) {
			throw new Error("No day was selected to delete");
		}
		$.ajax({
			url:"http://localhost:8000?day=" + current.day + "&month=" + current.month,
			type:"DELETE",
			success : function (data) {
			},
			error : function (err) {
				if (err) {
					throw err;
				}
				else {
					throw new Error("Problem deleting items in selected day.");
				}
			}
		})
	});
	function getDesc(day,month) {
		if (typeof day !== "number") {
			throw new Error("Expected number instead recieved "+ typeof day);
		}else {
			$.ajax({
				url:"http://localhost:8000/desc?day="+day + "&month="+month,
				type:"GET",
				success: function (data) {
					console.log(data);
				},
				error : function (err) {
					if (err) throw err;
					else {
						throw new Error("Problem getting desc for specific day.")
					}
				}
			})
		}
	}
	getDesc(9,"December");
})