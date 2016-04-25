<html>
	<head>
		<style>
			h1 { font-size: 36px; }
			h2 { font-size: 20px; }
			h2 { font-size: 26px; }
			p { font-size: 16px; }
			#poll_results div { background-color: #FFFFFF; margin-left: 4%; margin-right: 4%; margin-bottom: 1px; height: 25px; text-align: center;}
			#piechart { position: relative; height: 250px; width: 250px; border: 1px solid red; bottom:25%; left:50%;}
			#choicemenu { padding-left: 50px; padding-top: 50px;}
			#submitvote { background-color: #0000FF; color: #FFFFFF; }
			#sharetwitter { background-color: #6F6FFF; color: #FFFFFF; }
			.center { color:black; margin-left: 15%; margin-right: 15%; }
			.bgcolor { background-color: #E8E8E8; }
			.top { text-align: right; height: 40px; }
			.top div { width: 100px; height: 40px; display: inline-block; text-align: center; line-height: 40px; }
			.middle { height: 450px; }
			.bottom { }
			.spacer { height: 20px; background-color:#FFFFFF; }
			.endDiv { width: 150px !important;}
			.currentPage { background-color:#c2c2c2; }
			.hidden { display: none !important; }
			
		</style>
		<script>
			function generatePoll(id, title)
			{
				document.getElementById('poll_results').innerHTML += "<div><a href='http://happpypr.herokuapp.com/voting/polls/"+id+"'>"+title+"</a></div>";
				//poll_results
			}
			function startup()
			{
				//for (var i=0; i<1; i++)
				//{
				//	generatePoll('yPUXZS6RuZECDxztw', 'Example Line '+i);
				//}
				alert(resultsidSQL);
			}

		</script>
	</head>
	<body onload='startup();'>
		<div class='center'>
			<div class='top bgcolor'>
				<a href="http://happpypr.herokuapp.com/voting/polls"><div class='currentPage'>Home</div></a>
				<a href="http://happpypr.herokuapp.com/voting/mypolls"><div class='hidden'>My Polls</div></a>
				<a href="http://happpypr.herokuapp.com/voting/newpoll"><div class='hidden'>New Poll</div></a>
				<a href=""><div class='endDiv'>Sign in with Twitter</div></a>
			</div>
			<div class='spacer'></div> 
			<div class='middle bgcolor'>
				<div id='choicemenu'>
					<p>
						I'd like to vote for...:
					</p>
					<select>
						<div id='poll_results'> 
						
						</div>
						<?php echo 'Do you see me? '?> 	
						<option value="custom">I'd like a custom option.</option>
					</select>
					<p>
						<button id="submitvote"> 
							<a>Submit</a>
						</button>
					</p>
					<p>
						<button id="sharetwitter"> 
							<a>Share on twitter</a>
						</button>
					</p>
				</div>
				<div id='piechart'>
					This is where the chart will go.
				</div>
			</div>
			<div class='spacer'></div> 
			<div class='bottom'>
				<p>
					This "Voting App" app is built by @happpyier of freecodecamp,<br/>following the instructions of "Basejump: Build a Voting App | Free Code Camp".<br/>Github repository: happpyier/happpypr
				</p>
			</div>
		</div>
	</body>
</html>