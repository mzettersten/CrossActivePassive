/**
 * crossPC - learning
 * plugin for learning trials in cross-situational word learning study (production vs. comprehension, crossPC)
* initial prompt
* based on:
 * jspsych-button-response
 * Josh de Leeuw
 * Martin Zettersten
 */

jsPsych.plugins['learning-prompt'] = (function() {

  var plugin = {};
  
  jsPsych.pluginAPI.registerPreload('learning', 'im1', 'image');
  jsPsych.pluginAPI.registerPreload('learning', 'im2', 'image');
  jsPsych.pluginAPI.registerPreload('learning', 'im3', 'image');

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
        timing_response: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'timing response',
          default: -1, // if -1, then wait for response forever
          description: 'For setting a trial duration limit'
        },
		response_ends_trial: {
          type: jsPsych.plugins.parameterType.BOOL,
          pretty_name: 'response ends trial',
          default: true,
          description: 'Whether or not a response ends the trial'
        },
    }
  }

  plugin.trial = function(display_element, trial) {
	  
      display_element.innerHTML = "<svg id='jspsych-test-canvas' width=" + trial.canvas_size[0] + " height=" + trial.canvas_size[1] + "></svg>";
	  
      // this array holds handlers from setTimeout calls
      // that need to be cleared if the trial ends early
      var setTimeoutHandlers = [];

      var paper = Snap("#jspsych-test-canvas");
	  
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
	  })
	  
	  //display buttons
	  var button_block= paper.rect(360, 200, 80, 40, 10, 10);

	  button_block.attr({
	      fill: "rgb(236, 240, 241)",
	      stroke: "#1f2c39",
	      strokeWidth: 3
	  });
	  var button_text = paper.text(400,225, "START");
	  button_text.attr({
		  "text-anchor": "middle",
		  "font-weight": "bold"
	  });
	  var button_block_cover= paper.rect(360, 200, 80, 40, 10, 10);
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
		var choice = "start"
        after_response(choice)
	  });

      // store response
      var response = {
        rt: -1,
        button: -1
      };

      // start time
      var start_time = 0;

      // function to handle responses by the subject
      function after_response(choice) {

        // measure rt
        var end_time = Date.now();
        var rt = end_time - start_time;
        response.button = choice;
        response.rt = rt;

        if (trial.response_ends_trial) {
          end_trial();
        }
      };

      // function to end trial when it is time
      function end_trial() {

        // kill any remaining setTimeout handlers
        for (var i = 0; i < setTimeoutHandlers.length; i++) {
          clearTimeout(setTimeoutHandlers[i]);
        }

        // gather the data to store for the trial
        var trial_data = {
          "rt": response.rt,
          "stimulus": trial.stimulus,
          "button_pressed": response.button,
			"location1": trial.location1,
			"location2": trial.location2,
			"image1": trial.im1,
			"image2": trial.im2,
			"item_condition1": trial.im1_condition,
			"item_condition2": trial.im2_condition,
        };

        // clear the display
        display_element.innerHTML = '';

        // move on to the next trial
        jsPsych.finishTrial(trial_data);
      };

      // start timing
      start_time = Date.now();


      // end trial if time limit is set
      if (trial.timing_response > 0) {
        var t2 = setTimeout(function() {
          end_trial();
        }, trial.timing_response);
        setTimeoutHandlers.push(t2);
      }

    };

    return plugin;
  })();