// Initialize Firebase
var config = {
  apiKey: "AIzaSyDh4hNvn-bgn4OePy1PVsL1ymEobCy_fTg",
  authDomain: "lego-3ce40.firebaseapp.com",
  databaseURL: "https://lego-3ce40.firebaseio.com",
  projectId: "lego-3ce40",
  storageBucket: "lego-3ce40.appspot.com",
  messagingSenderId: "734497620137",
  appId: "1:734497620137:web:d2e361c575bbe9c53c69b8",
  measurementId: "G-EZC9K2815R"
};
firebase.initializeApp(config);
firebase.analytics();
// Reference messages collection
var restaurantsRef = firebase.firestore().collection('restaurants');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);


// Submit form
function submitForm(e){
  e.preventDefault();

  // Get values
  var name = document.getElementById('name').value;
  var company = document.getElementById('company').value;
  var email = document.getElementById('email').value;
  var phone = document.getElementById('phone').value;
  var message = document.getElementById('message').value;
  var table = document.getElementById('menu-table')

  // Save message
  saveMessage(name, company, email, phone, message, table);

  // Show alert
  document.querySelector('.alert').style.display = 'block';

  // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Save message to firebase
function saveMessage(name, company, email, phone, message, table){
  var menu = [];
  for (var i = 0, row; row = table.rows[i]; i++) {
    menu.push({
        food: $(row.cells[0]).find("input").val(),
        discount: $(row.cells[1]).find("input").val(),
        description: $(row.cells[2]).find("input").val()
    });
  }
  restaurantsRef.add({
    name: name,
    company:company,
    email:email,
    phone:phone,
    message:message,
    menu:menu
  });
}

$(document).ready(function() {
  $("#add_row").on("click", function() {
    // Dynamic Rows Code
    // Get max row id and set new id
    var newid = 0;
    $.each($("#tab_logic tr"), function() {
        if (parseInt($(this).data("id")) > newid) {
            newid = parseInt($(this).data("id"));
        }
    });
    newid++;
    
    var tr = $("<tr></tr>", {
        id: "addr"+newid,
        "data-id": newid
    });
    
    // loop through each td and create new elements with name of newid
    $.each($("#tab_logic tbody tr:nth(0) td"), function() {
        var td;
        var cur_td = $(this);
        
        var children = cur_td.children();
        
        // add new td and element if it has a name
        if ($(this).data("name") !== undefined) {
            td = $("<td></td>", {
                "data-name": $(cur_td).data("name")
            });
            
            var c = $(cur_td).find($(children[0]).prop('tagName')).clone().val("");
            c.attr("name", $(cur_td).data("name") + newid);
            c.appendTo($(td));
            td.appendTo($(tr));
        } else {
            td = $("<td></td>", {
                'text': $('#tab_logic tr').length
            }).appendTo($(tr));
        }
    });
    
    // add the new row
    $(tr).appendTo($('#tab_logic'));
    
    $(tr).find("td button.row-remove").on("click", function() {
          $(this).closest("tr").remove();
    });
  });

  $("#add_row").trigger("click");
});