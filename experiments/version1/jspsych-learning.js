/**
 * crossPC - learning
 * plugin for learning trials in cross-situational word learning study (production vs. comprehension, crossPC)
 * Martin Zettersten
 */

jsPsych.plugins['learning'] = (function() {

  var plugin = {};
  
  jsPsych.pluginAPI.registerPreload('learning', 'im1', 'image');
  jsPsych.pluginAPI.registerPreload('learning', 'im2', 'image');
  jsPsych.pluginAPI.registerPreload('learning', 'audio1', 'audio');
  jsPsych.pluginAPI.registerPreload('learning', 'audio2', 'audio');

  plugin.info = {
    name: 'learning',
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
        location1: {
           type: jsPsych.plugins.parameterType.STRING,
           pretty_name: 'Location 1',
           default: "left",
           description: 'First location'
         },
   	  location2: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Location 2',
            default: "right",
            description: 'Second location'
          },
          label1: {
             type: jsPsych.plugins.parameterType.STRING,
             pretty_name: 'Label 1',
             default: null,
             description: 'First label'
           },
     	  label2: {
              type: jsPsych.plugins.parameterType.STRING,
              pretty_name: 'Label 2',
              default: null,
              description: 'Second label'
            },
      audio: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'Audio',
        default: "true",
        description: 'If true, audio is played.'
      },
      audio1: {
        type: jsPsych.plugins.parameterType.AUDIO,
        pretty_name: 'Audio 1',
        default: undefined,
        description: 'The first audio to be played.'
      },
      audio2: {
        type: jsPsych.plugins.parameterType.AUDIO,
        pretty_name: 'Audio 2',
        default: undefined,
        description: 'The second audio to be played.'
      },
     prompt: {
        type: jsPsych.plugins.parameterType.STRING,
        pretty_name: 'prompt',
        default: "Learn the names for the two aliens!",
        description: 'trial instructions'
      },
        duration: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Audio duration',
          default: 1000,
          description: 'Audio Duration'
        }
    }
  }

  plugin.trial = function(display_element, trial) {
	  
      display_element.innerHTML = "<svg id='jspsych-test-canvas' width=" + trial.canvas_size[0] + " height=" + trial.canvas_size[1] + "></svg>";

      var paper = Snap("#jspsych-test-canvas");
	  
	  console.log("starting to stop")
	  
	  var topLeftCircle = paper.circle(250, 225, 90);
	  topLeftCircle.attr({
		  fill: "#FFD3D6",
		  stroke: "#000",
		  strokeWidth: 5
	  });
	  
	  var topRightCircle = paper.circle(550, 225, 90);
	  topRightCircle.attr({
		  fill: "#FFD3D6",
		  stroke: "#000",
		  strokeWidth: 5
	  });

	  
	  var imageLocations = {
		  left: [175, 150],
		  right: [475, 150]
	  };
	  
	  var image1 = paper.image(trial.im1, imageLocations[trial.location1][0], imageLocations[trial.location1][1], trial.image_size[0],trial.image_size[1]);
	  var image2 = paper.image(trial.im2, imageLocations[trial.location2][0], imageLocations[trial.location2][1], trial.image_size[0],trial.image_size[1]);

	  //add prompt text
	  //display_element.append(trial.question + trial.label + "?");
	  var text = paper.text(400, 50, trial.prompt);
	  text.attr({
		  "text-anchor": "middle",
		  editable: true,
		  "font-weight": "bold"
	  });
	  
	  var label1 = paper.text(400, 225, trial.label1);
	  label1.attr({
		  opacity: 0,
		  "text-anchor": "middle",
		  "font-weight": "bold"
	  });
	  var label2 = paper.text(400, 225, trial.label2);
	  label2.attr({
		  opacity: 0,
		  "text-anchor": "middle",
		  "font-weight": "bold"
	  });

	  
	  if (trial.audio == "true") {
		  //create audio
		  var audio1 = new Audio(trial.audio1);
		  var audio2 = new Audio(trial.audio2);
	  };

	  var start_time = (new Date()).getTime();
	    
	  var trial_data={};
	  
	  //animate word presentation
	  
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
	  
	  
      function endTrial() {
		//var audioFeedback = new Audio(trial.audioFeedback);
		//audioFeedback.play();
        var trial_data = {
			"label1": trial.label1,
			"label2": trial.label2,
			"location1": trial.location1,
			"location2": trial.location2,
			"image1": trial.im1,
			"image2": trial.im2,
			"item_condition1": trial.im1_condition,
			"item_condition2": trial.im2_condition,
			"audio": trial.audio	
		};
		
		display_element.innerHTML = '';
		jsPsych.finishTrial(trial_data);
		
      };
  };	  
		
		return plugin;
})();