import React from "react";
import { LayoutGroup } from "framer-motion";
import { TestComponent } from "~/components/flexible/TestComponent";
import { TextCard } from "~/components/elements/text/TextCard";

export function ComponentRenderer({ components = [], pageId = null }) {
	return (
		<LayoutGroup>
			{/* <pre>{JSON.stringify(components, null, 4)}</pre> */}
			{components.map((layout, i) => {
				const layoutName = layout.acf_fc_layout;
				return (
					<React.Fragment key={pageId + layoutName + i}>
						{layoutName === "test_component" && <TestComponent {...layout} />}
						{layoutName === "text_card" && <TextCard {...layout.text_card} />}
					</React.Fragment>
				);
			})}
		</LayoutGroup>
	);
}

export default ComponentRenderer;
