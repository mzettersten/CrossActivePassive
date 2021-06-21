/**
 * Selection Learning
 * plugin for active selection trials in cross-situational word learning study (crossAct, crossActivePassive)
 * Martin Zettersten
 */

jsPsych.plugins['selection-learning'] = (function() {

  var plugin = {};
  
  jsPsych.pluginAPI.registerPreload('selection-learning', ['image1','image2','image3','image4','image5','image6','image7','image8'], 'image');
  jsPsych.pluginAPI.registerPreload('selection-learning', ['label1','label2','label3','label4','label5','label6','label7','label8'], 'audio');
  
  plugin.info = {
    name: 'selection-learning',
    description: '',
    parameters: {
        canvas_size: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Canvas size',
          array: true,
          default: [1024,700],
          description: 'Array specifying the width and height of the area that the animation will display in.'
        },
        image_size: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Image size',
          array: true,
          default: [150,150],
          description: 'Array specifying the width and height of the images to show.'
        },
      audio: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Audio?',
        default: "true",
        description: 'If true, audio is played.'
      },
     question1: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Question 1',
        default: "Click on the alien you want to learn about next.",
        description: 'Selection instructions'
      },
	  question2: {
         type: jsPsych.plugins.parameterType.STRING,
         pretty_name: 'Question 2',
         default: null,
         description: 'prompt text'
       },
 	  learningText: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Learning Text',
          default: 'Click start to hear the names of the aliens in random order.',
          description: 'prompt text'
        },
        finalPause: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Final pause',
          default: 500,
          description: 'ITI at the end of the trial.'
        },
        duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Audio duration',
          default: 1000,
          description: 'Audio Duration'
        },
        imageArrayKey: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Image Array Key',
          default: ["0","1","2","3","4","5","6","7"],
          array: true,
          description: 'Key to image array/ dictionary'
        },
        circleArrayKey: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Circle Array Key',
          default: ["0","1","2","3","4","5","6","7"],
          array: true,
          description: 'Key to image array/ dictionary'
        },
        imageArrayIndex: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Image Array Index',
          default: [0,1,2,3,4,5,6,7],
			array: true,
          description: 'Indices for image array.'
        },
        circleArrayIndex: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Circle Array Index',
          default: [0,1,2,3,4,5,6,7],
			array: true,
          description: 'Indices for circle array.'
        },
        condition: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Condition',
          default: "active",
          description: 'Condition label.'
        },
		passive_selection_index: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Passive Selection Index',
          default: null,
          description: 'Index in passive condition.'
        },
        passive_button_html: {
          type: jsPsych.plugins.parameterType.HTML_STRING,
          pretty_name: 'Passi e Button HTML',
          default: '<button class="jspsych-btn">SELECT RANDOM ALIENS</button>',
          array: true,
          description: 'Passive condition button.'
        }
    }
  }

  plugin.trial = function(display_element, trial) {
	  
      display_element.innerHTML = "<svg id='jspsych-test-canvas' width=" + trial.canvas_size[0] + " height=" + trial.canvas_size[1] + "></svg>";
	  
      var paper = Snap("#jspsych-test-canvas");	  
	  
	  
	  var choice = "NA";
	  var choiceIm = "NA";
	  var choiceType = "NA";
	  var choiceIndex = "NA";
	  var choiceKey = "NA";
	  var choiceLabel = "NA";
	  var randomLabel = "NA";
	  var randomChoice = "NA";
	  var randomIndex = "NA";
	  var randomKey = "NA";
	  var rt = "NA";
	  var learningStartRT = "NA";
	  var trialDuration = "NA";
	  var word1 = "NA";
	  var word2 = "NA";
	  var curImageArrayIndex = trial.imageArrayIndex;
	  var item_conditions = [trial.item_condition1,trial.item_condition2,trial.item_condition3,trial.item_condition4,trial.item_condition5,trial.item_condition6,trial.item_condition7,trial.item_condition8]
	  
	  
	  
	  var circle1 = paper.circle(125, 350, 90);
	  var circle2 = paper.circle(325, 350, 90);
	  var circle3 = paper.circle(525, 350, 90);
	  var circle4 = paper.circle(725, 350, 90);
	  var circle5 = paper.circle(125, 550, 90);
	  var circle6 = paper.circle(325, 550, 90);
	  var circle7 = paper.circle(525, 550, 90);
	  var circle8 = paper.circle(725, 550, 90);
	  
	  //create circle set and dict
	  var circleSet= Snap.set(circle1,circle2,circle3,circle4,circle5,circle6,circle7,circle8);
	  var circleDict = {0: circle1, 1: circle2,2: circle3, 3: circle4, 4: circle5, 5: circle6, 6: circle7, 7: circle8};
	  
	  circleSet.attr({
	   		  fill: "#00ccff",
	   		  stroke: "#000",
		  strokeWidth: 5});

	  
	  var imageLocations = {
		  pos1: [50, 275],
		  pos2: [250, 275],
		  pos3: [450, 275],
		  pos4: [650, 275],
		  pos5: [50, 475],
		  pos6: [250, 475],
		  pos7: [450, 475],
		  pos8: [650, 475],
	  };
	  
	  var topLeftCircle = paper.circle(275, 125, 90);
	  topLeftCircle.attr({
		  fill: "#FFD3D6",
		  stroke: "#000",
		  strokeWidth: 5,
		  opacity: 0
	  });
	  
	  var topRightCircle = paper.circle(575, 125, 90);
	  topRightCircle.attr({
		  fill: "#FFD3D6",
		  stroke: "#000",
		  strokeWidth: 5,
		  opacity: 0
	  });
	  
	  var label1 = paper.text(425, 125, "");
	  label1.attr({
		  opacity: 0,
		  "text-anchor": "middle",
		  "font-weight": "bold"
	  });
	  var label2 = paper.text(425, 125, "");
	  label2.attr({
		  opacity: 0,
		  "text-anchor": "middle",
		  "font-weight": "bold"
	  });

	  
	  var imageLocationsLearning = {
		  left: [200, 50],
		  right: [500, 50]
	  };
	  
	  var image1 = paper.image(trial.image1, imageLocations["pos1"][0], imageLocations["pos1"][1], trial.image_size[0],trial.image_size[1]);
	  var image2 = paper.image(trial.image2, imageLocations["pos2"][0], imageLocations["pos2"][1], trial.image_size[0],trial.image_size[1]);
	  var image3 = paper.image(trial.image3, imageLocations["pos3"][0], imageLocations["pos3"][1], trial.image_size[0],trial.image_size[1]);
	  var image4 = paper.image(trial.image4, imageLocations["pos4"][0], imageLocations["pos4"][1], trial.image_size[0],trial.image_size[1]);
	  var image5 = paper.image(trial.image5, imageLocations["pos5"][0], imageLocations["pos5"][1], trial.image_size[0],trial.image_size[1]);
	  var image6 = paper.image(trial.image6, imageLocations["pos6"][0], imageLocations["pos6"][1], trial.image_size[0],trial.image_size[1]);
	  var image7 = paper.image(trial.image7, imageLocations["pos7"][0], imageLocations["pos7"][1], trial.image_size[0],trial.image_size[1]);
	  var image8 = paper.image(trial.image8, imageLocations["pos8"][0], imageLocations["pos8"][1], trial.image_size[0],trial.image_size[1]);
	  
	  var imageSet=Snap.set(image1,image2,image3,image4,image5,image6,image7,image8);
	  var imageDict = {0: image1, 1: image2,2: image3, 3: image4, 4: image5, 5: image6, 6: image7, 7: image8};
	  
	  var circleImageSet = Snap.set(circle1,circle2,circle3,circle4,circle5,circle6,circle7,circle8,image1,image2,image3,image4,image5,image6,image7,image8);
	  
	  if (trial.condition=="active") {
	  //add prompt text
	  //display_element.append(trial.question + trial.label + "?");
	  var text = paper.text(425, 235, trial.question1 );
	  text.attr({
		  "text-anchor": "middle",
		  "font-weight": "bold"
	  });
  } else if (trial.condition=="passive") {
	  var text = paper.text(425, 210, trial.question1 );
	  text.attr({
		  "text-anchor": "middle",
		  "font-weight": "bold"
	  });
	  var text2 = paper.text(425, 235, trial.question2 );
	  text2.attr({
		  "text-anchor": "middle",
		  "font-weight": "bold"
	  });
  	
  }
	  //create audio
	  //var audio = new Audio(trial.audio);
	  

	  
	  var start_time = (new Date()).getTime();
	    
	  var trial_data={};
	  
	  if (trial.condition=="active") {
	  
	  image1.click(function() {
	  		  var end_time = (new Date()).getTime();
	  		  rt = end_time - start_time;
	  		  circle1.attr({
	  			  fill: "#FFD3D6"
	  		  });
	  		  choiceIndex = 0;
	  		  init_learning(choiceIndex,rt);
	  });

	  image2.click(function() {
	  		  var end_time = (new Date()).getTime();
	  		  rt = end_time - start_time;
	  		  circle2.attr({
	  			  fill: "#FFD3D6"
	  		  });
	  		  choiceIndex = 1;
	  		  init_learning(choiceIndex,rt);
	  });

	  image3.click(function() {
	  		  var end_time = (new Date()).getTime();
	  		  rt = end_time - start_time;
	  		  circle3.attr({
	  			  fill: "#FFD3D6"
	  		  });
	  		  choiceIndex = 2;
	  		  init_learning(choiceIndex,rt);
	  });

	  image4.click(function() {
	  		  var end_time = (new Date()).getTime();
	  		  rt = end_time - start_time;
	  		  circle4.attr({
	  			  fill: "#FFD3D6"
	  		  });
	  		  choiceIndex = 3;
	  		  init_learning(choiceIndex,rt);
	  });

	  image5.click(function() {
	  		  var end_time = (new Date()).getTime();
	  		  rt = end_time - start_time;
	  		  circle5.attr({
	  			  fill: "#FFD3D6"
	  		  });
	  		  choiceIndex = 4;
	  		  init_learning(choiceIndex,rt);
	  });

	  image6.click(function() {
	  		  var end_time = (new Date()).getTime();
	  		  rt = end_time - start_time;
	  		  circle6.attr({
	  			  fill: "#FFD3D6"
	  		  });
	  		  choiceIndex = 5;
	  		  init_learning(choiceIndex,rt);
	  });

	  image7.click(function() {
	  		  var end_time = (new Date()).getTime();
	  		  rt = end_time - start_time;
	  		  circle7.attr({
	  			  fill: "#FFD3D6"
	  		  });
	  		  choiceIndex = 6;
	  		  init_learning(choiceIndex,rt);
	  });

	  image8.click(function() {
	  		  var end_time = (new Date()).getTime();
	  		  rt = end_time - start_time;
	  		  circle8.attr({
	  			  fill: "#FFD3D6"
	  		  });
	  		  choiceIndex = 7;
	  		  init_learning(choiceIndex,rt);
	  });
  } else if (trial.condition=="passive") {
	// add button to initiate first random selection
      var html = '<div id="jspsych-passive-learning-btngroup" class="center-content block-center">';
      var str = trial.passive_button_html;
      html += '<div class="jspsych-passive-learning-button" id="jspsych-passive-learning-button-' + 1 + '" data-choice="' + 1 + '">' + str + '</div>';
      html += '</div>';
      // update the page content
      display_element.innerHTML += html;
	  display_element.querySelector('#jspsych-passive-learning-button-' + 1).addEventListener('click', function(e){
          var choice = e.currentTarget.getAttribute('data-choice'); // don't use dataset for jsdom compatibility
        	// disable all the buttons after a response
        	display_element.querySelector('#jspsych-passive-learning-button-' + 1).setAttribute('disabled', 'disabled');	
			//hide button
			display_element.querySelector('#jspsych-passive-learning-button-' + 1).style.display = 'none';

  		  	var end_time = (new Date()).getTime();
  		  	rt = end_time - start_time;
			choiceIndex=trial.passive_selection_index;
			choiceKey = trial.imageArrayKey[choiceIndex];
			var choiceCircle = circleDict[choiceKey];
			
			// color in background of randomly selected image
			setTimeout(function(){
				choiceCircle.animate({
	  	  			  fill: "#FFD3D6"
	  	  		  }, 500,function(){
				 // initialize second random selection and ready learning trial
			  	init_learning(choiceIndex,rt);
			  });
			  
			  },500);
			
        });
		  
		};
	  
	  function init_learning(choiceIndex,rt) {
		 if (trial.condition=="active") {
		  image1.unclick();
		  image2.unclick();
		  image3.unclick();
		  image4.unclick();
		  image5.unclick();
		  image6.unclick();
		  image7.unclick();
		  image8.unclick();
	  };

	  console.log(choiceIndex);
	  console.log(rt);
		  //choice info
		  choiceLabel=trial.stims[trial.stimNames[trial.curLocationList[choiceIndex]]]["word"];
		  choice=trial.stims[trial.stimNames[trial.curLocationList[choiceIndex]]]["image"];
		  choiceKey=trial.imageArrayIndex[choiceIndex];
		  choiceImage = imageDict[choiceKey];
		  choiceCircle = circleDict[choiceKey];
		  //remove choice index
		  curImageArrayIndex.splice(choiceIndex, 1);
		  
		  //make random choice
		  randomIndex=jsPsych.randomization.sampleWithReplacement(curImageArrayIndex,1)[0];
		  randomKey = trial.imageArrayKey[randomIndex]
	  
		  //random choice info
		  randomLabel=trial.stims[trial.stimNames[trial.curLocationList[randomIndex]]]["word"];
		  randomChoice=trial.stims[trial.stimNames[trial.curLocationList[randomIndex]]]["image"];
		  randomImage = imageDict[randomKey];
		  randomCircle = circleDict[randomKey];
		  
		  //create images
  		  var limage1 = paper.image(choice, imageLocationsLearning[trial.learningPos[0]][0], imageLocationsLearning[trial.learningPos[0]][1], trial.image_size[0],trial.image_size[1]);
  		  var limage2 = paper.image(randomChoice, imageLocationsLearning[trial.learningPos[1]][0], imageLocationsLearning[trial.learningPos[1]][1], trial.image_size[0],trial.image_size[1]);
		  
		  //learning event
		  learningIm = Snap.set(topRightCircle,topLeftCircle,limage1,limage2);
		  learningIm.attr({opacity: 0});
		  

  		setTimeout(function(){
			//color random circle
	  		randomCircle.animate({
				fill: "#FFD3D6"
			},500, function(){
				setTimeout(function(){
					//fade out choices
					text.animate({opacity: 0},500,mina.linear);
					if (trial.condition=="passive") {
						text2.animate({opacity: 0},500,mina.linear);
					};
					circleImageSet.animate({opacity: "0.2"},500,mina.linear, function() {
						//fade in learning images
						learningIm.animate({opacity: "1"},500,mina.linear, function() {
							playLearningTrial();
						});
					});
				},500);
			});
		},500);

	  };


	  function playLearningTrial() {
		  
		  var learningStartTime = (new Date()).getTime();
		  
		  
		  //introduce learning instruction
		  var learningInstr = paper.text(425, 20, trial.learningText);
		  learningInstr.attr({
			  opacity: 1,
			  "text-anchor": "middle",
			  "font-weight": "bold"
		  });
		  
		  //define words
		  if (trial.wordOrder=="choiceFirst") {
			  word1 = choiceLabel;
			  word2 = randomLabel;
		  } else {
			  word2 = choiceLabel;
			  word1 = randomLabel;
		  }
		  label1.attr({
			   "text": word1
		  });
		  label2.attr({
			  "text": word2
		  });
		  
		  //display buttons
		  var button_block= paper.rect(385, 100, 80, 40, 10, 10);

		  button_block.attr({
		      fill: "rgb(236, 240, 241)",
		      stroke: "#1f2c39",
		      strokeWidth: 3
		  });
		  var button_text = paper.text(425,125, "START");
		  button_text.attr({
			  "text-anchor": "middle",
			  "font-weight": "bold"
		  });
		  var button_block_cover= paper.rect(385, 100, 80, 40, 10, 10);
		  button_block_cover.attr({
		      fill: "rgb(236, 240, 241)",
		      stroke: "#1f2c39",
		      strokeWidth: 3,
			  opacity: 0
		  });
		  
		  var button = paper.g(button_block,button_text,button_block_cover);
		  
		  button.click(function() {
			  button.unclick();
			  button.attr({
				  opacity: 0,
			  })
	        var curTime = Date.now();
	        var learningStartRT = curTime - learningStartTime;
            playAudio();
		  });
		  
	  };


	  function playAudio() {
		  if (trial.audio == "true") {
			  //create audio
			  var audio1 = new Audio("stims/"+word1+".m4a");
			  var audio2 = new Audio("stims/"+word2+".m4a");
		  };
		  
		  label1.animate({opacity: "1"}, 150,mina.linear, function() {
			  if (trial.audio == "true") {
				  audio1.play();
			  };
			  label1.animate({opacity: "1"}, trial.duration,mina.linear, function() {
				  label1.animate({opacity: 0}, 150,mina.linear, function() {
				  	label2.animate({opacity: 1}, 150,mina.linear, function() {
						if (trial.audio == "true") {
							audio2.play();
						};
						label2.animate({opacity: "1"}, trial.duration,mina.linear, function() {
							label2.animate({opacity: 0}, 150,mina.linear, endTrial());
						});
					});
				});
			});
		});
	};
	  
      function endTrial() {
		var final_time = (new Date()).getTime();
		trialDuration = final_time - start_time;
		
		if (trial.condition=="passive") {
	        var trial_data = {
				"image1": trial.image1,
				"image2": trial.image2,
				"image3": trial.image3,
				"image4": trial.image4,
				"image5": trial.image5,
				"image6": trial.image6,
				"image7": trial.image7,
				"image8": trial.image8,
				"item_condition1": trial.item_condition1,
				"item_condition2": trial.item_condition2,
				"item_condition3": trial.item_condition3,
				"item_condition4": trial.item_condition4,
				"item_condition5": trial.item_condition5,
				"item_condition6": trial.item_condition6,
				"item_condition7": trial.item_condition7,
				"item_condition8": trial.item_condition8,
				"randomChoice1": choiceIndex,
				"randomImage1": choice,
				"randomItemCondition1": item_conditions[choiceIndex],
				"randomChoice2": randomIndex,
				"randomImage2": randomChoice,
				"randomItemCondition2": item_conditions[randomIndex],
				"learningLocationRandom1": trial.learningPos[0],
				"learningLocationRandom2": trial.learningPos[1],
				"randomLabel1":choiceLabel,
				"randomLabel2":randomLabel,
				"word1": word1,
				"word2": word2,
				"rt": rt,
				"learningStartRT": learningStartRT,
				"trialDuration": trialDuration,
				"trial_condition": trial.condition
			};
		} else if (trial.condition == "active") {
	        var trial_data = {
				"image1": trial.image1,
				"image2": trial.image2,
				"image3": trial.image3,
				"image4": trial.image4,
				"image5": trial.image5,
				"image6": trial.image6,
				"image7": trial.image7,
				"image8": trial.image8,
				"item_condition1": trial.item_condition1,
				"item_condition2": trial.item_condition2,
				"item_condition3": trial.item_condition3,
				"item_condition4": trial.item_condition4,
				"item_condition5": trial.item_condition5,
				"item_condition6": trial.item_condition6,
				"item_condition7": trial.item_condition7,
				"item_condition8": trial.item_condition8,
				"choice": choiceIndex,
				"choiceImage": choice,
				"choiceItemCondition": item_conditions[choiceIndex],
				"randomChoice": randomIndex,
				"randomImage": randomChoice,
				"randomItemCondition": item_conditions[randomIndex],
				"learningLocationChoice": trial.learningPos[0],
				"learningLocationRandom": trial.learningPos[1],
				"choiceLabel":choiceLabel,
				"randomLabel":randomLabel,
				"word1": word1,
				"word2": word2,
				"rt": rt,
				"learningStartRT": learningStartRT,
				"trialDuration": trialDuration,
				"trial_condition": trial.condition
			};
		}
        
		
		
		

		setTimeout(function(){
			display_element.innerHTML = '';
			jsPsych.finishTrial(trial_data);
		},trial.finalPause);
		
      };
  };	  
		
		return plugin;
})();