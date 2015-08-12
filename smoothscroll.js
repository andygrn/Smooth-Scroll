window.smoothScroll = ( function(){
	function createEaseIn(){
		var easing_function = function( p ){
			return ( Math.cos( ( p * Math.PI ) + Math.PI ) + 1 ) / 2;
		};
		return function( uneased_percentage ){
			var limited_uneased_percentage = uneased_percentage < 0 ? 0 : uneased_percentage > 1 ? 1 : uneased_percentage;
			return easing_function( limited_uneased_percentage );
		};
	}
	function scroll( scroll_y_target_pos, duration, end_callback ){
		var initial_pos = ( window.pageYOffset !== undefined ) ? window.pageYOffset : document.documentElement.scrollTop;
		var scroll_y_pos = initial_pos;
		var difference = Math.abs( scroll_y_pos - scroll_y_target_pos );
		var px_per_ms = Math.round( ( difference / ( duration / 13 ) ) * 1000 ) / 1000;
		var increment = initial_pos < scroll_y_target_pos ? px_per_ms : -px_per_ms;
		var tick = function(){
			scroll_y_pos = scroll_y_pos + increment;
			var approach = initial_pos < scroll_y_target_pos ? Math.abs( scroll_y_pos - initial_pos ) : Math.abs( scroll_y_pos - scroll_y_target_pos );
			window.scrollTo( 0, Math.round( easer( approach / difference ) * difference ) + ( initial_pos < scroll_y_target_pos ? initial_pos : scroll_y_target_pos ) );
			if( ( increment >= 0 && scroll_y_pos >= scroll_y_target_pos ) || ( increment < 0 && scroll_y_pos <= scroll_y_target_pos ) ){
				if( end_callback ){
					end_callback();
				}
				return;
			}
			requestAnimFrame( tick );
		};
		tick();
	}
	var timer = null;
	var easer = createEaseIn();
	return {
		scroll: scroll
	};
} )();