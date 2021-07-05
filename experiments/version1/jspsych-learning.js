/**
 * crossPC - learning
 * plugin for learning trials in cross-situational word learning study (production vs. comprehension, crossPC)
 * Martin Zettersten
 */

jsPsych.plugins['learning'] = (function() {

  var plugin = {};
  
  jsPsych.pluginAPI.registerPreload('learning', 'im1', 'image');
  jsPsych.pluginAPI.registerPreload('learning', 'im2', 'image');
  jsPsych.pluginAPI.registerPreload('learning', 'stimulus', 'audio');

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
          cur_label: {
             type: jsPsych.plugins.parameterType.STRING,
             pretty_name: 'Current Label',
             default: null,
             description: 'Currently played label'
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
      stimulus: {
        type: jsPsych.plugins.parameterType.AUDIO,
        pretty_name: 'Stimulus',
        default: undefined,
        description: 'The current audio to be played.'
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
        },
        iti: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'Inter Trial Interval',
          default: 0,
          description: 'Inter trial interval.'
        }
    }
  }

  plugin.trial = function(display_element, trial) {
	  
      display_element.innerHTML = "<svg id='jspsych-test-canvas' width=" + trial.canvas_size[0] + " height=" + trial.canvas_size[1] + "></svg>";

      var paper = Snap("#jspsych-test-canvas");
	  
	  console.log("starting to stop")
	  
	  var topLeftCircle = paper.circle(362, 225, 90);
	  topLeftCircle.attr({
		  fill: "#FFD3D6",
		  stroke: "#000",
		  strokeWidth: 5
	  });
	  
	  var topRightCircle = paper.circle(662, 225, 90);
	  topRightCircle.attr({
		  fill: "#FFD3D6",
		  stroke: "#000",
		  strokeWidth: 5
	  });

	  
	  var imageLocations = {
		  left: [287, 150],
		  right: [587, 150]
	  };
	  
	  var image1 = paper.image(trial.im1, imageLocations[trial.location1][0], imageLocations[trial.location1][1], trial.image_size[0],trial.image_size[1]);
	  var image2 = paper.image(trial.im2, imageLocations[trial.location2][0], imageLocations[trial.location2][1], trial.image_size[0],trial.image_size[1]);

	  //add prompt text
	  //display_element.append(trial.question + trial.label + "?");
	  var text = paper.text(512, 50, trial.prompt);
	  text.attr({
		  "text-anchor": "middle",
		  editable: true,
		  "font-weight": "bold"
	  });

	  var text_start = paper.text(512, 75, "Click START to hear the names.");
	  text_start.attr({
		  "text-anchor": "middle",
		  editable: true,
		  "font-weight": "bold"
	  });
	  
	  // var label1 = paper.text(512, 225, trial.label1);
	  // label1.attr({
	  // 		  opacity: 0,
	  // 		  "text-anchor": "middle",
	  // 		  "font-weight": "bold"
	  // });
	  // var label2 = paper.text(512, 225, trial.label2);
	  // label2.attr({
	  // 		  opacity: 0,
	  // 		  "text-anchor": "middle",
	  // 		  "font-weight": "bold"
	  // });
	  
	  var cur_label = paper.text(512, 225, trial.cur_label);
	  cur_label.attr({
		  opacity: 0,
		  "text-anchor": "middle",
		  "font-weight": "bold"
	  });

	  
	  if (trial.audio == "true") {
		  //create audio
		  var stimulus = new Audio(trial.stimulus);
	  };

	  var start_time = (new Date()).getTime();
	    
	  var trial_data={};
	  
	  //animate word presentation
	  
	  cur_label.animate({opacity: "1"}, 150,mina.linear, function() {
		  if (trial.audio == "true") {
			  stimulus.play();
		  };
		  cur_label.animate({opacity: "1"}, trial.duration,mina.linear, function() {
			  cur_label.animate({opacity: 0}, 150,mina.linear, endTrial());
		  });
	  });
	  
	  
      function endTrial() {
        var trial_data = {
			"stimulus": trial.stimulus,
			"cur_label": trial.cur_label,
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
		
		setTimeout(function(){
		display_element.innerHTML = '';
		jsPsych.finishTrial(trial_data);
	}, trial.iti);
		
      };
  };	  
		
		return plugin;
})();