const BASEURL = "http://127.0.0.1:8000/";

// make request to backend
const makeRequest = async (config) => {
  const response = await jQuery.ajax(config);
  return response;
};

// clear all data of table
const clearTbody = () => {
  jQuery("#table>tbody").empty();
};

// create single table row
const createSingleTableRow = (response) => {
  var table = document.querySelector("#table");
  var tbody = table.querySelector("tbody");
  var newRow = tbody.insertRow(0);
  newRow.insertCell(0).append(response["id"]);
  newRow.insertCell(1).append(response["body"]);
  newRow.insertCell(2).append(response["created"]);
  newRow.insertCell(3).append(response["updated"]);
  newRow.insertCell(
    4
  ).innerHTML = `<button type="button" id="update-button" value="${response["id"]}" class="btn btn-warning">Update</button>`;
  newRow.insertCell(
    5
  ).innerHTML = `<button type="button" id="delete-button" value="${response["id"]}"  class="btn btn-danger">Delete</button>`;
  addEventListener();
};

// create multiple table row
const createMultipleTableRow = (response) => {
  for (var data of response) {
    var table = document.querySelector("#table");
    var tbody = table.querySelector("tbody");
    var newRow = tbody.insertRow();
    newRow.insertCell(0).append(data["id"]);
    newRow.insertCell(1).append(data["body"]);
    newRow.insertCell(2).append(data["created"]);
    newRow.insertCell(3).append(data["updated"]);
    newRow.insertCell(
      4
    ).innerHTML = `<button type="button" id="update-button" value="${data["id"]}" class="btn btn-warning">Update</button>`;
    newRow.insertCell(
      5
    ).innerHTML = `<button type="button" id="delete-button" value="${data["id"]}"  class="btn btn-danger">Delete</button>`;
  }
  addEventListener();
};

// add eventListener to update and delete button
const addEventListener = () => {
  var deleteButtons = document.querySelectorAll("#delete-button");
  var updateButtons = document.querySelectorAll("#update-button");
  for (var i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", (event) => {
      deleteData(event.target["value"]);
    });
  }
  for (var i = 0; i < updateButtons.length; i++) {
    updateButtons[i].addEventListener("click", (event) => {
      updateData(event.target["value"]);
      console.log(event);
    });
  }
};

// load data
const getData = () => {
  makeRequest({
    url: `${BASEURL}list/`,
  })
    .then((response) => {
      clearTbody();
      createMultipleTableRow(response);
    })
    .catch((error) => console.log(error));
};

// delete data
const deleteData = (id) => {
  makeRequest({
    url: `${BASEURL}delete/${id}`,
    method: "DELETE",
  })
    .then((response) => {
      clearTbody();
      createMultipleTableRow(response);
    })
    .then(() => {
      var alert = document.querySelector("#delete-alert");
      alert.classList.add("visible");
    })
    .then(() => {
      setTimeout(() => {
        var alert = document.querySelector("#delete-alert");
        alert.classList.remove("visible");
      }, 500);
    })
    .catch((error) => console.log(error));
};

// update data
const updateData = (id) => {
  var data = prompt(`${id}`);
  makeRequest({
    url: `${BASEURL}update/${id}`,
    method: "PUT",
    data: {
      body: data,
    },
  })
    .then((response) => {
      console.log(response);
    })
    .then(() => {
      getData();
    })
    .then(() => {
      var alert = document.querySelector("#update-alert");
      alert.classList.add("visible");
    })
    .then(() => {
      setTimeout(() => {
        var alert = document.querySelector("#update-alert");
        alert.classList.remove("visible");
      }, 500);
    })
    .catch((error) => console.log(error));
};

// call getData function at page load
document.addEventListener("load", getData());

// add data
document
  .getElementById("form-submit-button")
  .addEventListener("click", (event) => {
    event.preventDefault();
    const formData = document.getElementById("exampleInput").value;
    document.querySelector("#exampleInput").value = "";
    makeRequest({
      url: `${BASEURL}add/`,
      method: "POST",
      data: {
        body: formData,
      },
    })
      .then((response) => {
        console.log(response);
        createSingleTableRow(response);
      })
      .then(() => {
        var alert = document.querySelector("#add-alert");
        alert.classList.add("visible");
      })
      .then(() => {
        setTimeout(() => {
          var alert = document.querySelector("#add-alert");
          alert.classList.remove("visible");
        }, 500);
      })
      .catch((error) => console.log(error));
  });
