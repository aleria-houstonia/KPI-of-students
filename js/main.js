let btnSave = $("#btn-save");
let student = $("#inp-name");
let phone = $("#inp-phone");
let week1 = $("#week-1");
let week2 = $("#week-2");
let week3 = $("#week-3");
let week4 = $("#week-4");
let total = $("#total");
const API = "http://localhost:8000/students";
let pageCount = 1;
let page = 1;
let searchText = "";
let editedId = null;

$("#search-inp").on("input", function (e) {
    //для живого поиска
    searchText = e.target.value;
    render();
});
render();
btnSave.on("click", () => {
    if (
        !student.val() &&
        !phone.val() &&
        !week1.val() &&
        !week2.val() &&
        !week3.val() &&
        !week4.val() &&
        !total.val()
    ) {
        alert("Заполните поля!!!");
        return;
    }
    let newStudent = {
        student: student.val(),
        phone: phone.val(),
        week1: week1.val(),
        week2: week2.val(),
        week3: week3.val(),
        week4: week4.val(),
        total: total.val(),
    };
    postNewStudent(newStudent);
});
function postNewStudent(newStudent) {
    fetch(API, {
        method: "POST",
        body: JSON.stringify(newStudent),
        headers: {
            "Content-type": "application/json;charset=utf-8",
        },
    }).then(() => render());
}
function render() {
    let count = 1;
    fetch(`${API}?q=${searchText}&_page=${page}&_limit=5`)
        .then((res) => res.json())
        .then((data) => {
            $("#tbody1").html("");
            data.forEach((item) => {
                $("#tbody1").append(` <tr id=${item.id}>
                <th scope="row">${count++}</th>
                            <td>${item.student}</td>
                <td>${item.phone}</td>
                <td>${item.week1}</td>
                <td>${item.week2}</td>
                <td>${item.week3}</td>
                <td>${item.week4}</td>
                <td>${item.total}</td>
                <td><button type="button" class="btn btn-primary btn-delete">Удалить</button></td>
                <td><button type="button" class="btn btn-primary btn-edit">Изменить </button>
    </td>
            </tr> `);
            });
        });
}

$("body").on("click", ".btn-delete", (e) => {
    let id = e.target.parentNode.parentNode.id;
    console.log(id);
    fetch(`${API}/${id}/`, {
        method: "DELETE",
    }).then((data) => render());
});
render();
$("body").on("click", ".btn-edit", function (e) {
    editedId = e.target.parentNode.parentNode.id;
    fetch(`${API}/${editedId}`)
        .then((res) => res.json())
        .then((toEdit) => {
            $(".edit-student").val(toEdit.student);
            $(".edit-phone").val(toEdit.phone);
            $(".edit-week1").val(toEdit.week1);
            $(".edit-week2").val(toEdit.week2);
            $(".edit-week3").val(toEdit.week3);
            $(".edit-week4").val(toEdit.week4);
            $(".edit-total").val(toEdit.total);
            $(".main-modal").css("display", "block");
        });
});
$(".btn-save").on("click", function (e) {
    if (!$(".edit-inp").val().trim()) {
        alert("Заполните поле");
        return;
    }
    let editedStudent = {
        student: $(".edit-student").val(),
        phone: $(".edit-phone").val(),
        week1: $(".edit-week1").val(),
        week2: $(".edit-week2").val(),
        week3: $(".edit-week3").val(),
        week4: $(".edit-week4").val(),
        total: $(".edit-total").val(),
    };
    fetch(`${API}/${editedId}`, {
        method: "PUT",
        body: JSON.stringify(editedStudent),
        headers: { "Content-Type": "application/json;charset=utf-8" },
    }).then(() => render());
    $(".main-modal").css("display", "none");
});
$(".btn-close").on("click", function () {
    $(".main-modal").css("display", "none");
});

// $("body").on("click", ".btn-edit", (e) => {
//     editedId = e.target.parentNode.parentNode.parentNode.id;
//     console.log(editedId);
//     fetch(`${API}/${editedId}/`)
//         .then((res) => res.json())
//         .then((editedData) => {
//             console.log(editedData);
//             $(".inp-name-edit").val(editedData.student);
//             $(".inp-phone-edit").val(editedData.phone);
//             $(".week-1-edit").val(editedData.week1);
//             $(".week-2-edit").val(editedData.week2);
//             $(".week-3-edit").val(editedData.week3);
//             $(".week-4-edit").val(editedData.week4);
//             $(".total-edit").val(editedData.total);
//         });
// });
// $("body").on("click", ".btn-save_edit", (e) => {
//     if (
//         !$(".inp-name-edit").val().trim() &&
//         !$(".inp-phone-edit").val().trim() &&
//         !$(".week-1-edit").val().trim() &&
//         !$(".week-2-edit").val().trim() &&
//         !$(".week-3-edit").val().trim() &&
//         !$(".week-4-edit").val().trim() &&
//         !$(".total-edit").val().trim()
//     ) {
//         alert("Заполните поле");
//         return;
//     }
//     let editedStudent = {
//         student: $(".inp-name-edit").val(),
//         phone: $(".inp-phone-edit").val(),
//         week1: $(".week-1-edit").val(),
//         week2: $(".week-2-edit").val(),
//         week3: $(".week-3-edit").val(),
//         week4: $(".week-4-edit").val(),
//         total: $(".total-edit").val(),
//     };

//     fetch(`${API}/${editedId}`, {
//         method: "PATCH",
//         body: JSON.stringify(editedStudent),
//         headers: { "Content-Type": "application/json;charset=utf-8" },
//     }).then(() => render());
// });

getPagination();
function getPagination() {
    fetch(`${API}?q=${searchText}`)
        .then((res) => res.json())
        .then((data) => {
            pageCount = Math.ceil(data.length / 5);
            $(".pagination-page").remove();
            for (let i = pageCount; i >= 1; i--) {
                $(".previous-btn").after(
                    `<span class="pagination-page"><a class="pagination-a "href="#">${i}</a></span>`
                );
            }
        });
}

$(".btn-next").on("click", function () {
    if (page >= pageCount) return;
    page++;
    render();
});
$(".btn-prev").on("click", function () {
    if (page <= 1) return;
    page--;
    render();
});
$("body").on("click", ".pagination-page", function (e) {
    page = e.target.innerText;
    render();
});

/*<form class="d-flex">
                <button  type="button" class="btn btn-primary btn-edit" id=" btn-edit" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                    Изменить
                </button>
                <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
            <h5 class="modal-title" id="staticBackdropLabel">Измените данные</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form>
                    <div class="mb-3">
                    <label  for="exampleInputEmail1" class="form-label">ФИО студента</label>
                    <input  type="text" class="form-control inp-name-edit" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Номер телефона студента</label>
                        <input type="number" class="form-control inp-phone-edit"  aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">week-1</label>
                        <input type="number" class="form-control week-1-edit" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">week-2</label>
                        <input  type="number" class="form-control week-2-edit" aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">week-3</label>
                        <input type="number" class="form-control week-3-edit"  aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">week-4</label>
                        <input type="number" class="form-control week-4-edit"  aria-describedby="emailHelp">
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Total KPI</label>
                        <input type="number" class="form-control total-edit" aria-describedby="emailHelp">
                    </div>
                    <button id="btn-save-edit"  type="submit" class="btn btn-primary btn-save_edit">Сохранить</button>
                </form>
            </div>*/
