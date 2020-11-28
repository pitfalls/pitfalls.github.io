/**
 * Let it snow!!
 */
$.fn.snow();

/**
 * Navigation menu and notes
 */
$('.about-link, .notes-link').click( function() {
  $('.notes').addClass('active').removeClass('hidden');
  if( $(this).attr('class') === 'about-link') {
    $('.about').addClass('active').removeClass('hidden');
  } else if( $(this).attr('class') === 'notes-link') {
    $('.design-notes').addClass('active').removeClass('hidden');
  }
});
$('section, .close-notes').click( function() {
  $('.notes, .about, .design-notes').removeClass('active').addClass('hidden');
});

/* Prev/Next Buttons */
$('.day-list li').click( function() {
  $('.day-list li').removeClass('active').removeClass('today');
  $(this).addClass('active');
});

// Get width of the view area in pixels
var width = $('.day').width();

// Prev button
$('.prev').click( function() {
  var pos = $('#container #inner').css("margin-left");
  pos = pos.slice(0,-2);
  if( pos === '0' ) {
    $('#container #inner').css("margin-left", "-2400vw");
  } else {
    var offset = parseInt(pos) + width;
    $('#container #inner').css("margin-left", offset + "px" );
  }
});

// Next button
$('.next').click( function() {
  var pos = $('#container #inner').css("margin-left");
  pos = pos.slice(0,-2);
  if( pos >= width * 25 ) {
    $('#container #inner').css("margin-left", "-0vw");
  } else {
    var offset = parseInt(pos) - width;
    $('#container #inner').css("margin-left", offset + "px" );
  }
});

/**
 * Date Countdown timer
 * @link http://codepen.io/chrisjdesigner/pen/dMbmoE
 */
var thisYear = new Date();
var thisChristmas = thisYear.getFullYear() + "/12/25 00:00:00";
var christmas = new Date( thisChristmas ),
    days, hours, mins, secs;

$('.this-year').text( thisYear.getFullYear() );

//var setPieChart = function(name) {
  //var num = name,
//      fixedNumber = num,
//      result = fixedNum + ' ' + total;
//  pie.style.strokeDasharray = 25;
//}

function showToday() {
  var date = thisYear.getDate();
  //alert(date);
  $('.day-list a[href="#day' + date + ']').parent('li').addClass('today');
}

$(function() {
  // Calculate time to Christmas
  showToday();
  timeToXmas();
  // Transition from 0
  numberTrans( '#days .number', days, 1000, 'easeOutQuad' );
  numberTrans( '#hours .number', hours, 1000, 'easeOutQuad' );
  numberTrans( '#minutes .number', mins, 1000, 'easeOutQuad' );
  numberTrans( '#seconds .number', secs, 1000, 'easeOutQuad' );
  // Begin countdown
  setTimeout( countdownTimer, 1001 );
});

// function to calc Time to Christmas
function timeToXmas() {
  var today = new Date();
  // diff between dates
  var diff = (today - christmas)/1000;
  var diff = Math.abs(Math.floor(diff));

  // Day to target
  days = Math.floor(diff/(24*60*60));
  secs = diff - days * 24*60*60;
  // Hours
  hours = Math.floor(secs/(60*60));
  secs = secs - hours * 60*60;
  // Minutes
  mins = Math.floor(secs/60);
  secs = secs - mins * 60;
}

// function to display the countdown Timer
function countdownTimer() {
  timeToXmas();
  // display in front-end clock
  // Seems like multiplying by 360(degrees) gives an inaccurate measure - 315 is the proper number to be an even division of the pie graph clock
  $( '#days .number' ).text(days);
  var dayResult = 315*(days/25) + ' ' + 360;
  $( '#days .pie' ).css( { "stroke-dasharray": dayResult } );
  $( '#hours .number' ).text(hours);
  var hrResult = 315*(hours/24) + ' ' + 360;
  $( '#hours .pie' ).css( { "stroke-dasharray": hrResult } );
  $( '#minutes .number' ).text(mins);
  var minResult = 315*(mins/60) + ' ' + 360;
  $( '#minutes .pie' ).css( { "stroke-dasharray": minResult } );
  $( '#seconds .number' ).text(secs);
  var secResult = 315*(secs/60) + ' ' + 360;
  $( '#seconds .pie' ).css( { "stroke-dasharray": secResult } );
  // repeat every second
  setTimeout(countdownTimer, 1000);
}

// Transition numbers
function numberTrans( id, endpt, transDur, transEase ) {
  $({numberCount: $(id).text()}).animate({numberCount: endpt}, {
    duration: transDur,
    easing: transEase,
    step: function() {
      $(id).text(Math.floor(this.numberCount));
    },
    complete: function() {
      $(id).text(this.numberCount);
    }
  });
};
