import React from "react";
import { Link } from "~/components/elements/links/Link";

function LinkGroup({ links, className = "" }) {
	return (
		<div className={`w-full md:w-auto ${className}`}>
			<div className="-mb-4 md:flex md:space-x-5">
				{links?.map(({ link }, i) => (
					<div key={`linkgroupitem${i}`} className="pb-4">
						<Link {...link} className={links.length > 1 ? "w-full md:w-auto" : ""} />
					</div>
				))}
			</div>
		</div>
	);
}

export default LinkGroup;
