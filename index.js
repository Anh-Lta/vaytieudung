//----------------------------------menu----------------------------------
var close = document.querySelector("#close");
var open = document.querySelector("#menu-open");
var menu = document.querySelector(".menu");
var menuLists = document.querySelectorAll(".menu-link");

if (close) {
  close.addEventListener("click", () => {
    menu.classList.remove("showMenu");
    console.log("sd");
  });
}
if (open) {
  open.addEventListener("click", () => {
    menu.classList.add("showMenu");
    console.log("sd");
    console.log(typeof close, typeof open);
  });
}
menuLists.forEach((menuList) => {
  menuList.addEventListener("click", () => {
    menu.classList.remove("showMenu");
  });
});

//----------------------------------snow----------------------------------
$(function () {
  $.fn.extend({
    snow: function (props) {
      props = jQuery.extend({ amount: 60 }, props);
      let random = (min, max) => Math.random() * (max - min) + min;
      let svg = '<svg class="snow" xmlns="http://www.w3.org/2000/svg">';
      for (let index = 0; index < props.amount; index++) {
        svg += `<circle class="particle" r="${random(1, 3)}" cx="${random(
          1,
          100
        )}%" cy="-${random(1, 100)}" />`;
      }
      svg += "</svg>";
      this.replaceWith(svg);
    },
  });

  //Init snow
  $(".snow").snow({
    amount: 300,
  });
});

// ----------------------------send email----------------------------------
function test() {
  function validEmail(email) {
    var re =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
  }

  function validateHuman(honeypot) {
    if (honeypot) {
      console.log("Robot Detected!");
      return true;
    } else {
      console.log("Welcome Human!");
    }
  }
  function getFormData(form) {
    var elements = form.elements;

    var fields = Object.keys(elements)
      .filter(function (k) {
        return elements[k].name !== "honeypot";
      })
      .map(function (k) {
        if (elements[k].name !== undefined) {
          return elements[k].name;
        } else if (elements[k].length > 0) {
          return elements[k].item(0).name;
        }
      })
      .filter(function (item, pos, self) {
        return self.indexOf(item) == pos && item;
      });

    var formData = {};
    fields.forEach(function (name) {
      var element = elements[name];
      formData[name] = element.value;
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(", ");
      }
    });
    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "Sheet1"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default
    // console.log(formData);
    return formData;
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const toast = document.querySelector(".toast");
    toast.classList.add("toastEffect");
    const reload = setTimeout(function () {
      location.reload(true);
    }, 4000);
    var form = event.target;
    var data = getFormData(form);
    if (data.email && !validEmail(data.email)) {
      var invalidEmail = form.querySelector(".email-invalid");
      if (invalidEmail) {
        invalidEmail.style.display = "block";
        return false;
      }
    } else {
      var url = form.action;
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function () {
        // console.log(xhr.status, xhr.statusText);
        // console.log(xhr.responseText);

        return;
      };
      var encoded = Object.keys(data)
        .map(function (k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
        })
        .join("&");
      xhr.send(encoded);
    }
  }

  function loaded() {
    console.log("Contact form submission handler loaded successfully.");
    var forms = document.querySelectorAll("form.gform");
    for (var i = 0; i < forms.length; i++) {
      forms[i].addEventListener("submit", handleFormSubmit, false);
    }
  }
  document.addEventListener("DOMContentLoaded", loaded, false);
  if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
  }
}
test();

// ----------------------------------scroll smooth----------------------------------
const links = document.querySelectorAll(".header ul a");
for (const link of links) {
  link.addEventListener("click", clickHandler);
}

function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  const offsetTop = document.querySelector(href).offsetTop;

  scroll({
    top: offsetTop,
    behavior: "smooth",
  });
}

//----------------------------------format money----------------------------------
// $("#numberOfMoney").on({
//   keyup: function () {
//     formatCurrency($(this));
//   },
//   blur: function () {
//     formatCurrency($(this), "blur");
//   },
// });

// function formatNumber(n) {
//   // format number 1000000 to 1,234,567
//   return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// }

// function formatCurrency(input, blur) {
//   // appends $ to value, validates decimal side
//   // and puts cursor back in right position.

//   // get input value
//   var input_val = input.val();

//   // original length
//   var original_len = input_val.length;

//   // initial caret position
//   var caret_pos = input.prop("selectionStart");

//   // check for decimal
//   if (input_val.indexOf(".") >= 0) {
//     // get position of first decimal
//     // this prevents multiple decimals from
//     // being entered
//     var decimal_pos = input_val.indexOf(".");

//     // split number by decimal point
//     var left_side = input_val.substring(0, decimal_pos);
//     var right_side = input_val.substring(decimal_pos);

//     // add commas to left side of number
//     left_side = formatNumber(left_side);

//     // validate right side
//     right_side = formatNumber(right_side);

//     // On blur make sure 2 numbers after decimal

//     // Limit decimal to only 2 digits
//     right_side = right_side.substring(0, 2);

//     // join number by .
//     input_val = left_side;
//   } else {
//     // no decimal entered
//     // add commas to number
//     // remove all non-digits
//     input_val = formatNumber(input_val);
//     input_val = input_val;

//     // final formatting
//   }

//   // send updated string to input
//   input.val(input_val);

//   // put caret back in the right position
//   var updated_len = input_val.length;
//   caret_pos = updated_len - original_len + caret_pos;
//   input[0].setSelectionRange(caret_pos, caret_pos);
//   console.log(typeof Number(input_val));
// }
////----------------------------------prevent F12----------------------------------
jQuery(document).ready(function () {
  jQuery("body").bind("cut copy paste", function (e) {
    e.preventDefault();
  });
  jQuery("body").on("contextmenu", function (e) {
    return false;
  });
});
jQuery(document).keydown(function (event) {
  if (event.keyCode == 123) {
    return false;
  }
  if (event.ctrlKey && event.shiftKey && event.keyCode == 67) {
    return false;
  }
  if (event.ctrlKey && event.shiftKey && event.keyCode == 73) {
    return false;
  }
});
document.onkeydown = function (e) {
  if (
    e.ctrlKey &&
    (e.keyCode === 67 ||
      e.keyCode === 86 ||
      e.keyCode === 85 ||
      e.keyCode === 117)
  ) {
    return false;
  } else {
    return true;
  }
};
jQuery(document).keypress("u", function (e) {
  if (e.ctrlKey) {
    return false;
  } else {
    return true;
  }
});
document.body.addEventListener("keydown", (event) => {
  if (event.ctrlKey && "spa".indexOf(event.key) !== -1) {
    event.preventDefault();
  }
});
