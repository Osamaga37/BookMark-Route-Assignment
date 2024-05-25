var bookMark = document.getElementById("book");
var webSite = document.getElementById("web");

var bookList;
if (localStorage.getItem("books") == null) {
  bookList = [];
} else {
  bookList = JSON.parse(localStorage.getItem("books"));
  displayBookMarks(bookList);
}
function addBookMark() {
  var bookData = {
    book: bookMark.value,
    web: webSite.value,
  };
  bookList.push(bookData);
  console.log(bookData.book);
  console.log(bookData.web);
  displayBookMarks(bookList);
  localStorage.setItem("books", JSON.stringify(bookList));
  clearData();
}

function clearData() {
  bookMark.value = null;
  webSite.value = null;
}

function displayBookMarks() {
  var container = ``;
  for (var i = 0; i < bookList.length; i++) {
    var link = "https://";
    container += `
        <tr>
                        <th scope="row">${i + 1}</th>
                        <td>${bookList[i].book}</td>
                        <td><button type="button" class="btn btn-danger px-4 py-2 text-center border-0" id="visit"><a href="${link}${
      bookList[i].web
    }"><i class="fa-solid fa-eye pe-2"></i>Visit</a></button></td>
                        <td><button type="button" class="btn btn-danger px-4 py-2 text-center border-0" id="submit" onclick="deleteBookMark(${i})"><i class="fa-solid fa-trash-can pe-2"></i>Delete</button></td>
                      </tr>`;
  }
  document.getElementById("tData").innerHTML = container;
}

function deleteBookMark(index) {
  bookList.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(bookList));
  displayBookMarks(bookList);
}

function bookValidate(element) {
  var regex = {
    book: /^[a-zA-Z]+[a-zA-Z\s]*?[^0-9]\S$/,
    web: /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?$/gm,
  };
  if (regex[element.id].test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}
