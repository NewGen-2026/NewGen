import { useState } from "react";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";

const JobData = [
	{
		title: "cre<pst-grid>a</>tive director",
		location: "London, UK",
		type: "Full-time",
	},
	{
		title: "m<pst-grid>a</>rketing specialist",
		location: "Manchester, UK",
		type: "Full-time",
	},
	{
		title: "Infl<pst-grid>u</>encer Talent M<pst-grid>a</>nager",
		location: "Manchester, UK",
		type: "Full-time",
	},
	{
		title: "content manag<pst-pil>e</>r",
		location: "New York, UK",
		type: "Full-time",
	},
	{
		title: "public r<pst-bec>e</>lations",
		location: "Manchester, UK / Remote",
		type: "Full-time",
	},
];

const Jobs = (props) => {
	return (
		<div>
			<div className="container flex justify-center gap-5 md:justify-start md:gap-16">
				<Select
					options={[
						{
							label: "Agency",
							value: "all",
						},
					]}
				/>
				<Select
					options={[
						{
							label: "Location",
							value: "all",
						},
					]}
				/>
			</div>
			<div className="mt-10 divide-y divide-ketchup/10 px-5 md:mt-20 md:divide-y-0 md:px-0">
				{JobData.map((item, i) => (
					<JobItem key={`job${i}`} {...item} />
				))}
			</div>
		</div>
	);
};
export default Jobs;

const JobItem = ({ title, location, type }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="py-6 !text-black transition-colors  duration-200 md:py-12 md:hover:bg-ketchup hover:md:!text-candy"
		>
			<div className="container flex w-full cursor-pointer flex-col items-center justify-center gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left ">
				<div className="t-32 uupercase max-w-[500px] flex-1 font-heading font-black  uppercase">
					<FontSwitcher hover isHovered={isHovered} text={title} />
				</div>
				<div className="flex w-full flex-1 justify-center gap-4 md:max-w-[240px]">
					<div className="t-20 font-medium">{location}</div>
					<div className="t-20 font-medium md:hidden md:max-w-[235px] md:flex-[0.4]">{type}</div>
				</div>
				<div className="t-20 hidden font-medium md:block md:max-w-[235px] md:flex-[0.4]">{type}</div>
			</div>
		</div>
	);
};

const Select = ({ options }) => {
	return (
		<div className="t-24 relative -ml-2 font-medium">
			<select
				style={{
					backgroundImage: "unset",
				}}
				className="appearance-none border-none bg-transparent focus:ring-0   "
			>
				{options?.map((option, i) => (
					<option key={`option${i}`} value={option?.value}>
						{option?.label}
					</option>
				))}
			</select>

			<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-ketchup">
				<svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 1L7 7L13 1" stroke="currentColor" strokeWidth="2" />
				</svg>
			</div>
		</div>
	);
};
