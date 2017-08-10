var userPic;
var buttonIds=6;

 function doVote(elemId, action) {
 	/*
		0 - upvote
		1 - devote
 	*/
 	//alert(elemId + " " + action);
 	if (document.getElementById(elemId) == null) return;
 	var buttonText = document.getElementById(elemId).innerHTML;
 	var vote;
 	var voteSign;
 	if (action == 0) {
 		// + upvote
 		vote = buttonText.split("+");
 		voteSign = "+";
 	} else {
		vote = buttonText.split("-");
		voteSign = "-";
 	}
 	var voteCount = vote[0];
 	//alert(voteCount);
		if (voteCount == null) {
			voteCount = 1;
		} else {
			voteCount++;
		}

		console.log("dbg doVote id: " + elemId);

	document.getElementById(elemId).innerHTML = voteCount + voteSign + (action == 0 ? " upvote" : " devote");
}

function removePost(elemId) {
	console.log("element to remove: " + elemId);
	document.getElementById(elemId).remove();
	document.getElementById("cnt").innerHTML = parseInt(document.getElementById("cnt").innerHTML) - 1;
}

	function handleFileSelect(evt) {
		
		var file = evt.target.files[0];
		console.log("dbg [image]: " + file.name);
		userPic = file;
	}

function handleIt(isDataFromJson, p_pic, p_topic, p_content) {
    //alert("dbg" + document.myform.title.value);
    var ul = document.getElementById("posts");
	var li = document.createElement("li");
	var pic = document.createElement("img");
	var topic = document.createElement("label");
	var content = document.createElement("p");
	var buttonUpvote = document.createElement("button");
	var buttonDownvote = document.createElement("button");
	var buttonRemovePost = document.createElement("button");
	var divBlock = document.createElement("div");

		//alert("dbg: " + userPic.name);

	if (!isDataFromJson) {
	    if (FileReader && userPic) {
	        var fr = new FileReader();
	        fr.onload = function () {
	            pic.src = fr.result;
	        }
	        fr.readAsDataURL(userPic);
	    }
	    pic.src = userPic;
	} else {
		pic.src = p_pic;
	}

	
	pic.style.height = '80px';
	pic.style.width = '80px';
	
	divBlock.setAttribute("id", "d" + buttonIds);


	buttonUpvote.setAttribute('style','pure-button');
	buttonUpvote.setAttribute("id", "b" + buttonIds);
	buttonIds++;
	buttonUpvote.innerHTML = "+ upvote";


	buttonDownvote.setAttribute('style','pure-button');
	buttonDownvote.setAttribute("id", "b" + buttonIds);
	buttonIds++;
	buttonDownvote.innerHTML = "- downvote";

	buttonRemovePost.setAttribute('style','pure-button');
	buttonRemovePost.setAttribute("id", "r" + buttonIds);
	buttonIds++;
	buttonRemovePost.innerHTML = "remove post";

	if (!isDataFromJson) {
		topic.innerHTML = document.myform.topic.value;
		content.innerHTML = document.myform.content.value;
	} else {
		topic.innerHTML = p_topic;
		content.innerHTML = p_content;
	}

	divBlock.appendChild(pic);
	divBlock.appendChild(topic);
	divBlock.appendChild(content);
	divBlock.appendChild(buttonUpvote);
	divBlock.appendChild(buttonDownvote);
	divBlock.appendChild(buttonRemovePost);
	li.appendChild(divBlock);
	ul.appendChild(li);

	showNotification();

	console.log("start button id: " + buttonIds);

	var btnUpvoteId;
	var btnDevoteId;

	buttonIds = buttonIds - 3;

	btnUpvoteId = "b" + buttonIds; 
	console.log("dbg [upvote id]: " + btnUpvoteId);
	document.getElementById(btnUpvoteId).addEventListener("click", function() {
		doVote(btnUpvoteId, 0)
	});

	buttonIds = buttonIds + 1;
	btnDevoteId = "b" + buttonIds; 
	console.log("dbg [devote id]: " + btnDevoteId);
	document.getElementById(btnDevoteId).addEventListener("click", function() {
		doVote(btnDevoteId, 1)
	});

	buttonIds = buttonIds + 1;
	console.log("\ndbg remove element function: " + "r" + buttonIds);
	document.getElementById("r" + buttonIds).addEventListener("click", function() {
		removePost(divBlock.getAttribute("id"));
	});

	buttonIds = buttonIds + 1;

	document.getElementById("cnt").innerHTML = parseInt(document.getElementById("cnt").innerHTML) + 1;

}

function showNotification()
{
    var divNotification = document.getElementById("notify");
    divNotification.className="alert-box success show";
    setTimeout(function() {
	     divNotification.className="hide";
    }, 3000);
}

function importJsonDataFromFile(evt) {
	var file = evt.target.files[0];
	
 	fr = new FileReader();
    fr.onload = function() {
    	var text = fr.result;
    	var jData = JSON.parse(text);
    	console.log("dbg1: " + jData.posts.length);
  		for (var i=0; i<jData.posts.length; i++) {
  			handleIt(true, jData.posts[i].pic, jData.posts[i].topic, jData.posts[i].content)
  		}

    }
    fr.readAsText(file);
}
