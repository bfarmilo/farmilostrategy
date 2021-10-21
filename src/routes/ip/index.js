import { h } from 'preact';
import style from './style';
import Icon from '../../components/social';
import { Link } from 'preact-router/match';

const IntellectualProperty = () => (
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
				<p class={style.sectionHeader}>Intellectual Property Consulting Services</p>
				<p>
					We've been working in the field of <strong>Intellectual Property consulting</strong> and <strong>patent licensing</strong> since 1997.
					Our licensing activities have included identification of potential licensees,
					selection of claims and exemplary products for analysis, infringement and market analysis,
					license valuation, and license negotiations.
				</p>
				<p>
					With a background in systems, hardware and <strong>software</strong>, we've implemented practical systems and tools to analyze technologies of interest and facilitate the production and management
					of licensing packages, at one time including 50 concurrent license negotiations across 5 technology domains.
				</p>
				<p>For example, here's a technical tool to analyze <a href="https://www.farmilostrategy.com/isoinspector/">MPEG4 and MPEG-TS Streaming Media <Icon name="OutLink" foreground="#353f12" background="#00000000" /></a> tags and file structure.</p>
				<p>
					In addition to licensing work, we provide technical support for litigation activities including
					identification of infringing products, infringement analysis, support for claim constructions, invalidity responses, and IPRs.
				</p>
				<p>Have a look at our <Link activeClassName={style.active} href="/profile/">profile</Link> to see some of the technical areas we've been involved in.</p>
			</div>
			<div class={style.blankArea} />
		</div>
	</div>
);

export default IntellectualProperty;