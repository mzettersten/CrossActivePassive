/**
 * crossPC - test
 * plugin for comprehension test trials in cross-situational word learning study (production vs. comprehension, crossPC)
 * Martin Zettersten
 */

jsPsych.plugins['comprehension-test'] = (function() {

  var plugin = {};
  
  jsPsych.pluginAPI.registerPreload('comprehension-test-prompt', 'image1', 'image');
  jsPsych.pluginAPI.registerPreload('comprehension-test-prompt', 'image2', 'image');
  jsPsych.pluginAPI.registerPreload('comprehension-test-prompt', 'image3', 'image');
  jsPsych.pluginAPI.registerPreload('comprehension-test-prompt', 'image4', 'image');
  jsPsych.pluginAPI.registerPreload('comprehension-test-prompt', 'image5', 'image');
  jsPsych.pluginAPI.registerPreload('comprehension-test-prompt', 'image6', 'image');
  jsPsych.pluginAPI.registerPreload('comprehension-test-prompt', 'image7', 'image');
  jsPsych.pluginAPI.registerPreload('comprehension-test-prompt', 'image8', 'image');

  plugin.info = {
    name: 'comprehension-test',
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
     question: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'question',
        default: "Click on the ",
        description: 'trial instructions'
      },
      label: {
         type: jsPsych.plugins.parameterType.STRING,
         pretty_name: 'label',
         default: "kita",
         description: 'Test label'
       }
    }
  }

  plugin.trial = function(display_element, trial) {
	  
      display_element.innerHTML = "<svg id='jspsych-test-canvas' width=" + trial.canvas_size[0] + " height=" + trial.canvas_size[1] + "></svg>";
	  
      var paper = Snap("#jspsych-test-canvas");
	  
	  var circle1 = paper.circle(212, 325, 90);
	  circle1.attr({
		  fill: "#FFD3D6",
		  stroke: "#000",
		  strokeWidth: 5
	  });
	  
	  var circle2 = paper.circle(412, 325, 90);
	  circle2.attr({
		  fill: "#FFD3D6",
		  stroke: "#000",
		  strokeWidth: 5
	  });
	  
	  var circle3 = paper.circle(612, 325, 90);
	  circle3.attr({
		  fill: "#FFD3D6",
		  stroke: "#000",
		  strokeWidth: 5
	  });
	  
	  var circle4 = paper.circle(812, 325, 90);
	  circle4.attr({
		  fill: "#FFD3D6",
		  stroke: "#000",
		  strokeWidth: 5
	  });
	  
	  var circle5 = paper.circle(212, 525, 90);
	  circle5.attr({
		  fill: "#FFD3D6",
		  stroke: "#000",
		  strokeWidth: 5
	  });
	  
	  var circle6 = paper.circle(412, 525, 90);
	  circle6.attr({
		  fill: "#FFD3D6",
		  stroke: "#000",
		  strokeWidth: 5
	  });
	  
	  var circle7 = paper.circle(612, 525, 90);
	  circle7.attr({
		  fill: "#FFD3D6",
		  stroke: "#000",
		  strokeWidth: 5
	  });
	  
	  var circle8 = paper.circle(812, 525, 90);
	  circle8.attr({
		  fill: "#FFD3D6",
		  stroke: "#000",
		  strokeWidth: 5
	  });

	  
	  var imageLocations = {
		  pos1: [137, 250],
		  pos2: [337, 250],
		  pos3: [537, 250],
		  pos4: [737, 250],
		  pos5: [137, 450],
		  pos6: [337, 450],
		  pos7: [537, 450],
		  pos8: [737, 450],
	  };
	  
	  var image1 = paper.image(trial.image1, imageLocations["pos1"][0], imageLocations["pos1"][1], trial.image_size[0],trial.image_size[1]);
	  var image2 = paper.image(trial.image2, imageLocations["pos2"][0], imageLocations["pos2"][1], trial.image_size[0],trial.image_size[1]);
	  var image3 = paper.image(trial.image3, imageLocations["pos3"][0], imageLocations["pos3"][1], trial.image_size[0],trial.image_size[1]);
	  var image4 = paper.image(trial.image4, imageLocations["pos4"][0], imageLocations["pos4"][1], trial.image_size[0],trial.image_size[1]);
	  var image5 = paper.image(trial.image5, imageLocations["pos5"][0], imageLocations["pos5"][1], trial.image_size[0],trial.image_size[1]);
	  var image6 = paper.image(trial.image6, imageLocations["pos6"][0], imageLocations["pos6"][1], trial.image_size[0],trial.image_size[1]);
	  var image7 = paper.image(trial.image7, imageLocations["pos7"][0], imageLocations["pos7"][1], trial.image_size[0],trial.image_size[1]);
	  var image8 = paper.image(trial.image8, imageLocations["pos8"][0], imageLocations["pos8"][1], trial.image_size[0],trial.image_size[1]);
	  
	  
	  //add prompt text
	  //display_element.append(trial.question + trial.label + "?");
	  var text = paper.text(512, 50, trial.question + trial.label + ".");
	  var labelText = paper.text(512, 150, trial.label);
	  text.attr({
		  "text-anchor": "middle",
		  editable: true,
		  "font-weight": "bold"
	  });
	  labelText.attr({
		  "text-anchor": "middle",
		  editable: true,
		  "font-weight": "bold",
		  "font-size": "25px"
	  });
	  //create audio
	  //var audio = new Audio(trial.audio);
	  
	  var isRight = "NA";
	  var choice = "NA";
	  var choiceIm = "NA";
	  var choiceType = "NA";
	  var rt = "NA";
	  
	  var start_time = (new Date()).getTime();
	    
	  var trial_data={};
	  
	  image1.click(function() {
		  var end_time = (new Date()).getTime();
		  rt = end_time - start_time;
		  circle1.attr({
			  fill: "#00ccff"
		  });
		  choice = trial.image1;
		  choiceLocation = "pos1";
		  save_response(choice,choiceLocation,rt);
	  });
	  
	  image2.click(function() {
		  var end_time = (new Date()).getTime();
		  rt = end_time - start_time;
		  circle2.attr({
			  fill: "#00ccff"
		  });
		  choice = trial.image2;
		  choiceLocation = "pos2";
		  save_response(choice,choiceLocation,rt);
	  });
	  
	  image3.click(function() {
		  var end_time = (new Date()).getTime();
		  rt = end_time - start_time;
		  circle3.attr({
			  fill: "#00ccff"
		  });
		  choice = trial.image3;
		  choiceLocation = "pos3";
		  save_response(choice,choiceLocation,rt);
	  });
	  
	  image4.click(function() {
		  var end_time = (new Date()).getTime();
		  rt = end_time - start_time;
		  circle4.attr({
			  fill: "#00ccff"
		  });
		  choice = trial.image4;
		  choiceLocation = "pos4";
		  save_response(choice,choiceLocation,rt);
	  });
	  
	  image5.click(function() {
		  var end_time = (new Date()).getTime();
		  rt = end_time - start_time;
		  circle5.attr({
			  fill: "#00ccff"
		  });
		  choice = trial.image5;
		  choiceLocation = "pos5";
		  save_response(choice,choiceLocation,rt);
	  });
	  
	  image6.click(function() {
		  var end_time = (new Date()).getTime();
		  rt = end_time - start_time;
		  circle6.attr({
			  fill: "#00ccff"
		  });
		  choice = trial.image6;
		  choiceLocation = "pos6";
		  save_response(choice,choiceLocation,rt);
	  });
	  
	  image7.click(function() {
		  var end_time = (new Date()).getTime();
		  rt = end_time - start_time;
		  circle7.attr({
			  fill: "#00ccff"
		  });
		  choice = trial.image7;
		  choiceLocation = "pos7";
		  save_response(choice,choiceLocation,rt);
	  });
	  
	  image8.click(function() {
		  var end_time = (new Date()).getTime();
		  rt = end_time - start_time;
		  circle8.attr({
			  fill: "#00ccff"
		  });
		  choice = trial.image8;
		  choiceLocation = "pos8";
		  
		  save_response(choice,choiceLocation,rt);
	  });
	  


	  
	  function save_response(choice,choiceLocation,rt) {
		  image1.unclick();
		  image2.unclick();
		  image3.unclick();
		  image4.unclick();
		  image5.unclick();
		  image6.unclick();
		  image7.unclick();
		  image8.unclick();

		  
			if (choice==trial.targetImage) {
				choiceType="target";
				isRight=1
			} else {
				choiceType="foil";
				isRight=0;
			}
			endTrial();
	  };

	  
      function endTrial() {
		//var audioFeedback = new Audio(trial.audioFeedback);
		//audioFeedback.play();
        var trial_data = {
			"label": trial.label,
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
			"targetLocation": trial.targetLocation,
			"targetImage": trial.targetImage,
			"target_item_condition": trial.target_item_condition,
			"choiceLocation": choiceLocation,
			"choiceType": choiceType,
			"choiceImage": choice,
			"isRight": isRight,
			"rt": rt
			
		};
		

		display_element.innerHTML = '';
		setTimeout(function(){
			jsPsych.finishTrial(trial_data);
		},500);
		
      };
  };	  
		
		return plugin;
})();