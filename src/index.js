import './style.css'
import { compareAsc, format } from "date-fns";

document.addEventListener('submit', function(event) {
    event.preventDefault();
}, true);



function populateStorage() {
    localStorage.setItem("theProjects", JSON.stringify(projects));
    console.log(JSON.parse(localStorage.getItem('theProjects'))[0].tasks)
  }


const homeProject = {

    name: "Home",
        tasks: []
}

let projects = [homeProject]

function addProject(projectName) {
    let project = {
        name: projectName,
        tasks: []
    };
    
    projects.push(project);

    populateStorage()
}

function projectAdd() {

    let newProjectName = document.getElementById("newProject").value

    if(newProjectName.length>0) {
        addProject(newProjectName)
        }
        const projectContainer = document.querySelector('.projectContainerIcon')
        const projectH4= document.createElement('h4')
        projectH4.textContent='My Projects'
        projectContainer.innerHTML=""
        projectContainer.appendChild(projectH4)

        
        const projectElementSelect = document.getElementById('project')
        projectElementSelect.innerHTML=""

        projects.forEach( (project, index) => {

            const projectH5Div = document.createElement('div')
            projectH5Div.setAttribute('class', 'projectH5Div')
            const projectH5= document.createElement('h5')
            projectH5.dataset.index= `${index}`
            projectH5.setAttribute('class','projectH5')
            projectH5.textContent=project.name
            projectContainer.appendChild(projectH5Div)
            projectH5Div.appendChild(projectH5)
            projectH5Div.addEventListener('click', function () {
                
                const mainPageDiv=document.querySelector('.mainPageDiv')
                mainPageDiv.setAttribute('class',`mainPageDiv ${project.name}`)
                generateProjectPageReal()})

            const projectOptions = document.createElement('option')
            projectOptions.setAttribute('class','projectOptions')
            projectOptions.textContent=project.name
            projectOptions.value=project.name
            projectElementSelect.appendChild(projectOptions)
                
            
            const mainPageDiv = document.querySelector(".mainPageDiv")
          
            if (project.name!=="Home") {
                
            const projectRemoveButton = document.createElement('div')
            projectRemoveButton.classList.add("projectRemoveButton")
            projectRemoveButton.textContent="X"
            projectH5Div.appendChild(projectRemoveButton)
            projectRemoveButton.addEventListener('click', function() {
                projects.splice(index, 1)
                projectContainer.removeChild(projectH5Div)
                projectElementSelect.removeChild(projectOptions)
                mainPageDiv.setAttribute('class','mainPageDiv Home')
                populateStorage()
                generateProjectPageReal()
                
                }   
            )
        }


    })


} 

function toDo (title, description, dueDate, priority) {  
    /*this.project=project*/
    this.title=title;
    this.description=description;
    this.dueDate=format(new Date(dueDate), "PPPPpppp");
    this.priority=priority

}




function addToDo() {
    
    let selectedName = document.getElementById("project").value;
    let title= document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let dueDate= document.getElementById("date").value;
    let priority=document.getElementById("priority").value

  
    if (!title || !description || !dueDate|| !priority) {
      alert('All fields must be filled out.');
      return;
    } 

    projects.forEach((project) => {
       if(project.name === selectedName)
        {
        project.tasks.push(new toDo(title,description,dueDate, priority));
        populateStorage()
        }})

        
    document.getElementById("title").value=""
    document.getElementById("description").value=""
    document.getElementById("date").value=""

    /*render addedTask if on taskPage*/

    generateProjectPageReal()
        
}   

function generateProjectPageReal () {

    const mainPageDiv = document.querySelector('.mainPageDiv')
    projects.forEach((project)=> {
     
        if(mainPageDiv.className===`mainPageDiv ${project.name}`) {

            generateProjectPage(project) }
    })

}

function generateProjectPage (project) {

    const mainPage= document.querySelector(".mainPageDiv")
   
    mainPage.innerHTML=""

     const newPageContainer = document.createElement('div')
     newPageContainer.classList.add('pageContainer')
    
     mainPage.appendChild(newPageContainer)

    const projectContainer = document.createElement('div')
    projectContainer.classList.add('titleTaskContainer')
    
    const projectText = document.createElement('h2')
    projectText.textContent=project.name
    projectContainer.appendChild(projectText)
    newPageContainer.appendChild(projectContainer)

    
    const multiTaskContainer = document.createElement('div')
    multiTaskContainer.classList.add('multiTaskContainer')
    newPageContainer.appendChild(multiTaskContainer)
    
    


    project.tasks.forEach((task, index) => {
        
        const taskContainer = document.createElement('div')
        taskContainer.setAttribute('class','taskContainer')
        multiTaskContainer.appendChild(taskContainer)
        
        const title = document.createElement('h4')
        title.setAttribute('class','titleTask')
        title.textContent= task.title
        taskContainer.appendChild(title)


        const description = document.createElement('p')
        description.textContent=task.description
        description.setAttribute('class', 'descriptionTask')
        taskContainer.appendChild(description)
        const priorityContainer = document.createElement('div')
        const priorityText = document.createElement('p')
        priorityContainer.appendChild(priorityText)
        taskContainer.appendChild(priorityContainer)

        
        const duedate = document.createElement('p')
        duedate.textContent=task.dueDate
        duedate.setAttribute('class','dueDateTask')
        taskContainer.appendChild(duedate)

        const removeButton = document.createElement('div')
        removeButton.textContent="X"
        removeButton.setAttribute('class','removeTask')
        taskContainer.appendChild(removeButton)
        removeButton.addEventListener('click', function() {
      
            project.tasks.splice(index, 1)
            populateStorage();
            multiTaskContainer.removeChild(taskContainer)
            generateProjectPageReal()
        })

        const editButton = document.createElement('div')
        editButton.textContent="X"
        editButton.classList.add('editButton')


        taskContainer.appendChild(editButton)
        editButton.addEventListener('click', function() { editTask () })
       
        function editTask() {

            const addTaskFormElement = document.querySelector('.addTaskFormContainer')
            addTaskFormElement.classList.add('addTaskFormContainerVisible')
            const addTaskFormElementEdit = document.querySelector('.addTaskForm')
            addTaskFormElementEdit.classList.add('editTaskFormVisible')
            addTaskFormElementEdit.classList.remove('addTaskFormVisible')
            const buttonAddEdit = document.querySelector('#buttonEditTask')
            buttonAddEdit.addEventListener('click', editTaskInput)

            function editTaskInput () {
                
  
            let title= document.getElementById("title").value;
            let description = document.getElementById("description").value;
            let dueDate= document.getElementById("date").value;
            let priority=document.getElementById("priority").value

            task.title= title
            task.description=description
            task.dueDate= dueDate
            task.priority=priority
           
            

            generateProjectPageReal()
            populateStorage()
            }

           
        
            function positionPopupRelativeTo(target) {

                const targetRect = target.getBoundingClientRect();
                const popupRect =  addTaskFormElementEdit.getBoundingClientRect();

                const top = targetRect.bottom + window.scrollY - 300;
                const left = targetRect.left + window.scrollX;
                const getComputedStyle =  window.getComputedStyle(target)
                const backgroundColor = getComputedStyle.backgroundColor


                addTaskFormElementEdit.style.top = `${top}px`;
                addTaskFormElementEdit.style.left = `${left}px`;
                /*addTaskFormElementEdit.style.backgroundColor = backgroundColor*/
            }
            positionPopupRelativeTo(taskContainer);
            }
        
       
        
           
        
        

        if(task.priority==="p1") {
            taskContainer.classList.add("p1")

        }
        if(task.priority==="p2") {
            taskContainer.classList.add("p2")

        }
        if(task.priority==="p3") {
            taskContainer.classList.add("p3")

        }
        if(task.priority==="p4") {
          
            taskContainer.classList.add("p4")

        }

    })



}


 function getStorage () {
    if (localStorage.getItem("theProjects")) {
     
        projects = JSON.parse(localStorage.getItem("theProjects"))
      
      }
    
    }

projectAdd()
getStorage()

const mainPageDiv = document.querySelector('.mainPageDiv')
mainPageDiv.setAttribute('class',`mainPageDiv ${projects[0].name}`)
generateProjectPageReal()

/* BUTTON IN ADDPROJECT FUNCTION */

const buttonProject = document.getElementById("buttonAddProject")
const newProjectInput = document.getElementById("newProject")
buttonProject.addEventListener('click', projectAdd) 

newProjectInput.addEventListener('input', function () {
    if(newProjectInput.value.length>0) {
        buttonProject.disabled=false
    }
    else {
        buttonProject.disabled=true
    }
})



/* CACNCEL PROJECTFORM BY CANCEL BUTTON */


const buttonCancelProject= document.getElementById('buttonAddProjectCancel')
buttonCancelProject.addEventListener('click', function() {
    const addProjectFormContainer = document.querySelector('.addProjectFormContainer')
    addProjectFormContainer.classList.toggle('addProjectFormContainerVisible')
    
    })

/* CACNCEL PROJECTFORM BY Window Click*/

function hasAncestorWithClass(element, className) {
    while (element) {
        if (element.classList && element.classList.contains(className)) {
            return true;
        }
        element = element.parentElement;
    }
    return false;
}


const addProjectFormContainer = document.querySelector('.addProjectFormContainer')
addProjectFormContainer.addEventListener('click', function(event) {
    if (hasAncestorWithClass(event.target, "addProjectForm"))
        {return}
    else {
        const addProjectFormContainer = document.querySelector('.addProjectFormContainer')
        addProjectFormContainer.classList.toggle('addProjectFormContainerVisible')
       
    }
})





/* SHOWTASK BY THE ADDTASKBUTTON */


const showTaskForm = document.querySelector('#addTaskContainerLeftSpalt')
showTaskForm.addEventListener('click', function () {

    const addTaskFormContainer = document.querySelector('.addTaskFormContainer')
    addTaskFormContainer.classList.add('addTaskFormContainerVisible')
    const addTaskForm = document.querySelector('.addTaskForm')
    addTaskForm.classList.add('addTaskFormVisible')
    addTaskForm.classList.remove('editTaskFormVisible')


})

/* BUTTON FUNCTION IN ADDTASKFORMFORM */

const buttonAddTask = document.getElementById("buttonAddTask")
buttonAddTask.addEventListener('click', function() {
    addToDo()

    populateStorage()

   
})
 

/*CANCEL TASKFORM by WINDOW CLICK */


const addTaskFormContainer = document.querySelector('.addTaskFormContainer')
addTaskFormContainer.addEventListener('mousedown', function(event) {
    if (hasAncestorWithClass(event.target, "addTaskForm"))
        {return}
    else {
        const addTaskFormElement = document.querySelector('.addTaskFormContainer')
        addTaskFormElement.classList.remove('addTaskFormContainerVisible')
        const addTaskForm = document.querySelector('.addTaskForm')
        addTaskForm.classList.remove('editTaskFormVisible')
        addTaskForm.classList.remove('addTaskFormVisible')
     
        function resetPopupStyles(element) {
            element.style.top = '';
            element.style.left = '';
            element.style.backgroundColor = '';
        }
        resetPopupStyles(addTaskForm)
      
    }
})


/* CANCEL TASKFORM BY CANCEL BUTTON */


const buttonCancelTask= document.getElementById('buttonCancel')
buttonCancelTask.addEventListener('click', function() {
    const addTaskFormElement = document.querySelector('.addTaskFormContainer')
    addTaskFormElement.classList.remove('addTaskFormContainerVisible')
    const addTaskForm = document.querySelector('.addTaskForm')
    addTaskFormElement.classList.remove('editTaskFormVisible')
    addTaskFormElement.classList.remove('addTaskFormVisible')
    function resetPopupStyles(element) {
        element.style.top = '';
        element.style.left = '';
        element.style.backgroundColor = '';
    }
    resetPopupStyles(addTaskForm)
    })
 


/* ICON VISIBLE AND SHOW PROJECT FUNCTION */  

const leftSpaltDiv = document.querySelector('.leftSpalt')

leftSpaltDiv.addEventListener('mouseenter', function(){
    const projectContainerIconDiv = document.querySelector('.projectContainerIcon')
    const icondiv = document.createElement('div')
    projectContainerIconDiv.appendChild(icondiv)
    icondiv.classList.add('iconVisible')
    icondiv.addEventListener('click', function () {
    
        const formContainer = document.querySelector('.addProjectFormContainer')
        formContainer.classList.toggle('addProjectFormContainerVisible')
 
    })
    

},)

leftSpaltDiv.addEventListener('mouseleave', function(){
    
        const projectContainerIconDiv = document.querySelector('.projectContainerIcon')
        const icondiv = document.querySelector(".iconVisible")
        projectContainerIconDiv.removeChild(icondiv)
     
    
 },)