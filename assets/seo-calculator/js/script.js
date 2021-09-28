jQuery(function($) {

    /**
     *  data.tms = parseFloat(inputTms.value), 
        data.ctr = parseFloat(inputCtr.value), 
        data.conversion = parseFloat(inputConversion.value), 
        data.aov = parseFloat(inputAov.value), 
        data.ltv = parseFloat(inputLtv.value), 
        data.results.visitors = data.tms * data.ctr / 100, 
        data.results.conversions = data.results.visitors * data.conversion / 100, 
        data.results.aov = data.aov, 
        data.results.netRevMon = data.results.aov * data.results.conversions, 
        data.results.tlv = data.ltv * data.results.conversions),

        resultVisitors.innerText = numeral(data.results.visitors).format("0,0"), 
        resultConversions.innerText = numeral(data.results.conversions).format("0,0"), 
        resultAov.innerText = "$" + numeral(data.results.aov).format("0,0"), 
        resultNetRevMon.innerText = "$" + numeral(data.results.netRevMon).format("0,0"), 
        resultTlv.innerText = "$" + numeral(data.results.tlv).format("0,0")
     */
    $(function() {
		$('input.fp-slider').change(function () {
			fp_seo_roi_calculate();
		});
		fp_seo_roi_calculate();
    });
    
    function fp_seo_roi_calculate() {

        var tms = $('#total-search-volume').val(), 
        ctr = $('#ctr').val(), conversion = $('#conversion').val(),
        avr = $('#average-order-value').val(), lifetimevalue = $('#lifetimevalue').val();

        var resultsVisitors = parseFloat(tms) * parseFloat(ctr) / 100, 
        resultsConversions = resultsVisitors * parseFloat(conversion) / 100, 
        resultsAov = parseFloat(avr), resultsnetRevMon = resultsAov * resultsConversions, 
        resultsTlv = parseFloat(lifetimevalue) * resultsConversions;

        var vR = $('#fr_visitor_result'), cR = $('#fr_conversion_result'), aOV = $('#fr_aov_result')
        nRR = $('#fr_net_revenue_result'), tLR = $('#fr_total_lifetime_result'),
        mRR = $('#fr_monthlyroi_result');
   
        vR.html(roundToNone(resultsVisitors));
        cR.html(roundToNone(resultsConversions));
        aOV.html(formatDollarNone(resultsAov));
        nRR.html(formatDollarNone(resultsnetRevMon));
        tLR.html(formatDollarNone(resultsTlv));
        mRR.html(formatDollarNone(resultsnetRevMon));

    }

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
            case 'integer':
                $('#'+ xid + '-val').html( $(this).val() );
            break;
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
            case 'integer':
                $('#'+ xid + '-val').html( $(this).val() );
            break;
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

});