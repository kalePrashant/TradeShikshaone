import Navbar from './Navbar';
import Footer from './Footer';

export default function Layout({ children, transparentNav = false }) {
  return (
    <>
      <Navbar transparent={transparentNav} />
      <main>{children}</main>
    </>
  );
}
