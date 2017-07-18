$(document).ready(function(){
	$("#questionTimer").hide();
	$("#option1").hide();
	$("#question").hide();
	$("#option2").hide();
	$("#option3").hide();
	$("#option4").hide();

	var choice ="";
	var correct=0;
	var startTime =30;
	var anySelect = false;
	var questionNumber =0;
	var countDown;
	var nextTime = 5;
	var nextTimer;
	var correctCount =0;
	var wrongCount =0;

	var win = document.createElement("audio");
	win.setAttribute("src","assets/media/pass.mp4");

	var lose = document.createElement("audio");
	lose.setAttribute("src", "assets/media/fail.mp4" );

	var gameOver = document.createElement("audio");
	gameOver.setAttribute("src", "assets/media/gameOver.mp4");

	function question(question, a, b,c,d,ans,img){

		this.question =question;
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.ans = ans;
		this.img =img;
		this.questionDisplay = function()
		{
			win.pause();
			lose.pause();
			gameOver.pause();

			$("#questionTimer").html("Time Remaining: 00:30");
			$("#question").html(this.question+ '<p>');
			$("#option1").text(this.a);
			$("#option2").text(this.b);
			$("#option3").text(this.c);
			$('#option4').text(this.d);
			$("#wholeContainer").show();
			$("#info").hide();
			this.questionTimer();
		};
		this.questionTimer = function()
		{
			startTime =30;
			countDown =setInterval(mycountDown,1000);
			function mycountDown()
			{

				startTime--;
				var sec =  startTime;
				if (startTime < 10)
				 {
					sec = "0"+ sec;
				}

				$("#questionTimer").html("Time Remaining: 00:"+sec);

				if (sec <=0) 
				{
					clearInterval(countDown);
					//submit, show answer, move to the next question
					wrongCount++;
					clearInterval(countDown);
					var correctImg = $("<img>");
					correctImg.attr("src", qArr[questionNumber].img);
					$("#wholeContainer").hide();
					lose.play();
					$("#info").show();
					$("#info").html("You did not make a selecton!! The correct choice is: "+qArr[questionNumber].ans+"<br>");
					$("#info").append(correctImg);
					 nextTimer= setInterval(nextTimeDown, 1000);

				}

			}


		};

	}


	var Q1 = new question("Anarchy is ", "A system of government where a single individual rules", "A system of government where a small group of individuals are the rulers", "A system of government where the people in general rule over themselves", "None of the above", "None of the above", "assets/images/1.jpg");
	var Q2 = new question("According to anti-federalist An Old Whig- the Constitution gives the national government too much power over states because", "the national government was given the power to replace any state governments it declares are unrepublican", " there will be far more national voters than state voters, and national voters will support the national government over the states", "there is practically no limit to the power of the national government to make any laws it wants to", "  although the states can vote to nullify federal laws Congress can override that nullification by a mere 2/3 vote", "there is practically no limit to the power of the national government to make any laws it wants to", "assets/images/2.jpg");
	var Q3 = new question("The Supreme Court case of Brown v. Board of Education declared that separate public schools for black and white children are ", "  permissible as long as the schools are “equal” in funding, facilities, and other measurable qualities ", " permissible unless students or parents at those schools objected ", "impermissible", " impermissible in elementary/high schools but were permissible in college ", "impermissible", "assets/images/3.jpg");
	var Q4 = new question("The English political philosopher Thomas Hobbes explains that when a government abuses its power, its citizens have a right to ", " negotiate with the government and ask that it stop its abuses ", "have to learn to accept a dictatorship", " replace that government with a new one ", "publicly protest and demand better treatment", "have to learn to accept a dictatorship", "assets/images/4.jpg");
	var Q5 = new question("An example of politics is: ", "  two people who completely agree over how to divide up $100 between them ", " two supervisors who completely agree over which employee should get a promotion. ", " two landowners who co-own a piece of property and who completely agree over whether the trees on the property should be cut down ", "none of the above", "none of the above", "assets/images/5.jpg");
	var Q6 = new question("The convention which drafted our current U.S. Constitution occurred in ", " Boston in 1776 ", " New York in 1776 ", "Philadelphia in 1787", " New York in 1787 ", "Philadelphia in 1787", "assets/images/6.jpg");
	var Q7 = new question("In John Adams letter to John Sullivan, he argues that poor white men should not be allowed to vote because they are like ", " Native Americans", " slaves ", "women and children", " imprisoned criminals ", "women and children", "assets/images/7.jpg");
	var Q8 = new question("Which of the following arguments is NOT an argument for a unitary system of government: ", "it maximizes the protection of liberty", " it would be more fair and equitable for the nation’s population ", " it would be more efficient ", "  it would save money", "it maximizes the protection of liberty", "assets/images/8.jpg");
	var Q9 = new question("The primary purpose of the 4th through 8th Amendments is:", "to prevent arbitrary use of government power", " to protect the sovereignty of states governments", " to protect rights that are not listed in the Constitution", " to list the powers given to Congress ", "to prevent arbitrary use of government power", "assets/images/9.jpg");
	var Q10 = new question("Since 1937, the U.S. Supreme Court has basically said the 10th Amendment: ", " prohibits Congress from regulating commerce in the states ", " prohibits Congress from regulating commerce in the states, unless the states agree to the regulation ", " prohibits Congress from regulating commerce in the states, unless another enumerated power of Congress specifically allows it ", "does not prohibit Congress from regulating commerce in the state", "does not prohibit Congress from regulating commerce in the state", "assets/images/10.jpg");
	var qArr=[Q1, Q2, Q3, Q4, Q5, Q6, Q7, Q8, Q9, Q10];


	// the start fuction
	$("#btnStart").on("click", function()
	{
		
		$("#start").hide();
		$("#questionTimer").show();
		$("#option1").show();
		$("#question").show();
		$("#option2").show();
		$("#option3").show();
		$("#option4").show();
		qArr[questionNumber].questionDisplay();
	});

	$(document).on("click", ".optionClass", function()
	{
			anySelect=true;
			console.log("clicked");
			choice = $(this).text();
			//checking if the right option is selected.
			if (choice === qArr[questionNumber].ans)
			{
				win.play();
				correctCount++;
				clearInterval(countDown);
				var correctImg = $("<img>");
				correctImg.attr("src", qArr[questionNumber].img);
				$("#wholeContainer").hide();
				$("#info").show();
				$("#info").html("Correct!! You got the answer, its: "+qArr[questionNumber].ans+"<br>");
				$("#info").append(correctImg);
				 nextTimer= setInterval(nextTimeDown, 1000);
			}
			else
			{
				//incorrect answer choice
				lose.play();
				wrongCount++;
				clearInterval(countDown);
				var correctImg = $("<img>");
				correctImg.attr("src", qArr[questionNumber].img);
				$("#wholeContainer").hide();
				$("#info").show();
				$("#info").html("Wrong Answer!! The correct choice is: "+qArr[questionNumber].ans+"<br>");
				$("#info").append(correctImg);
				 nextTimer= setInterval(nextTimeDown, 1000);
			}


	});

	//timer for the next question to display
	function nextTimeDown()
	{
			nextTime--;
			if(nextTime<=0)
			{
				questionNumber++;
				if (questionNumber< qArr.length)
				 {
					clearInterval(nextTimer);
					nextTime=5;
					qArr[questionNumber].questionDisplay();
				 }
				else
				{
					$("#wholeContainer").hide();
					$("#info").show();
					//creating the restart button
					var reStart = $("<button>");
						reStart.attr("class", "reStart");
						reStart.text("Restart");
						$("#info").html(reStart);
					$("#info").append("<p> Game Over!!<br>Right Choices: "+correctCount+"<p> Wrong Choices: "+wrongCount);

						win.pause();
						lose.pause();
						gameOver.play();
						setTimeout(stopGameOver,5000);
						function stopGameOver()
						{
							gameOver.pause();
						}

				}
			
			}
	}
		//onclick on the restart button
		$(document).on("click", ".reStart", function()
		{ 
				choice ="";
				correct=0;
				startTime =30;
				anySelect = false;
				questionNumber =0;
				nextTime = 5;
				correctCount =0;
				wrongCount =0;
				clearInterval(nextTimer);
				clearInterval(countDown);
				qArr[questionNumber].questionDisplay();

		});

});
