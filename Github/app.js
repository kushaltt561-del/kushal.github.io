$(document).ready(function () {
    // Load items from localStorage on startup
    function loadList() {
        let items = JSON.parse(localStorage.getItem("todoList")) || [];
        $("#todoList").empty();

        items.forEach((item, index) => {
            $("#todoList").append(`
                <li>
                    <span class="text">${item}</span>

                    <span class="action-btn edit-btn" data-index="${index}">Edit</span>
                    <span class="action-btn delete-btn" data-index="${index}">Delete</span>
                </li>
            `);
        });
    }

    // Save updated list to localStorage
    function saveList() {
        let items = [];
        $("#todoList li .text").each(function () {
            items.push($(this).text());
        });
        localStorage.setItem("todoList", JSON.stringify(items));
    }

    // Add new item
    $("#addBtn").click(function () {
        let text = $("#todoText").val().trim();
        if (text === "") return;

        $("#todoList").append(`
            <li>
                <span class="text">${text}</span>
                <span class="action-btn edit-btn">Edit</span>
                <span class="action-btn delete-btn delete-btn">Delete</span>
            </li>
        `);

        $("#todoText").val("");
        saveList();
    });

    // Delete item
    $(document).on("click", ".delete-btn", function () {
        $(this).parent().remove();
        saveList();
    });

    // Edit/Update item
    $(document).on("click", ".edit-btn", function () {
        let li = $(this).parent();
        let currentText = li.find(".text").text();
        let updatedText = prompt("Edit item:", currentText);

        if (updatedText !== null) {
            li.find(".text").text(updatedText);
            saveList();
        }
    });

    // Initial load
    loadList();
});
