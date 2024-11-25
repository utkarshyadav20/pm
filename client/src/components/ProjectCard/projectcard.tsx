import { Project } from '@/state/api'
import React from 'react'

type ProejctCardProps = {
    project:Project
}

const ProjectCard = ({project}: ProejctCardProps) => {
  return (
    <div className='rounded border p-4 shadow'>
      <h3>Project Name: {project.name}</h3>
      <p>Project Description: {project.description}</p>
      <p>Start Date: {project.startDate}</p>
      <p>End Date: {project.endDate}</p>
    </div>
  )
}

export default ProjectCard;