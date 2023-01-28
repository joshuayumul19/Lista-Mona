window.addEventListener("load", () => {
	submittedActivity = JSON.parse(localStorage.getItem("activity")) || []
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
	//Submission of tasks
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
		inputTitleElement.name = "new_task_title"
		inputTitleElement.type = "text"
		inputTitleElement.readOnly = true
		inputTitleElement.value = titleValue.value
		submittedTask.appendChild(inputTitleElement)
		const taskToSubmit = {
			id: Math.random().toString(36),
			title: inputTitleElement.value,
			tasks: []
		}

		for (let index = 0; index < inputTaskValue.length; index++) {
			const inputTasksContainer = document.createElement("div")
			const inputTask = document.createElement("input")
			const actionButtonContainer = document.createElement("div")
			const editButton = document.createElement("button")
			const deleteButton = document.createElement("button")
			inputTasksContainer.classList.add("tasks")
			submittedTask.appendChild(inputTasksContainer)
			inputTask.name = "new_added_task"
			inputTask.type = "text"
			inputTask.readOnly = true
			inputTask.classList.add("new_added_task")
			inputTask.value = inputTaskValue[index].value
			taskToSubmit.tasks.push({
				id: Math.random().toString(36),
				value: inputTask.value
			})
			if (!inputTask.value) {
				const modal = document.getElementById("modal")
				const header = document.querySelector('header')
				const main = document.querySelector('main')
				const closeButton = document.querySelector(".close-button")
				modal.style.display = "block"
				header.classList.add("blur")
				main.classList.add("blur")
				closeButton.addEventListener("click", () => {
					modal.style.display = "none"
					header.classList.remove("blur")
					main.classList.remove("blur")
				})
				return
			}
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
				taskToSubmit.tasks[index].value = inputTask.value
				localStorage.setItem("activity", JSON.stringify(submittedActivity))
			})
			inputTask.addEventListener("blur", () => {
				editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
				inputTask.readOnly = true
				taskToSubmit.tasks[index].value = inputTask.value
				localStorage.setItem("activity", JSON.stringify(submittedActivity))
			})
			deleteButton.addEventListener("click", e => {
				inputTask.id = taskToSubmit.tasks[index].id
				taskToSubmit.tasks = taskToSubmit.tasks.filter(obj => obj.id !== inputTask.id)
				const taskToBeDeletedIcon = e.target
				const parentOfToBeDeletedIcon = taskToBeDeletedIcon.closest(".tasks")
				parentOfToBeDeletedIcon.remove()
				const remainingInputs = submittedTask.querySelectorAll(".tasks").length
				if (remainingInputs == 0) {
					submittedTask.id = taskToSubmit.id
					submittedActivity = submittedActivity.filter(obj => obj.id !== submittedTask.id)
					submittedTask.remove()
				}
				localStorage.setItem("activity", JSON.stringify(submittedActivity))
			})
		}
		const addedTasks = document.querySelectorAll("#new_task_form .new_added_task")
		addedTasks.forEach(node => node.remove());
		deleteSubmittedTaskBtn.addEventListener("click", e => {
			submittedTask.id = taskToSubmit.id
			submittedActivity = submittedActivity.filter(obj => obj.id !== submittedTask.id)
			const submittedTaskToDeleteIcon = e.target
			const deleteSubmittedtask = submittedTaskToDeleteIcon.closest(".submitted_task")
			deleteSubmittedtask.remove();
			localStorage.setItem("activity", JSON.stringify(submittedActivity))
		})
		submittedActivity.push(taskToSubmit)
		submittedTaskContainer.appendChild(submittedTask)
		const taskForm = document.getElementById("new_task_form")
		taskForm.reset();
		localStorage.setItem("activity", JSON.stringify(submittedActivity))
	})
	DisplayActivities()
})

function DisplayActivities() {
	submittedActivity.forEach(activity => {
		const submittedTaskContainer = document.querySelector("#submitted_tasks_container")
		const submittedTask = document.createElement("div")
		const deleteSubmittedTaskBtn = document.createElement("button")
		const inputTitleElement = document.createElement("input")
		deleteSubmittedTaskBtn.classList.add("delete_submitted_task_btn")
		deleteSubmittedTaskBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`
		submittedTask.classList.add("submitted_task")
		submittedTask.appendChild(deleteSubmittedTaskBtn)
		inputTitleElement.name = "new_task_title"
		inputTitleElement.type = "text"
		inputTitleElement.readOnly = true
		inputTitleElement.value = activity.title
		submittedTask.appendChild(inputTitleElement)
		for (let index = 0; index < activity.tasks.length; index++) {
			const inputTasksContainer = document.createElement("div")
			const inputTask = document.createElement("input")
			const actionButtonContainer = document.createElement("div")
			const editButton = document.createElement("button")
			const deleteButton = document.createElement("button")
			inputTasksContainer.classList.add("tasks")
			submittedTask.appendChild(inputTasksContainer)
			inputTask.name = "new_added_task"
			inputTask.type = "text"
			inputTask.readOnly = true
			inputTask.classList.add("new_added_task")
			inputTask.value = activity.tasks[index].value
			// if (!inputTask.value) {
			// 	const modal = document.getElementById("modal")
			// 	const header = document.querySelector('header')
			// 	const main = document.querySelector('main')
			// 	const closeButton = document.querySelector(".close-button")
			// 	modal.style.display = "block"
			// 	header.classList.add("blur")
			// 	main.classList.add("blur")
			// 	closeButton.addEventListener("click", () => {
			// 		modal.style.display = "none"
			// 		header.classList.remove("blur")
			// 		main.classList.remove("blur")
			// 	})
			// 	return
			// }
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
				activity.tasks[index].value = inputTask.value
				localStorage.setItem("activity", JSON.stringify(submittedActivity))
			})
			inputTask.addEventListener("blur", () => {
				editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`
				inputTask.readOnly = true
				activity.tasks[index].value = inputTask.value
				localStorage.setItem("activity", JSON.stringify(submittedActivity))
			})
			deleteButton.addEventListener("click", e => {
				inputTask.id = activity.tasks[index].id
				activity.tasks = activity.tasks.filter(obj => obj.id !== inputTask.id)
				const taskToBeDeletedIcon = e.target
				const parentOfToBeDeletedIcon = taskToBeDeletedIcon.closest(".tasks")
				parentOfToBeDeletedIcon.remove()
				if (activity.tasks.length == 0) {
					submittedTask.id = activity.id
					submittedActivity = submittedActivity.filter(obj => obj.id !== submittedTask.id)
					submittedTask.remove()
				}
				localStorage.setItem("activity", JSON.stringify(submittedActivity))
			})
		}
		const addedTasks = document.querySelectorAll("#new_task_form .new_added_task")
		addedTasks.forEach(node => node.remove());
		deleteSubmittedTaskBtn.addEventListener("click", e => {
			submittedTask.id = activity.id
			submittedActivity = submittedActivity.filter(obj => obj.id !== submittedTask.id)
			const submittedTaskToDeleteIcon = e.target
			const deleteSubmittedtask = submittedTaskToDeleteIcon.closest(".submitted_task")
			deleteSubmittedtask.remove();
			localStorage.setItem("activity", JSON.stringify(submittedActivity))
		})
		submittedTaskContainer.appendChild(submittedTask)
		const taskForm = document.getElementById("new_task_form")
		taskForm.reset();
		localStorage.setItem("activity", JSON.stringify(submittedActivity))
	})
}