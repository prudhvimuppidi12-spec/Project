HTML : Provides the structural skeleton, creating the Config and Quiz containers
Css: is used for styling (i.e. purple background, color, and other styling part)
js: Manages the game state, timer logic, DOM manipulation,	and scoring.

The entry point wrapped in . config - container	. It collects user input regarding the quiz category (National vs. International) and the desired number	of questions	before the game starts.
The main game interface wrapped in . quiz - container. Initially hidden via CSS ( display : none ), it contains the HUD (heads-up display) for the timer, the question text area, and answer options.

Flexbox Centering:		The	body	uses	display : flex	to perfectly center the quiz card on the screen, regardless	of device size.
Card UI: Both containers	use	box - shadow and	border - radius	to create a modern, Visual Feedback: Interactive elements like
states using CSS transitions for a polished
feel.

Structured Object Storage
The app uses a constant object allguestions to store data. This keeps the data layer separate from the logic layer.
Keys represent categories (e.g.,  national ), and values are arrays of question objects. Each object contains the question string, an array of options, and the index of the correct answer.

Dynamic DOM Rendering

Rendering Options: The	loadguestion() function dynamically creates list items () for every answer option using document.createElement .
State Reset: Before loading a new question, reset State ()	clears the inner HTML of the answer container to prevent duplicate buttons.
Status Updates: The current	question number (e.g., "1 of 5") is updated in real-time by modifying the	innerHTML	of the status span.
Array Slicing
questions.slice(0, count) is used to limit the number of questions based on user input.

Event Delegation
Answers   become un clickable  after selection:
opt . style . pointe nEvent s
"none"

Visual Feedback
Background colors change immediately to Green (Correct) or Red (Incorrect)	upon selection.
 














# Project
Quiz Game
