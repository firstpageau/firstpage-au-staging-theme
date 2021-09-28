var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("sf-cross-holder").style.display = "block";
    document.getElementById("nextBtn").innerHTML = "TAKE ME HOME";
    document.getElementById("nextBtn").style.fontSize = "24px";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
    document.getElementById("sf-cross-holder").style.display = "none";
  }
  //... and run a function that will display the correct step indicator:
  document.getElementById("strategy-form-progress-bar").style.width =
    (currentTab + 1) * 12.5 + "%";
}

function nextPrev(n) {
  if (n == 1 && !validateForm()) return false;
  // console.log('send form data to hs');
  //send form data each tab
  var frm = $("#strategyForm");
  var data = new FormData($("#strategyForm")[0]);
  // e.preventDefault();
  $.ajax({
    type: frm.attr("method"),
    url: frm.attr("action"),
    cache: false,
    contentType: false,
    processData: false,
    data: data,
    success: function (data) {
      console.log("Submission was successful.");

      // console.log(data);
    },
    error: function (data) {
      console.log("An error occurred.");
      // console.log(data);
    },
  });
  //end
  // checkInputValidate();
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:

  // Hide the current tab:
  x[currentTab].style.display = "none";

  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...

  if (currentTab == 2) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "formSubmissionSucess",
      eventCategory: "Form Submission",
      eventAction: "Free Growth Strategy Form",
      eventLabel: "Submitted",
    });
  }

  if (currentTab == x.length - 1) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "thankyoupageforads",
      eventCategory: "Form Submission",
      eventAction: "Free Growth Strategy Form Final Step",
      eventLabel: "Submitted",
    });
  }
  if (currentTab >= x.length) {
    x[currentTab - 1].style.display = "block";
    $("#strategyForm").attr("action", "/");
    $("#strategyForm").submit();

    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
  changeReview(currentTab);

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function changeReview(currentTab) {
  var reviewText;
  var reviewPerson;
  switch (currentTab) {
    case 0:
      reviewText =
        "They smashed our business goals and a special thanks to Isaac for driving the digital campaign.";
      reviewPerson = "THE TIMELESS COMPANY";
      break;
    case 1:
      reviewText =
        "We had a 300% increase in leads. These guys really know their stuff.";
      reviewPerson = "JOHN ROBINSON";
      break;
    case 2:
      reviewText =
        'All I can say is "wow". Completely blown away by the speed and execution of First Page.';
      reviewPerson = "NICK BARLETT";
      break;
    case 3:
      reviewText =
        "They are very supportive and professional. They think in your shoes and work with you to achieve a great outcome.";
      reviewPerson = "CHARLIE LAU";
      break;
    case 4:
      reviewText =
        "A creative team of geniuses. This is your one stop shop for all things digital.";
      reviewPerson = "CRAIG ROBISON";
      break;
    case 5:
      reviewText =
        "The response times and the results have been fantastic and we would definitely recommend First Page services!";
      reviewPerson = "RICH OLIVER";
      break;
    case 6:
      reviewText =
        "Thank you! I truly appreciate your guidance and knowledge. Great communication and great service!";
      reviewPerson = "DES BROOKES";
      break;
    case 7:
      reviewText =
        "Team of wonderful people that really care and work hard to deliver great results. We are proud of our partnership.";
      reviewPerson = "TRAVIS K";
      break;
    default:
      reviewText: "They smashed our business goals and a special thanks to Isaac for driving the digital campaign.";
      reviewPerson: "THE TIMELESS COMPANY";
  }
  document.getElementById("sf-review-text").innerHTML = reviewText;
  document.getElementById("sf-review-person").innerHTML = reviewPerson;
}

function validateName(name) {
  if (name.trim().length == 0) {
    return false;
  } else {
    return true;
  }
}

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function validatePhone(phone) {
  const re = /^[+() 0-9]*$/gm;

  if (re.test(phone) && phone.trim().length != 0) {
    return true;
  } else {
    return false;
  }
}

function validateWebsite(website) {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator

  if (website.trim().length == 0 || pattern.test(website)) {
    return true;
  } else {
    return false;
  }
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;

  //get name value
  var nameInput = document.getElementById("sf-firstname").value;
  //get email value
  var emailInput = document.getElementById("sf-email").value;
  //get website value
  var websiteInput = document.getElementById("sf-website").value;
  //get phone value and validate
  var phoneInput = document.getElementById("sf-phone").value;

  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");

  if (currentTab == 0) {
    if (!validateWebsite(websiteInput)) {
      valid = false;
    } else {
      valid = true;
    }
    if (validateWebsite(websiteInput) || websiteInput.trim().length == 0) {
      document.getElementById("webErrorMsg").style.display = "none";
    } else {
      document.getElementById("webErrorMsg").style.display = "block";
    }
  }

  if (currentTab != 0) {
    if (
      !validateName(nameInput) ||
      !validateEmail(emailInput) ||
      !validatePhone(phoneInput)
    ) {
      valid = false;
    } else {
      valid = true;
    }

    if (validatePhone(phoneInput)) {
      document.getElementById("phoneErrorMsg").style.display = "none";
    } else {
      console.log("phone bad");
      document.getElementById("phoneErrorMsg").style.display = "block";
    }

    if (validateName(nameInput)) {
      document.getElementById("nameErrorMsg").style.display = "none";
    } else {
      document.getElementById("nameErrorMsg").style.display = "block";
    }

    if (validateEmail(emailInput)) {
      document.getElementById("emailErrorMsg").style.display = "none";
    } else {
      document.getElementById("emailErrorMsg").style.display = "block";
    }
  }
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    if (y[i].type === "checkbox") {
      if (y[i].checked == true) {
        valid = true;
        break;
      } else {
        valid = false;
      }
    }
    if (y[i].type === "radio") {
      if (y[i].checked == true) {
        valid = true;
        break;
      } else {
        valid = false;
      }
    }
  }

  if (currentTab == 6) {
    valid = true;
  }
  return valid; // return the valid status
}

$("#none-checkbox").click(function () {
  $("#seo-checkbox").prop("checked", false);
  $("#google-ads-checkbox").prop("checked", false);
  $("#facebook-checkbox").prop("checked", false);
  $("#print-checkbox").prop("checked", false);
  $("#affiliate-checkbox").prop("checked", false);
  $("#tv-checkbox").prop("checked", false);
  $("#radio-checkbox").prop("checked", false);
});

$(
  "#seo-checkbox, #google-ads-checkbox,#facebook-checkbox, #print-checkbox, #radio-checkbox, #affiliate-checkbox, #tv-checkbox "
).click(function () {
  $("#none-checkbox").prop("checked", false);
});

$("#seo-checkbox").click(function () {
  console.log("seo select state changed");
});

var oldURL = document.referrer;
console.log(oldURL);
