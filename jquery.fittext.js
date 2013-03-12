/*!	
* FitText.js 1.2
*
* UPDATE
*   Desc    : Add unFitText method for responsive purposes
*   Author  : Stéphane Guigné (http://stephaneguigne.com)
*   Github  : https://github.com/guins/FitText.js
*   Date    : Tue Mar 12 2013
*   
*
* Copyright 2011, Dave Rupert http://daverupert.com
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
*
*/

(function( $ ){
	
  var pluginName = 'FitTextJS';

  $.fn.fitText = function( kompressor, options ) {
	   
    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function()
    {
      var $this = $(this),
          data = $this.data(pluginName);

      if( !data )
      {
        var id = Math.random()*999999+100000>>0,
            resizer = function () {
              // Prevent differed window resize events
              if( !$this.data(pluginName) ) return;

              $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
                console.log('sdcsd');
            };

        // Store Data
        $this.data(pluginName, { id: id });

        // Call once to set.
        resizer();
        
        // Call on resize. Opera debounces their resize by default. 
        $(window).on('resize.'+pluginName+'_'+id, resizer);
      }
    });

  };

  $.fn.unfitText = function()
  {
    return this.each(function()
    {
      // Get stored data
      var $this = $(this),
          data = $this.data(pluginName);

      if( data && data.id)
      {
        // Remove listenner
        $(window).off('.'+pluginName+'_'+data.id);
        // Reset styles and data
        $this.css('font-size','').data(pluginName,null);
      }
    });
  };

})( jQuery );