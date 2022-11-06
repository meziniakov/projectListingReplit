import SingleItem from '../../components/SingleItem'

export const getStaticProps = async (ctx) =>{
  const {INN} = ctx.params
  
  const BASE_URL = process.env['NEXT_PUBLIC_BASE_URL']
   console.log("BASE_URL", BASE_URL)
  const res = await fetch(`https://next-js-boilerplate.zifmezin.repl.co/api/project/${INN}`)
  const item = await res.json()

  
  return {
    props: {
      item
    }
  }
}

export const getStaticPaths = async () => {
  const res = await fetch(`https://next-js-boilerplate.zifmezin.repl.co/api/project/all`)
  const projects = await res.json()

  const paths = projects.map(project => ({
    params: {INN: project["ИНН"]}
  }))

  return {paths, fallback: false}
} 

const ItemById = ({item}) => {

  return (
    <SingleItem item={item} />
  )
}
export default ItemById