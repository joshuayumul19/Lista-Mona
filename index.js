window.addEventListener("load", () => {

	//Clicking of "+" Icon
	const addTaskBtn = document.querySelector("#add_task_button")
	addTaskBtn.addEventListener("click", () => {
		const form = document.querySelector("#new_task_form")
		const newInput = document.createElement("input")
		newInput.type = "text"
		newInput.classList.add("new_task_input")
		newInput.classList.add("new_added_task")
		newInput.placeholder = "What's your added plan?"
		form.appendChild(newInput)
	})

	const submitBtn = document.querySelector("#submit")
	submitBtn.addEventListener("click", (e) => {
		e.preventDefault();
		const submittedTaskContainer = document.querySelector("#submitted_tasks_container")
		const submittedTask = document.createElement("div")
		const deleteSubmittedTaskBtn = document.createElement("button")
		const inputTitleElement = document.createElement("input")
		const titleValue = document.querySelector("#new_task_title")
		const inputTaskValue = document.querySelectorAll(".new_task_input")
		deleteSubmittedTaskBtn.classList.add("delete_submitted_task_btn")
		deleteSubmittedTaskBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
		submittedTask.classList.add("submitted_task")
		submittedTask.appendChild(deleteSubmittedTaskBtn)
		inputTitleElement.type = "text"
		inputTitleElement.readOnly = true
		inputTitleElement.value = titleValue.value
		submittedTask.appendChild(inputTitleElement)
		for (let index = 0; index < inputTaskValue.length; index++) {
			const inputTasksContainer = document.createElement("div")
			const inputTask = document.createElement("input")
			const actionButtonContainer = document.createElement("div")
			const editButton = document.createElement("button")
			const deleteButton = document.createElement("button")
			inputTasksContainer.classList.add("tasks")
			submittedTask.appendChild(inputTasksContainer)
			inputTask.type = "text"
			inputTask.readOnly = true
			inputTask.classList.add("new_added_task")
			inputTask.value = inputTaskValue[index].value
			inputTasksContainer.appendChild(inputTask)
			actionButtonContainer.classList.add("action_buttons_container")
			editButton.classList.add("edit_button")
			deleteButton.classList.add("delete_button")
			editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
			deleteButton.innerHTML = `<i class="fa-solid fa-delete-left"></i>`
			actionButtonContainer.appendChild(editButton)
			actionButtonContainer.appendChild(deleteButton)
			inputTasksContainer.appendChild(actionButtonContainer)

			editButton.addEventListener("click", () => {
				if (editButton.innerHTML == `<i class="fa-solid fa-pen-to-square"></i>`) {
					editButton.innerHTML = `<i class="fa-solid fa-check"></i>`
					inputTask.removeAttribute("readonly")
					inputTask.focus()

				}
				else {
					editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
					inputTask.readOnly = true
				}
			})
			inputTask.addEventListener("blur", () => {
				editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
				inputTask.readOnly = true
			})
			deleteButton.addEventListener("click", e => {
				const taskToBeDeletedIcon = e.target
				const parentOfToBeDeletedIcon = taskToBeDeletedIcon.closest(".tasks")
				parentOfToBeDeletedIcon.remove()
			})
		}
		submittedTaskContainer.appendChild(submittedTask)
		const addedTasks = document.querySelectorAll("#new_task_form .new_added_task")
		addedTasks.forEach(node => node.remove());
		const taskForm = document.getElementById("new_task_form")
		taskForm.reset();

		deleteSubmittedTaskBtn.addEventListener("click", e => {
			const submittedTaskToDeleteIcon = e.target
			const deleteSubmittedtask = submittedTaskToDeleteIcon.closest(".submitted_task")
			deleteSubmittedtask.remove();
		})
	})
});
