document
  .querySelector("#editUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstNameEdit").focus();
  });

document
  .querySelector("#addUserModal")
  .addEventListener("shown.bs.modal", () => {
    document.querySelector("#firstName").focus();
  });

document.querySelectorAll(".delete-btn").forEach((btnConfirm) => {
  const id = btnConfirm.dataset.id;
  btnConfirm.addEventListener("click", (e) => {
    const options = {
      title: "Are you sure?",
      type: "danger",
      btnOkText: "Yes",
      btnCancelText: "No",
      onConfirm: () => {
        console.log("Confirm");
        deleteUser(id);
      },
      onCancel: () => {
        console.log("Cancel");
      },
    };
    const {
      el,
      content,
      options: confirmedOptions,
    } = bs5dialog.confirm("Do you really want to delete this user?", options);
  });
});

function showEditUserModal(btn){
  const {id, firstName, lastName, username, mobile, isAdmin} = btn.dataset;
  document.querySelector("#idEdit").value = id;
  document.querySelector("#firstNameEdit").value = firstName;
  document.querySelector("#lastNameEdit").value = lastName;
  document.querySelector("#usernameEdit").value = username;
  document.querySelector("#mobileEdit").value = mobile;
  // console.log()
  document.querySelector("#isAdminEdit").checked = isAdmin === "true";
}

async function editUser(event){
  event.preventDefault();
  try {
    const formData = new FormData(document.querySelector("#editUserForm"));
    const data = Object.fromEntries(formData.entries());
    const res = await fetch("/users", {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(data),
    });
    if (res.status === 200){
      return location.reload();
    } else {
      const resText = await res.text();
      throw new Error(resText);
    }
  } catch (e){
    document.querySelector("#errorMessageEdit").innerText = e.message;
    console.error(e);
  }
}

async function deleteUser(id){
  try {
    const res = await fetch(`users/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200){
      return location.reload();
    } else {
      const resText = await res.text();
      throw new Error(resText);
    }

  } catch (e){
    console.error(e);
    const toast = new Bootstrap.Toast(document.querySelector(".toast"), {});
    document.querySelector(".toast-body").innerText = e.message;

  }
}
