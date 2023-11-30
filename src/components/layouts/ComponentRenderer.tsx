import React from "react";
import TextCard from "../elements/text/TextCard";
import TestComponent from "../flexible/TestComponent";
import Asset from "../elements/Asset";

export function ComponentRenderer({ components = [], pageId = null }) {
	return (
		<>
			{components.map((layout, i) => {
				const layoutName = layout.acf_fc_layout;
				return (
					<React.Fragment key={pageId + layoutName + i}>
						{layoutName === "test_component" && <TestComponent {...layout} />}
						{layoutName === "text_card" && <TextCard {...layout.text_card} />}
						{layoutName === "asset" && <Asset {...layout} />}
					</React.Fragment>
				);
			})}
		</>
	);
}

export default ComponentRenderer;
