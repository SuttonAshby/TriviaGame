$(document).ready(function(){

var triviaGame = {
	//Arrays of Questions as objects with question and array of answers paired with true/false value
	scifi: [ 
		//Question One
		{question: "What is the name of Captain Nemo's ship in Jules Vernes 20,000 Leagues Under the Sea?",
			answers: [["Nautilus", true], ["Dauntless", false], ["Marlin", false], ["Trident", false]]},
		//Question Two
		{question: "What is the subtitle of Mary Shelley's novel Frankenstein?",
			answers: [["the Modern Prometheus", true], ["Life after Death", false], ["Beware the Night", false], ["a Father's Curse", false]]},
		//Question Three
		{question: "What is the native name of Mars in Edgar Rice Burroughs' The Martian Chronicles?",
			answers: [["Barsoom", true], ["Redath", false], ["Harlan", false], ["Mars", false]]},
		//Question Four
		{question: "Which one is NOT a country in Geore Orwell's 1984?",
			answers: [["Atlantia", true], ["Oceania", false], ["Eurasia", false], ["Eastasia", false]]},
		//Question Five
		{question: "Who wrote Brave New World?",
			answers: [["Aldous Huxley", true], ["Philip K. Dick", false], ["Greg Bear", false], ["Orson Scott Card", false]]},
		//Question Six
		{question: "Which author coined the word 'grok'?",
			answers: [["Robert A. Heinlein", true], ["Ben Bova", false], ["Vernor Vinge", false], ["David Brin", false]]},
		//Question Seven
		{question: "What do the initials H. G. stand for in H. G. Wells' name?",
			answers: [["Herbert George", true], ["Howard Grant", false], ["Henry Gerard", false], ["Harvey Godfrey", false]]},
		//Question Eight
		{question: "In what 1973 story by Michael Crichton, does a futuristic theme park go haywire putting guests in danger?",
			answers: [["West World", true], ["Jurrasic Park", false], ["Lost World", false], ["Shark Land", false]]},
		//Question Nine 
		{question: "In Orson Scott Card's Ender's Game  what is the offical name of the enemy?",
			answers: [["Formics", true], ["Buggers", false], ["Xenos", false], ["Aldan", false]]},
		//Question Ten 
		{question: "What is the most valuable commodity in Frank Herbert's Dune?",
			answers: [["Spice", true], ["Melange", true], ["Palladium", false], ["Dust", false]]},
		],
	fantasy: [ 
		//Question One
		{question: "Which one is a language of the elves in Tolkien's Middle-Earth?",
			answers: [["Sindarin", true], ["Adunaic", false], ["Khuzdul", false], ["Valarin", false]]},
		//Question Two
		{question: "Who wrote A Wizard of Earthsea?",
			answers: [["Ursula Le Guin", true], ["Diana Wynne Jones", false], ["Robin McKinley", false], ["L. Frank Baum", false]]},
		//Question Three
		{question: "How many Knuts to a Sickle in Harry Potter?",
			answers: [["29", true], ["3", false], ["42", false], ["15", false]]},
		//Question Four
		{question: "What is the offical Motto of House Lannister in Game of Thrones?",
			answers: [["Hear Me Roar", true], ["A Lannister Always Pays His Debts", false], ["Truth in Gold", false], ["Strength, Purity, Honor", false]]},
		//Question Five  
		{question: "Who does NOT attend the tea party in Lewis Carroll's Alice's Adventure in Wonderland?",
			answers: [["White Rabbit", true], ["March Hare", false], ["Hatter", false], ["The Dormouse", false]]},
		//Question Six 
		{question: "What does Tarzan mean in ape?",
			answers: [["White-Skin", true], ["Man-Child", false], ["Great-One", false], ["Hairless-One", false]]},
		//Question Seven 
		{question: "What do the bears call themselves in Philip Pullman's His Dark Materials?",
			answers: [["Panserbjorn", true], ["White Warriors", false], ["Ursanai", false], ["The Flufferbuffers", false]]},
		//Question Eight 
		{question: "What is the birthplace of the White Witch from The Chronicles of Narnia?",
			answers: [["Charn", true], ["Cair Paravel", false], ["The Frost Mountains", false], ["The Forbidden Forest", false]]},
		//Question Nine  
		{question: "Which one is NOT one of Terry Pratchett's Wyrd Sisters?",
			answers: [["Sammy Persnickedy", true], ["Nanny Ogg", false], ["Granny Weatherwax", false], ["Margat Garlick", false]]},
		//Question Ten 
		{question: "What is the name of Adam's dog in Good Omens? ",
			answers: [["Dog", true], ["Cereberus", false], ["Spawn", false], ["Max", false]]},
		],
	score: 0, 
	incorrectAnswers: 0, 
	timer: 30,
	onQuestion: 0,
	notAnswered: true, //prevents picking more than once answer and accelerating the timer
	countdownID: undefined, //for clearing interval
	questions: undefined, //for determining which trivia set player is doing
	//timer and behavior for when time runs out
	decrementTimer: function(){
		if(triviaGame.timer > 1){
			triviaGame.timer--;
			$("#timer").text(triviaGame.timer + "Secs")
		} else {
			clearInterval(triviaGame.countdownID);
			$("#timer").text("Time is Up");
			$("#info").text("The correct answer is:")
			$(".true").css("background", "green")
			triviaGame.incorrectAnswers++;
			setTimeout(triviaGame.loadQnA, 1000 * 3);
		}
	},
	countdown: function(){
		triviaGame.countdownID = setInterval(triviaGame.decrementTimer, 1000)
	},
	//Loads up questions with answers in randomized order
	loadQnA: function(){
		//determines which trivia set picked and styles accordingly
		if($(this).hasClass("Science")){
			triviaGame.questions = triviaGame.scifi;
			$("h1").text("Science Fiction Literature Trivia")
			$("h1, #info, #timer, #answers, #question").css("font-family", "'Orbitron', sans-serif")
			$("h1").css("color", "white")
			$("h1").css("text-shadow", "2px 2px black")
			$("body").css("background-image", "url(assets/images/screen.png)")
		} else if ($(this).hasClass("Fantasy")){
			triviaGame.questions = triviaGame.fantasy;
			$("h1").text("Fastasy Literature Trivia")
			$("h1, #info, #timer, #answers, #question").css("font-family", "'Indie Flower', cursive")
			$("#info, #timer, #answers, #question").css("font-size", "30px")
			$("body").css("background-image", "url(assets/images/forest.jpg)")
		}
		if(triviaGame.onQuestion < 10){ //checks what question player is on if on the last question then pulls up the score and reset instead
			triviaGame.notAnswered = true;
			triviaGame.timer = 30;
			$("#info").text("Pick Your Answer")
			$("#timer").text("30Secs");
			$("#answers").empty()
			$("#question").text("")
			$(".startButton").remove()
			$("#question").text(triviaGame.questions[triviaGame.onQuestion].question);
			var randArr = [0, 1, 2, 3]; //for randomized answer order

			for(var i = 0; i < 4; i++){
				var randNum = randArr.splice(Math.floor(Math.random() * randArr.length), 1);
				var element = $("<div>");
				$(element).addClass("answerStyle");
				$(element).text(triviaGame.questions[triviaGame.onQuestion].answers[randNum][0]);
				if(triviaGame.questions[triviaGame.onQuestion].answers[randNum][1]){
					$(element).addClass("true");
				} else {
					$(element).addClass("false");
				}
				$("#answers").append(element);	
			}
			randArr = [0, 1, 2, 3]; //reset
			triviaGame.onQuestion++;
			triviaGame.countdown();
		} else {
			$("#info").text("Your score is " + triviaGame.score + ", you missed " + triviaGame.incorrectAnswers + " questions")
			triviaGame.gameRestart();
		}

	},
	gameInitialize: function(){
		$("#question").empty()
		var quizzes = ["Fantasy", "Science"]
		for(var i = 0; i < quizzes.length; i++){
		var element = $("<div>");
		$(element).addClass("startButton");
		$(element).addClass(quizzes[i])
		$(element).text(quizzes[i] + " Fiction");
		$("#answers").prepend(element);
		}
	},
	//resets score, styling and restarts game
	gameRestart: function(){
		$("h1").text("Genre Literature Trivia")
		$("h1, #info, #timer, #answers, #question").css("font-family", "'Open Sans', sans-serif")
		$("h1").css("color", "black")
		$("h1").css("text-shadow", "2px 2px white")
		$("body").css("background-image", "url(assets/images/book.jpg)")
		triviaGame.onQuestion = 0;
		triviaGame.score = 0;
		triviaGame.incorrectAnswers = 0;
		triviaGame.questions = undefined;
		$("#timer").text("");
		$("#answers").empty()
		$("#question").text("")
		var element = $("<div>");
		$(element).addClass("restartButton");
		$(element).text("Click to Restart");
		$("#question").append(element);
	},
	//logic to verify player's choice
	pickingAnswer: function(){
		if(triviaGame.notAnswered){
			if($(this).hasClass("true")){
				triviaGame.notAnswered = false;
				$("#info").text("Correct")
				$(".true").css("background", "green")
				triviaGame.score++;
				clearInterval(triviaGame.countdownID);
				setTimeout(triviaGame.loadQnA, 1000 * 3);
			} else {
				triviaGame.notAnswered = false;
				$("#info").text("Incorrect")
				$(this).css("background", "red")
				$(".true").css("background", "green")
				triviaGame.incorrectAnswers++;
				clearInterval(triviaGame.countdownID); 
				setTimeout(triviaGame.loadQnA, 1000 * 3);
			}
		}
	}

}

triviaGame.gameInitialize()
 $(".startButton").on("click", triviaGame.loadQnA);
 $("#answers").on("click", ".answerStyle", triviaGame.pickingAnswer);
 $("#answers").on("click", ".startButton", triviaGame.loadQnA);
 $("#question").on("click", ".restartButton", triviaGame.gameInitialize);

});