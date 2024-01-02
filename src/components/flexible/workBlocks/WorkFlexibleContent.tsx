import React, { useEffect, useState } from "react";
import Asset from "~/components/elements/Asset";
import WpImage from "~/components/elements/WpImage";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";
import useBreakpointCrossed from "~/hooks/useBreakpointCrossed";
import { getBgColorClasses, getTextContrastColorClasses } from "~/utils/getColors";
import maxWidthProps, { MaxWidthStyleType } from "~/utils/maxWidthProps";

const Heading = (props) => {
	const { heading, tag, max_width } = props;
	const HeadingTag = (tag as keyof React.JSX.IntrinsicElements) || "h2";

	const [maxWidthStyle, setMaxWidthStyle] = useState<MaxWidthStyleType>(maxWidthProps(max_width));

	const breakpointCrossed = useBreakpointCrossed(768);

	useEffect(() => {
		if (breakpointCrossed) {
			setMaxWidthStyle(null);
		} else {
			setMaxWidthStyle(maxWidthProps(max_width));
		}
	}, [max_width, breakpointCrossed]);

	return (
		<div className="container mb-8 mt-12 md:mb-16 md:mt-32">
			<div
				style={{
					...maxWidthStyle?.style,
				}}
				className="mx-auto w-full max-w-[1106px] text-center"
			>
				<HeadingTag className="t-80 font-black uppercase">
					<FontSwitcher text={heading} />
				</HeadingTag>
			</div>
		</div>
	);
};

const StatBlock = (props) => {
	const { heading, content, theme_color, image, stats } = props;
	return (
		<div className={`${getBgColorClasses(theme_color)} pt-12 md:pt-32`}>
			<div className="container">
				<div className="flex w-full flex-col justify-between gap-6 pb-8 md:flex-row md:pb-32">
					<div className="flex flex-1 flex-col justify-between gap-5 md:max-w-[488px]">
						<h2 className="t-80 font-black uppercase">
							<FontSwitcher text={heading} />
						</h2>
						<div className="t-20 font-medium opacity-60">{content}</div>
					</div>
					<div className="max-w-[672px] flex-1">
						<div className="aspect-[672/532] w-full">
							<WpImage image={image} className="h-full w-full object-cover" />
						</div>
					</div>
				</div>
				{stats?.length && (
					<div className="grid grid-cols-2 gap-3 pb-10 md:grid-cols-4 md:gap-8">
						{stats.map((stat, i) => (
							<div key={`stat-${i}`} className="flex-1">
								<div className={`t-80 font-black uppercase ${getTextContrastColorClasses(theme_color)}`}>
									<FontSwitcher text={stat?.stat} loop={false} />
								</div>
								<div className="t-22 mt-4 font-black uppercase !leading-[1.1]">{stat?.description}</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

const AssetBlock = (props) => {
	const { asset } = props;
	return (
		<div className="container my-12 md:my-16">
			<div className="bg-stone-/20 aspect-[1376/652] w-full">
				<Asset {...asset} className="h-full w-full object-cover" />
			</div>
		</div>
	);
};

const SingleColContent = (props) => {
	const { content } = props;

	return (
		<div className="container my-12 md:my-32 ">
			<div className="t-24-body mx-auto max-w-[672px] text-center font-medium">{content}</div>
		</div>
	);
};

const TripleColContent = (props) => {
	const { cols } = props;

	return (
		<div className="container my-12 md:my-32">
			<div className="grid gap-4 md:grid-cols-3 md:gap-8">
				{cols.map((col, i) => (
					<div key={`col-${i}`} className="flex-1">
						<div className="t-22 font-medium">{col?.content}</div>
					</div>
				))}
			</div>
		</div>
	);
};

const COMPONENT_MAP = {
	stat_block: StatBlock,
	asset: AssetBlock,
	heading: Heading,
	single_col_content: SingleColContent,
	triple_col_content: TripleColContent,
};

const WorkFlexibleContent = (props) => {
	const { work_block } = props;

	return work_block.map((layout, i) => {
		const Component = COMPONENT_MAP[layout.acf_fc_layout];
		return Component ? (
			<React.Fragment key={layout.acf_fc_layout + i}>
				<Component {...layout} />
			</React.Fragment>
		) : null;
	});
};

export default WorkFlexibleContent;
