(function( $ ) {
	'use strict';
	
	 function fp_roi_calculate() {
		/* Start Services */
		/* Visits */ var vfp = $('#fr_visits_services'),
		/* Leads */ lfp = $('#fr_leads_services'),
		/* CPL */ cfp = $('#fr_cpl_services'),
		/* Sales */ sfp = $('#fr_sales_services'),
		/* Revenue */ rfp = $('#fr_revenue_services'),
		/* Profit */ pfp = $('#fr_profit_services'),
		/* Monthly R0I */ mfp = $('#fr_monthlyroi_services');

		/* CPC */ var s_cpc_input = $('#cpc_services-range').val();
		/* Ad Spend */ var s_ad_spend_input = $('#ad_spend_services-range').val();
		/* Conversation Rate */ var s_converstion_rate_input = $('#conversation_rate_services-range').val();
		/* Close Rate */ var s_close_rate_input = $('#close_rate_services-range').val();
		/* Avg Customer Value */ var s_customer_value_input = $('#average_customer_value_services-range').val();
		/* Avg Profit Margin */ var s_average_profit_input = $('#average_profit_margin_services-range').val();

		var visits_output = Math.floor(Number(s_ad_spend_input) / Number(s_cpc_input));
		var leads_output = getPercentage(visits_output, s_converstion_rate_input);
		var cpl_output = Math.floor(Number(s_ad_spend_input) / Number(leads_output));
		var sales_output = Math.floor(getPercentage(leads_output, s_close_rate_input));
		var revenue_output = Math.floor(sales_output * Number(s_customer_value_input));
		var profit_output = Math.round(getPercentage(revenue_output, s_average_profit_input), -1);
		var monthly_roi_output = (Number(revenue_output) - Number(s_ad_spend_input)) / Number(s_ad_spend_input) * 100;

		vfp.html(roundToNone(visits_output));
		lfp.html(roundToNone(leads_output));
		cfp.html(formatDollarNone(cpl_output));
		sfp.html(sales_output);
		rfp.html(formatDollarNone(revenue_output));
		pfp.html(formatDollarNone(profit_output));
		mfp.html(formatPercentage(roundToNone(monthly_roi_output)));
		/* End Services */

		/* Start Ecommerce Based */

		/* Visits */ var e_vfp = $('#fr_visits_ecommerce'),
		/* Sales */ e_sfp = $('#fr_sales_ecommerce'),
		/* Revenue */ e_rfp = $('#fr_revenue_ecommerce'),
		/* Profit */ e_pfp = $('#fr_profit_ecommerce'),
		/* Monthly R0I */ e_mfp = $('#fr_monthlyroi_ecommerce');
		
		/* CPC */ var e_cpc_input = $('#cpc_ecommerce-range').val();
		/* Ad Spend */ var e_ad_spend_input = $('#ad_spend_ecommerce-range').val();
		/* Conversation Rate */ var e_converstion_rate_input = $('#conversion_rate_ecommerce-range').val();
		/* Avg Customer Value */ var e_customer_value_input = $('#avg_customer_value_ecommerce-range').val();
		/* Avg Profit Margin */ var e_average_profit_input = $('#avg_profit_value_ecommerce-range').val();
		
		var e_visits_output = Math.floor(Number(e_ad_spend_input) / Number(e_cpc_input));
		var e_sales_output = getPercentage(e_visits_output, e_converstion_rate_input);
		var e_revenue_output = Math.floor(e_sales_output * Number(e_customer_value_input));
		var e_profit_output = Math.round(getPercentage(e_revenue_output, e_average_profit_input), -1);
		var e_monthly_roi_output = (Number(e_revenue_output) - Number(e_ad_spend_input)) / Number(e_ad_spend_input) * 100;

		e_vfp.html(roundToNone(e_visits_output));
		e_sfp.html(roundToNone(e_sales_output));
		e_rfp.html(formatDollarNone(e_revenue_output));
		e_pfp.html(formatDollarNone(e_profit_output));
		e_mfp.html(formatPercentage(roundToNone(e_monthly_roi_output)));

		/* End Ecommerce Based */
	}

	$(function() {
		$('input.fp-slider').change(function () {
			fp_roi_calculate();
		});
		fp_roi_calculate();
	});
	
	function roundToNone(d) {
		return Math.round(d);
	}

	function formatDollarDouble(num) {
		var dollars = ($('#fp-roi-calculator').data('currency') + parseFloat(num, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
        var s= dollars.toString().split(".");
        s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ","); s[1] = '<sup>.' + s[1] + '</sup>';
        return s[0]+s[1];
	}

	function formatDollarNone(num) {
		var dollars = ($('#fp-roi-calculator').data('currency') + parseFloat(num, 10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,").toString());
        var s= dollars.toString().split(".");
        s[0] = s[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return s[0];
	}

	function formatPercentage(num) {
		if (Math.sign(num) == -1) {
			var num = '<span style="color:red">' + num + '%</span>';
		} else {
			var num = num + '%';
		}
		
		return num;
	}

	function getPercentage(num, per) {
		return (num/100) * per;
	}
	
	$( window ).load(function() {

		$(document).mouseup(function (e) {
			$('#fp-dropdown').removeClass('fp-dropdown-show');
		});
		$("#fp-dropdown").mouseup(function() {
			return false;
		});
		$('#fp-dropdown-click').click(function(){
			$('#fp-dropdown').addClass('fp-dropdown-show');
		});

		$('input.fp-slider').change(function () {
			var xid = $(this).attr('id');
			var type = $(this).data('type');
			var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
			$(this).css('background-image',
						'-webkit-gradient(linear, left top, right top, '
						+ 'color-stop(' + val + ', #3467d8), '
						+ 'color-stop(' + val + ', #C5C5C5)'
						+ ')'
						);
			switch (type) {
				case 'percentage':
					$('#'+ xid + '-val').html( formatPercentage($(this).val()) );
				break;
				case 'wholenumber':
					$('#'+ xid + '-val').html( formatDollarNone($(this).val()) );
				break;
				case 'showsup':
					$('#'+ xid + '-val').html( formatDollarDouble($(this).val()) );
				break;
				default:
			}
		});

		$('input.fp-slider').each(function () {
			var xid = $(this).attr('id');
			var type = $(this).data('type');
			var val = ($(this).val() - $(this).attr('min')) / ($(this).attr('max') - $(this).attr('min'));
			$(this).css('background-image',
						'-webkit-gradient(linear, left top, right top, '
						+ 'color-stop(' + val + ', #3467d8), '
						+ 'color-stop(' + val + ', #C5C5C5)'
						+ ')'
						);
			switch (type) {
				case 'percentage':
					$('#'+ xid + '-val').html( formatPercentage($(this).val()) );
				break;
				case 'wholenumber':
					$('#'+ xid + '-val').html( formatDollarNone($(this).val()) );
				break;
				case 'showsup':
					$('#'+ xid + '-val').html( formatDollarDouble($(this).val()) );
				break;
				default:
			}
		});

		$('#show_profit_margin').change(function(){
			const checked = $(this).is(':checked');
			if (checked) {
				$('#fp-average_profit_margin_services').removeClass('fp-hide-block');
				$('#profit_listed_service').removeClass('fp-hide-block');
			} else {
				$('#fp-average_profit_margin_services').addClass('fp-hide-block');
				$('#profit_listed_service').addClass('fp-hide-block');
			}
		});

		$('#show_profit_margin_ecommerce').change(function(){
			
			const checked = $(this).is(':checked');
			if (checked) {
				$('#fp-avg_profit_value_ecommerce').removeClass('fp-hide-block');
				$('#profit_listed_ecommerce').removeClass('fp-hide-block');
			} else {
				$('#fp-avg_profit_value_ecommerce').addClass('fp-hide-block');
				$('#profit_listed_ecommerce').addClass('fp-hide-block');
			}
		})

	 });

})( jQuery );