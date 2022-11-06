import {projectsRepo} from '../../../utils/projects-repo'

export default async (req, res) => {
  const project = projectsRepo.find(x => x["ИНН"] == req.query.INN)
  console.log(project)
  res.status(200).json(project)
}