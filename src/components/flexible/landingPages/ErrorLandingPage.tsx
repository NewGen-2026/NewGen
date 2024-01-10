/* eslint-disable react-hooks/exhaustive-deps */
import Link from "next/link";
import { useEffect, useState } from "react";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import { TextLink } from "~/components/elements/buttons/Button";

const defaultFontClass = "font-heading";
const fontPil = "font-pilowlava !leading-[0.5] !font-normal";
const fontGrid = "font-gridular !leading-[0.5] !font-normal";
const fontRec = "font-recoleta !leading-[0.5] !font-semibold";
const fontNip = "font-nippo !leading-[0.5] !font-bold";
const fontBec = "font-become !leading-[0.5] !font-medium";
const fontHal = "font-haltwins !leading-[0.5] !font-normal";

const fontPools = {
	"4-1": [fontGrid, fontNip, fontRec],
	"0": [fontRec, fontPil, fontGrid],
	"4-2": [fontBec, fontHal, defaultFontClass],
};

const ErrorLandingPage = (props) => {
	const { heading, link } = props;

	const getRandomSwitchCount = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

	const [fontStates, setFontStates] = useState([
		{ id: "4-1", char: "4", fontClass: fontPools["4-1"][0], switchesLeft: getRandomSwitchCount(2, 4) },
		{ id: "0", char: "0", fontClass: fontPools["0"][0], switchesLeft: getRandomSwitchCount(3, 6) },
		{ id: "4-2", char: "4", fontClass: fontPools["4-2"][0], switchesLeft: getRandomSwitchCount(4, 7) },
	]);
	useEffect(() => {
		const getRandomPauseDuration = () => {
			return Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000;
		};
		const switchFontForCharacter = (index) => {
			if (index >= fontStates.length) return;

			setFontStates((currentStates) => {
				const newState = [...currentStates];
				const charState = newState[index];

				if (charState.switchesLeft > 0) {
					charState.fontClass = fontPools[charState.id][Math.floor(Math.random() * fontPools[charState.id].length)];
					charState.switchesLeft -= 1;
				} else {
					charState.switchesLeft = getRandomSwitchCount(2, 5);
					setTimeout(() => switchFontForCharacter(index), getRandomPauseDuration());
					return newState;
				}

				setTimeout(() => switchFontForCharacter(index), 150);
				return newState;
			});
		};

		fontStates.forEach((_, index) => switchFontForCharacter(index));
	}, []);

	return (
		<div className="min-h-screen pb-20 pt-24 md:pt-44">
			<div className="container">
				<h1 className="t-32 max-w-[470px] font-black uppercase">
					<FontSwitcher text={heading} />
				</h1>
				<Link href={link?.url} className="mt-4 block md:mt-8">
					<TextLink underlineColour="white">{link?.title}</TextLink>
				</Link>

				<div className="t-404 mb-[-0.2em] mt-11 max-h-[1em] whitespace-nowrap font-black uppercase !leading-[1] md:mt-[70px]">
					{fontStates.map((state, index) => (
						<span key={index} className={state.fontClass}>
							{state.char}
						</span>
					))}
				</div>
			</div>
		</div>
	);
};
export default ErrorLandingPage;
