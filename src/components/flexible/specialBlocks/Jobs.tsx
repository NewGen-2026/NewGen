import Link from "next/link";
import { useEffect, useState, ChangeEvent } from "react";
import FontSwitcher from "~/components/elements/animations/helpers/FontSwitcher";

interface Job {
	url: string;
	title: string;
	country: string;
	employment_type: string;
}

const Jobs = (props) => {
	const [jobListings, setJobListings] = useState<Job[]>([]);
	const [uniqueCountries, setUniqueCountries] = useState<string[]>([]);
	const [selectedCountry, setSelectedCountry] = useState<string>("");
	const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("https://apply.workable.com/api/v1/widget/accounts/468490");

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const jsonData = await response.json();
				setJobListings(jsonData.jobs);

				const uniqueCountriesSet = new Set<string>(jsonData.jobs.map((job: Job) => job.country));
				const uniqueCountriesArray: string[] = Array.from(uniqueCountriesSet);
				setUniqueCountries(uniqueCountriesArray);
				setFilteredJobs(jsonData.jobs);
			} catch (error) {
				console.error("Error:", error);
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (selectedCountry === "") {
			setFilteredJobs(jobListings);
		} else {
			const filtered = jobListings.filter((job) => job.country === selectedCountry);
			setFilteredJobs(filtered);
		}
	}, [selectedCountry, jobListings]);

	const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setSelectedCountry(event.target.value);
	};

	return (
		<div>
			<div className="container flex justify-center gap-5 md:justify-start md:gap-16">
				{/* <Select
					options={[
						{
							label: "Agency",
							value: "all",
						},
					]}
				/> */}
				<Select options={uniqueCountries} onChange={handleCountryChange} />
			</div>
			<div className="mt-10 divide-y divide-ketchup/10 px-5 md:mt-20 md:divide-y-0 md:px-0">
				{filteredJobs && filteredJobs.map((item, i) => <JobItem key={`job${i}`} {...item} />)}
			</div>
		</div>
	);
};
export default Jobs;

const JobItem = ({ title, country, employment_type, url }) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<Link
			href={url}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="block py-6 !text-black  transition-colors duration-200 md:py-12 md:hover:bg-ketchup hover:md:!text-candy"
		>
			<div className="container flex w-full cursor-pointer flex-col items-center justify-center gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left ">
				<div className="t-32 uupercase max-w-[500px] flex-1 font-heading font-black  uppercase">
					<FontSwitcher hover isHovered={isHovered} text={title} />
				</div>
				<div className="flex w-full flex-1 justify-center gap-4 md:max-w-[240px]">
					<div className="t-20 font-medium">{country}</div>
					<div className="t-20 font-medium md:hidden md:max-w-[235px] md:flex-[0.4]">{employment_type}</div>
				</div>
				<div className="t-20 hidden font-medium md:block md:max-w-[235px] md:flex-[0.4]">{employment_type}</div>
			</div>
		</Link>
	);
};

const Select = ({ options, onChange }) => {
	return (
		<div className="t-24 relative -ml-2 font-medium">
			<select
				style={{
					backgroundImage: "unset",
				}}
				className="appearance-none border-none bg-transparent focus:ring-0   "
				onChange={onChange}
			>
				<option value="">All</option>
				{options?.map((option, i) => (
					<option key={`option${i}`} value={option}>
						{option}
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
