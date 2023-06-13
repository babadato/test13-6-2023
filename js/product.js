// Biến toàn cục mảng 2 chiều chứa tất cả các học viên
let listProduct = [
    ['P001', 'Áo sơ mi', '5000', '8000', '13/06/2023', 'X,XL', 'Male', 'Do sếp tổng nhập'],
    ['P002', 'Áo hai dây', '3000', '4000', '12/06/2023', 'X,XL,L', 'Female', 'Do nhân viên nhập'],
    ['P001', 'Áo sơ mi', '7000', '8000', '13/06/2023', 'X,XL', 'Male', 'Do sếp tổng nhập']
];
let action = "create";
// Hàm render dữ liệu từ listProduct ra table
function renderData() {
    // Lấy ra phần tử được render dữ liệu
    let tbody = document.getElementById("content");
    // Đặt tbody chưa chứa dữ liệu
    tbody.innerHTML = "";
    for (let index = 0; index < listProduct.length; index++) {
        // render dữ liệu từng tr của tbody
        tbody.innerHTML += `<tr>
                            <td>${index + 1}</td>
                            <td>${listProduct[index][0]}</td>
                            <td>${listProduct[index][1]}</td>
                            <td>${listProduct[index][2]}</td>
                            <td>${listProduct[index][3]}</td>
                            <td>${listProduct[index][4]}</td>
                            <td>${listProduct[index][5]}</td>
                            <td>${listProduct[index][6]}</td>
                            <td>${listProduct[index][7]}</td>
                            <td>
                                <button onclick="editProduct('${listProduct[index][0]}')">Edit</button>
                                <button onclick="deleteProduct('${listProduct[index][0]}')">Delete</button>
                            </td>
                        </tr>`
    }
}
// Hàm validate dữ liệu khách hàng nhập vào khi thêm mới hoặc cập nhật
function validateForm() {
    // 1. Lấy dữ liệu từ form
    let productId = document.getElementById("productId").value;
    let productName = document.getElementById("productName").value;
    let importPrice = document.getElementById("importPrice").value;
    let exportPrice = document.getElementById("exportPrice").value;
    let importDate = document.getElementById("importDate").value;
    let size = document.querySelector("input[name='size']").value;
    let type = document.querySelector("input[name='type']:checked").value;
    let description = document.getElementById("description").value;
    // 2. Thực hiện validate, nếu thỏa mãn --> true, có lỗi thông báo --> false
    // Validate productId
    if (productId.length == 4 && productId.startsWith("P") == true) {
        alert("Vui lòng nhập mã sản phẩm");
        return false;
    }
    // Validate productID bị trùng
    let index = getProductByProductId(productId);
    if (index >= 0) {
        alert("Mã sản phẩm đã tồn tại, vui lòng nhập lại");
        return false;
    }
    // Validate product Name
    if (productName.length >= 6 && productName.length <= 50) {
        alert("Vui lòng nhập vào tên sản phẩm");
        return false;
    }
    // Validate importPrice
    if (Number(importPrice) > 0) {
        alert("Vui lòng nhập giá");
        return false;
    }
    // Validate exportPrice
    if (Number(exportPrice) > importPrice) {
        alert("Vui lòng nhập giá");
        return false;
    }
    //Validate importDate
    let importDatePattern = /\d{1,2}\/\d{1,2}\/\d{4}/;
    if (!importDate.match(importDatePattern)) {
        alert("Vui lòng nhập importDate đúng định dạng");
        return false;
    }

    return true;
}

// Hàm thực hiện thêm mới hoặc cập nhật sản phẩm
function createOrEdit() {
    if (validateForm()) {
        // 1. Lấy dữ liệu từ form
        let productId = document.getElementById("productId").value;
        let productName = document.getElementById("productName").value;
        let importPrice = document.getElementById("importPrice").value;
        let exportPrice = document.getElementById("exportPrice").value;
        let importDate = document.getElementById("importDate");
        let size = document.querySelector("input[name='size']").value;
        let type = document.querySelector("input[name='type']:checked").value;
        let description = document.getElementById("description").value;
        if (action == "create") {
            // Thực hiện thêm mới sản phẩm            
            // 2. push sản phẩm vào mảng 2 chiều listProduct
            listProduct.push([productId, productName, importPrice, exportPrice, importDate,size, type, description]);

        } else {
            // Thực hiện cập nhật sản phẩm
            // 2. Lấy chỉ số sản phẩm trong mảng
            let index = getProductByProductId(productId);
            // 3. tiến hành cập nhật
            listProduct[index][1] = productName;
            listProduct[index][2] = importPrice;
            listProduct[index][3] = exportPrice;
            listProduct[index][4] = importDate;
            listProduct[index][5] = size;
            listProduct[index][6] = type;
            listProduct[index][7] = description;
            // Cho phép nhập productId
            document.getElementById("productId").readOnly = false;
        }
        // Xóa dữ liệu trên form khi thêm mới hoặc cập nhật
        document.getElementById("productId").value = "";
        document.getElementById("productName").value = "";
        document.getElementById("importPrice").value = "";
        document.getElementById("exportPrice").value = "";
        document.getElementById("importDate").value = "";
        document.getElementById("size").value = "";
        document.getElementById("Male").checked = true;
        document.getElementById("description").value = "";
        // Render lại dữ liệu trên table
        renderData();
    }
}
// Hàm lấy chỉ số sản phẩm trong listProduct từ ProductId
function getProductByProductId(productId) {
    for (let index = 0; index < listProduct.length; index++) {
        if (productId == listProduct[index][0]) {
            return index;
        }
    }
    return -1;
}

// Hàm thực hiện lấy ProductId từ table, lấy dữ liệu từ listProduct và fill lên form
function editProduct(productId) {
    // 1. Lấy chỉ số sản phẩm trong mảng
    let index = getProductByProductId(productId);
    if (index >= 0) {
        // 2. fill thông tin sản phẩm ra form
        document.getElementById("productId").value = listProduct[index][0];
        document.getElementById("productName").value = listProduct[index][1];
        document.getElementById("importPrice").value = listProduct[index][2];
        document.getElementById("exportPrice").value = listProduct[index][3];
        document.getElementById("importDate").value = listProduct[index][4];
        document.getElementById("size").value = listProduct[index][5];
        document.getElementById("male").checked = true;
        document.getElementById("description").value = listProduct[index][7];

        if (listProduct[index][6] == "Male") {
            document.getElementById("male").checked = true;
        } else {
            document.getElementById("female").checked = true;
        }
        // Đổi action = edit
        action = "edit";
        // Để ProductId thành readOnly
        document.getElementById("ProductId").readOnly = true;

    }
}

// Hàm thực hiện xóa sản phẩm
function deleteProduct(productId) {
    // 1. Lấy index sản phẩm trong mảng
    let index = getProductByProductId(productId);
    // 2. Thực hiện xóa theo index
    listProduct.splice(index, 1);
    // 3. render lại dữ liệu
    renderData();
}

// Khi trình duyệt load thì sẽ load dữ liệu Product và hiển thị trên table
document.onload = renderData();
// Truy cập vào phần tử save và gắn sự kiện click
let btnSubmit = document.getElementById("btnSubmit");
btnSubmit.addEventListener("click", function (event) {
    // Chặn sự kiện submit default của form
    event.preventDefault();
    createOrEdit()
});