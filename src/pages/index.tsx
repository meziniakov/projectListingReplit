import ItemList from '../components/ItemList'

export const getServerSideProps = async ({query}) => {
  const count = query.count || 21

  const res = await fetch(`https://next-js-boilerplate.zifmezin.repl.co/api/project/all?count=${count}`)
  const items = await res.json()
  return {
    props: {
      items
    }
  }
}

const Index = ({items}) => {
  return (
    <>
      <h1 className="text-2xl font-bold">
        Каталог проектов
      </h1>
      <ItemList items={items} />
    </>
  );
};

export default Index;
