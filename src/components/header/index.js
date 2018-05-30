import { h } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

const Header = () => (
	<header class={style.header}>
		<h1>Farmilo Strategy</h1>
		<nav>
			<Link activeClassName={style.active} href="/">Home</Link>
			<a href="#about">About</a>
		</nav>
	</header>
);

export default Header;
