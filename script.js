function saveBook(id){
    let code=document.getElementById("code").value;
    let name=document.getElementById("name").value;
    let author=document.getElementById("author").value;
    let price=document.getElementById("price").value;
    let book={
        id:id,
        code:code,
        name:name,
        author:author,
        price:price
    }
    $.ajax({
        headers:{
            'Content-Type':'application/json'
        },
        type:"POST",
        data:JSON.stringify(book),
        url:"http://localhost:8080/book/save",
        success:printBook
    })
}
function deleteBook(id){
    $.ajax({
        type:"DELETE",
        url:"http://localhost:8080/book/delete/"+id,
        success:printBook
    })
}
function printBook(){
    let nameSearch=$('#nameSearch').val();
    let authorSearch=$('#authorSearch').val();
    let minPrice=$('#minPrice').val();
    let maxPrice=$('#maxPrice').val();
    $.ajax({
        type: "GET",
        url:"http://localhost:8080/book/list",
        data:{
            "nameSearch":nameSearch,
            "authorSearch":authorSearch,
            "minPrice":minPrice,
            "maxPrice":maxPrice
        },
        success:function (data){
            let content="";
            let sum=0;
            content+=
                "<tr>" +
                "<th>Code</th>" +
                "<th>Name</th>" +
                "<th>Author</th>" +
                "<th>Price</th>" +
                "<th>Edit</th>" +
                "<th>Delete</th>" +
                "</tr>";
            data.forEach(function (book){
                content+=
                    "<tr>" +
                    "<td>"+book.code+"</td>" +
                    "<td>"+book.name+"</td>" +
                    "<td>"+book.author+"</td>" +
                    "<td>"+book.price+"</td>" +
                    "<td><button onclick='saveBook("+book.id+")'>Save</button></td>" +
                    "<td><button onclick='deleteBook("+book.id+")'>Delete</button></td>" +
                    "</tr>";
                sum+=book.price;
            })
            content+=
                "<tr>" +
                "<td></td>" +
                "<td></td>" +
                "<td></td>" +
                "<td>"+sum+"</td>" +
                "<td></td>" +
                "<td></td>" +
                "</tr>";
            document.getElementById("list").innerHTML=content;
        }
    })
}
printBook()