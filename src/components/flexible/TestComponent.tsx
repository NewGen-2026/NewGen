import React from "react";
import TextCard, { TextCardProps } from "../elements/text/TextCard";

type TestComponentProps = {
	text_card: TextCardProps;
};

function TestComponent(props: TestComponentProps) {
	const { text_card } = props;
	return (
		<div>
			<TextCard {...text_card} />
		</div>
	);
}

export default TestComponent;
