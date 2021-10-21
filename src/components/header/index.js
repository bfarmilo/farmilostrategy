import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<h1>Farmilo Strategy</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Home</Link>
			<Link activeClassName={style.active} href="/ip/">Intellectual Property Services</Link>
			<Link activeClassName={style.active} href="/management/">Management Consulting Services</Link>
			<Link activeClassName={style.active} href="/profile/">About</Link>
		</nav>
	</header>
);

export default Header;
