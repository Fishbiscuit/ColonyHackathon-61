const ProjectsAPI = {
projects : [{
        "org": { // First Project in list
            "name": "Organization 1", // Organization Name
            "desc": "Donec maximus dolor sed leo faucibus, at tincidunt odio ornare. Vestibulum ac congue elit." // Organization Description
        },
        "number": 1,
        "name": "Project 1", // Project Name
        "desc": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ", // Project Description
        "tasks": [{ // List of tasks
            "number": 1,
            "name": "Task 1", // First Task Name
            "desc": "Cras cursus sit amet ante ut laoreet." // Task Description
        }, {
            "number": 2,
            "name": "Task 2", // Second task Name
            "desc": "Fusce sed commodo erat." // Second task decription
        }]
    }, {
        "org": { // Second Project
            "name": "Organization 2",
            "desc": " Curabitur vitae venenatis libero, ac tincidunt sapien."
        },
        "number": 2,
        "name": "Project 2",
        "desc": "Maecenas faucibus, neque quis eleifend luctus",
        "tasks": [{
            "number": 1,
            "name": "Task 1",
            "desc": "Praesent rutrum aliquam suscipit."
        }, {
            "number": 2,
            "name": "Task 2",
            "desc": "Curabitur egestas massa in risus scelerisque consectetur."
        }]
    }],
  all: function() { return this.projects},
}

export default ProjectsAPI