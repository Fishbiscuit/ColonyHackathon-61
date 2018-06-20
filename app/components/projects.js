import React from 'react';
import ProjectsAPI from '../api';


const Projects = () => (
<div>
    <section className="pt-20 pb-20 has-background-white-ter">
      <div className="container"> 
        <input className="input" type="text" placeholder="Text input"/>
      </div>
    </section>
    <section className="has-background-white-ter pb-40 h100">
      <div className="container">
      {
        ProjectsAPI.all().map(project => ( 
        <div className="card" key={project.number}> 
          <div className="card-header card-content"> 
            <div className="media">
              <div className="media-left">
                <figure className="image is-48x48"><img className="avatar-small" src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/></figure>
              </div>
            </div>
            <div className="media-content">
              <p className="title is-6">{project.org.name}</p>
              <p className="subtitle is-6">{project.org.desc}</p>
            </div>
            <div className="time">{project.timeadded}</div>
          </div>
          <div className="card-content">
            {project.name}
            {project.desc}
          </div> 

          
             {project.tasks.map(task => 

              <div className="card-content" key={task.number}>
                <div className="columns tasks" >
                  <div className="column is-one-third">
                    <div className="name title is-6">{task.name}</div>
                    <div className="description subtitle is-6">{task.desc}</div>
                  </div>
                  <div className="column"><a className="button is-info is-outlined" href="#">Apply now</a></div>
                </div>
              </div>
              )}

        </div> 
            
         )) }  
      </div> 
    </section>
</div>
)

export default Projects