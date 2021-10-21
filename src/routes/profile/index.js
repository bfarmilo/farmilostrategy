import { h } from 'preact';
import style from './style';
import Icon from '../../components/social';

const Profile = () => (
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
				<p class={style.sectionHeader}>Experience and Expertise</p>
				<p>
					In nearly 25 years of work as, variously, an Intellectual Property Consultant and a Senior Executive in a medium-sized multinational consulting firm, I've developed analysis experience in the following software fields:
				</p>
				<ul>
					<li>Digital Video – MPEG2, ATSC, MPEG4, Digital Rights Management</li>
					<li>Hardware – Software updates, system memory, network interface, USB communications</li>
					<li>Mobile Operating Systems – iOS, Android, including OS updates and internals</li>
					<li>Streaming – DASH, HLS, BMFF, fMP4, MPEG-TS, WebM, content delivery, Encrypted Media Extensions, Media Source Extensions</li>
					<li>Internet – IPv4/6, TCP/IP, TLS/SSL, Content Delivery Networks</li>
					<li>App Development – Front-end Technologies (React, JQuery, HTML5), Back-end Technologies (NodeJS/Express, PHP, also web server deployment including nGINX, Apache), Database Engines (SQLite, SQL Server, Redis, MongoDB), Cloud Services (MS Azure, AWS).</li>

				</ul>
				<p>Further back my focus was on hardware, including the following technology fields:</p>
				<ul>
					<li>Semiconductor manufacturing and process</li>
					<li>Semiconductor packaging</li>
					<li>Semiconductor circuits – memory (DRAM, SRAM, Flash, EEPROM), phase lock loops, FPGAs, microcontrollers, A/D and D/A converters, image sensors</li>
					<li>Systems – mobile phones, personal computers, televisions, digital cameras</li>
					<li>Communications – Wi-Fi (802.11), Ethernet (802.3)</li>

				</ul>
				<p>I've also been directly involved in licensing programs including the following:</p>
				<ul>
					<li>Digital TV, Computers, Streaming, E-Commerce and Automotive programs for a company with extensive and novel IP in the fields of computer networking, encryption and digital media</li>
					<li>Semiconductor (memory) licensing program for a company holding foundational IP for semiconductor memory technology</li>
					<li>Digital camera licensing program for a well-known camera brand</li>
				</ul>
				<p>My management experience spanned over 15 years as a Senior leader, responsible for a team of 150 software and hardware engineers developing custom reverse engineering software, performing chip-level analysis and system-level analysis.
					During that time we added, through acquisition, teams in Warsaw Poland, Shanghai China, and Austin Texas. I was responsible for integrating these newly acquired companies to build a coherent, productive team.
				</p>
			</div>
			<div class={style.blankArea} />
		</div>
	</div>
);

export default Profile;