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
						<Icon name="Twitter" foreground="#1DA1F2" background="#FFFFFF" />
					</a>
					<a href="https://ca.linkedin.com/in/bill-farmilo-324b081">
						<Icon name="LinkedIn" foreground="#FFFFFF" background="#0077b5" />
					</a>
					<a href="https://github.com/bfarmilo">
						<Icon name="GitHub" foreground="#FFFFFF" background="#1B1817" />
					</a>
				</div>
			</div>
		</div>
		<div id="about" class={style.secondSection}>
			<div class={style.photoArea}>
				<div class={style.logo} />
			</div>
			<div class={style.summaryArea}>
				<p class={style.sectionHeader}>The best time to plant a tree was 25 years ago. The second best time is now.</p>
				<p>Are you feeling stuck with a business project, improvement initiative, or licensing program that you wish you'd started last quarter, or last year?</p>
				<p>Over the past 25 years we have supported clients in their Patent Acquisition, Licensing and Litigation programs, from due diligence to target selection to license negotiations to IPR's and technical review of invalidity and infringement arguments.</p>
				<p>For 15 of those years we have directly built and managed an international technical team of software and hardware engineers and consultants spread between Asia, Europe and North America, navigating the delicate issues of integrating teams across many time zones, launching and managing initiatives to improve productivity, communication, and alignment with business goals.</p>
				<p>We believe that every situation is unique, with its own challenges and opportunities. That’s why we put a premium on listening and understanding. That’s why we work with you and your team to develop a bespoke solution. Your goals become our goals.</p>
				<p>Let us help your business realize its potential. Let's get that tree in the ground.</p>
			</div>
			<div class={style.blankArea} />
		</div>
	</div>
);

export default Home;
