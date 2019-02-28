console.log('IP script V3');
jQuery(document).ready(function () {
    // TheTest
    thetest=function(){this.test_id=!1,this.group_id=!1,this.settings={},this.init=function(t){this.test_id=t.testid,this.settings=t,this.get_group(),this.settings.gatrack&&ga("send","event","TheTest",this.test_id,this.group_id)},this.get_group=function(){if(this.group_id)return this.group_id;var t=this.getURLParam("thetestgroup",location.href);if(t)return this.group_id=t,this.group_id;var i=localStorage.getItem("thetest_"+this.test_id+"_group");return i||(i=this.assign_group(),localStorage.setItem("thetest_"+this.test_id+"_group",i)),this.group_id=i,this.group_id},this.assign_group=function(){var t=0,i=Math.random(),s=!1;for(group in this.settings.groups)if((t+=this.settings.groups[group])>i){s=group;break}return s},this.getURLParam=function(t,i){i||(i=window.location.href),t=t.replace(/[\[\]]/g,"\\$&");var s=new RegExp("[?&]"+t+"(=([^&#]*)|&|#|$)").exec(i);return s?s[2]?decodeURIComponent(s[2].replace(/\+/g," ")):"":null}};

    // Load Exit Popup feature - split 50:50 v3:v4
    var exitpopupsplit = new thetest();
    exitpopupsplit.init({
        testid: 'exitpopupsplit_v3_v4',
        groups: {
            'v3' : 0.2,
            'v4' : 0.8,
        },
        gatrack: true
    })
    var exitpopupsplit_group = exitpopupsplit.get_group()
    console.log('exitpopupsplit: '+ exitpopupsplit_group)
    if (exitpopupsplit_group == 'v3') {
      $.getScript('https://services.epoch.cloud/public-labs/dist/exit_popup_v3.bundle.js');
    } else {
      $.getScript('https://services.epoch.cloud/public-labs/dist/exit_popup_v4.bundle.js');
    }



    // Add Plan details to the buttons
    $('.conversion_wrapper a')
    .attr('cb-checkout-account', 'theepochtimes')
    .attr('cb-checkout-plan-id', 'trial_$1_first_month_print_and_digitalsub')
    .attr('cb-checkout-source-landing-page', 'Offers-TRIAL')
    .click(function () {
        $(this).attr('cb-checkout-plan-after-trial-ends', 'print_digital_3months_39_digitalsub')
        console.log('Select product ' + $(this).attr('cb-checkout-plan-after-trial-ends'))
        ga('IPTracker.send', 'event', 'Conversion CTA', 'Checkout Button', 'print_digital_3months_39_digitalsub'); 
        CB_checkout_btn(this)
    });

}); 


function CB_checkout_btn(el) {

    // Extract plan details from button element
    var acc = $(el).attr('cb-checkout-account');
    var plan = $(el).attr('cb-checkout-plan-id');
    var lp = $(el).attr('cb-checkout-source-landing-page');
    var np = $(el).attr('cb-checkout-plan-after-trial-ends');

    var utm_campaign = (getAllUrlParams().utm_campaign) ? getAllUrlParams().utm_campaign : "";
    var utm_source = (getAllUrlParams().utm_source) ? getAllUrlParams().utm_source : "";
    var utm_medium = (getAllUrlParams().utm_medium) ? getAllUrlParams().utm_medium : "";
    var utm_content = (getAllUrlParams().utm_content) ? getAllUrlParams().utm_content : "";
    var utm_term = (getAllUrlParams().utm_term) ? getAllUrlParams().utm_term : "";

    var source_page_url = location.host + location.pathname;
    var source_page_variant = ($('meta[name="test:variant"]').attr('content')) ? $('meta[name="test:variant"]').attr('content') : location.pathname;
    
    // Generate checkout GET form and submit
    // See docu: https://www.chargebee.com/docs/advanced_hosted_page_sign_up.html

    var checkout_form = '<form action="https://'+acc+'.chargebee.com/hosted_pages/plans/'+plan+'" id="cb_checkout_form" style="display:none" method="GET">' + 
                        '<input type="hidden" name="subscription[cf_source_landing_page]" value="'+lp+'" />' +
                        '<input type="hidden" name="subscription[cf_plan_after_trial_ends]" value="'+np+'" />' +
                        '<input type="hidden" name="subscription[cf_utm_campaign]" value="'+utm_campaign+'" />' +
                        '<input type="hidden" name="subscription[cf_utm_source]" value="'+ utm_source  +'" />' +
                        '<input type="hidden" name="subscription[cf_utm_medium]" value="'+utm_medium+'" />' +
                        '<input type="hidden" name="subscription[cf_utm_term]" value="'+utm_term+'" />' +
                        '<input type="hidden" name="subscription[cf_utm_content]" value="'+utm_content+'" />' +
                        '<input type="hidden" name="subscription[cf_source_page_variant]" value="'+source_page_variant+'" />' +
                        '<input type="hidden" name="subscription[cf_source_page_url]" value="'+source_page_url+'" />' +
                        '</form>';

    $('body').append(checkout_form);
    $('#cb_checkout_form').submit();
}

function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
    // we'll store the parameters here
    var obj = {};
  
    // if query string exists
    if (queryString) {
  
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];
  
      // split our query string into its component parts
      var arr = queryString.split('&');
  
      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');
  
        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
  
        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = decodeURIComponent(paramValue.toLowerCase());
  
        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
  
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
  
          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }
  
    return obj;
  }