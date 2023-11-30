import React from "react";
import { Link, LinkProps } from "./Link";

export type LinkGroupProps = {
	links: LinkProps[];
	className?: string;
};

function LinkGroup({ links, className = "" }: LinkGroupProps) {
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
