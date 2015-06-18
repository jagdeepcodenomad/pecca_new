(function ($) {
    //var value = 10;
    var eCalendar = function (options, object) {
        // Initializing global variables
        var adDay = new Date().getDate();
        var adMonth = new Date().getMonth();
        var adYear = new Date().getFullYear();
        var dDay = adDay;
        var dMonth = adMonth;
        var dYear = adYear;
        var instance = object;

        var settings = $.extend({}, $.fn.eCalendar.defaults, options);

        function lpad(value, length, pad) {
            if (typeof pad == 'undefined') {
                pad = '0';
            }
            var p;
            for (var i = 0; i < length; i++) {
                p += pad;
            }
            return (p + value).slice(-length);
        }

        var mouseOver = function () {
            $(this).addClass('c-nav-btn-over');
        };
        var mouseLeave = function () {
            $(this).removeClass('c-nav-btn-over');
        };
        var mouseOverEvent = function () {
            $(this).addClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $('div.c-event-item[data-event-day="' + d + '"]').addClass('c-event-over');
        };
        var mouseLeaveEvent = function () {
            $(this).removeClass('c-event-over')
            var d = $(this).attr('data-event-day');
            $('div.c-event-item[data-event-day="' + d + '"]').removeClass('c-event-over');
        };
        var mouseOverItem = function () {
            $(this).addClass('c-event-over');
            var d = $(this).attr('data-event-day');
            $('div.c-event[data-event-day="' + d + '"]').addClass('c-event-over');
        };
        var mouseLeaveItem = function () {
            $(this).removeClass('c-event-over')
            var d = $(this).attr('data-event-day');
            $('div.c-event[data-event-day="' + d + '"]').removeClass('c-event-over');
        };
        var nextMonth = function () {
            if (dMonth < 11) {
                dMonth++;
            } else {
                dMonth = 0;
                dYear++;
            }
            print();
	    clicking_date();
        };
        var previousMonth = function () {
            if (dMonth > 0) {
                dMonth--;
            } else {
                dMonth = 11;
                dYear--;
            }
            print();
	    clicking_date();
	   
        };
         var nextYear = function () {
            if (dMonth < 11) {
                dYear++;
            } else {
                dMonth = 11;
                dYear++;
            }
            print();
        };
		var previousYear = function () {
            if (dMonth > 0) {
                 dYear--;
            } else {
                dMonth = 11;
               
				dYear--;
            }
            print();
        };
        function loadEvents() {
            if (typeof settings.url != 'undefined' && settings.url != '') {
                $.ajax({url: settings.url,
                    async: false,
                    success: function (result) {
                        settings.events = result;
                    }
                });
            }
        }

	function clicking_date(){
		/*$('.c-day').on('click', function() {
			loadEvents();
			 	//loadpage();
			
			current_month = dMonth +1;
			var dt = dYear+"/"+current_month+"/"+$(this).html();
			alert(dt);
			document.getElementById("schedule_date").value = dt;
		});*/
	}

        function print() {
	    
            loadEvents();
            var dWeekDayOfMonthStart = new Date(dYear, dMonth, 1).getDay();
            var dLastDayOfMonth = new Date(dYear, dMonth + 1, 0).getDate();
            var dLastDayOfPreviousMonth = new Date(dYear, dMonth + 1, 0).getDate() - dWeekDayOfMonthStart + 1;

            var cBody = $('<div/>').addClass('c-grid');
            var cEvents = $('<div/>').addClass('c-event-grid');
            var cEventsBody = $('<div/>').addClass('c-event-body');
            cEvents.append($('<div/>').addClass('c-event-title c-pad-top').html(settings.eventTitle));
            cEvents.append(cEventsBody);
			var ccNext = $('<div/>').addClass('cc-next c-grid-title c-pad-top');
            var cNext = $('<div/>').addClass('c-next c-grid-title c-pad-top');
            var cMonth = $('<div/>').addClass('c-month c-grid-title c-pad-top');
             
            var cPrevious = $('<div/>').addClass('c-previous c-grid-title c-pad-top');
			var ccPrevious = $('<div/>').addClass('cc-previous c-grid-title c-pad-top');
			ccPrevious.html(settings.textArrows.years_prev);
            cPrevious.html(settings.textArrows.previous);
            cMonth.html(settings.months[dMonth] + ' ' + dYear);
            cNext.html(settings.textArrows.next);
             ccNext.html(settings.textArrows.years_next);
            cPrevious.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', previousMonth);
            cNext.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', nextMonth);
	         ccNext.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', nextYear);
			 ccPrevious.on('mouseover', mouseOver).on('mouseleave', mouseLeave).on('click', previousYear);
             cBody.append(ccPrevious);
            cBody.append(cPrevious);
            cBody.append(cMonth);
            cBody.append(cNext);
			cBody.append(ccNext);
            for (var i = 0; i < settings.weekDays.length; i++) {
                var cWeekDay = $('<div/>').addClass('c-week-day c-pad-top');
                cWeekDay.html(settings.weekDays[i]);
                cBody.append(cWeekDay);
            }
            var day = 1;
            var dayOfNextMonth = 1;
	    var sat_day = 7 - dWeekDayOfMonthStart;
			var tot_class = 0;
			//alert(dLastDayOfMonth);
            for (var i = 0; i < dLastDayOfMonth + dWeekDayOfMonthStart+5; i++) {				
                var cDay = $('<div/>');
				//alert(dWeekDayOfMonthStart);
                if (i < dWeekDayOfMonthStart) {
                    cDay.addClass('c-day-previous-month c-pad-top');
                    //cDay.html(dLastDayOfPreviousMonth++);
                } else if(sat_day + 1 == day){
					tot_class++;
			   cDay.addClass('c-total');
			   cDay.attr('id', 'week-'+tot_class);
			   var min_dat = sat_day - 6;
			   if(min_dat < 1){
				   min_dat = 1;
			   }			   
			   var max_dat = sat_day;
			   current_month = dMonth + 1;
			   min_dat = min_dat+"-"+current_month+"-"+ dYear;
			   max_dat = max_dat+"-"+current_month+"-"+ dYear;
			   //alert(min_dat);
			   var wek = 0;
			   if(sat_day <= 7){
				   wek = 1;
			   }else if(sat_day <= 14){
				   wek = 2;
			   }else if(sat_day <= 21){
				   wek = 3;
			   }else if(sat_day <= 28){
				   wek = 4;
			   }else{
				   wek = 5;
			   }
			  
			   $.ajax({
				   type : "GET",
				   url  : "check_total.php",
				   data : {min_dat : min_dat, max_dat : max_dat, wek : wek},
				   success:function(response){
						var tot = response.split(" ");
						console.log(response);
					  // alert(response);
					    //cDay.html("<b>$"+response+"</b>");
						$("#week-"+tot[1]).html('<b>$'+tot[0]+'</b>');
                                                //alert(tot);
				   }
				 
			   });
			
			   cDay.html("<b>$0</b>");
			   
			
			  //cDay.html(document.write("<b>" + value + "</b>"));
				sat_day = sat_day + 7;
               //alert(sat_day);
		}else if (day <= dLastDayOfMonth) {
                    cDay.addClass('c-day c-pad-top');
					
                    if (day == dDay && adMonth == dMonth && adYear == dYear) {
                        cDay.addClass('c-today');				
                    }
            
	//alert(dDay+' '+dMonth+ ' ' + dYear);
					
                    /*for (var j = 0; j < settings.events.length; j++) {
                        var d = settings.events[j].datetime;
                        if (d.getDate() == day && (d.getMonth() - 1) == dMonth && d.getFullYear() == dYear) {
                            cDay.addClass('c-event').attr('data-event-day', d.getDate()).attr('title','Total Posted ADS 4');
                          cDay.on('mouseover', mouseOverEvent).on('mouseleave', mouseLeaveEvent);
                              
                        }
                    }*/
					
					current_month = dMonth + 1;
					current_date = day+"-"+current_month+"-"+ dYear;
					cDay.attr('id', 'date-'+current_date);
					$.ajax({
						type : "GET",
						url : "event_on_load.php",
						data : {current_date : current_date},
						success : function(response){
							console.log(response);
							var tot = response.split(" ");
							var num = parseInt(tot[0]);
							if(num > 0){
								$("#date-"+tot[1]).addClass('c-event').attr('title','Total Posted ADS '+num);
							}
						}
					});
					
                    cDay.html(day++);

                } else {
                    //cDay.addClass('c-day-next-month c-pad-top');
                   // cDay.html(dayOfNextMonth++);
                }
                cBody.append(cDay);
            }
		
            var eventList = $('<div/>').addClass('c-event-list');
            for (var i = 0; i < settings.events.length; i++) {
                var d = settings.events[i].datetime;
                if ((d.getMonth() - 1) == dMonth && d.getFullYear() == dYear) {
                    var date = lpad(d.getDate(), 2) + '/' + lpad(d.getMonth(), 2) + ' ' + lpad(d.getHours(), 2) + ':' + lpad(d.getMinutes(), 2);
                    var item = $('<div/>').addClass('c-event-item');
                    var title = $('<div/>').addClass('title').html(date + '  ' + settings.events[i].title + '<br/>');
                    var description = $('<div/>').addClass('description').html(settings.events[i].description + '<br/>');

                    item.attr('data-event-day', d.getDate());
                      //alert('description');
                    item.on('mouseover', mouseOverItem).on('mouseleave', mouseLeaveItem);
                    item.append(title).append(description);
                    eventList.append(item);
                }
            }
            $(instance).addClass('calendar');
            cEventsBody.append(eventList);
            $(instance).html(cBody).append(cEvents);
            
            
			
			$(".c-day").click(function(eventing){
				$target = $(eventing.target);   
				var index = $(".c-day").index(this);

				document.getElementsByClassName("c-day")[index].innerHTML;
				var value1 = 5;	 
				var calend=document.getElementsByClassName("c-day")[index].innerHTML;
				var cureent_month = dMonth+ 1;
             //alert(calend+' '+cureent_month+ ' ' + dYear);
			   var current_date = calend+'-'+cureent_month+ '-' + dYear;
                   var tim = "00:00:00";
				  	 $.ajax({
                       type: "POST",
                       url: "insert.php", 
                       data: { calend:current_date, value:value1, tim : tim},
                       success: function(response) 
                       {        
                            console.log(response);
							var spl = response.split("////");
                            $target.addClass('c-event');
							$target.attr('title', spl[0]);
							var tot = spl[1].split(" ");
							$("#week-"+tot[1]).html('<b>$'+tot[0]+'</b>');
							
                       }        
                    });
				});
			
        }
	
        return print();
    }

    $.fn.eCalendar = function (oInit) {
        return this.each(function () {
            return eCalendar(oInit, $(this));
        });
    };

    // plugin defaults
    $.fn.eCalendar.defaults = {
        weekDays: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'],
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        textArrows: {previous: '<', next: '>'},
        eventTitle: 'Eventos',
        url: '',
        events: [
            {title: 'Brasil x Croácia', description: 'Abertura da copa do mundo 2014', datetime: new Date(2014, 6, 12, 17)},
            {title: 'Brasil x México', description: 'Segundo jogo da seleção brasileira', datetime: new Date(2014, 6, 17, 16)},
            {title: 'Brasil x Camarões', description: 'Terceiro jogo da seleção brasileira', datetime: new Date(2014, 6, 23, 16)}
        ]
    };

}(jQuery));
