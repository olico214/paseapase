// Layout.js
import { redirect } from 'next/navigation';
import NavUSuario from './component/navegacion';
import { getNameSessionAlumno } from '../libs/cookieAlumos';
import { UserProvider } from './UserContext';

export const dynamic = 'force-dynamic'

const sesion = process.env.SISTEMNAME;

export const metadata = {
  title: 'Panel De padres',
  description: 'Desarrollado por Soiteg',
};

export default async function Layout({ children }) {
  const user = await getNameSessionAlumno();
  if (!user) {
    return redirect('/');
  }
  return (
    <section>
      <NavUSuario sesion={sesion} user={user} />
      <UserProvider value={user}>
        {children}
      </UserProvider>
    </section>
  );
}
