/**
 * jspsych-single-audio
 * Josh de Leeuw
 *
 * plugin for playing an audio file and getting a keyboard response
 *
 * documentation: docs.jspsych.org
 *
 **/

jsPsych.plugins["audio-check"] = (function() {

  var plugin = {};

  //var context = new AudioContext();

  jsPsych.pluginAPI.registerPreload('audio-check', 'stimulus', 'audio');
  
  plugin.info = {
    name: 'audio-check',
    description: '',
    parameters: {
        stimulus: {
          type: jsPsych.plugins.parameterType.AUDIO,
          pretty_name: 'Stimulus',
          default: undefined,
          description: 'The audio to be played.'
        },
 	  prompt: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'prompt',
          default: "Click on the Play button to hear an audio recording. Then enter the word you heard. Click the button to hear the sound again. Click on the Submit Answers button when you are finished.<br>",
          description: 'prompt text'
        },
        columns: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'columns',
          default: 40,
          description: 'Column width of text box.'
        },
        rows: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'rows',
          default: 1,
          description: 'Row length of text box.'
        },

        play_button_html: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Play Button HTML',
            default: '<button class="jspsych-btn">Play</button>',
            description: 'The html of the button. Can create own style.'
        },

        submit_button_html: {
            type: jsPsych.plugins.parameterType.STRING,
            pretty_name: 'Submit Button HTML',
            default: '<button class="jspsych-btn">Submit Answers</button>',
            description: 'The html of the button. Can create own style.'
        },
        margin_vertical: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Margin vertical',
          default: '0px',
          description: 'Vertical margin of button.'
        },
        margin_horizontal: {
          type: jsPsych.plugins.parameterType.STRING,
          pretty_name: 'Margin horizontal',
          default: '8px',
          description: 'Horizontal margin of button.'
        },
        iti: {
          type: jsPsych.plugins.parameterType.INT,
          pretty_name: 'ITI',
          default: 0,
          description: 'Pause after clearing the screen.'
        },
    }
  }

  plugin.trial = function(display_element, trial) {


    // play stimulus
    // var source = context.createBufferSource();
    // source.buffer = jsPsych.pluginAPI.getAudioBuffer(trial.stimulus);
    // source.connect(context.destination);
    // startTime = context.currentTime + 0.1;
    // source.start(startTime);

	var audio = new Audio(trial.stimulus);
	
	var html = "";

	    //show prompt if there is one
	    if (trial.prompt !== null) {
	      html += trial.prompt;
	    }
	
	
    //display buttons
    html += '<div id="jspsych-play-button-response-group" class="jspsych-play-button-response-group">'
    html += '<div class="jspsych-play-button-response-button" style="display: inline-block; margin:' + trial.margin_vertical + ' ' + trial.margin_horizontal + '" id="jspsych-play-button-response-button-' + 0 + '" data-choice="' + 0 + '">'+ trial.play_button_html+'</div>';
		html += '</div>';

	html += '<div id="jspsych-survey-text" class="jspsych-survey-text-question" style="margin: 2em 0em;">'
	//add text box
	html +='<textarea id="jspsych-survey-text-response" cols="' + trial.columns[i] + '" rows="' + trial.rows[i] + '" autocorrect="off" autocapitalize="off" autocomplete="off" spellcheck="false"></textarea>';
	html += '</div>';
	
	
	    // add submit button
      html += '<div id="jspsych-survey-next" class="jspsych-survey-next">'
    html += '<div id="jspsych-survey-text-next"  style="display: inline-block; margin:' + trial.margin_vertical + ' ' + trial.margin_horizontal + '">'+ trial.submit_button_html+'</div>';
    html += '</div>';

	display_element.innerHTML = html;
	
    display_element.querySelector('#jspsych-play-button-response-button-0').addEventListener('click', function () {
        audio.play();
    });
	
    display_element.querySelector('#jspsych-survey-text-next').addEventListener('click', function () {
        end_trial();
    });

	var startTime = (new Date()).getTime();

    // function to end trial when it is time
    var end_trial = function() {
		
        // measure response time
        var endTime = (new Date()).getTime();
        var response_time = endTime - startTime;
		
		//var val = document.getElementById("jspsych-survey-text-response").value;
		var val = display_element.querySelector("#jspsych-survey-text-response").value;
		console.log(val);

      // stop the audio file if it is playing
      audio.pause();

      // gather the data to store for the trial
      var trial_data = {
        "rt": response_time,
        "stimulus": trial.stimulus,
        "response": val
      };

      // clear the display
     display_element.innerHTML = '';
	 
	setTimeout(function(){
        // move on to the next trial
        jsPsych.finishTrial(trial_data);
	},trial.iti);

      
    };
	
  };

  return plugin;
})();
