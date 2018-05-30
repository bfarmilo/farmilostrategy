import { h } from 'preact';
import style from './style';
import Icon from '../../components/social';

const Home = () => (
	<div class={style.home}>
		<div class={style.firstSection}>
			<div class={style.titleArea}>
				<h1>Farmilo Strategy</h1>
			</div>
			<div class={style.subtitleArea}>
				<h2>Solutions through persistence</h2>
			</div>
			<div class={style.social}>
				<div>
					<a href="https://twitter.com/billfarmilo">
						<Icon name='Twitter' foreground='#1DA1F2' background='#FFFFFF' />
					</a>
					<a href="https://ca.linkedin.com/in/bill-farmilo-324b081">
						<Icon name='LinkedIn' foreground='#FFFFFF' background='#0077b5' />
					</a>
					<a href="https://github.com/bfarmilo">
						<Icon name='GitHub' foreground='#FFFFFF' background='#1B1817' />
					</a>
				</div>
			</div>
		</div>
		<div id='about' class={style.secondSection}>
			<div class={style.photoArea}>
				<img src="../assets/FarmiloStrategy_2.png" alt="Bill Farmilo" class={style.logo} />
			</div>
			<div class={style.summaryArea}>
				<h1>Farmilo Strategy</h1>
				<h2><i>The best time to plant a tree was 25 years ago. The second best time is now.</i></h2>
				<p>At Farmilo Strategy we know how to implement practical solutions to business problems.</p>
				<p>From <strong>strategy development</strong> to <strong>culture-change</strong> to <strong>pre-</strong> and <strong>post-M&A integration</strong> to <strong>operations planning and process improvement</strong>, we have been where you are.</p>
				<p>We also recognize that every situation is unique, with its own challenges and opportunities. That’s why we put a premium on listening and understanding. That’s why we work with you and your team to develop a bespoke solution. Your goals become our goals.</p>
				<p>Let us help your small or medium sized business realize its potential.</p>
			</div>
			<div class={style.blankArea}/>
		</div>
	</div>
);

export default Home;
