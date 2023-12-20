import React from "react";
import Asset from "../elements/Asset";

const TextBlock = (props) => {
	const { text } = props;
	return <div className="prose" dangerouslySetInnerHTML={{ __html: text }} />;
};

const AssetBlock = (props) => {
	const { asset, caption } = props;
	return (
		<div>
			<Asset {...asset} />
			{caption && <div className="mt-6" dangerouslySetInnerHTML={{ __html: caption }} />}
		</div>
	);
};

const COMPONENT_MAP = {
	text_block: TextBlock,
	asset_block: AssetBlock,
};

const FlexiblePostContent = (props) => {
	const { content_blocks } = props;

	return content_blocks.map((layout, i) => {
		const Component = COMPONENT_MAP[layout.acf_fc_layout];
		return Component ? (
			<React.Fragment key={layout.acf_fc_layout + i}>
				<Component {...layout} />
			</React.Fragment>
		) : null;
	});
};

export default FlexiblePostContent;
