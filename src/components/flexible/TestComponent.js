import React from "react";
import { TextCard } from "~/components/elements/text/TextCard";

export function TestComponent(props) {
	const { text_card } = props;
	return (
		<div>
			<TextCard {...text_card} />
		</div>
	);
}

export default TestComponent;
