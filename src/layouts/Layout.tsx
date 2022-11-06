// @ts-ignore
import { FC } from 'react';
import Nav from '../components/Nav/Nav'

const Layout:FC = (props) => (
  <>
  <Nav />
  <div className="container mx-auto mt-7 gap-7">
    {props.children}
  </div>
    </>
);

export { Layout };
